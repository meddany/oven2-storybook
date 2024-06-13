// @ts-nocheck
import React , { useContext , forwardRef  } from "react";
import TableGlobalContext from '../context/TableGlobalContext'
import { Headline } from "@/components";

export const TopBarTitle = forwardRef(( props, ref ) =>{
    const { tablename } = props;
    const { options } = useContext(TableGlobalContext);
    return (
        <>
            { 
            options.enableTitle 
                ? 
                <div className="text-nowrap" >
                    <Headline>{tablename}</Headline> 
                </div>
                : 
                null
            }
        </>
        )
    })