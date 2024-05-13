// @ts-nocheck
import { useState , useRef , useEffect, useMemo , memo } from "react";
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getRandomId } from "../../utils/common";
import './styles.css'
import $ from 'jquery'

export default function MuiSelectBox(props) {
    const { defaultValue , multiple  , maxHeight , maxWidth } = props
    const ref = useRef()
    const [value, setValue] = useState(undefined);
    const id = useMemo( () => {return getRandomId() })
    const [ options , setOptions ] = useState({
      size : 'small' ,
      label : '' ,
      options : props.options ? props.options : [] ,
      multiple : multiple ? multiple : false  ,
      customSize : false,
      maxHeight : maxHeight ? maxHeight : 40 ,
      maxWidth : maxWidth ? maxHeight : 120 ,
      defaultValue : defaultValue ? defaultValue : ''
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
        if ( props ){
            setOptions( prev => ({...prev , ...props }))
        }
    } , [props])

    useEffect( () => {
      if ( ref.current ){
        console.log($(ref.current).css('--custom-mui-height'))
        // ref.current.style['--custom-mui-height'] = options.maxHeight
      }
    } , [options.maxHeight , ref])

  return (
    <div ref={ref} className="custom-mui-select-box-height">
        <Box sx={{ minWidth: 120 , width : '100%' , position : 'relative'}}>
        <FormControl fullWidth size={ options.size || 'small'}>
          <InputLabel id={id}>{options.label}</InputLabel>
          <Select
            labelId={id}
            defaultValue={options.defaultValue}
            multiple={options.multiple}
            label={options.label}
            onChange={handleChange}
            {...props.muiArgs}
            sx={{
              height: options.maxHeight,
              width : options.maxWidth ? options.maxWidth : '100%'
            }}
          >
            {
              options.options.map( ( item , index ) => {
                  return <MenuItem key={item+index} value={item}>{item}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
