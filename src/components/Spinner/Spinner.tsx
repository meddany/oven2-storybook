/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { forwardRef, useEffect , useContext } from 'react'
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import './style.css'
import { Button } from '..';
import { ModelContext } from '..';
import { useRandomId } from '..';
import $ from 'jquery'

const vrs = cva(
    'flex relative justify-center items-center rounded p-1 font-geist text-sm',
    {
        variants : {
            variant : {
                blur : 'bg-blur text-white font-geist',
                primary : 'transparent font-geist ',
                white : 'bg-white font-geist',
            },
            size : {
                'small' : "w-[100px] h-[100px]" ,
                'large' : "w-[200px] h-[200px]" ,
            }
        } ,
        defaultVariants : {
            size : 'small',
            variant : 'primary'
        }
    }
)

export const Spinner = forwardRef( (props, ref ) => {
    const { variant , size , classNames , text , timeout , period } = props 
    const { closeModel } = useContext(ModelContext)
    const id = useRandomId()

    useEffect( () => {
        if ( timeout ){ 
            setTimeout( () => {
                $('#__uu773j12').addClass('animation-ease-in-out')
                $('#'+id).show()
            } , period || 20000 )
         }
    } , [])

    return (
        <div  id={'__uu773j12'} className={cn(vrs({variant,size}) , 'h-auto' ,classNames )}  >
            <div className={'css-kj2j1 w-[100%] h-[100%] flex relative justify-center items-center flex-wrap'} >
                <ProgressSpinner style={{height : '70%' , width:'70%'}} strokeWidth="4" animationDuration='.8s' />
                <p className='mt-1 truncate' > {text || "Loading ..."}</p>
                <Button onClick={closeModel} id={id} className=' hidden  w-[200px] h-[30px] text-blue-600' variant='secondary' >
                    Abort
                </Button>
            </div>
            
        </div>
    )
})