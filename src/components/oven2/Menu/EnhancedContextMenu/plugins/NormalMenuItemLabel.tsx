// @ts-nocheck
import React from "react";
import { Stack } from "@mui/material";


export const NormalMenuItemLabel = (props) => {
    const { children , requireHotKeyRegister  ,shortcutKeys  } = props
    return (
        <Stack direction={'row'} justifyContent={'space-between'}  style={{ width : '100%' , height : '100%' , position : 'relative'}} >
            {children}
            <p className='hotkey'>{shortcutKeys}</p>
        </Stack>
    )
}