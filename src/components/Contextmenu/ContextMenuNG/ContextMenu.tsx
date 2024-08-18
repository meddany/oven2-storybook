// @ts-nocheck
import React, { forwardRef, useEffect, useRef , useState } from 'react'
import { Model } from '../../Containers/Model'
import useMouseLocation from './hooks/useMouseLocation'
import { MenuBox } from './Components/MenuBox'
import { useRandomId } from '@/components/utils/utils'
import $ from 'jquery'
import { cn } from '@/lib/utils'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

export const ContextMenu = forwardRef( (props, ref ) => {
    const rref= useRef({})
    const mainMenuRef = useRef()
    const id = useRandomId()
    const [ documentEvent , setDocumentEvent ] = useState(null)
    const [ location ] = useMouseLocation(documentEvent,mainMenuRef)
    const { items, event , fixedLocation } = props

    function handleMouseLocation(event){
        if (rref.current.close){
            event.preventDefault()
            rref.close()
            rref.open()
            setTimeout(()=>{
                setDocumentEvent(event)
            } , 40)
        }

    }

    useEffect( () => {
        if ( event ){
            handleMouseLocation(event)
        }
    } , [event])

    useEffect( () => {
        if( location.x != 0 ){
            $(mainMenuRef.current).css('opacity' , 1 )
        }
    } , [location])

    const handleAwayClick = (event) => {
       setDocumentEvent(null)
       rref.close()
    }


    return(
        <Model hideOnContextMenu={true} bodyClick={true} ref={ rref } variant='transparent' >
            <ClickAwayListener onClickAway={handleAwayClick}>
                <MenuBox 
                    ref={mainMenuRef} 
                    id={id} 
                    modelRef={rref} 
                    role='main' 
                    location={location} 
                    items={items} 
                    {...props} 
                    event={documentEvent} 
                    fixedLocation={fixedLocation}
                />
                </ClickAwayListener>
        </Model>

    )
})