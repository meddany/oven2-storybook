// @ts-nocheck

import React, { useEffect , useContext, useState ,useRef } from 'react'
import DialogModal from './modal';
import { getRandomId } from '@/oven/utils/common';
import { useOvenify } from '../OvenGlobalState';

const defaultInView = {
    content : null , 
    discarded : false 
}

export default function ModalOven(props) {
    const dialogs = useRef([])
    const [ inViewDialog , setInViewDialog ] = useState(defaultInView)
    const ovenify = useOvenify()

    const appendDialogs = ( _dialog ) => {
        dialogs.current = [...dialogs.current , _dialog ]
    }

    useEffect( () => {

        if ( ovenify.ready != true ){ return }

        ovenify.dialog.createDialog = createDialog
        ovenify.dialog.ovenDialogs = dialogs.current
        ovenify.dialog.inViewDialog = inViewDialog
        ovenify.dialog.markAsDiscarded = markAsDiscarded
        ovenify.dialog.appendDialogs = appendDialogs



    } , [ inViewDialog , ovenify.ready  ])

    const createDialog = (_dict) => {

        if ( inViewDialog.content  != null && inViewDialog.discarded == false  ){
            dialogs.current = [...dialogs.current , inViewDialog ]
        }

        setInViewDialog( prev => ({...prev , 
            ..._dict , 
            id : getRandomId() ,
            indexInArray : dialogs.length - 1
        }))
        
    }

    const markAsDiscarded = (id) => {
        var reversedDialogs = dialogs.current.reverse()
        reversedDialogs.map( (d,i) => {
            if (d.id == id ){
                reversedDialogs.pop(i)
                dialogs.current = reversedDialogs.reverse()
            }
        })


        reversedDialogs.map( (_d,i) => {
            if (_d.discarded == false ){
                setInViewDialog( prev => _d )
                reversedDialogs.pop(i)
                dialogs.current = reversedDialogs.reverse()
                return
            }
        })

        if ( dialogs.current.length == 0  ){
            setInViewDialog( prev => defaultInView )
        }

    }


    return (
        <>

            {
                inViewDialog.content != null ? <DialogModal dialog={inViewDialog} /> : null
            }

        </>
    )
}
