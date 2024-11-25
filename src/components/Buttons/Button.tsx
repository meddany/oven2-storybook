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
    "active:opacity-50 tracking-wide h-[35px] border-[0px] rounded-[2px] px-[10px] font-aptos pt-0 text-[14px] capitalize relative shadow-none cursor-default",
    {
        variants : {
            variant : {
                primary : 'bg-blue-600 text-blue-200 ',
                transparent : 'bg-transparent text-blue-200 border-[2px] border-blue-500',
                secondary : 'text-blue-900 focus:border-2 focus:border-[2px] focus:border-blue-500' ,
                danger : 'text-red-900 bg-destructive focus:border-2 focus:border-[2px] focus:border-blue-500 hover:bg-accent hover:text-destructive' ,
                danger2 : 'text-destructive focus:border-2 focus:border-[2px] focus:border-blue-500 hover:bg-accent hover:text-destructive' ,
                green : 'text-green-900 bg-green-400 focus:border-2 focus:border-[2px] focus:border-blue-500 hover:bg-accent hover:text-green-900' ,
                ghost : 'bg-accent text-gray-500' ,
                dangerghost : 'text-destructive focus:border-2 focus:border-[2px] focus:border-blue-500 bg-accent hover:bg-[#fafafa] hover:text-destructive' ,
            },
            border : {
                true : 'border-blue-600 border-solid border-[2px]' ,
                ghost : 'border-gray-200 border-solid border-[2px]'
            } ,
            disable : {
                true : '!cursor-not-allowed z-auto'
            } ,
            hover : {
                true :'hover:border-blue-600' ,
                ghost :'hover:border-gray-300'
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
