// @ts-nocheck
import React, { memo, useEffect, useState  } from 'react'
import './styles.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Headline } from '@/components';
function ManageColumns(props) {

    const [ rows , setRows ] = useState([])

    console.log('rendering ...')

    useEffect( () => {
        if ( props.table ){
            const state = props.table.gridRef.api.getColumnState();
            if (state){
                setRows( state )
            }
        }
    } , [ props.table ])

    return (
        <div className='list-item max-w-[200px]'>
                {
                    rows.map( (item , index ) => {
                        
                        if ( item.colId == '0'){
                            return
                        }

                        return(
                            <FormControlLabel 
                            sx={{width : '100%'}}
                            key={index} 
                            control={<Checkbox 
                                onChange={(e,c) => {
                                    props.table.gridRef.columnApi.setColumnVisible(item.colId, c);

                                }}
                                defaultChecked={! item.hide } />} label={<Headline>{item.colId}</Headline>} 
                            />
                        )
                    })
                }
        </div>
    )
}

export default memo(ManageColumns)