// @ts-nocheck
import React , {useContext, useEffect, useRef} from 'react'
import { Toast  } from 'primereact/toast';
import { useOvenify } from '../../OvenGlobalState';

export default function OvenPrimeNotify(props) {

    const toast = useRef(null);
    const ovenify = useOvenify()

    useEffect(() => {
        if (ovenify.ready){

            ovenify.notify.prime = {
                ref: toast , 
                sucess : showSuccess , 
                info : showInfo , 
                warn : showWarn , 
                error : showError
            }
        }

        
    } , [ ovenify.ready ])


    const showSuccess = ({ body , params }) => {
        toast.current.show({...params , severity:'success', summary: 'Success', detail:body, life: 3000});
    }

    const showInfo = ({ body , params }) => {
        toast.current.show({...params , severity:'info', summary: 'Info', detail:body, life: 3000});
    }

    const showWarn = ({ body, params }) => {
        toast.current.show({ ...params , severity:'warn', summary: 'Warning', detail:body, life: 3000});
    }

    const showError = ({ body , params }) => {
        toast.current.show({...params ,severity:'error', summary: 'Error', detail:body, life: 3000});
    }


    return (
        <Toast baseZIndex={6000} ref={toast} />
    )
}
