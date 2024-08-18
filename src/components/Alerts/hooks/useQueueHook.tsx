import { useEffect, useState } from 'react'
import { useCallback } from 'react';
import { useRandomId } from '@/components/utils/utils';



function createDefaultHeader(params){
    const variable = params.alert ? 'Alert' : params.success ? "Success" : params.confirm ? "Confirm" : params.error ? 'Error' : "Null"
    return variable
}

export const useQueue = (items) => {
    const [ queue , setQueue ] = useState([])

    const convert2Default = useCallback( (params,index) => {
        if ( !params.body ){ return null }
        return {
            ...params ,
            header: params.header || createDefaultHeader(params) ,
            body: params.body || 'No Content'  ,
            onAccept: params.onAccept || (() => {}) ,
            onDecline: params.onDecline || (() => {}) ,
            autoAccept: params.autoAccept || false ,
            autoDecline: params.autoDecline || false ,
            variant: params.variant || 'primary',
            type: params.type || 'confirm',
            acceptButtonParams : params.acceptButtonParams || { variant : 'primary'} ,
            declineButtonParams : params.declineButtonParams || { variant : 'primary'} ,
            warning : params.warning || false  ,
            id : params.id || useRandomId() ,
            index : index ,
            acceptLabel : params.acceptLabel ||  'OK' ,
            declineLabel : params.declineLabel || "Cancel" ,
            success: params.success || false , 
            alert: params.alert || false , 
            error: params.error || false , 
            extraButtons : params.extraButtons || [] ,
            // queueLength : queue.length, 
            removeFromQueue : updateQueue,
        };
    } , [queue,items])

    const updateQueue = useCallback( (skip) => {
        console.log('skip' , skip )
        setQueue(prevQueue => {
            if ( skip ) { return [] }
            const newQueue = [...prevQueue];
            newQueue.shift();
            return newQueue;
        });
    } , [queue])

    useEffect( () => {
        if ( items ){
            const d = convert2Default(items,queue.length)
            if ( d ){
                setQueue( prev => ([ ...prev ,  d ]) )
            }
        }
    } , [items])
    

    return [ queue , setQueue]

}

