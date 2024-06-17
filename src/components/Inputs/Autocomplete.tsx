// @ts-nocheck
import { useState , forwardRef, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Input } from '..';

export const AutoComplete = forwardRef((props,ref) =>{
    
    const { options , onSelectChange , defaultValue } = props;
    const [ ops , setOpts ] = useState(options||[])

    useEffect( () => {
        if ( options ){
            setOpts(options)
        }
    } , [options])

    return (
        <>
            <Autocomplete
                sx={{
                width : '100%' ,
                height : '100%',
                display: 'inline-block',
                '& input': {
                    bgcolor: 'background.paper',
                    color: (theme) =>
                    theme.palette.getContrastText(theme.palette.background.paper),
                },
                }}
                options={ops}
                onChange={onSelectChange}
                renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                    <Input 
                        {...params.inputProps}                
                        {...props}
                        inputRef={ref}
                        defaultValue={defaultValue}
                    />
                </div>
                )}
            />
        </>
    );
})