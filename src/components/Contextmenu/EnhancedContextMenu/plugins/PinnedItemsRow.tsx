// @ts-nocheck

import React, { forwardRef } from 'react'
import { Stack } from '@mui/material';
import { IconButton } from '../../../Buttons/IconButton'
import SingleMenuItem from './MenuItem';

const PinnedItemsRow = forwardRef( (props, ref ) => {
    const { items , options } = props;

    return (
        <>
            {
                items.length > 0 ? 
                    <SingleMenuItem  
                        ref={ref} 
                        options={options} 
                        type={'pinned'} 
                        >
                        <Stack style={{zIndex:301, position: 'relative'}} direction={'row'} spacing={1}>
                            {
                                items.map( (item,index) => {
                                    return (
                                        <IconButton 
                                            key={index}
                                            icon={item.child}
                                            onClick={item.action}
                                            tooltip={item.label}
                                        />
                                    )
                                })
                            }
                        </Stack>
                    </SingleMenuItem>
                : null
            }
        </>
    )
})

export default PinnedItemsRow
