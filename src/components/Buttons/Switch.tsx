// @ts-nocheck
import React, { forwardRef, useRef } from 'react'
import { Switch as Tswitch } from "../../components/ui/switch"
import { Label } from "../../components/ui/label"
import { useRandomId } from '../utils/utils'

export const Switch = forwardRef( (props , ref) => {
    const { label } = props
    const rref = useRef()
    const id = useRandomId()
    return (
        <div ref={ref||rref} className="flex items-center space-x-2">
            <Tswitch id={id} {...props} />
            { label ? <Label htmlFor={id}>{label}</Label> : null }
        </div>
    )
})