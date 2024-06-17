import { useEffect, useState } from "react"


export const usePageSize = (pageSize,dataset=[]) => {
    const def = [10,50,100,200,500,1000,2000]
    const [ psize , setPsize ] = useState(def)
    useEffect( () => {
        console.log(dataset.length)
        if ( pageSize ){
            if ( ! def.includes(pageSize) ){
                setPsize(prev => ([...prev , pageSize]))
            }
        }
        if ( dataset ){
            if ( ! def.includes(dataset.length) && dataset.length > 2000 ){
                setPsize(prev => ([...prev , dataset.length]))
            }
        }
    } , [pageSize,dataset])
    return [ psize , setPsize ]
}