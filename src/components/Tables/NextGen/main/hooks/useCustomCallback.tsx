// @ts-nocheck
import { useCallback, useEffect, useState } from "react";

export const useTableCallback=  (gridRef , ref , props ,tref ) => {
    const [ callback , setCallback ] = useState({ready : false , fullscreen : false })
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
    } , [callback,ref])

    const updateSingleCallbackKey = useCallback( (key , value ) => {
        setCallback( prev => ({...prev , [key] : value}))
    } , [callback]) 

    return  [callback , setCallback ]
}