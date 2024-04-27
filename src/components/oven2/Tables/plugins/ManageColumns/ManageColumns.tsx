// @ts-nocheck
import React, { useEffect, useState  } from 'react'
import './styles.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Stack } from '@mui/material';
import Headline from '@/oven/Headlines/Headline';


export default function ManageColumns(props) {

    const [ rows , setRows ] = useState([])

    useEffect( () => {
        if ( props.table ){
            var state = props.table.gridRef.columnApi.getColumnState();
            if (state){
                setRows( state )
            }
        }
    } , [ props.table ])

    return (
        <div>
            <Stack className='_jsansns'>
                {
                    rows.map( (item , index ) => {
                        
                        if ( item.colId == '0'){
                            return
                        }

                        return(
                            <FormControlLabel key={index} control={<Checkbox 
                                onChange={(e,c) => {
                                    props.table.gridRef.columnApi.setColumnVisible(item.colId, c);

                                }}
                                defaultChecked={! item.hide } />} label={<Headline>{item.colId}</Headline>} />
                        )
                    })
                }
            </Stack>
        
        </div>
    )
}
