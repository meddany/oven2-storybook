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
                blur : 'bg-blur text-white',
                primary : 'transparent text-gray-300',
                white : 'bg-white',
            },
            size : {
                'small' : "w-[130px] h-[150px]" ,
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
    const { variant , size , className , text , timeout , period } = props 
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
        <div  id={'__uu773j12'} className={cn(vrs({variant,size}) , 'h-auto' ,className )}  >
            <div className={'css-kj2j1 w-[100%] h-[100%] flex relative justify-center items-center flex-wrap'} >
                <ProgressSpinner style={{'height' : '80px' , width : '80px'}} strokeWidth="1" animationDuration='.8s'  />
                <p className='mt-1 truncate' > {text || "Loading ..."}</p>
                <Button onClick={closeModel} id={id} className=' hidden  w-[200px] h-[30px] text-blue-600' variant='secondary' >
                    Abort
                </Button>
            </div>
            
        </div>
    )
})