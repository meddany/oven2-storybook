// @ts-nocheck
import React , {useRef,useState } from 'react';
import { Button , Frame,Body , useApi, useRandomId, Alert , Toast , SpinnerDialog  } from '@/components';

const token = useRandomId() + useRandomId() + useRandomId()

export default {
  title: 'Components/useApi',
  component: useApi,
} 

const Template = (args) => {
    const [ url , setUrl ] = useState()
    const spinnerRef = useRef({})
    const [ dialog , pushAlert ] = useState({})
    const alertRef = useRef({})
    const [ item , pushToast ] = useState({})
    const api = useApi({
        baseUrl : url,
        token : token,
        pushToast,
        alert : pushAlert,
        spinner : spinnerRef
    })

    const handle = () => {
        setUrl( 'https://elmeddany.free.beeceptor.com' )
    }

    const request = async () => {
        const response = await api.get('/items' , { 
            onRequest : (params) => {
                console.log('request started with params' , params)
            } ,
            onResponse : (response) => {
                console.log('response received with response' , response)
            } ,
        })
        console.log(response)
    }

    return (
        <Frame>
            <Body padding>

                <Toast item={item} />

                <Alert dialog={dialog} />
        
                <SpinnerDialog  variant='white' ref={spinnerRef} />

                <div className='flex space-x-1 flex-wrap'>
                    <Button onClick={handle}>GENERATE URL</Button>
                    <Button onClick={request}>REQUEST ITEMS</Button>
                </div> 
            </Body>
        </Frame>
    ) 
}

export const Primary = Template.bind({});