// @ts-nocheck
import { Stack } from '@mui/material'
import React, { forwardRef, useState } from 'react'

export const Topbar = forwardRef( (props, ref ) => {
    const { children , topbarHeight ,  bgcolor } = props
    const [ defaults , setDefaults ] = useState({
        height : topbarHeight ? topbarHeight : 40  ,
        ref : ref ? ref : useRef() ,
        bgcolor : bgcolor ? bgcolor : '#fff' ,
        children : children ? children : false
    })


    
    return (
        <div className='app-frame-topbar' ref={ref} style={{width : '100%' , height : defaults.height , position : 'relative' , background : defaults.bgcolor}}>
            <Stack direction={'row'} alignItems={'center'}>
                {
                    children ? defaults.children : null
                }
            </Stack>          
        </div>
    )

})


