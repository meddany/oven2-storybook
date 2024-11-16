/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

import React , { forwardRef , useContext, useEffect, useRef, useState  } from 'react'
import { AlertsContext } from '../main'
import { Model } from '@/components/Containers/Model'
import {PrimaryAlertPaper} from './PrimaryAlertPaper'
import Draggable from 'react-draggable';

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
    <Model variant='dimmed' ref={modelRef} className='z-[900]' >
       <Draggable  handle='.drag-handler-box'>
        <div className='absolute w-full h-full top-0 left-0 z-[302]' >
            {
              current.variant == 'primary' ? <PrimaryAlertPaper {...current} type={current.type} /> : null 
            }
        </div>
       </Draggable>
    </Model>
  )

})