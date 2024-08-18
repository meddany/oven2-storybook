// @ts-nocheck
import React, { useEffect, useState } from 'react'

export const useStore = (props={}) => {
    const [ data , setVariable ] = useState(props)

    function update( key , value ) {
        setVariable( prev => ({...prev , [key] : value }))
    }
    function get(key){
        return data[key]
    }

    return {update,get,data,setVariable}
}
