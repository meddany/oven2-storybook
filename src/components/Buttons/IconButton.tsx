//@ts-nocheck
import React , { useState , useEffect, forwardRef } from 'react'
import { Button as ShButton } from '../ui/button'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { MenuItem } from '@mui/material'
import { StyledTooltip } from './Button';
import Zoom from '@mui/material/Zoom';

const vrs = cva(
  "relative w-[40px] h-[40px] flex items-center justify-center hover:!bg-red-400 !p-0 !m-0 transition-all duration-75 ease-in-out",
  {
    variants : {
      variant : {
        primary : '!rounded-md hover:!bg-[#e5effd] !text-blue-600',
        secondary : '!rounded-md hover:!bg-[#e5effd] !text-blue-600 hover:!text-blue-600  !bg-blue-500 !text-white',
      } ,
      outline : {
        true : "focus:outline-2 outline-offset-2 focus:outline focus:outline-blue-500"
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

    const { 
      variant, 
      tooltip='' ,
      icon,
      className='',
      outline,
      border,
      disable,
      onClick=()=>{}
    } = props;

    function handleOnClick(e,ref){
      onClick(e,ref)
    }

    return (
      <StyledTooltip 
        title={tooltip} 
        arrow
        TransitionComponent={Zoom}
        TransitionProps={{ timeout:200 }}
      >
          <MenuItem disabled={disable} ref={ref} className={ cn(vrs({variant,outline,border,disable}) , className )} onClick={handleOnClick}  >
            <div className='!w-full h-full flex items-center justify-center *:h-[20px] *:w-[20px]'>
              {icon}
            </div>
          </MenuItem>
      </StyledTooltip>

      )
})

