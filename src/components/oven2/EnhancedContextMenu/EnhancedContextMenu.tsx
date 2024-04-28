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

export default function EnhancedContextMenu({ menuItems ,event , blurOverlay , extraPadding , menuHeight }) {
    const ref = useRef(null)
    const menuRef = useRef()
    const [ items , setItems ] = useState([])
    const [ open , setOpen ] = useState(false)
    const [ subPaper , setSubPaper ] = useState([])
    const tmps = useRef({})
    const [ options , setOptions ] = useState({
        extraPadding: 30 , 
        blurOverlay : true , 
        menuColor : '--oven-pure-white' ,
        menuItemFontSize : 13 ,
        menuFontFamily : 'open_sansregular' ,
        menuHeight : 26
    })

    function getParentMenu(){
        return tmps.current.currentOpenMenu
    }

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

    useEffect( () => {
        if ( extraPadding ){ setOptions( prev => ({...prev , extraPadding }))}
        if ( menuItems ){
            tmps.current.directiveMenu = {}
            parseAndInsertnativeid(menuItems) 
            setItems(menuItems)
            tmps.current.items = menuItems
            tmps.current.onScreenIds = []
        }
        if ( menuHeight ){setOptions( prev => ({...prev , menuHeight }))}
    } , [extraPadding , ,menuItems , menuHeight ])

    useEffect( () => {
        if(!event){return}
        $(ref.current).show()
        event.preventDefault()
        const {X , Y } = getLocations(event , ref , options )
        $(menuRef.current).css('top' , Y + 'px')
        $(menuRef.current).css('left' , X + 'px')
        $(ref.current).css('opacity' , 1)
        $(menuRef.current).css('opacity' , 1)
    } , [event])

    useEffect( () => {
        blurOverlay ? $(ref.current).addClass('blur-overylay') : $(ref.current).removeClass('blur-overylay')
    } , [blurOverlay] )
 
    const handleClickAwayEvent = (event) => {
        setSubPaper(prev => [])
        if (event.type == "contextmenu" ){
            return
        }
        if (event.type == "scroll" ){
            return
        }
        $(ref.current).css('opacity' , 0)
        $(ref.current).hide()
        
    }

    useEffect( () => {
        $(document).on('scroll' , handleClickAwayEvent )
        $(document).on('contextmenu' , handleClickAwayEvent )
        return () => {
            $(document).on('scroll' , handleClickAwayEvent )
            $(document).on('contextmenu' , handleClickAwayEvent )
        }
    } , [])

    return (
        <EnhancedMenuContext.Provider value={{
            addSubPaper : setSubPaper ,
            mainRef : ref ,
            getParentMenu: getParentMenu , 
            tmps ,
            handleClickAwayEvent
         }}>
            <ClickAwayListener onClickAway={handleClickAwayEvent}>
                <div 
                onClick={handleClickAwayEvent} 
                ref={ref} 
                onMouseMove={(event) => {
                    tmps.current.movingOn = event.target
                }}
                className="enh-cm-paper"
                >
                    <MenuBox sub={false} index={0} options={options} ref={menuRef}>
                        {
                            items.map( (item, index) => {
                                return (
                                    <SingleMenuItem 
                                        nativeid={item.nativeid} 
                                        groupid={item.groupId} 
                                        index={index} 
                                        key={'__'+index} 
                                        item={item} 
                                        options={options} 
                                    />
                                )
                            })
                        } 
                        

                    </MenuBox>

                    {
                        subPaper.map( (SubPaper, index) =>{
                            console.log('rendering subPaper .. ' + index )
                            return subPaper
                        })
                    }

                </div>
            </ClickAwayListener>
        </EnhancedMenuContext.Provider>
    )
}
