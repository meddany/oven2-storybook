// @ts-nocheck
import React, { memo, useEffect, useState  } from 'react'
import './styles.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Headline } from '@/components';
export default function ManageColumns(props) {

    const [ rows , setRows ] = useState([])
    const { 
        callback,
        hideFromTable=[]
     } = props
     const hideFromTable2 = ['view' , ...hideFromTable]

    useEffect( () => {
        if ( callback.ready  ){
            const state = callback.gridRef.api.getColumnState();
            if (state){
                setRows( state )
            }
        }
    } , [callback.ready])

    return (
        <div className='list-item max-w-[200px] p-4 min-w-[40vw]'>
            {
                rows.map( (item , index ) => {
                    if ( item.colId == '0' || hideFromTable2.includes(item.colId)){
                        return
                    }
                    return(
                        <FormControlLabel 
                            sx={{width : '100%'}}
                            key={`_${index}_item_manage-cols`} 
                            control={<Checkbox 
                                onChange={(e,c) => {
                                    callback.gridRef.api.setColumnsVisible([item.colId],c);

                                }}
                                defaultChecked={! item.hide } />} label={<Headline>{item.colId}</Headline>} 
                            />
                    )
                })
            }
        </div>
    )
}
