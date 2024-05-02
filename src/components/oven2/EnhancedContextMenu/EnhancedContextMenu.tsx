// @ts-nocheck
import { useState , useRef , useEffect, useMemo , memo } from "react";
import './style.css'
import React from 'react'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import $ from 'jquery'
import { getLocations } from "./plugins/GetLocations";
import SingleMenuItem from "./plugins/MenuItem";
import { Key, Label } from "@mui/icons-material";
import '../fonts/openSans/stylesheet.css'
import MenuBox from "./plugins/MenuBox";
import EnhancedMenuContext from "./plugins/Context";
import { getRandomId } from "../commonsjs/common";
export default function EnhancedContextMenu({ enableAnimations , animationMotion ,  menuItems ,event , blurOverlay , menuItemBorder , extraPadding , menuHeight , sideIconsSideBorder , sideIcons , sideIconsSideBackground  }) {
    const ref = useRef(null)
    const menuRef = useRef()
    const [ items , setItems ] = useState([])
    const [ open , setOpen ] = useState(false)
    const tmps = useRef({})
    const [ eevent , updateEvent ] = useState(undefined)
    const [ isOnScreenSubMenu , setIsOnScreenSubMenu ] = useState(false)
    const [ menuItemsInsertionCompleted , setMenuItemsInsertionCompleted ] = useState(false)
    const [ alreadyHidden , setAlreadyHidden ] = useState(false)
    const [ stopEventSpreading , setStopEventSpreading ] = useState(false)
    const [ options , setOptions ] = useState({
        extraPadding: 30 , 
        blurOverlay : true , 
        menuColor : '--oven-pure-white' ,
        menuItemFontSize : 13 ,
        menuFontFamily : 'open_sansregular' ,
        menuHeight : 26 ,
        menuItemBorder : 300 ,
        sideIcons : true ,
        sideIconsSideBorder : false , 
        sideIconsSideBackground : false ,
        enableAnimations : enableAnimations || true  ,
        animationMotion : animationMotion || 'slide' // opptions are slide , shadow-drop
    })

    const parseAndInsertnativeid = (items , randomId ) => {
        items.map( (item,index) => {
            const groupId = getRandomId()
            item.nativeid = getRandomId()
            item.groupId= randomId ? randomId : groupId
            if ( item.subItems ){ 
                parseAndInsertnativeid(item.subItems , item.groupId )
            }
        })
    }

    function reset(){
        setItems(prev => menuItems )
        updatesequenceArray('flush' , [menuItems] )
        setIsOnScreenSubMenu(false)
    }

    useEffect( () => {
        
        if ( extraPadding ){ setOptions( prev => ({...prev , extraPadding }))}
        if ( event ){
            tmps.current.renderMenuInSequenceArray=[]
            tmps.current.lastClickedenulabel = ''
            parseAndInsertnativeid(menuItems) 
            reset()
        }
        if ( menuHeight ){setOptions( prev => ({...prev , menuHeight }))}
        if ( menuItemBorder ){setOptions( prev => ({...prev , menuItemBorder }))}
        if ( sideIcons ){setOptions( prev => ({...prev , sideIcons }))}
        if ( sideIconsSideBorder ){setOptions( prev => ({...prev , sideIconsSideBorder }))}
        if ( sideIconsSideBackground ){setOptions( prev => ({...prev , sideIconsSideBackground }))}
    } , [extraPadding , ,event , menuHeight  , menuItemBorder , sideIcons  ,sideIconsSideBorder,sideIconsSideBackground  ])

    function updatesequenceArray(method , content, force ){
        if (! tmps.current.renderMenuInSequenceArray ){ return }
        if ( tmps.current.renderMenuInSequenceArray.length == 1 && force != true && method == 'flush' ){
            // console.warn('can not reset the current render sequence as last item can not be zero.')
            return
        }
        if ( method == 'push'){
            tmps.current.renderMenuInSequenceArray.push(content)
        }
        if ( method == 'flush'){
            tmps.current.renderMenuInSequenceArray=content
        }
    }
    


    useEffect( () => {
        if(!event){return}
        $(ref.current).show()
        event.preventDefault()
        const {X , Y } = getLocations(event , ref , options )
        $(menuRef.current).css('top' , Y + 'px')
        $(menuRef.current).css('left' , X + 'px')
        $(ref.current).css('opacity' , 1)
        $(menuRef.current).css('opacity' , 1)
        setAlreadyHidden( false )
        updateEvent( prev => event )
        return () => {
            updateEvent( prev => null)
            setAlreadyHidden( false )
        }

    } , [event])

    useEffect( () => {
        blurOverlay ? $(ref.current).addClass('blur-overylay') : $(ref.current).removeClass('blur-overylay')
    } , [blurOverlay] )
 
    const handleClickAwayEvent = (event , force , source ) => {
        if ( stopEventSpreading ){ return }
        if ( alreadyHidden ){ return }
        if ( event.type != 'scroll' ){
            const t = event.target.innerHTML
            const a = event.target.getAttribute('groupid')
            const skip = event.target.classList.contains('enh-cm-paper')
            if ( (t.includes('prevent---hide') || a == 'bkbtn') && ! skip ){
                return
            }
        }
        
        $(ref.current).css('opacity' , 0)
        $(ref.current).hide()
        console.warn('resetting menu visibility and options ... ')
        reset()
        updateEvent(prev => null )
        setAlreadyHidden( true )
    }

    useEffect( () => {
        $(document).on('scroll' , handleClickAwayEvent )
        return () => {
            $(document).on('scroll' , handleClickAwayEvent )
        }
    } , [])



    return (
        <EnhancedMenuContext.Provider value={{
            mainRef : ref ,
            tmps ,
            handleClickAwayEvent , 
            updateMenuBoxItems: setItems ,
            updateOnScreenBackButton : setIsOnScreenSubMenu ,
            updatesequenceArray : updatesequenceArray ,
            stopEventSpreading : setStopEventSpreading
         }}>
            {/* <ClickAwayListener onClickAway={(event) => {handleClickAwayEvent(event, true , 'clkaway')}} > */}
                <div 
                    ref={ref} 
                    onClick={(event) => {handleClickAwayEvent(event, true , 'clkaway')}}
                    className="enh-cm-paper"
                >
                    <MenuBox sub={false} index={0} options={options} ref={menuRef}>
                        {
                            isOnScreenSubMenu ?  <SingleMenuItem menuRef={menuRef}  options={options} type="back" /> : null
                        }
                        {
                            items ? 
                                items.map( (item, index) => {
                                    return (
                                        <SingleMenuItem 
                                            nativeid={item.nativeid} 
                                            groupid={item.groupId} 
                                            index={index} 
                                            key={'__'+index} 
                                            item={item} 
                                            options={options}
                                            menuRef={menuRef} 
                                            type={'options'}
                                        />
                                    )
                                })
                            : null 
                        }
                            
                    </MenuBox>
                </div>
            {/* </ClickAwayListener> */}
        </EnhancedMenuContext.Provider>
    )
}
