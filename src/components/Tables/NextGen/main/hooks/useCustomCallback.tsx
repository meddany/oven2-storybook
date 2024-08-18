// @ts-nocheck
import { useCallback, useEffect, useState } from "react";

export const useTableCallback=  (gridRef , ref , props ,tref ,dataset  ) => {
    const [ callback , setCallback ] = useState({ready : false , fullscreen : false , dataset , props, lastRowNode : null   })


    useEffect( () => {
        if (! gridRef ){ return }
        if ( gridRef.current ){
            setCallback( prev => ({...prev , gridRef : gridRef.current , props, tableRef : tref, update : setCallback , updateSingleCallbackKey }))
        }
    } , [gridRef ,props , tref ])

    useEffect( () => {
        if ( callback ){
            ref.current = callback
        }
    } , [callback.ready,ref])

    const updateSingleCallbackKey = useCallback( (key , value ) => {
        setCallback( prev => ({...prev , [key] : value}))
    } , [callback.ready, callback.cell?.value]) 

    return  [callback , setCallback ]
}