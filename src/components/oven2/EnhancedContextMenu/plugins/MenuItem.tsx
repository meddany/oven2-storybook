// @ts-nocheck
import React , { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { MenuItem } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {Stack} from '@mui/material';
import { getMousePosition } from './GetLocations';
import MenuBox from './MenuBox';
import { getRandomId } from '../../utils/common';
import EnhancedMenuContext from './Context';
import {createTheme} from '@mui/material';
import $ from 'jquery'
import { getIconSideStyle , getClassesForSideBar  } from './SideIcons';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import MuiSelectBox from '../../MuiSelectBox/MuiSelectBox';




function getStyles(options){
    return {
        fontSize : options.menuItemFontSize ,
        fontFamily: options.menuFontFamily ,
        borderRadius: options.menuItemBorder ,
        pointerEvents: 'all' , 
        paddingTop: 7
    }
}

function renderSelectBox(item){
    return (
        <div style={{width : '100%' , pointerEvents: 'all' , background : 'white'}} >
            <MuiSelectBox 
            options={item.options}
            size='small'
            multiple={false}
            label={item.label}
            />
        </div>
    )
}

const GlobalMenuItem = forwardRef( ({item , options , style , index , children , onMouseEnter , onMouseLeave , labelBy , nativeid , groupid , onClick } , ref ) => {
    const { tmps  } = useContext(EnhancedMenuContext)
    

    function handleOnClick(event){
        if ( item.custom == true & item.type == 'select'){
            stopEventSpreading( true )
            return
        }
        if ( onClick ){
            onClick(event , ref )
        }
    }

    if ( item.danger ){
        style.backgroundColor = `var(--oven-light-red)` 
        style.color = `var(--oven-danger-red)` 
    } 

    if ( item.custom ){
        style.backgroundColor= 'transparent'
    }

    function getChilds(item){
        if ( item.custom == true && item.type == 'select' ) { return renderSelectBox(item) }
        else if ( item.labelBy == 'label'  ) { return item.label }
        else if ( item.labelBy != 'label'  && item.custom != true ) { return children }
    }   

    function getClassesIU(item){
        const classes = ['custom-mui-dim', 'cm-custom-menu-item' , 'prevent---hide' , 'slide-left']
        if ( item.custom != true ){classes.push('custom-mui-hover-color')}
        return classes.join(' ')
    }

    return (
        <Stack groupid={groupid} className={getClassesIU(item)}  direction={'row'}>  
            <div style={{wdith : '0px' , height : '100%' , background : 'transparent'}} >
                <div className={getClassesForSideBar(options)} style={{width : '100%' , height : options.menuHeight , position : 'relative'}} >
                    {
                        options.sideBarIcons ? <FileOpenIcon /> : null 
                    }
                </div>
            </div>
            <MenuItem
                menu-index={index}
                sx={{height : options.menuHeight , width : '100%'}} 
                ref={ref}
                groupid={groupid}
                nativeid={nativeid}
                onMouseEnter={onMouseEnter ? onMouseEnter : ()=>{}}
                onMouseLeave={onMouseLeave ? onMouseLeave : ()=>{}}
                style={style}
                disableRipple={ item.custom ? true : false }
                disableTouchRipple={ item.custom ? true : false }
                onClick={onClick}
                disabled={ item.disable ? true : false }
            >   
                <Stack direction={'row'} style={{width : '100%'}}>
                    <div>
                        { getChilds(item)  }
                    </div>
                </Stack>
            </MenuItem>
        </Stack>
    )
})

function RenderMainMenuSingleItem({ type , items , options , index , children  , nativeid , groupid , menuRef }){
    const ref = useRef()
    const { tmps , updateMenuBoxItems , updateOnScreenBackButton , updatesequenceArray } = useContext(EnhancedMenuContext)
    const style = getStyles(options)
    
    const handleOnMoseClick = (event) => {
        tmps.current.lastClickedMenuLabel = items.label
        if ( items.subItems ){
            event.stopPropagation()
            updateMenuBoxItems( prev => items.subItems)
            updateOnScreenBackButton(true)
            updatesequenceArray('push' , items.subItems )
        }
    }
    
    const handleOnBackClick = (event) =>  {
        tmps.current.preventMenuHide=true
        tmps.current.renderMenuInSequenceArray.pop()
        const previousItems = tmps.current.renderMenuInSequenceArray[tmps.current.renderMenuInSequenceArray.length - 1 ]
        if ( tmps.current.renderMenuInSequenceArray.length == 1 ){
            updateOnScreenBackButton(false)
        }
        updateMenuBoxItems( prev => previousItems  )
        updatesequenceArray('flush' , tmps.current.renderMenuInSequenceArray )
    }

    if (type == 'back'){
        // const label = tmps.current.lastClickedMenuLabel
        return (
            <GlobalMenuItem 
            groupid={'bkbtn'} 
            nativeid={getRandomId()} 
            labelBy={"children"} 
            index={index} 
            ref={ref} 
            item={{label : ''}} 
            options={options} 
            style={style} 
            onClick={handleOnBackClick}
            >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} style={{pointerEvents: 'none'}} >
              <p style={{ marginLeft : '10px' ,width : '100%' , color : '#b2b3b5'}} >Back</p>
              <p style={{ display : 'none' }} >prevent---hide</p>
                <div style={{position : 'absolute' , left : '0px' , transform : 'rotate(180deg)' , pointerEvents: 'none' }} >
                    <KeyboardArrowRightIcon sx={{height : '100%' , paddingTop : '20%', color : '#029cfd'}} style={{pointerEvents: 'none'}} />
                </div> 
            </Stack> 
        </GlobalMenuItem> 
        )
    }

    return (
        <GlobalMenuItem 
            groupid={groupid} 
            nativeid={nativeid} 
            labelBy={"children"} 
            index={index} 
            ref={ref} 
            item={items} 
            options={options} 
            style={style} 
            onClick={handleOnMoseClick}
            >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} style={{pointerEvents: 'none'}} >
              <p style={{width : '100%'}} >{items.label}</p>
                <div style={{position : 'absolute' , right : '0px'}} >
                    {
                        items.subItems ? <KeyboardArrowRightIcon sx={{height : '100%' , paddingTop : '20%'}} /> : <></>
                    }
                </div> 
            </Stack> 
        </GlobalMenuItem>
    )
}

export default function SingleMenuItem({ type , item , options , index , nativeid , groupid , menuRef   }) {
    
    return (
        <div style={{pointerEvents: 'none'}} type={type} groupid={groupid} >
            {
                <RenderMainMenuSingleItem 
                    groupid={groupid} 
                    nativeid={nativeid} 
                    index={index} 
                    items={item} 
                    options={options}
                    menuRef={menuRef}
                    type={type}
                    
                />
            }
        </div>
    )
}
