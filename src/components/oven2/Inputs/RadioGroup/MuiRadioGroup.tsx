// @ts-nocheck
import React , { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getRandomId } from '../../utils/common';

export const RadioButtonsGroup = React.forwardRef( (props, ref) => {
    const { flex ,size , items , defaultValue  , onChange  } = props;
    const customName = React.useMemo( () => { return getRandomId() })
    const [ defaults , setDefaults ] = useState({
        defaultValue : defaultValue ? defaultValue : '',
        items : items ? items : [],
        size : size ? size : 'small',
        flex : flex ? flex : true ,
    })

    return (
        <FormControl >
          <RadioGroup
            row={defaults.flex}
            aria-labelledby={customName}
            defaultValue={defaultValue}
            name={customName}
            onChange={(e,v) => {
                if ( onChange ){
                    onChange(e,v)
                }
            }}
          >
            {
                defaults.items.map( (item , index ) => {
                    return <FormControlLabel key={customName+index}  value={item} control={<Radio  size={defaults.size} />} label={item} />
                } )
            }

          </RadioGroup>
        </FormControl>
      );
})