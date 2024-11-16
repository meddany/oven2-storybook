// @ts-nocheck
import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'


const vrs = cva("font-Roboto  select-none font-normal" , {
  variants : {
    type : {
      'main' : 'text-[20px]' ,
      'sub' : 'text-[18px]' ,
      'normal' : 'text-[16px]'
    }
  }
})

export const Header = (props) => {
    const {
        children,
        className,
        style,
        type
    } = props

  return (
    <label style={style || {} } className={cn(vrs({type}) , className )}>{children}</label>
  )
}
