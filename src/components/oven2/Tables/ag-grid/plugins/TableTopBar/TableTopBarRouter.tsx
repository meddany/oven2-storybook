// @ts-nocheck
import React , { useState, useEffect , useRef , useMemo , useContext, forwardRef   } from "react";
import { TableTopBar } from "./TableTopbar";
import TableGlobalContext from '../context/TableGlobalContext'

export const TableTopBarRouter = forwardRef(( props, ref ) =>{
    const { options , table } = useContext(TableGlobalContext);
    const { tablename , progressTableDiv } = props;
    return (
        <>
            { options.enableTopbar && options.api ? <TableTopBar tablename={tablename} progressTableDiv={progressTableDiv} /> : null  }
        </>
    )
})