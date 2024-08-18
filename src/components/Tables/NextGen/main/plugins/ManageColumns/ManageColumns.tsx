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

    useEffect( () => {
        if ( callback.ready  ){
            const state = callback.gridRef.columnApi.getColumnState();
            if (state){
                setRows( state )
            }
        }
    } , [callback.ready])

    return (
        <div className='list-item max-w-[200px]'>
                {
                    rows.map( (item , index ) => {
                        if ( item.colId == '0' || hideFromTable.includes(item.colId)){
                            return
                        }

                        return(
                            <FormControlLabel 
                                sx={{width : '100%'}}
                                key={index} 
                                control={<Checkbox 
                                    onChange={(e,c) => {
                                        callback.gridRef.columnApi.setColumnsVisible([item.colId],c);

                                    }}
                                    defaultChecked={! item.hide } />} label={<Headline>{item.colId}</Headline>} 
                                />
                        )
                    })
                }
        </div>
    )
}
