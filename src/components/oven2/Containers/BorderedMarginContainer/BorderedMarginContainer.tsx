// @ts-nocheck

import React , {useEffect, useState } from 'react'
import './bordered.css'

function BorderedMarginContainer(props) {

  const [classes , setClasses ] = useState('bordered-css-j3h1')

  useEffect( () => {

    if (props.className){
      setClasses( prev => prev + ' ' + props.className)
    }

  } , [props.className])

  return (

    <div id={props.id} className={classes}>
        {props.children}
    </div>  

  )
}

export default BorderedMarginContainer
