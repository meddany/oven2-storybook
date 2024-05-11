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


export default function SingleMenuItem({ type , item , options , index , nativeid , groupid , menuRef  , children  }) {
    
    const ref = useRef()
    const { clearPinnedItems , updatePinnedItems , updateAndGetBoxLocation , tmps , updateMenuBoxItems , updateOnScreenBackButton , updatesequenceArray , clearEvent  } = useContext(EnhancedMenuContext)

    useEffect( () => {
        if ( ! item ){ return }
        updateAndGetBoxLocation()
        if ( item.pinned == true || item.pinned == 'both'){
            updatePinnedItems( prev => ([...prev , item]))
        }
    } , [item])

    const handleOnMoseClick = (event) => {
        if (type != 'pinned'){ 
            if ( item.subItems ){
                event.stopPropagation()
                updateMenuBoxItems( prev => item.subItems)
                updateOnScreenBackButton(true)
                updatesequenceArray('push' , item.subItems )
                const status = item.subItems.map( item => item.pinned ).includes(true)
                if ( status == false ){
                    clearPinnedItems()
                }
                return
            }
            if ( ! item.disable ){
                item.action(item)
                clearEvent()
            }  
        }
        else if ( type == 'pinned'){
            clearEvent()
        }
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
                <Stack sx={{maxHeight: '30px'}} direction={'row'} alignItems={'center'} justifyContent={'center'} style={{pointerEvents: 'none'}} >
                    <KeyboardArrowRightIcon sx={{ position : 'relative', color : '#029cfd'}} style={{pointerEvents: 'none' , transform: 'rotate(180deg)'}} />
                    <p style={{width : '100%' , color : '#b2b3b5'}} >Back</p>
                </Stack> 
            </GlobalMenuItem> 
        )
    }

    if (type == 'pinned'){
        return (
            <GlobalMenuItem 
                groupid={groupid} 
                nativeid={getRandomId()} 
                labelBy={"children"} 
                index={index} 
                ref={ref} 
                type={type}
                item={{label : ''}} 
                options={options} 
                onClick={handleOnMoseClick}
                >
                { children }
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
                <div style={{position : 'absolute' , right : '0px', height : '100%'}} >
                    {
                        item.subItems ? <KeyboardArrowRightIcon sx={{height : '100%'}} /> : <></>
                    }
                </div> 
            </Stack> 
        </GlobalMenuItem>
    )

}
