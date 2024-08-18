import React, { createContext, forwardRef , useState , useEffect} from 'react'
import { AlertRouter } from './Store/AlertRouter'
import { useQueue } from './hooks/useQueueHook';
import Draggable from 'react-draggable';

export const AlertsContext = createContext({})

export interface AlertProps {
    dialog : {
        header : string , 
        body : string , 
        onAccept : void , 
        onDecline : void,
        autoAccept : boolean,
        autoDecline : boolean,
        variant : string ,
        extraButtons : [] ,
        acceptButtonParams: object ,
        declineButtonParams : object
    }
}

export const Alert = forwardRef<HTMLDivElement , AlertProps>( (props,ref) => {

    const { 
        dialog={} 
    } = props;

    // const queue = useRef([])
    const [ queue ] = useQueue(dialog)

    return(
        <AlertsContext.Provider value={{ queue : queue }}>
            <div ref={ref}>
                <Draggable positionOffset={{ x: '-50%', y: '-50%' }} handle='.drag-handler-box'>
                    <div className='absolute top-[50%] left-[50%] z-[999]' >
                        <AlertRouter />
                    </div>
                </Draggable>
            </div>
        </AlertsContext.Provider>
    )
})