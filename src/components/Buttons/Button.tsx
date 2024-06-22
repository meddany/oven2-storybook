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
    <Tooltip {...props} enterDelay={200} classes={{ tooltip: className }} />
);

const StyledTooltip = styled(ToBeStyledTooltip)(() => ({
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid #dadde9',
  }));

const extrabuttonVariants = cva(
    "active:opacity-50 font-Roboto text-white focus:outline font-bold outline-2 outline-offset-2 outline-blue-500 text-[13px] relative p-0 overflow-visible z-auto relative",
    {
        variants : {
            variant : {
                danger : "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                danger_white_text : "bg-destructive text-white shadow-sm hover:bg-destructive/90 hover:text-destructive",
                minimal_border : "border border-input text-accent-foreground bg-background hover:bg-accent hover:text-accent-foreground",
                minimal_no_border : "hover:bg-accent text-accent-foreground hover:text-accent-foreground",
                secondary : 'text-blue-900 shadow-none weight-[500] outline-0' ,
                icon : "text-blue-600",
                iconbg : "",
                danger_icon : "" ,
                iconbg : "text-blue-500 bg-secondary text-secondary-foreground hover:bg-secondary/80",
            },
            size : {
                icon : 'css-k2j3123'
            } ,
            border : {
                true : 'border-blue-600 border-solid border-2 rounded-md '
            }
        },
        defaultVariants : {
            variant : 'minimal_border' 
        }
       
    },
)

const vrs2 = cva('focus:outline-blue outline-none focus:outline-blue-600 focus:outline outline-offset-2 focus:outline-[2px] focus:rounded-xs !cursor-default' , {
    variants : {
        variant : {
            icon : 'w-[40px] h-[40px] flex justify-center items-center relative !rounded-lg hover:!bg-[#e5effd]' ,
        } ,
        outline : {
            false : '!focus:outline-none'
        } ,
    } ,
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
        className ,
        outline,
        border=false,
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
                                size : size ,
                                outline ,
                                border
                            } 
                    ) , className , addClass )
                }
            >
                <MenuItem className={cn(vrs2({variant , outline }) )} {...props.mui} >
                    {
                        icon ?  
                        <div className="flex justify-center items-center w-full h-full">
                            <IconButton icon={icon} label={children?.toString().toUpperCase()} />
                        </div>
                        : 
                        children?.toString().toUpperCase()
                    }
                </MenuItem>
            </ShButton>
        </StyledTooltip>
    )
})
