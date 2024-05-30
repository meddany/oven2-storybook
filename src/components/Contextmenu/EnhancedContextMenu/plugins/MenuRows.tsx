// @ts-nocheck
import React, { forwardRef, useContext } from 'react'
import SingleMenuItem from './MenuItem'
import EnhancedMenuContext from './Context'
export const MenuRows = forwardRef( (props, ref ) => {
    const { items , options  } = props
    const { tmps } = useContext(EnhancedMenuContext)
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
                                totalLength={items.length}
                            />
                        )
                    })
                : null 
        }
        </>
    )
})