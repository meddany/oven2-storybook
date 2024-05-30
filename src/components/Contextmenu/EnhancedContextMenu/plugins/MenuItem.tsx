// @ts-nocheck
import React , {useContext, useEffect, useRef} from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {Stack} from '@mui/material';
import EnhancedMenuContext from './Context';
// import {createTheme} from '@mui/material';
import { useRandomId as getRandomId } from '../../../utils/utils';

// import '../../../colors/palette.css'
import { GlobalMenuItem } from './GlobalMenuItem';


function SingleMenuItem({ totalLength , type , item , options , index , nativeid , groupid , children  }) {
    
    const ref = useRef()
    const { clearPinnedItems , updatePinnedItems , updateAndGetBoxLocation , tmps , updateMenuBoxItems , updateOnScreenBackButton , updatesequenceArray , clearEvent  } = useContext(EnhancedMenuContext)

    useEffect( () => {
        if ( ! item ){ return }
        if ( totalLength == index + 1){
            setTimeout(() => {
                updateAndGetBoxLocation()
            } , 50)
        }
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
        clearPinnedItems()
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

export default SingleMenuItem