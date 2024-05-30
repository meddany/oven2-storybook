/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { forwardRef } from 'react'
import { IconButton } from './IconButton'
import { Menu , EllipsisVertical  } from 'lucide-react';

export const MenuButton = forwardRef( (props,ref) => {
    const { onClick } = props;
    return (
        <IconButton 
            { ...props }
            ref={ref}
            tooltip='Menu'
            icon={<EllipsisVertical />}
            onClick={ (e) => {
                if ( onClick ){
                    onClick(e,ref)
                }
            }}
        />
    )
})
