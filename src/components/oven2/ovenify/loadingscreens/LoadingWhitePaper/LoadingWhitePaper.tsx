// @ts-nocheck
import React, { useEffect , useContext, useState } from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';
import './style.css'
import { Stack } from '@mui/material';
import Headline from '../../components/oven2/Paragraph/Headlines/Headline';
import CustomIconButton from '@/oven/CustomIconButton/CustomIconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useOvenify } from '../../OvenGlobalState';

export default function LoadingWhitePaper(props) {
  const ovenify = useOvenify()
  const [ options , setOptions ] = useState ({
    text : 'Loading...',
    enableHide: true ,
    paperColor : '#1515151d' , 
    containerColor : '#fff'
  })

  const [ start , setStart ] = useState( false )

  useEffect( () => {
    if ( ovenify.ready != true ){ return }

    ovenify.loading.anyloading = {
      start : (_options) => { 

        if ( _options ){
          setOptions( prev=> ({ ...prev , ..._options}))
        }


        setStart(true)


       }  ,
      stop : () => { setStart( false) }
    }

  } , [ovenify.ready])


  return (
    <>
      
      {
        start ? 
          <Stack sx={{backgroundColor: options.paperColor }} direction={'row'} alignItems={'center'} justifyContent={'center'} className='o-ls-white-dialog'>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <div style={{backgroundColor: options.containerColor }} className='o-ls-white-p'>
                
                {
                  options.enableHide ? 

                    <div className='o-ls-h-ic'>
                      <CustomIconButton
                        icon= {<VisibilityOffIcon sx={{color:'gray'}} />}
                        onClick={()=>{ setStart(false) }}
                        title='hide'
                      />
                    </div>

                    : null 
                }

                <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="2" fill="var(--surface-ground)" animationDuration=".7s" />
                
                <div style={{width : '100%', textAlign: 'center'}}>
                  <Headline>{options.text}</Headline>

                </div>
              
              </div>
            </Stack>
          </Stack>
        : null 
      }


    </>


  )
}
