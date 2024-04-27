// @ts-nocheck

import React, { useEffect , useContext, useState,useRef } from 'react'
import './style.css'
import DragBox from '../../DraggableBox/DragBox'
import Anyflex from './Anyflex/AnyflexVersion2';
import { getRandomId } from '@/oven/utils/common';
import { useOvenify } from '../OvenGlobalState';

export default function MainAlertsAndConfirmsDialog(props) {

    const ovenify = useOvenify()
    const ref = useRef()
    const _alerts = useRef([])
    const [ alerts , setAlerts ] = useState([])
    const options = {
        header : 'Notification' ,
        body : 'Thanks for you acceptance ... ',
        mode : 'alert' ,
        onAccept : undefined ,
        onDecline : undefined ,
        onAcceptButton: 'Accept' ,
        onDeclineButton : 'Cancel'
    }

    function configAlert(_options , mode ){
        const s = { ...options, header:mode ,..._options , mode : mode ,id : getRandomId() }
        setAlerts( prev => ([...prev , s ]))
    }


    useEffect( () => {

        if ( ovenify.ready != true ){ return }

        ovenify.alerts.ref = ref
        ovenify.alerts.alertsRemove = alertsRemove
        ovenify.alerts.alerts = alerts
        
        ovenify.alerts.anyflex = {
            alert : (values) => { configAlert(  values  , 'Notification') } ,
            success : (values) => { configAlert(  values  , 'Success') } ,
            warn : (values) => { configAlert(  values  , 'Warning') } ,
            error : (values) => { configAlert(  values  , 'Error') } ,
        }


    } , [ ovenify.ready ])

    useEffect( () => {
        _alerts.current = alerts
    } ,  [alerts])


    function alertsRemove(id){
        var _f = _alerts.current.filter( item => item.id != id )
        setAlerts(_f)
    }


    return (
        <>
            {
                    alerts.length == 0 ? null :
                
                    <div ref={ref}  className='oven-m-dialog-alerts-wrapper'>
                        {
                            alerts.map( (item,index) => {

                                return(
                                    <DragBox key={'oven-drag-i-'+index} >

                                        <Anyflex data={item} />

                                    </DragBox>
                                )
                            })
                        }
                    </div> 
            }

        </>
    )
}
