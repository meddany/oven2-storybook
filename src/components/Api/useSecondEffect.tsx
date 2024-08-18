
// @ts-nocheck
import { useState , useEffect  } from "react"

export default function useSecondEffect (callback ,  deps = [] ){
    const [ render , setRender ] = useState(false)
    useEffect( () => {
        if ( render ){
            callback()
        }
        else if ( !render ){
            setRender(true)
        }
        
    } , [...deps])
}