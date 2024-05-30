/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { forwardRef, useState } from 'react'
import { IconButton } from './IconButton'
import { Copy , CheckCheck } from 'lucide-react';

export const CopyButton = forwardRef( (props,ref) => {
    const [ icon , setIcon ] = useState(<Copy size={16} />)
    const { value , restoreSec } = props;
    return (
        <IconButton 
            ref={ref}
            tooltip='Copy'
            icon={icon}
            onClick={ () => {
                navigator.clipboard.writeText(value)
                setIcon(
                    <CheckCheck className='text-blue-500' size={17} />
                    )
                setTimeout( () => {
                    setIcon( <Copy size={16} /> )
                } , restoreSec ? restoreSec : 2000 )
            }}
        />
    )
})
