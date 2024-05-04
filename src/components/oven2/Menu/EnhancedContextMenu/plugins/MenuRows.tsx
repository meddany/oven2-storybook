// @ts-nocheck
import React, { forwardRef } from 'react'
import SingleMenuItem from './MenuItem'
export const MenuRows = forwardRef( (props, ref ) => {
    const { items , options } = props
    return (
        <>
            
            {
                items ? 
                    items.map( (item, index) => {
                        return (
                            <SingleMenuItem 
                                nativeid={item.nativeid} 
                                groupid={item.groupId} 
                                index={index} 
                                key={'__'+index} 
                                item={item} 
                                options={options}
                                menuRef={ref} 
                                type={'options'}
                            />
                        )
                    })
                : null 
        }
        </>
    )
})