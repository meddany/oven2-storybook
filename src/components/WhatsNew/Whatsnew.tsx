// @ts-nocheck
import React, { forwardRef } from 'react'
import { Panel } from '../Containers/Panel'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import './style.css'
import Autoplay from "embla-carousel-autoplay"

export const Whatsnew = forwardRef( (props,ref)=>{

    const { items, autoplay , delay } = props

    const injectPlugins = () => {
        if( autoplay ){
            return [Autoplay({delay: delay || 2000 })]
        }
        return []
    }

    return(
        <div ref={ref} className='w-[calc(100%-200px)] h-full flex items-center ml-20 rounded-t-xl  relative' >
            <Carousel plugins={injectPlugins()} className="w-full h-full">
                <CarouselContent>
                    {
                        items.map( (item,index) => {
                            return (
                                <CarouselItem key={index}>
                                    <div className='grid' >
                                        <div className='cursor-grab grid-area-1-1 w-full h-full grid relative'>
                                            <img className={`object-cover w-full h-[30vh] rounded-top object-[${item.position}]`} alt='1' src={item.src} />
                                        </div>
                                    </div>
                                    <Panel header={item.header} className={'h-full'}>

                                    </Panel>
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent  >
            <CarouselPrevious className='relative top-0 left-0' />
            <CarouselNext className='relative top-0 left-0' />
            </Carousel>
        </div>
    )
})