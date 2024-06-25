/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React , { useState , useEffect, forwardRef } from 'react'
import { Button as ShButton } from '../ui/button'
import '../global.css'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Tooltip }  from '@mui/material';
import Zoom from '@mui/material/Zoom';
import './styles.css'
import { styled } from '@mui/material/styles';

const ToBeStyledTooltip = ({ className, ...props }) => (
    <Tooltip {...props} enterDelay={200} classes={{ tooltip: className }} />
);

export const StyledTooltip = styled(ToBeStyledTooltip)(() => ({
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid #dadde9',
  }));

const extrabuttonVariants = cva(
    "active:opacity-50 tracking-wide h-[40px] border-[0px] uppercase rounded-[2px] px-[15px] font-Roboto text-[14px] relative shadow-none cursor-default",
    {
        variants : {
            variant : {
                primary : 'bg-blue-600 text-blue-200',
                secondary : 'text-blue-900 focus:border-2 focus:border-[2px] focus:border-blue-500' ,
            },
            border : {
                true : 'border-blue-800 border-solid border-[2px]'
            } ,
            disable : {
                true : '!cursor-not-allowed z-auto'
            }
        },
        defaultVariants : {
            variant : 'primary',
            size : 'button'
        }
       
    },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof extrabuttonVariants> {
  asChild?: boolean
}

export const TestButton = forwardRef( (props, ref ) => {
    const { 
        variant  , 
        size, 
        onClick, 
        autoFocus , 
        addClass ,  
        disable , 
        icon , 
        disableAfterClick ,
        tooltip,
        className ,
        outline,
        border=false,
        children ,
    } = props;


    const [ defaults , setDefaults ] = useState({
        disable : disable ? disable : false ,
        addClass : addClass ? addClass : [],
        autoFocus : autoFocus ? autoFocus : false,
    })

    const updateOption = (key , value)=>{
        setDefaults( prev => ({...prev , [key] : value }))
    }

    useEffect( () => {
        setDefaults({...props})
    } , [props])

    const handleClick = (e) => {
        if ( defaults.disableAfterClick){
            updateOption('disable' , true )
        }
        if ( onClick ){
            onClick(e,ref)
        }
    }

    useEffect( () => {
        updateOption( 'disable' , disable )
    } , [disable])
    
    return (
        <StyledTooltip 
            title={tooltip} 
            arrow
            TransitionComponent={Zoom}
            TransitionProps={{ timeout:200 }}
        >
            <ShButton
                {...props}
                ref={ref}
                autoFocus={autoFocus}
                disabled={defaults.disable}
                onClick={handleClick}
                size={size}
                className={
                        cn(extrabuttonVariants(
                            { 
                                variant , 
                                disableAfterClick , 
                                size : size ,
                                outline ,
                                disable : defaults.disable ,
                                border
                            } 
                    ) , className , addClass )
                }
            >
                <div className="flex justify-center items-center w-full h-full space-x-1 pointer-events-none">
                    <div className='*:!text-red-500 pointer-events-none'>
                        {
                            icon ? icon : null
                        }
                    </div>

                    <label>{children}</label>
                </div>
            </ShButton>
        </StyledTooltip>
    )
})
