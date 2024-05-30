// @ts-nocheck
import React , {forwardRef} from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ScrollArea } from './ScrollArea'
import { Separator } from '../ui/separator'
import './Sub_Components/styles.css'

const vrs = cva(
    "relative" ,
    {
        variants : {
            padding : {
                true : "p-1.5",
                sm : 'p-1' ,
                lg : 'p-2' ,
                xl : 'p-5' ,
            } ,
            resizable : {
                true : "resize overflow-auto" ,
                y : "resize-y overflow-auto" ,
                x : "resize-x overflow-auto" ,
            },
            color : {
                primary : 'bg-card' ,
                secondary : 'bg-accent',
            } ,
            border : {
                true : 'rounded-lg border-[1.5px] border-solid border-muted' ,
                blue : 'rounded-lg border-[2px] border-solid border-blue-500' ,
            } ,
            shadow : {
                true :'shadow-lg',
                sm  : 'shadow-sm' ,
                xl  : 'shadow-xl' ,
                xxl  : 'shadow-2xl' ,
            }
        } ,
        defaultVariants : {
            border : true ,
            padding : 'lg' ,
            color : 'primary' ,
        }
    }
)

export const Container = forwardRef( (props, ref) => {

    const { children , title , className , shadow  , padding , border , resizable } = props;

    return (
        <div ref={ref}
            {...props}
            className={cn(vrs({padding,border , shadow ,resizable}) , className )}
        >   
            <div className='flex flex-col w-full h-full' >
                    {
                        title ? 
                            <div>
                                <h4 className='pb-2 font-Roboto font-bold' >{title}</h4>
                                <Separator />
                            </div> 
                        : null
                    }
                    <ScrollArea className='w-full h-full overflow-auto'  >
                        <div>
                            {children}
                        </div>
                    </ScrollArea>
            </div>
        </div>
    )
})