/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { forwardRef } from 'react'
import { IconButton } from './IconButton'
import { X } from 'lucide-react';

export const CloseButton = forwardRef( (props,ref) => {
    const { onClick } = props;
    return (
        <IconButton 
            ref={ref}
            tooltip='Close'
            icon={<X />}
            onClick={ () => {
                if ( onClick ){
                    onClick(ref)
                }
            }}
        />
    )
})
