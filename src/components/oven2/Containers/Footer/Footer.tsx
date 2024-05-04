// @ts-nocheck
import { Stack } from '@mui/material'
import React, { forwardRef, useState } from 'react'

export const Footer = forwardRef( (props, ref ) => {
    const { children , footerHeight ,  bgcolor } = props
    const [ defaults , setDefaults ] = useState({
        height : footerHeight ? footerHeight : 40  ,
        ref : ref ? ref : useRef() ,
        bgcolor : bgcolor ? bgcolor : '#fff' ,
        children : children ? children : false
    })


    
    return (
        <div className='app-frame-footer' ref={ref} style={{width : '100%' , height : defaults.height , position : 'relative' , background : defaults.bgcolor}}>
            <Stack direction={'row'} alignItems={'center'}>
                {
                    children ? defaults.children : null
                }
            </Stack>          
        </div>
    )

})


