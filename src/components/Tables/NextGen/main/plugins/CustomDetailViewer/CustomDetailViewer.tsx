// @ts-nocheck

import React from 'react'
import { useContext } from 'react'
import { TableContext } from '../../main'

const CustomDetailViewer = (props) => {

    const { callback }  = useContext(TableContext)
    console.log(props , callback )


    return (
        <div className='border p-2'>
            {callback?.expandedDetailsContent?.content}
        </div>
    )
}

export default CustomDetailViewer
