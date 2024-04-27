// @ts-nocheck

import React , {useContext, useEffect , useRef, useState } from 'react'
import DialogPaper from './DialogPaper/DialogPaper';
import './style.css'
import { useOvenify } from '../OvenGlobalState';

export default function DialogModal(props) {

    const ref = useRef(null)

    const ovenify = useOvenify()

    const [ options , setOptions ] = useState({
        open : false , 
        content : <></> ,
    })

    useEffect( () => {
        if ( props.dialog ){
            setOptions( prev => ( {...prev , ...props.dialog } ))
        }
    } , [ props.dialog ])


    const handleClose = () => {
        ovenify.dialog.markAsDiscarded(props.dialog.id)
    }


    useEffect( () => {
    
        if ( ref.current ){
            ovenify.dialog.appendDialogs( { ...props.dialog , ref: ref } )

        }

    } , [ref.current])

    return (
        <div className='o-od-h31' ref={ref}  >
            <DialogPaper header={options.header}  onClose={handleClose} >
                
                {
                    options.content
                }

            </DialogPaper>
        </div>

    )
}
