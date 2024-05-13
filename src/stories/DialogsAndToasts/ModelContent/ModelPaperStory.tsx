// @ts-nocheck
import React , { useRef } from 'react'
import { Button , Dialog } from '../../../components/oven2'
import { Stack } from '@mui/material'

export const ModelPaperStory = () => {
    const callback = useRef({})
    return (
      <div>
        <Stack direction={'row'} spacing={2} >
          <Button 
            theme='mui' 
            children='Open Dialog'
            light
            bordered 
            onClick={ () => {
              console.log(callback)
              callback.current.api.open()
              setTimeout( () => {
                callback.current.api.updateChildren(<p>Item has been updated.</p>)
              } , 1000 )
            }}
          />
          <Button 
            theme='mui' 
            children='Close Dialog'
            light
            bordered 
            onClick={ () => {
              console.log(callback)
              callback.current.api.close()
            }}
          />
        </Stack>

        <Dialog 
          callback={callback}
        />
        
      </div>
    )
}
