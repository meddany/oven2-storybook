// @ts-nocheck
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Input } from '..'
import { getWholeSpectrum } from '../utils/optics'
import { IconButton , Brackets  } from '..'
import { Model } from '..'
import {InformationTableMui} from '..'
import { Panel } from '..'
import { ScrollArea } from '..'
import { Container } from '..'
import { DialogPanel } from '..'
const spectrum = getWholeSpectrum()

export const Frequency =  forwardRef( (props,ref) => {

    const rref= useRef()
    const {onChange} = props
    const [values , setValues] = useState({'a' : 0 , 'b' : 0})
    const ref1=useRef()
    const ref2=useRef()
    const ref3=useRef({})
    const handleOnChange = (v) => {
        if (onChange){
            onChange(v,ref)
            if ( ! spectrum.includes(v)){
                console.log('frequency not found ' , v , spectrum)
                ref1.current.api.updateDescription( 'invalid' , "Frequency is invalid.")
                return
            }
            ref1.current.api.updateDescription('valid' , 'Frequency is valid.')
        }
    }

    function b(){
        const items = []
        spectrum.map( freq => {
            items.push({
                header : 'Frequency' ,
                value : <p className='font-geist' >{freq}</p>
            })
        })
        return items
    }
    
    useEffect( () => {
        const i = parseFloat((values.a+"."+ values.b)).toFixed(3)
        handleOnChange(i)
        if(ref){
            ref.current.value = i
            ref.current.ref1 =ref1
            ref.current.ref2 =ref2
            ref.current.combinedRef=ref
        }
    } , [values])

    return (
        <div ref={ref||rref} className='flex border w-fit pl-1'>

            <DialogPanel header="Frequencies Table" className={'w-[80vw]'} ref={ref3} >
                <Container resizable className={'h-[70vh]  w-[80vw'}>
                    <ScrollArea className='max-h-[calc(100%-200px)]'>
                        <InformationTableMui sx={{width : '50vw'}} data={b()} />
                    </ScrollArea>
                </Container>
            </DialogPanel>

            <Input
            ref={ref1}
            title='Frequency'
            placeholder='Frequency'
            onChange={(e,v)=>{
                setValues(prev=>({...prev , a:v}))
            }}
            defaultValue={9127} description="9XXX.XXX" min={9127} max={9606} className={'border-0'} size='frequency' type='number' />
            <p className='relative -left-[10px] top-[6px] font-bold font-geist text-[20px]'>.</p>
            <Input 
                defaultValue={0}
                min={0} 
                ref={ref2}
                step={1} 
                max={875} 
                className={'border-0 w-[50px]'} 
                size='frequency' 
                type='number' 
                onChange={(e,v)=>{
                    setValues(prev=>({...prev , b:v}))
                }}
                />
            <div className='relative top-[4px] right-[4px] z-0'>
                <IconButton 
                    icon={<Brackets />}
                    tooltip='Show Frequencies'
                    onClick={()=>{
                        console.log(ref3.current)
                        ref3.current.open()
                    }}
                />
            </div>
        </div>
    )
})