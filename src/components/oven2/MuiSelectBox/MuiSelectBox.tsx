// @ts-nocheck
import { useState , useRef , useEffect, useMemo , memo } from "react";
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getRandomId } from '../utils/common';

function getClasses(){

}
export default function MuiSelectBox(props) {
    const [value, setValue] = useState();
    const id = useMemo( () => {return getRandomId() })
    const [ options , setOptions ] = useState({
        size : 'small' ,
        label : '' ,
        options : [] ,
        multiple : true ,
        customSize : false,
    })
    const handleChange = (event) => {
        setValue(event.target.value);
        if ( props.onChange ){
            props.onChange(event , event.target.value )
        }
        if ( props.callback ){
            props.callback(value)
        }
    };

    useEffect( () => {
        if ( props.multiple ){
            setValue( prev => [])
        }
        else {
            setValue( prev =>  null )
        }
        if ( props ){
            setOptions( prev => ({...prev , ...props }))
        }
        if ( props.value ){
          setValue( prev => props.value )
        }
    } , [props])

  return (
    <Box  sx={{ minWidth: 120 }}>
      <FormControl  size={ options.size || 'small'} fullWidth>
        <InputLabel  id={id}>{options.label}</InputLabel>
        <Select
          labelId={id}
          value={value || []}
          multiple={options.multiple}
          label={options.label}
          onChange={handleChange}
          {...props.muiArgs}
        >
          {
            options.options.map( ( item , index ) => {
                return <MenuItem key={item+index} value={item}>{item}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Box>
  );
}
