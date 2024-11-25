//@ts-nocheck
import React , { useState , useEffect, forwardRef } from 'react'
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { MenuItem } from '@mui/material'
import { StyledTooltip } from './Button';
import Zoom from '@mui/material/Zoom';

const vrs = cva(
  "relative w-[35px] h-[35px] flex items-center justify-center !p-0 !m-0 transition-all duration-75 ease-in-out",
  {
    variants : {
      variant : {
        primary : '!rounded-md hover:!bg-[#e5effd] !text-blue-600',
        secondary : '!rounded-md hover:!bg-[#e5effd] !text-blue-600 hover:!text-blue-600  !bg-blue-500 !text-white',
        ghost : '!bg-accent text-gray-500' ,
      } ,
      outline : {
        true : "focus:outline-2 outline-offset-1 focus:outline focus:outline-blue-500"
      },
      border : {
        true : "!border-[2px] !border-solid !border-blue-600 "
      },
      disable : {
        true : "!cursor-not-allowed !text-gray hover:!bg-initial hover:!text-initial "
      }
    } ,
    defaultVariants : {
      variant : 'primary',
      border: 'false' , 
      outline : 'true'
    }
  },
)


export const IconButton = forwardRef( (props, ref )=> {

    const [ buttonIcon , setButtonIcon ] = useState()

    const { 
      variant, 
      tooltip='' ,
      icon,
      className='',
      outline,
      border,
      disable,
      ripple=true,
      onClick=()=>{}
    } = props;

    function handleOnClick(e,ref){
      onClick(e,ref)
    }

    useEffect( () => {
      if ( icon ){
        setButtonIcon(icon)
      }
    } , [icon])

    return (
      <StyledTooltip 
        title={tooltip} 
        arrow
        TransitionComponent={Zoom}
        TransitionProps={{ timeout:200 }}
      >
          <MenuItem disableRipple={!ripple} disabled={disable} ref={ref} className={ cn(vrs({variant,outline,border,disable}) , '!cursor-default' , className )} onClick={handleOnClick}  >
            <div className='!w-full !h-full flex items-center justify-center *:h-[20px] *:w-[20px]'>
              {buttonIcon}
            </div>
          </MenuItem>
      </StyledTooltip>

      )
})

