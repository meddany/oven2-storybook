// @ts-nocheck
import React , { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { MenuItem } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {Stack} from '@mui/material';
import { getMousePosition } from './GetLocations';
import MenuBox from './MenuBox';
import { getRandomId } from '../../commonsjs/common';
import EnhancedMenuContext from './Context';
import {createTheme} from '@mui/material';

import $ from 'jquery'

const theme = createTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          '&:hover': {
            backgroundColor: 'var(--oven-nice-blue)',
          },
        },
      },
    },
  });


function getStyles(options){
    return {
        fontSize : options.menuItemFontSize ,
        fontFamily: options.menuFontFamily ,
        borderRadius: 300 ,
        pointerEvents: 'all' , 
    }
}

const GlobalMenuItem = forwardRef( ({item , options , style , index , children , onMouseEnter , onMouseLeave , labelBy , nativeid , groupid } , ref ) => {
    const { addSubPaper , getParentMenu , tmps   } = useContext(EnhancedMenuContext)
    
    function handleOnClick(event){
        item.action(event,ref)
    }

    if ( item.danger ){
        style.backgroundColor = `var(--oven-light-red)` 
        style.color = `var(--oven-danger-red)` 
    } 
    return (
        <MenuItem
            className='cm-custom-menu-item'
            menu-index={index}
            sx={{height : options.menuHeight}} 
            ref={ref}
            groupid={groupid}
            nativeid={nativeid}
            onMouseEnter={onMouseEnter ? onMouseEnter : ()=>{}}
            onMouseLeave={onMouseLeave ? onMouseLeave : ()=>{}}
            style={style}
            theme={theme}
            onClick={ item.action ?  (e) => {handleOnClick(e)} : () => {}}
            disabled={ item.disable ? true : false }
        >   
            { labelBy == 'label' ? item.label : children  }

        </MenuItem>
    )
})

function RenderMainMenuSingleItem({ item , options , index , children  , nativeid , groupid }){
    const ref = useRef()
    const { addSubPaper } = useContext(EnhancedMenuContext)
    const style = getStyles(options)
    return (
        <GlobalMenuItem groupid={groupid} nativeid={nativeid} index={index} ref={ref} item={item} options={options} style={style} labelBy={"label"} />
    )
}


function RenderSubMenuSingleItem({ item , options , index , nativeid , groupid }){
    const ref = useRef()
    const { addSubPaper , getParentMenu , tmps  } = useContext(EnhancedMenuContext)
    const style = getStyles(options)
    const subMenuRef = useRef()
    const key = getRandomId()
    const items = item.subItems

    const handleOnMouseExit = (event) => {
        console.log(tmps.current.lastCreatedMenuBox)
        setTimeout( () => {
            const clickedGroupId = $(event.target).attr('groupid')
            const newSelectedGroup= tmps.current.newSelectedGroup
            if ( clickedGroupId != newSelectedGroup ){
                addSubPaper( prev => {
                    // console.log(prev)
                    const fn = []
                    prev.map( elem => {
                        if ( elem.ref ){
                            if ( $(elem.ref.current).find('li').attr('groupid') != clickedGroupId ){
                                fn.push(elem)
                            }
                        }
                    })
                    return fn 
                }  )
            }
            else{
                const menu = $(subMenuRef.current).closest('.enh-cm-box')
                // console.log(menu)
            }
        } , 50)
    }

    function checkIfOkToCreateMenu(){
        const itemNid = items[0]['nativeid']
        const elements = $(`[nativeid="${itemNid}"]`)
        if ( elements.length >= 1 ){
            return false
        }
        return true
    }   

    const handleOnMoseEnter=(event)=>{
        tmps.current.newSelectedGroup = $(event.target).attr('groupid')
        tmps.current.newSelectedNative = $(event.target).attr('nativeid')
        const { X , Y } = getMousePosition(event)
        const id = getRandomId()
        if ( ! checkIfOkToCreateMenu()) { return <></>}
        addSubPaper( prev => {
            console.log('trigger')
            const subIndex = prev.length
            tmps.current.lastCreatedMenuBox=subMenuRef
            const fn = [
                ...prev , 
                <MenuBox sub={true} index={subIndex} id={id} key={key} options={options} ref={subMenuRef} >
                    {
                        items.map( (item, index) => {
                            tmps.current.onScreenIds.push(item.nativeid)
                            return (
                                <SingleMenuItem groupid={groupid} nativeid={item.nativeid} index={index} key={'__'+index} item={item} options={options} />
                            )
                        })
                    } 
                </MenuBox>
            ]
            return fn 
        } )
        
        function positionSubMenu(){
            const thisMenu = $(`#${id}`)
            const parentMenu = thisMenu.prev()
            const thisItem = event.target
            const MenuBoxWidth = thisMenu.width()
            const MenuBoxHeight = thisMenu.width()
            const thisItemFarFromTop = ( parseInt( $(thisItem).attr('menu-index')) + 1 )  * (options.menuHeight )
            if ( ! parentMenu.css('top')){ 
                thisMenu.remove()
                return
             }
            const top = parseInt(parentMenu.css('top').replace('px' , ''))
            const left = parseInt(parentMenu.css('left').replace('px' , ''))
            var y = top + thisItemFarFromTop - 20 - parentMenu.scrollTop()
            var x = left + parentMenu.width() + 20
            var pageSizeW = document.body.clientWidth;
            var pageSizeH = document.body.clientHeight;
            if (x + MenuBoxWidth >= pageSizeW) { x = pageSizeW - MenuBoxWidth*2.1 - options.extraPadding ; }
            thisMenu.css('top' , y )
            thisMenu.css('left' , x )
            thisMenu.css('opacity' , 1 )
            thisMenu.css('position' , 'absolute' )
        }

        setTimeout( () => {
            positionSubMenu()
        } , 100 )

    }

    return (
        <GlobalMenuItem groupid={groupid} nativeid={nativeid} labelBy={"children"} index={index} ref={ref} item={item} options={options} style={style} onMouseEnter={handleOnMoseEnter} onMouseLeave={handleOnMouseExit} >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} style={{pointerEvents: 'none'}} >
              <p style={{width : '100%'}} >{item.label}</p>
                <div style={{position : 'absolute' , right : '0px'}} >
                     <KeyboardArrowRightIcon sx={{height : '100%' , paddingTop : '20%'}} />
                </div> 
            </Stack> 
        </GlobalMenuItem>
    )
}

export default function SingleMenuItem({ item , options , index , nativeid , groupid  }) {
    return (
        <>
            {
                ! item.subItems ? <RenderMainMenuSingleItem groupid={groupid} nativeid={nativeid} index={index} item={item} options={options} /> : <RenderSubMenuSingleItem groupid={groupid} nativeid={nativeid} index={index} item={item} options={options} />
            }
        </>
    )
}
