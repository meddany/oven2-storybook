// @ts-nocheck

import React , { forwardRef , useContext, useEffect, useRef, useState  } from 'react'
import { AlertsContext } from '../main'
import { Model } from '@/components/Containers/Model'
import {PrimaryAlertPaper} from './PrimaryAlertPaper'

export const AlertRouter = forwardRef((props,ref) =>{

  const { queue } = useContext(AlertsContext)
  const [ current , setCurrent ] = useState({id : null , variant : null  })
  const modelRef = useRef({})

  useEffect( () => {
    if ( queue.length > 0 ){
      modelRef.current.open()
      setCurrent( queue.at(0) )
    }
    else {
      modelRef.current.close()
    }
  } , [queue])



  return(
    <div>
      <Model  ref={modelRef}>
        {
          current.variant == 'primary' ? <PrimaryAlertPaper {...current} type={current.type} /> : null 
        }
      </Model>
    </div>
  )

})