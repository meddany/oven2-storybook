// @ts-nocheck
import React, { useEffect , useContext, useState,useRef } from 'react'
import './style.css'
import '../../../fonts/openSans/stylesheet.css'
import OvenButton from '../../../Buttons/OvenButton/OvenButton';
import { getRandomId } from '@/commons/common';
import { Stack } from '@mui/material';
import { useOvenify } from '../../OvenGlobalState';

export default function Anyflex(props) {

    const ovenify = useOvenify()
    const id = getRandomId()
    const ref = useRef()
    const [options , setOptions ] = useState({
        header : 'Notification' ,
        body : 'Thanks for you acceptance ... ',
        mode : 'alert' ,
        onAccept : undefined ,
        onDecline : undefined ,
    })

    useEffect( () => {
        if ( props.data){
            setOptions( prev => ({...prev , ...props.data }))

        }
        

    } , [ props.data  ])


    return (
        <Stack id={'#'+id} ref={ref} className='oven-af-m-wrapper'>
            <Stack className='oven-af-header-box' > 
                {options.header} 
            </Stack>


            <Stack className='oven-af-body-box' >
                <label>{options.body}</label>
            </Stack>

            <Stack direction={'row'} justifyContent={'flex-end'} className='oven-af-footer-box' >

                <OvenButton light onClick={()=>{
                    ovenify.alerts.alertsRemove(options.id)

                    if ( options.onDecline ){
                        options.onDecline()
                    }

                }}>{options.onDeclineButton}</OvenButton>


                {
                    options.onAccept == undefined ? null :
                
                    <OvenButton  light bordered onClick={()=>{
                        ovenify.alerts.alertsRemove(options.id)

                        options.onAccept()

                    }}>{options.onAcceptButton}</OvenButton>

                }

            </Stack>
        </Stack>
    )
}
