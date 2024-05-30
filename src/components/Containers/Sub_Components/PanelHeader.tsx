/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { forwardRef , useContext} from 'react'
import { SwapIconButton , IconButton , CloseButton ,ModelContext  } from '../../'
import { cn } from '@/lib/utils'
import { Info } from 'lucide-react';
import $ from 'jquery'

export const PanelHeader = forwardRef( (props, ref ) => {
    const { collapsable , variant , moreInfo , vrs ,  close , iconsOrder , tooltipOrder  } = props
    const { closeModel } = useContext(ModelContext)
    return(
        <div className={'relative flex space-x-2'}>
        {   moreInfo ?
            <IconButton 
            icon={<Info size={16} />}
            tooltip='Show more information.'
            className={cn(vrs({variant}))}
            />
            :null
        }
        {
            close == 'icon' ? 
            <CloseButton onClick={()=>{
                closeModel()
            }} /> 
            : null
        }
        {
            collapsable ?
            <SwapIconButton 
                icon1={iconsOrder[0]}
                icon2={iconsOrder[1]}
                tooltip1={tooltipOrder[0]}
                tooltip2={tooltipOrder[1]}
                onClick={() => {
                    $(ref.current).find('.css-i231').toggle()
                }}
            /> 
            : null
        }
    </div>
    )
})