// @ts-nocheck

import React , { useRef , useState , useEffect , createContext, useCallback } from 'react'
import { Dialog } from '../../Model';
import './style.css'
import { Stack } from '@mui/material';
import { Headline } from '../../../Paragraph/Headlines';
import { Button } from '../../../Buttons';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import '../../../OvenScrollbar/OvenScrollbar.css'
import CheckPng from '../src/check2.png'
import { ConfirmBox } from './Boxes/Confirm';
import { getRandomId } from '../../../utils/common';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import { AlertBox } from './Boxes/alerts';

export const DialogsContext = createContext({})

export const SimpleAlerts = (props) => {
    const { callback } = props;
    const mcallback= useRef({})
    const live = useRef({'dialogs' : []})
    const [ inView , setInview ] = useState(null)
    const [ defaults , setDefaults ] = useState({
        dialogs : [] ,
    })

    function handleOnAccept(item){
        if ( item.onAccept){
            item.onAccept()
        }
        if ( live.current.ignore ){
            live.current.dialogs = []
            setInview( prev => null)
            live.current.ignore=false
            return
        }
        live.current.dialogs.shift()
        setInview( prev => null)
        setTimeout( () => {
            setInview( live.current.dialogs[0] )
        }, 50 )
    }

    function handleOnDecline(item){
        if ( item.onCancel){
            item.onCancel()
        }
        if ( live.current.ignore ){
            live.current.dialogs = []
            setInview( prev => null)
            live.current.ignore=false
            return
        }
        live.current.dialogs.shift()
        setInview( prev => null)
        setTimeout( () => {
            setInview( live.current.dialogs[0] )
        }, 50 )
    }

    function handleIgnore(e,v){
        live.current.ignore = v
    }


    const api = {
        confirm : (options) => {
            const { preventSpamming, header , body , danger , onAccept , onCancel , accept , decline } = options;
            const element = 
                <ConfirmBox 
                    header={header}
                    body={body}
                    danger={danger}
                    onAccept={() => {handleOnAccept({ header , body , danger , onAccept , onCancel , accept , decline })}}
                    onCancel={() => {handleOnDecline({ header , body , danger , onAccept , onCancel , accept , decline })}}
                    accept={accept}
                    decline={decline}
                    callback={mcallback}
                    footerItem={live.current.dialogs.length >= 10 ? <FormControlLabel control={<Checkbox onChange={handleIgnore} />} label="Ignore next alerts" /> : null}
                />
            if ( defaults.dialogs.length == 0 ) {
                    setInview( prev => element )
                }
            live.current.dialogs = [...live.current.dialogs , element ]
        } ,
        alert : (options) => {
            const { preventSpamming, header , body , danger , onAccept , onCancel , accept , decline } = options;
            const customHeader = header ? header : 'Alert'
            const customBtn = accept ? accept : 'Ok'
            const element = 
                <AlertBox 
                    header={customHeader}
                    body={body}
                    type='alert'
                    danger={danger}
                    onAccept={() => {handleOnAccept({ customHeader , body , danger , onAccept , onCancel , customBtn , decline })}}
                    onCancel={() => {handleOnDecline({ customHeader , body , danger , onAccept , onCancel , accept , decline })}}
                    accept={customBtn}
                    decline={decline}
                    callback={mcallback}
                    footerItem={live.current.dialogs.length >= 10 ? <FormControlLabel control={<Checkbox onChange={handleIgnore} />} label="Ignore next alerts" /> : null}
                />
            if ( defaults.dialogs.length == 0 ) {
                    setInview( prev => element )
                }
            live.current.dialogs = [...live.current.dialogs , element ]
        } ,
        warning : (options) => {
            const { preventSpamming, header , body , danger , onAccept , onCancel , accept , decline } = options;
            const customHeader = header ? header : 'Warning'
            const customBtn = accept ? accept : 'Ok'
            const element = 
                <AlertBox 
                    header={customHeader}
                    body={body}
                    type='warn'
                    danger={danger}
                    onAccept={() => {handleOnAccept({ customHeader , body , danger , onAccept , onCancel , customBtn , decline })}}
                    onCancel={() => {handleOnDecline({ customHeader , body , danger , onAccept , onCancel , accept , decline })}}
                    accept={customBtn}
                    decline={decline}
                    callback={mcallback}
                    footerItem={live.current.dialogs.length >= 10 ? <FormControlLabel control={<Checkbox onChange={handleIgnore} />} label="Ignore next alerts" /> : null}
                />
            if ( defaults.dialogs.length == 0 ) {
                    setInview( prev => element )
                }
            live.current.dialogs = [...live.current.dialogs , element ]
        } ,
        error : (options) => {
            const { preventSpamming, header , body , danger , onAccept , onCancel , accept , decline } = options;
            const customHeader = header ? header : 'Error'
            const customBtn = accept ? accept : 'Ok'
            const element = 
                <AlertBox 
                    header={customHeader}
                    body={body}
                    type='error'
                    danger={danger}
                    onAccept={() => {handleOnAccept({ customHeader , body , danger , onAccept , onCancel , customBtn , decline })}}
                    onCancel={() => {handleOnDecline({ customHeader , body , danger , onAccept , onCancel , accept , decline })}}
                    accept={customBtn}
                    decline={decline}
                    callback={mcallback}
                    footerItem={live.current.dialogs.length >= 10 ? <FormControlLabel control={<Checkbox onChange={handleIgnore} />} label="Ignore next alerts" /> : null}
                />
            if ( defaults.dialogs.length == 0 ) {
                    setInview( prev => element )
                }
            live.current.dialogs = [...live.current.dialogs , element ]
        } 


    }


    useEffect( () => {
        if ( inView){
            mcallback.current.api.open()
        }
        else {
            mcallback.current.api.close()
            live.current.dialogs = []
        }
    } , [inView])

    useEffect( () => {
        if ( callback ){
            callback.current.api = api
        }
    } , [callback])

    return (
        <FluentProvider theme={webLightTheme}>
            <DialogsContext.Provider value={{
                dialogs : defaults.dialogs ,
                mapi : api ,
            }}>
                <Dialog callback={mcallback}>
                    { inView ? inView : <></> }
                </Dialog>
            </DialogsContext.Provider>
        </FluentProvider>
    )
}
