// @ts-nocheck

import React, { useState , useEffect } from 'react'
import { Button } from '@/components'
import Checkbox from '@mui/joy/Checkbox';



export const PrimaryFooter = (props) => {
    const {
        autoAccept,
        autoDecline,
        onAccept,
        onDecline,
        extraButtons,
        removeFromQueue,
        acceptButtonParams,
        queue,
        id,
        confirm,
        acceptLabel,
        declineLabel,
        declineButtonParams
    } = props

    const [ countDown , setCountDown] = useState(10)
    const [ countDownAccept , setCountDownAccept] = useState(10)
    const [ intervalOfDecline , setIntervalOfDecline ] = useState(null)
    const [ intervalOfAccept , setIntervalOfAccept ] = useState(null)
    const [ skipAllNextMessages , setSkipAllNextMessages] = useState(false)


    useEffect( () => {
        if( autoDecline ){
            const s = setInterval( () => {
                if ( countDown != 0 ){
                    setCountDown( prev => prev - 1 )
                }
            } , 1000 )
            setIntervalOfDecline(s)
        }
        if( autoAccept ){
            const s = setInterval( () => {
                if ( countDownAccept != 0 ){
                    setCountDownAccept( prev => prev - 1 )
                }
            } , 1000 )
            setIntervalOfAccept(s)
        }
        return() => {
            if ( intervalOfDecline ){
                clearInterval(intervalOfDecline)
            }
            if ( intervalOfAccept ){
                clearInterval(intervalOfAccept)
            }
        }
    } , [autoDecline,autoAccept,id])

    function handleOnClick(){
        removeFromQueue(skipAllNextMessages)
    }
    
    useEffect( () => {
        if ( countDown == 0 || countDownAccept == 0 ){
            removeFromQueue(false)
            if ( autoAccept ){
                onAccept()
                setCountDownAccept(10)
            }
            if ( autoDecline ){
                onDecline()
                setCountDown(10)
            }
        }
    } , [countDown,countDownAccept])

    console.log(acceptButtonParams.variant)

    return (
        <div className='flex justify-end absolute bottom-0 items-center h-[60px] w-full px-2 space-x-2 z-auto bg-white'>
            <div className='w-full relative flex-wrap flex'>
                {
                    confirm ? 
                    <Button  variant={acceptButtonParams.variant || 'ghost'} onClick={()=>{handleOnClick(queue);onDecline(props)}} >
                    {
                        autoDecline ? `${declineLabel}(${countDown}) `: declineLabel
                    }
                    </Button> : null
                }
                
                <Button className={'min-w-[80px]'} variant={acceptButtonParams.variant || 'ghost'}  onClick={()=>{handleOnClick();onAccept(props)}} >
                    {
                        autoAccept ? `${acceptLabel}(${countDownAccept}) `: acceptLabel
                    }
                </Button>

                <div className='relative '>
                    {
                        queue.length > 5 ? <Checkbox onChange={(e) => {
                            setSkipAllNextMessages(e.target.checked)
                        }} label={`Skip all next messages(${queue.length})`} /> : null
                    }
                    {
                        extraButtons.map ( item => {
                            return item
                        })
                    }
                </div>
            </div>
        </div>
    )
}

