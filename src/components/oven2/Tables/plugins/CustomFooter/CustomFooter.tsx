// @ts-nocheck
import { useCallback, useEffect, useMemo, useRef , useState, useContent, useContext, memo } from 'react';
import TableGlobalContext from '../context/TableGlobalContext';
import './styles.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function CustomFooter(props) {

    const { ref , table } = useContext(TableGlobalContext)
    const [ innerTxt , setInnerTxt ] = useState(<>No Data</>)

    const register = useCallback( () => {
        if ( ! table.ovenApi  ){ return }

        table.ovenApi.registerEvent('onCellClicked' , () => {
            const cell =  table.ovenApi.getSelectedCell()
            var cellText = cell.value
            
            if( cellText == null ||  cellText == undefined ){
                cellText = ''
            }

            setInnerTxt( prev => {

                if ( cellText.toString().includes('[') && cellText.toString().includes(']') ){

                    const _cellArray = JSON.parse(cellText)
                    return(
                    <Stack direction={'row'} spacing={1} alignItems={'center'} >
                        <InfoIcon sx={{color : '#124191'}} />

                        <Select
                            value={_cellArray[0]}
                            size='small'
                        >
                        {_cellArray.map( (c,index) => {
                            return (
                                <MenuItem key={index} value={c}>{c}</MenuItem>
                            )
                        } )}

                        </Select>     

                      </Stack>

                                     
                      )
                }

                else {
                    return(
                        <Stack direction={'row'} spacing={1} >
                            <InfoIcon sx={{color : '#124191'}} />
                            <label className='oven-status-bar-txt' >{cellText}</label>
                        </Stack>
                    )
                }

                
            } )
        })



    } , [table.ovenApi])


    useEffect( () => {

        register()
        
        // return () => {
        //     table.ovenApi.clearCustomEventRegisters()
        // }

    } , [table.ovenApi])


    return (
        <div className='oven-c-footer'>

            { innerTxt }


        </div>
    )
}

export default memo(CustomFooter)