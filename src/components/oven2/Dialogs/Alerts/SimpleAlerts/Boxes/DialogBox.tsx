// @ts-nocheck

import React , { useRef , useState , useEffect , createContext , useContext, forwardRef  } from 'react'
import '../style.css'
import { Stack } from '@mui/material';
import { Headline } from '../../../../Paragraph/Headlines';
import { Button } from '../../../../Buttons';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import '../../../../OvenScrollbar/OvenScrollbar.css'
import CheckPng from '../../src/check2.png'
import AlertPng from '../../src/warning.png'
import ClosePng from '../../src/close.png'
import WarningPng from '../../src/attention.png'
import { DialogsContext } from '../SimpleAlerts';
import { Dialog } from '../../../Model';

export const GeneralDialogBox = forwardRef( (props , _ ) => {
    const { type , footerItem , callback , header , body , accept , decline , onAccept , onCancel , danger ,id } = props;
    const dialogs = useRef({})
    const mcallback= useRef({})
    const ref = useRef()
    const { mapi } = useContext(DialogsContext)
    const defaults = useRef({
        header : header ? header : "Confirmation",
        body : body ? body : "No content passed.",
        accept : accept ? accept : "Accept",
        decline : decline ? decline : "Decline",
        onAccept : onAccept ? onAccept : () => {} ,
        onCancel : onCancel ? onCancel : () => {} ,
        danger : danger ? danger : false ,
        footerItem : footerItem ? footerItem : null ,
        id : id ? id : '___' ,
    })

    const api = {
        updateOption : (key , value )=>{
            defaults.current[key] = value
        }
    }

    function handleOnAccept(){
        defaults.current.onAccept()
    }

    function handleOnCancel(){
        defaults.current.onCancel()
    }

    return (

        <div id={defaults.current.id} ref={ref} className='simple-alerts-body-css9i812' >
            <div className='simple-card-animation-cs38j12'></div>
            <Stack className='s-c-a-css-1232 custom-scroll-bar'>
                {/* header */}
                <Stack className='simple-alerts-header' direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={1} >
                    {
                        type =='confirm' ? <img className='css-i3kj123' src={CheckPng} alt='ck' /> : null
                    }
                    {
                        type =='alert' ? <img className='css-i3kj1232' src={AlertPng} alt='ck' /> : null
                    }
                    {
                        type =='warn' ? <img className='css-i3kj1232' src={WarningPng} alt='ck' /> : null
                    }
                    {
                        type =='error' ? <img className='css-i3kj1232' src={ClosePng} alt='ck' /> : null
                    }
                    <Headline size='mid'>{defaults.current.header}</Headline>
                </Stack>

                {/* body */}
                <Stack className='simple-alerts-content '>
                    <Headline userselect={true} color='#1f222b'>
                        {defaults.current.body}
                    </Headline>
                </Stack>

                {/* footer */}
                <Stack sx={{height : '100%'}} className='simple-alerts-footer' direction={'row'} justifyContent={'end'} alignContent={'end'} spacing={1} >
                    
                    {
                        type == 'confirm' ?  <Button light theme='mui' children={defaults.current.decline} onClick={handleOnCancel} /> : null
                    }
                    <Button danger={defaults.current.danger ? true : false} light theme='mui' children={defaults.current.accept} onClick={handleOnAccept} />
                    
                    <div style={{height : '100%' , top : '-8px' ,left : '0px' , position: 'absolute' , justifyContent :'center' , alignItems : 'center'}} >
                        {footerItem}
                    </div>
                </Stack>
            </Stack>
        </div>

    )
})
