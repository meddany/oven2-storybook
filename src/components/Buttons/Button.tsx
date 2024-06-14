/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import React , { useState , useEffect, forwardRef } from 'react'
import { Button as ShButton } from '../ui/button'
import '../global.css'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import MenuItem from '@mui/material/MenuItem';

const extrabuttonVariants = cva(
    "active:opacity-50 font-Roboto text-white focus:outline outline-2 outline-offset-2 outline-blue-500 text-sm relative p-0 overflow-hidden",
    {
        variants : {
            variant : {
                danger : "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                danger_white_text : "bg-destructive text-white shadow-sm hover:bg-destructive/90",
                minimal_border : "border border-input text-accent-foreground bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                minimal_no_border : "hover:bg-accent text-accent-foreground hover:text-accent-foreground",
                secondary : 'text-blue-500' ,
                icon : "text-blue-500 text-secondary-foreground hover:bg-secondary/80",
                iconbg : "text-blue-500 bg-secondary text-secondary-foreground hover:bg-secondary/80",
                danger_icon : "text-blue-500 bg-secondary text-secondary-foreground hover:bg-secondary/80 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            },
            size : {
                icon : 'w-[30px] h-[30px]'
            }
        },
        defaultVariants : {
            variant : '' 
        }
       
    },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof extrabuttonVariants> {
  asChild?: boolean
}

function IconButton(props){
    const { icon , label  } = props
    if ( icon && label ){
        return(
            <div className='flex justify-between items-center text-blue-500 shadow-none'  >
                <div className='pr-2' >
                    {icon}
                </div>
                {label}
            </div>
        )
    }
    else {
        return(
            <>
                {icon}
            </>
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
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <ShButton
                            {...props}
                            ref={ref}
                            autoFocus={autoFocus}
                            disabled={defaults.disable}
                            onClick={handleClick}
                            size={size}
                            className={cn(extrabuttonVariants({ variant , disableAfterClick , 
                                size : size
                            } ) , className , addClass ,  )}
                        >
                            <MenuItem >
                                {
                                    icon ? 
                                    <div className="w-full h-full flex justify-center items-center">
                                        <IconButton icon={icon}  label={children} />
                                    </div>
                                    : 
                                    children
                                }
                            </MenuItem>
                        </ShButton>
                    </TooltipTrigger>
                    {
                        tooltip  ?
                            <TooltipContent className="bg-muted rounded border-blue-600 border-[1.5px] text-muted-foreground shadow-lg z-50" >
                                <p>{tooltip}</p>
                            </TooltipContent>
                            : null
                    }
                </Tooltip>
            </TooltipProvider>
    )
})
