/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { forwardRef , useState , useEffect } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogOverlay
} from "@/components/ui/alert-dialog"
import { ModelContext } from '../Contexts/ModelContext'

const vrs = cva(
    "h-full w-full flex items-center justify-center z-40  " ,
    {
      variants : {
        variant : {
          transparent : 'bg-transparent' ,
          blur : 'bg-blur' ,
        } ,
        inline : {
          true : 'absolute'
        }
      },
      defaultVariants : {
        variant : 'blur'
      }
    }
)

export const Model = forwardRef( (props, ref ) => {
  const [ open , setOpen ] = useState( false )
  const { children , bodyClick, className , variant , inline , hideOnContextMenu } = props;

  function handleClose(){
    setOpen(false)
  }
  function hanldeOpen(){
    setOpen(true)
  }

  useEffect( () => {
    if ( ref.current ){
      ref.current.open = hanldeOpen
      ref.current.close = handleClose
      ref.open = hanldeOpen
      ref.close = handleClose
      ref.current.isOpen = open
    }
  } , [ref])

  function handleWrapperClose(e){
    if ( e.target.classList.contains('custom-click-away') && bodyClick ){
      setOpen(false)
    }
  }

  function handleContextMenu(e){
    if ( hideOnContextMenu ){
      e.preventDefault()
      setOpen(false)
    }
  }

  return (
    <ModelContext.Provider value={{openModel : hanldeOpen , closeModel : handleClose , ref , props}}>
        <AlertDialog  open={open}>
          <AlertDialogOverlay 
            onContextMenu={handleContextMenu}
            onClick={handleWrapperClose} className={cn(vrs({variant,inline}) , 'custom-click-away flex justify-center items-center top-0 left-0' ,className )} 
            >
            {children}
          </AlertDialogOverlay>
        </AlertDialog>
    </ModelContext.Provider>

  )
} )
