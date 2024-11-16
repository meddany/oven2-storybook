/* eslint-disable */
// @ts-nocheck
import { forwardRef, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Mainframe } from "./Mainframe";

export interface MainframeProps {
    item : {
        id : string ,
        header : string,
        body : string,
        type : string | null,
        duration? : number ,
        buttons : [] ,
    }
}

export const Toast = forwardRef((props,ref) => {

    const { 
        item ,
        duration=5000
    } = props;

    useEffect( () => {
        if ( item.type ){
            if ( !item.header ){
                if ( item.type == 'alert'){ item.header = 'Alert'}
                else if ( item.type == 'error'){ item.header = 'Error'}
                else if ( item.type == 'warning'){ item.header = 'Warning'}
                else if ( item.type == 'info'){ item.header = 'Information'}
                else if ( item.type == 'progress'){ item.header = 'In-Progress'}
                else if ( item.type == 'success'){ item.header = 'Success'}
            }
            toast.custom(
                (t) => ( <Mainframe key={t.id} params={t} {...item} item={item} /> ) ,
                {
                    position: "bottom-right",
                    duration : duration ,
                }
            )
        }
    } , [item])


    return(
        <Toaster />
    )
})