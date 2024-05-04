// @ts-nocheck
import React , { useState, useEffect , useRef , useMemo , useContext , forwardRef  } from "react";
import TableGlobalContext from '../context/TableGlobalContext'
import { Stack } from "@mui/material";
import { Headline } from "../../../../Paragraph/Headlines";
export const TopBarTitle = forwardRef(( props, ref ) =>{
    const { tablename } = props;
    const { options } = useContext(TableGlobalContext);
    return (
        <>
            { 
            options.enableTitle 
                ? 
                <Stack direction={'row'} >
                    <Headline>{tablename}</Headline> 
                </Stack>
                : 
                null
            }
        </>
        )
    })