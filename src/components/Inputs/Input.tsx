// @ts-nocheck

import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Input , InputProps } from "../ui/input"
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import './styles.css'
import { useRandomId } from '../utils/utils'
import $ from 'jquery'
import { SwapIconButton } from '../Buttons/SwapIconButton'
import { Eye , EyeOff  } from '@/components'
import { Spinner } from '@/components'
import '../fonts/nokia/nokia-fonts.css'
import { Textarea } from '../ui/textarea'
import { TinnyHelp } from '../Help/TinnyHelp'

const vrs = cva(
    "rounded-sm font-Roboto border-[2px] text-gray-700 text-[14px] focus-visible:ring-[2px] placeholder:text-[12px] z-auto" , 
    {
        variants : {
            invalid : {
                true : 'focus-visible:ring-destructive border-destructive'
            } ,
            type : {
                password : ''
            },
            size : {
                screen : 'w-screen',
                frequency : 'w-[65px] pr-0 pl-0',
            }
        } ,
        defaultVariants : {
            size : 'full'
        }
    }
)

export interface InputProps extends InputProps {
    placeholder : string,
    size:  string , 
    description: string , 
    inputRef : object ,
    className: string, 
    invalid : string , 
    type : string,
    defaultValue: string,
    value: string ,
    onClick,
    onChange : void,
    multiple: boolean,
}

export const AllInput = forwardRef((props, ref) => {
    const { 
        placeholder, 
        size , 
        description, 
        inputRef ,
        className, 
        invalid='' , 
        type ,
        defaultValue,
        multiple=false,
        loading=false,
        value=undefined ,
        controlled=false,
        tmpdescription={},
        onChange=()=>{}
    } = props;

    const [ ttype , setTtype ] = useState(type)
    const [ extraInfo , setExtraInfo ] = useState(description)
    const [ timeout , setITimeout  ] = useState()
    const id = useRandomId()
    const id2 = useRandomId()
    const [ inputValue , setValue ] = useState('')
    const ref2= useRef()

    useEffect(() => {
        if (controlled) {
            setValue(value)
        }
    }, [controlled, value])

    const handleClick = (state) => {
        const ntype = state === 1 ? 'password' : 'text'
        setTtype(ntype)
    }

    useEffect(() => {
        setExtraInfo(description)
    }, [description])

    useEffect(() => {
        if (tmpdescription.state) {
            updateDescription(tmpdescription.state , tmpdescription.message)
        }
    }, [tmpdescription])

    function updateDescription(status, reason) {
        if (!['invalid', 'valid'].includes(status)) {
            throw new Error('Invalid status, must be invalid or valid.')
        }
        if (status === 'invalid') {
            setExtraInfo(<p className='font-Roboto text-destructive'>{reason}</p>)
            if (timeout) {
                clearTimeout(timeout)
            }
        } else if (status === 'valid') {
            setExtraInfo(<p className='font-Roboto text-green-600'>{reason}</p>)
            if (timeout) {
                clearTimeout(timeout)
            }
            const t = setTimeout(() => {
                setExtraInfo(description)
            }, 15000)
            setITimeout(t)
        }
    }

    function checkEmailType(text) {
        try {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (text === '') {
                setExtraInfo(description)
            } else if (!emailRegex.test(text)) {
                updateDescription('invalid', 'Not a valid email address...')
            } else {
                updateDescription('valid', "Valid email address")
            }
        }
        catch(error) {
            ''
        }
    }

    const handleInput = (e,customValue) => {
        const text = customValue ? customValue :  $(`#${id2}`)[0].value
        if (type === 'email') {
            checkEmailType(text)
        }
        if (onChange) {
            onChange(ref, text)
        }
    }

    const handleChange2 = (e) => {
        const element = e.target
        const text = element.value
        if (multiple) {
            const scrollHeight = element.scrollHeight
            const scrollTop = element.scrollTop
            if (scrollTop > 0) {
                element.style.height = scrollHeight + scrollTop + 'px'
            }
        }
        setValue(text)
        onChange(inputRef, text)
    }

    useEffect( () => {
        if ( defaultValue ) {
            setValue(defaultValue)
        }
    } , [defaultValue])

    return (
        <div id={id} name={id} className='relative css-ii8jj3' ref={ref2}>
            <div className='w-full relative '>
                <div className={cn(vrs({ invalid, type, size }), 'border-none relative flex items-center h-full')}>
                    {!multiple ? 
                        <Input 
                            {...props}
                            multiple
                            ref={ref}
                            id={id2}
                            name={id2}
                            variant='secondary'
                            className={cn(vrs({ invalid, type, size }) , type == 'password' ? 'pr-[35px]' : null , className)}
                            onKeyUp={handleInput}
                            placeholder={ loading ? '' : placeholder}
                            type={ttype}
                            invalid={invalid.toString()}
                            onChange={handleChange2}
                        /> 
                        : 
                        <Textarea 
                            multiple
                            ref={ref}
                            id={id2}
                            name={id2}
                            variant='secondary'
                            className={cn(vrs({ invalid, type, size }), className, 'overflow-hidden')}
                            onKeyUp={handleInput}
                            placeholder={loading ? '' : placeholder}
                            type={ttype}
                            invalid={invalid.toString()}
                            onChange={handleChange2}
                            value={inputValue}
                        />
                    }
                    {type === 'password' && (
                        <div className='absolute right-[0px] h-full border-l-[2px] border-solid border-accent'>
                            <SwapIconButton 
                                outline={false} 
                                icon1={<EyeOff className='text-blue-500' />} 
                                icon2={<Eye className='text-blue-500' />} 
                                className='self-center'
                                onClick={handleClick}
                                ripple={false}
                            />
                        </div>
                    )}
                </div>
                {description && <TinnyHelp info={ loading == 'true' ? 'Loading...' : extraInfo} />}
                { loading == 'true' && (
                    <div className='absolute top-[3px] left-2'>
                        <Spinner text=' ' className='w-[30px] h-[30px]' />
                    </div>
                )}
            </div>
        </div>
    )
})
