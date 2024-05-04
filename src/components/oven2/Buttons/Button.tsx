// @ts-nocheck
import React , { forwardRef } from 'react'
import OvenButton  from './OvenButton';

export const Button = forwardRef( (props , ref ) => {
  const { theme } = props ;
  return (
    <>
      { theme == 'mui' ? <OvenButton {...props} ref={ref} /> : null }
    </>
  )
})