// @ts-nocheck

import { useMemo } from "react"
import axios from 'axios'
import io from 'socket.io-client';


export const useApi = (props) => {

    const {
        baseUrl='/' ,
        token,
        pushToast=false,
        spinner=false,
        alert=false,
        debug=false,
        config={},
        socketioParams={}
    } = props;

    const socketioInstance = useMemo( () => {return io(baseUrl || 'http://localhost:5173' , {...socketioParams} ) } , [baseUrl])

    const instance = useMemo( 
        () => { 
            const instance =  axios.create({
                ...config ,
                baseURL: baseUrl  ,
                onRequest : undefined ,
                onResponse : undefined ,
                model : false, 
                spinner : false,
                toast : false,
                alert : false,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: token,
                }
            }) 
            
            // before the request sent.
            instance.interceptors.request.use((request) => {
                if ( request.onRequest ) {
                    if (debug){
                        console.log('useApi : before request ' , request )
                    }
                    if ( pushToast ){
                        pushToast({
                            header : 'Request submitted...',
                            duration: 2000 ,
                            type : 'progress' ,
                            mode : 'light' ,
                            body : 'Your request submitted ...'
                        })
                    }
                    if ( spinner ) {
                        spinner.open()
                    }
                    request.onRequest(request)
                }
                return request
            });
            // after the request sent.
            instance.interceptors.response.use(
                (response) => {
                    if (debug){
                        console.log('useApi : after request, response => ' , response )
                    }

                    if ( response.config.onResponse ) {
                        response.config.onResponse(response)
                    }
                    if ( spinner ) {
                        spinner.close()
                    }
                    if ( response.data.status == 400 ){
                        if ( alert ){
                            alert({
                                header : `Error - ${response.data.status}`,
                                error : true,
                                body : response.data.message  ,
                            })
                        }
                    }
                return response
                } , 
            (error) => {
                if (debug){
                    console.error('useApi : after request, error => ' , error )
                }
                if ( alert ){
                    alert({
                        header : `Error - ${error.response.status}`,
                        error : true,
                        body : error.message  ,
                    })
                }
                if ( spinner ) {
                    spinner.close()
                }
                return error
            }
        );
            instance.socketio=socketioInstance
            return instance
        }
    , [baseUrl,token,pushToast,spinner,alert,debug])

        
    return instance
}