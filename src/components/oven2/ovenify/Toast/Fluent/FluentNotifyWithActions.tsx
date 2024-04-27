// @ts-nocheck
import * as React from "react";
import $ from 'jquery'
import { useState } from 'react'
import {
  useId,
  Link,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
  ToastTrigger,
  ToastFooter,
  ToastBody,
  
} from "@fluentui/react-components";

import OvenButton from "@/oven/OvenButton/OvenButton";
import { Stack } from "@mui/material";
import { getRandomId } from "@/oven/utils/common";
import { useOvenify } from "../../OvenGlobalState";

const  FluentNotifyWithActions = (props) => {
    const _ref = React.useRef()
    const toasterId = useId("toasterId");
    const ovenify = useOvenify()
    const { dispatchToast  } = useToastController(toasterId);
    const [ options , setOptions ] = useState({
      header : 'Success' , 
      body : '' , 
      actions : [] ,
      mode : 'success',
      timeout : 30000 ,
      
    })

    const { dismissToast } = useToastController(toasterId);

    const dismiss = React.useCallback(
      (toastId) => dismissToast(toastId),
      [dismissToast, options.toastId ]
    );

    React.useEffect( () => {

      if ( ovenify.ready ){

        ovenify.notify.fluentWithAction = {
          ref: _ref,
          success: ( (params) => {
            let _params = {
              ...options , 
              header: 'Success' , 
              ...params ,
              mode: 'success' , 
              toastId : getRandomId()
            }
            setOptions( _params )

            notify(_params)
          }) ,
          error: ( (params) => {
            let _params = {
              ...options , 
              header: 'Error' , 
              ...params ,
              mode: 'error' , 
              toastId : getRandomId()
            }
            setOptions( _params )
            notify(_params)
          }) ,
          info: ( (params) => {
            let _params = {
              ...options , 
              header: 'Information' , 
              ...params ,
              mode: 'info' , 
              toastId : getRandomId()
            }
            setOptions( _params )
            notify(_params)
          }) ,
          warn: ( (params) => {
            let _params = {
              ...options , 
              header: 'Warning' , 
              ...params ,
              mode: 'warn' , 
              toastId : getRandomId()
            }
            setOptions( _params )
            notify(_params)
          })

        }
      }

    } , [ovenify.ready])

    React.useEffect( () => {
      
    } , [options.body])


    const notify = (_params) => {
      console.log('triggering ' , _params )

      dispatchToast(
        <Toast>
          <ToastTitle 
          action={
            <ToastTrigger>
              <Link>Dismiss</Link>
            </ToastTrigger>
          }
          
          >
            {_params.header}
            
            </ToastTitle>

          <ToastBody>

            {_params.body}

          </ToastBody>

          <ToastFooter>
            <Stack direction={'row'}>
              {
                _params.actions.map( (a,i) => {
                  return(
                    <OvenButton key={`__ov_`+i} light 
                    onClick={()=>{
                      if ( a.action ){
                        dismiss(_params.toastId)
                        a.action()
                      }

                    }} >{a.label}</OvenButton>
                  )
                })
              }
            </Stack>
          </ToastFooter>
        
        </Toast>,
        { position:'bottom-end' , 
        timeout : _params.timeout , 
        intent: _params.mode,
        toastId: _params.toastId  ,

        }
      );


    }

  
    return (
      <div ref={_ref} >
        <Toaster
          toasterId={toasterId}
          pauseOnHover
          pauseOnWindowBlur
          timeout={options.timeout}
        />
      </div>
    );
  };

  export default FluentNotifyWithActions