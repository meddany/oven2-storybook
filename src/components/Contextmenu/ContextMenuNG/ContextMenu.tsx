// @ts-nocheck
import React, { forwardRef, useEffect, useRef , useState } from 'react'
import { Model } from '../../Containers/Model'
import useMouseLocation from './hooks/useMouseLocation'
import { MenuBox } from './Components/MenuBox'
import { useRandomId } from '@/components/utils/utils'
import $ from 'jquery'

export const ContextMenu = forwardRef( (props, ref ) => {
    const rref= useRef({})
    const mainMenuRef = useRef()
    const id = useRandomId()
    const [ ev , setEv ] = useState()
    const [ documentEvent , setDocumentEvent ] = useState(null)
    const [ location ] = useMouseLocation(documentEvent,mainMenuRef)
    const { items, event } = props

    function handleMouseLocation(event){
        event.preventDefault()
        rref.close()
        rref.open()
        setTimeout(()=>{
            setDocumentEvent(event)
        } , 40)
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


    return(
        <Model hideOnContextMenu={true} bodyClick={true} ref={ref || rref } variant='transparent' >
            <MenuBox ref={mainMenuRef} id={id} modelRef={rref} role='main' location={location} items={items} {...props} />
        </Model>
    )
})