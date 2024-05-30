// @ts-nocheck
import { useState , forwardRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Input } from '..';

export const AutoComplete = forwardRef((props,ref) =>{
    
    const { options } = props;
    const [ ops ] = useState(options||[])

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
                renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                    <Input 
                        {...params.inputProps}                
                        {...props}
                        inputRef={ref}
                    />
                </div>
                )}
            />
        </>
    );
})