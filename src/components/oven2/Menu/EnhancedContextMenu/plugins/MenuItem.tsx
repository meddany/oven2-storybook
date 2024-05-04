// @ts-nocheck
import React , { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { MenuItem } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {Stack} from '@mui/material';
import { getMousePosition } from './GetLocations';
import MenuBox from './MenuBox';
import EnhancedMenuContext from './Context';
import {createTheme} from '@mui/material';
import $ from 'jquery'
import { getIconSideStyle , getClassesForSideBar  } from './SideIcons';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { getRandomId } from '../../../utils/common';
import { SelectBox as MuiSelectBox } from '../../../../oven2/Select'
import '../../../colors/palette.css'
import { GlobalMenuItem } from './GlobalMenuItem';


export default function SingleMenuItem({ type , item , options , index , nativeid , groupid , menuRef   }) {
    
    const ref = useRef()
    const { tmps , updateMenuBoxItems , updateOnScreenBackButton , updatesequenceArray , clearEvent  } = useContext(EnhancedMenuContext)

    const handleOnMoseClick = (event) => {
        tmps.current.lastClickedMenuLabel = item.label
        if ( item.subItems ){
            event.stopPropagation()
            updateMenuBoxItems( prev => item.subItems)
            updateOnScreenBackButton(true)
            updatesequenceArray('push' , item.subItems )
            return
        }
        item.action(item)
        clearEvent()
        
    }
    
    const handleOnBackClick = (event) =>  {
        event.stopPropagation()
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
        return (
            <GlobalMenuItem 
                groupid={'bkbtn'} 
                nativeid={getRandomId()} 
                labelBy={"children"} 
                index={index} 
                ref={ref} 
                item={{label : ''}} 
                options={options} 
                onClick={handleOnBackClick}
                >
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} style={{pointerEvents: 'none'}} >
                    <div style={{position : 'absolute' , left : '0px' , top : '-3px' , transform : 'rotate(180deg)' , pointerEvents: 'none', }} >
                        <KeyboardArrowRightIcon sx={{ position : 'relative' , left : '10px' , height : '100%' , paddingTop : '20%', color : '#029cfd'}} style={{pointerEvents: 'none'}} />
                    </div> 
                    <p style={{ marginLeft : '10px' ,width : '100%' , color : '#b2b3b5'}} >Back</p>
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
            item={item} 
            options={options} 
            onClick={handleOnMoseClick}
            >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} style={{pointerEvents: 'none'}} >
                <p style={{width : '100%'}} >{item.label}</p>
                <div style={{position : 'absolute' , right : '0px'}} >
                    {
                        item.subItems ? <KeyboardArrowRightIcon sx={{height : '100%' , paddingTop : '10%'}} /> : <></>
                    }
                </div> 
            </Stack> 
        </GlobalMenuItem>
    )

}
