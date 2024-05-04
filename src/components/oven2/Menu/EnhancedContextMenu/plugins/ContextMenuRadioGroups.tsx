// @ts-nocheck

import React from 'react'
import { RadioButton } from '../../../Inputs'
export const ContextMenuRadioGroups = (props) => {
    const { item } = props
    return (
        <div>
            <RadioButton   
            onChange={(e,v) => {
                if ( item.onChange ){
                    item.onChange(e,v)
                }
            }}
            items={item.options} />
        </div>
    )
}

export default ContextMenuRadioGroups
