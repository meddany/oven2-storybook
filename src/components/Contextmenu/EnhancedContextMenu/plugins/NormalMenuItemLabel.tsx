// @ts-nocheck
import React from "react";
import { Stack } from "@mui/material";


export const NormalMenuItemLabel = (props) => {
    const { children , requireHotKeyRegister  ,shortcutKeys  } = props
    // console.log(props)
    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}  style={{ width : '100%' , height : '100%' , position : 'relative'}} >
            {children}
            <p style={{paddingTop : '1px'}} className='hotkey'>{shortcutKeys}</p>
        </Stack>
    )
}