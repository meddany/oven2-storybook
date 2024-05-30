// @ts-nocheck
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Input } from "../ui/input"
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import './styles.css'
import { useRandomId } from '../utils/utils'
import $ from 'jquery'
import { capitalizeFirstLetter } from '../utils/utils'
import { SwapIconButton } from '../Buttons/SwapIconButton'
import { Eye , EyeOff , Info } from '@/components'

const vrs = cva(
    "rounded-sm font-geist border-[2px] text-[17px] focus-visible:ring-[2px] shadow-none" , 
    {
        variants : {
            invalid : {
                true : 'focus-visible:ring-destructive border-destructive'
            } ,
            type : {
                password : 'pr-[40px]'
            },
            size : {
                full : 'w-full' ,
                xs : 'w-[100px]' ,
                sm : 'w-[150px]' ,
                lg : 'w-[300px]' ,
                xl : 'w-[400px]' ,
                screen : 'w-screen',
                frequency : 'w-[65px] pr-0 pl-0',
            }
        } ,
        defaultVariants : {
            size : 'full'
        }
    }
)

export const AllInput = forwardRef((props, ref) => {
    const { placeholder, size , onInputChange ,description, inputRef ,title ,className, invalid , type ,defaultValue,value } = props;
    const [ ttype , setTtype ] = useState(type)
    const [ extraInfo , setExtraInfo ] = useState(description)
    const [ timeout , setITimeout  ] = useState()
    const [ preservedValue , setPreservedValue ] = useState(defaultValue)
    const id = useRandomId()
    const id2 = useRandomId()
    const rref= useRef()

    const handleClick = useCallback( (state) => {
        const ntype = state == 1 ? 'password' : 'text' 
        setTtype(ntype)
    } , [])

    useEffect( ()=>{
        setExtraInfo(description)
    } , [])

    function updateDescription(status,reason){
        if ( ! ['invalid' , 'valid' ].includes(status) ){
            throw new Error('Invalid status, must be invalid or valid.')
        }
        if ( status == 'invalid'){
            setExtraInfo(<p className='font-geist text-destructive' >{reason}</p>)
            if(timeout){
                clearTimeout(timeout)
            }
        }
        else if ( status == 'valid'){
            setExtraInfo(<p className='font-geist text-[#14502a]' >{reason}</p>)
            if(timeout){
                clearTimeout(timeout)
            }
            const t = setTimeout( () => {
                setExtraInfo(description)
            } , 15000)
            setITimeout(t)
        }
    }


    useEffect(()=>{
        if ( inputRef ){
            if(inputRef.current){
                inputRef.current.api = {
                    updateDescription: updateDescription,
                    value : preservedValue ,
                    ref : ref,
                    rref:rref,
                    inputRef: inputRef,
                    type : type,
                    params : props,
                }
            }
        }
    } , [preservedValue])

    function checkEmailType(text){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ( text == ''){setExtraInfo(description)}
        else if (!emailRegex.test(text)) {
            updateDescription( 'invalid' , 'Not a valid email address...')
        }
        else {
            updateDescription('valid')
        }
    }


    const handleInput = (e)=>{
        const text = $(`input[name="${id2}"]`)[0].value
        setPreservedValue( text )
        const element2 = $(`div[name="${id}"]`)[0]
        if ( text ){
            $(element2).find('.css-ii8jj5').addClass('has-text')
            $(element2).find('.css-ii8jj4').addClass('has-text')
        }
        else{
            $(element2).find('.css-ii8jj5').removeClass('has-text')
            $(element2).find('.css-ii8jj4').removeClass('has-text')
        }

        if ( type == 'email'){
            checkEmailType(text)
        }
        if ( onInputChange ){
            const ref = inputRef
            onInputChange(ref,text)
        }
    }

    useEffect(()=>{
        if ( defaultValue || value ){
            handleInput()
        }
    } , [defaultValue,value])


    return (
        <div id={id} name={id} className='relative css-ii8jj3' >
            <div className='relative flex items-center' >
                <p className='css-ii8jj4 opacity-0 font-geist text-[15px]'>{capitalizeFirstLetter(title||"")}</p>
                <p className='text-muted-foreground css-ii8jj5 font-geist text-[15px]'>{capitalizeFirstLetter(placeholder||title||"")}</p>
                
            </div>
            <div className='flex justify-center items-center'>
                <Input 
                    {...props }
                    defaultValue={defaultValue}
                    ref={ref||rref}
                    id={id2}
                    name={id2}
                    variant='secondary'
                    className={cn(vrs({invalid,type,size}) , className )}
                    onKeyUp={handleInput}
                    placeholder=''
                    type={ttype}
                />
                {
                    type == 'password' ? 
                        <div className='absolute right-[5px] h-full top-[4px]'>
                            <SwapIconButton icon1={<EyeOff />} icon2={<Eye />} 
                                onClick={handleClick}
                                />
                        </div>
                    : null
                }
                {
                    description ? 
                        <div className='overflow-visible left-0 top-[30px] space-x-1 text-[12px] select-none absolute h-full flex items-center text-nowrap'>
                            <Info className='w-[15px] text-blue-500 ' />
                            <div className='overflow-visible flex pr-2' >
                                {extraInfo}
                            </div>
                        </div>
                    : null
                }
            </div>
        </div>
    )
})