// @ts-nocheck
import { useEffect , useState } from "react"

export const useAutofit = (callback={}) => {
    const [ applied  , setApplied ] = useState(null)
    useEffect( () => {
        if ( callback.ready ){
            if ( callback.props.autoFit ){
                callback.autoFit(false)
                setApplied(true)
            }
            else {
                setApplied(false)
            }
        }
        else {
            setApplied(false)
        }

    } , [callback])

    useEffect( () => {
        callback.autofitApplied = applied
    } , [applied])

    return [ applied , setApplied ]
}