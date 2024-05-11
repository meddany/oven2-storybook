// @ts-nocheck
import { useState , useRef , useEffect, useMemo , memo } from "react";
import './style.css'
import React from 'react'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import $ from 'jquery'
import { getLocations } from "./plugins/GetLocations";
import SingleMenuItem from "./plugins/MenuItem";
import { Key, Label } from "@mui/icons-material";
import '../../fonts/openSans/stylesheet.css'
import MenuBox from "./plugins/MenuBox";
import EnhancedMenuContext from "./plugins/Context";
import { getRandomId } from "../../utils/common";
import '../../colors/palette.css'
import { BackMenuItem } from "./plugins/BackMenuItem";
import { MenuRows } from "./plugins/MenuRows";
import { MarginBox } from "../../Containers";
import '../../OvenScrollbar/OvenScrollbar.css'
export default function EnhancedContextMenu(props) {
    const ref = useRef(null)
    const { x , y  ,customHoverColor , minWidth , enableAnimations , animationMotion ,  menuItems ,event , blurOverlay , menuItemBorder , extraPadding , menuHeight , sideIconsSideBorder , sideIcons , sideIconsSideBackground  } = props;
    const menuRef = useRef()
    const [ items , setItems ] = useState([])
    const [ open , setOpen ] = useState(false)
    const tmps = useRef({})
    
    const [ isOnScreenSubMenu , setIsOnScreenSubMenu ] = useState(false)
    const [ menuItemsInsertionCompleted , setMenuItemsInsertionCompleted ] = useState(false)
    const [ alreadyHidden , setAlreadyHidden ] = useState(false)
    const [ options , setOptions ] = useState({
        extraPadding: 30 , 
        blurOverlay : true , 
        menuColor : '--oven-pure-white' ,
        menuItemFontSize : 13 ,
        menuFontFamily : 'Roboto' ,
        menuHeight : 26 ,
        minWidth : minWidth ? minWidth : 'none',
        menuItemBorder : 300 ,
        sideIcons : true ,
        sideIconsSideBorder : false , 
        sideIconsSideBackground : false ,
        enableAnimations : enableAnimations || false  ,
        animationMotion : animationMotion || 'slide' , // opptions are slide , shadow-drop ,
        customHoverColor : customHoverColor ? customHoverColor : 'var(--oven-nice-blue)'  ,
        locationX :  x ? x : false , 
        locationY :  y ? y : false , 
        event : event ? event : null 

    })
    const callback = useRef({options : options})

    const parseAndInsertnativeid = (items) => {
        items.map( (item,index) => {
            item.nativeid = getRandomId()
            if ( item.subItems ){ 
                parseAndInsertnativeid(item.subItems)
            }
        })
    }

    function reset(){
        setItems(prev => menuItems )
        updatesequenceArray('flush' , [menuItems] )
        setIsOnScreenSubMenu(false)
    }

    useEffect( () => {
        if ( event ){
            setOptions( prev => ({...prev , event : event })) 
            event.preventDefault()
            tmps.current.renderMenuInSequenceArray=[]
            tmps.current.lastClickedenulabel = ''
            parseAndInsertnativeid(menuItems) 
            reset()           
        }
        if ( extraPadding ){ setOptions( prev => ({...prev , extraPadding }))}
        if ( menuHeight ){setOptions( prev => ({...prev , menuHeight }))}
        if ( menuItemBorder ){setOptions( prev => ({...prev , menuItemBorder }))}
        if ( sideIcons ){setOptions( prev => ({...prev , sideIcons }))}
        if ( sideIconsSideBorder ){setOptions( prev => ({...prev , sideIconsSideBorder }))}
        if ( sideIconsSideBackground ){setOptions( prev => ({...prev , sideIconsSideBackground }))}
    } , [extraPadding , ,event , menuHeight  , menuItemBorder , sideIcons  ,sideIconsSideBorder,sideIconsSideBackground  ])

    function updatesequenceArray(method , content, force ){
        if (! tmps.current.renderMenuInSequenceArray ){ return }
        if ( tmps.current.renderMenuInSequenceArray.length == 1 && force != true && method == 'flush' ){
            return
        }
        if ( method == 'push'){tmps.current.renderMenuInSequenceArray.push(content)}
        else if ( method == 'flush'){tmps.current.renderMenuInSequenceArray=content}
    }
    
    function updateAndGetBoxLocation(){
        const {X , Y } = getLocations(options.event , ref , options )
        setOptions( prev => ({...prev , locationX: X , locationY: Y}))
        setOptions( prev => ({...prev , event : event  }))
    }

    useEffect( () => {
        if(!event){return}
        if( ! options.locationX ){
            updateAndGetBoxLocation()
        }   
        return () => {
            setOptions( prev => ({...prev, event : null }))
            setOptions( prev => ({...prev, locationX : false }))
            setOptions( prev => ({...prev, locationY : false }))
        }
    } , [ options.event])

    useEffect( () => {
        blurOverlay ? $(ref.current).addClass('blur-overylay') : $(ref.current).removeClass('blur-overylay')
    } , [blurOverlay] )

    function clearEvent(){
        setOptions( prev => ({...prev, event : null }))
    }

    const handleClickAwayEvent = (event , force , source ) => {
        // console.log(event , force , source )
        if ( source == 'clkaway'){
            clearEvent()
        }
    }

    return (
        <EnhancedMenuContext.Provider value={{
            mainRef : ref ,
            tmps ,
            options,
            handleClickAwayEvent , 
            updateMenuBoxItems: setItems ,
            updateOnScreenBackButton : setIsOnScreenSubMenu ,
            updatesequenceArray : updatesequenceArray ,
            clearEvent : clearEvent ,
            menu : menuRef ,
            updateAndGetBoxLocation : updateAndGetBoxLocation 
            }}
         >
            { 
                options.event ? 
                    <div 
                        ref={ref} 
                        onClick={(event) => {handleClickAwayEvent(event, true , 'clkaway')}}
                        className="enh-cm-paper custom-scroll-bar"
                    >
                    <MenuBox sub={false} options={options} ref={menuRef} >
                        <BackMenuItem  isOnScreenSubMenu={isOnScreenSubMenu} ref={menuRef} options={options} />
                        <MenuRows items={items} options={options} ref={menuRef} />
                    </MenuBox>
                </div>
                : null 
            } 
        </EnhancedMenuContext.Provider>
    )
}
