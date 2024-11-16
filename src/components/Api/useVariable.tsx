// @ts-nocheck
import React, { useEffect, useState } from 'react'

export const useVariable = (props={}) => {
    const [ data , setVariable ] = useState(props)

    function update( key , value ) {
        setVariable( prev => ({...prev , [key] : value }))
    }
    function get(key){
        return data[key]
    }
    
    return [data , update , get,setVariable]
}
