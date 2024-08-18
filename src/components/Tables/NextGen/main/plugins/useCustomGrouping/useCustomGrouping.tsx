// @ts-nocheck
import React, { useEffect, useMemo } from 'react'
import { Tabs } from '@/components'

const CustomGrouping = (props) => {
    const { dataset , setData , groupBy  }  = props;

    const tabs = useMemo( () => {
        const fn = [...new Set(dataset.map( row => row[groupBy]))]
        const fn2 = fn.map( row =>  {return {
            label : row , 
            value : row ,
            data : dataset,
            updateTableRows: setData ,
            onSelected: (params) => {
                const value = params.value
                const filtered = dataset.filter(item => item[groupBy] == value)
                params.updateTableRows(filtered)
            }
        } })
        return fn2
    } , [dataset])

    return (
        <div className=''>
            {
                groupBy ?
                    <Tabs 
                    tabs={tabs}
                    body={false}
                    setData={setData}
                    />
                :
                    null
            }

        </div>
    )
}

export default CustomGrouping
