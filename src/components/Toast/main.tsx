// @ts-nocheck
import { forwardRef, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Mainframe } from "./Mainframe";
import { useRandomId } from "../utils/utils";

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
            const s = toast.custom(
            <Mainframe {...item} item={item} />,
                {
                    position: "bottom-right",
                    duration : duration ,
                }
            )
            item.taosterId = s
            item.toast = toast
            item.duration=duration
            item.dismiss = () => {
                console.log('item dismiss' , item )
                toast.dismiss(item.taosterId)
            }
        }
    } , [item])


    return(
        <Toaster />
    )
})