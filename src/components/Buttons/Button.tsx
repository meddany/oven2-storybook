/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React , { useState , useEffect, forwardRef } from 'react'
import { Button as ShButton } from '../ui/button'
import '../global.css'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import MenuItem from '@mui/material/MenuItem';
import { Tooltip }  from '@mui/material';
import Zoom from '@mui/material/Zoom';
import './styles.css'
import { styled } from '@mui/material/styles';


const ToBeStyledTooltip = ({ className, ...props }) => (
    <Tooltip {...props} classes={{ tooltip: className }} />
);

const StyledTooltip = styled(ToBeStyledTooltip)(() => ({
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid #dadde9',
  }));

const extrabuttonVariants = cva(
    "active:opacity-50 font-Roboto text-white focus:outline font-bold outline-2 outline-offset-2 outline-blue-500 text-sm relative p-0 overflow-visible z-[300] relative",
    {
        variants : {
            variant : {
                danger : "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                danger_white_text : "bg-destructive text-white shadow-sm hover:bg-destructive/90 hover:text-destructive",
                minimal_border : "border border-input text-accent-foreground bg-background hover:bg-accent hover:text-accent-foreground",
                minimal_no_border : "hover:bg-accent text-accent-foreground hover:text-accent-foreground",
                secondary : 'text-blue-600 shadow-none' ,
                icon : "text-blue-600",
                iconbg : "",
                danger_icon : "" ,
                iconbg : "text-blue-500 bg-secondary text-secondary-foreground hover:bg-secondary/80",
            },
            size : {
                icon : 'css-k2j3123'
            }
        },
        defaultVariants : {
            variant : 'minimal_border' 
        }
       
    },
)

const vrs2 = cva('focus:outline-blue outline-none focus:border-blue-600 focus:border-solid focus:border-2 focus:rounded-md !cursor-default' , {
    variants : {
        variant : {
            icon : 'w-[30px] h-[30px] flex justify-center items-center relative' ,
        }
    }
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof extrabuttonVariants> {
  asChild?: boolean
}

function IconButton(props){
    // this for buttons which has icons inside.
    const { icon , label  } = props
    if ( icon && label ){
        return(
            <div className='flex justify-between items-center text-blue-500 shadow-none'>
                <div className='flex justify-center items-center'>
                    {icon}
                </div>
                <div>
                    {label}
                </div>
            </div>
        )
    }
    else {
        return(
            <div className=''>
                {icon}
            </div>
        )
    }
}

export const TestButton = forwardRef( (props, ref ) => {

    
    const { 
        variant  , 
        size, 
        onClick, 
        autoFocus , 
        addClass ,  
        children ,
        disable , 
        icon , 
        disableAfterClick ,
        tooltip,
        className
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
                                size : size
                            } 
                    ) , className , addClass )
                }
            >
                <MenuItem className={cn(vrs2({variant}) )} >
                    {
                        icon ? 
                        <div className="flex justify-center items-center w-full h-full">
                            <IconButton icon={icon} label={children} />
                        </div>
                        : 
                        children
                    }
                </MenuItem>
            </ShButton>
        </StyledTooltip>
    )
})
