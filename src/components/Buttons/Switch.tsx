// @ts-nocheck
import React, { forwardRef, useRef } from 'react'
import { Switch as Tswitch ,  } from "../../components/ui/switch"
import { Label } from "../../components/ui/label"
import { useRandomId } from '../utils/utils'

export interface SwitchProps2 extends React.ComponentPropsWithoutRef {
    onChange? : void ,
    label : string,
    defaultChecked : boolean
}

export const Switch = forwardRef<React.ComponentPropsWithoutRef,SwitchProps2>( (props , ref) => {
    const { 
        label , 
        onChange=()=>{},
        defaultChecked=false
      } = props
    const rref = useRef()
    const id = useRandomId()
    return (
        <div ref={ref||rref} className="flex items-center space-x-2">
            { label ? <Label htmlFor={id}>{label}</Label> : null }
            <Tswitch id={id}  onCheckedChange={onChange} {...props} defaultChecked={defaultChecked} />
        </div>
    )
})