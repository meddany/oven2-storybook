// @ts-nocheck
import React, { useEffect, useState } from 'react'
import CollapsableContainerContext from './CollapsableContainerContext';
import CollapsableContainer from './CollapsableContainer';
import { getRandomId } from '@/commons/common';

export default function MultiCollapsableContainer(props) {
    
    const [ containers , setContainers ] = useState([])
    const [ currentPanel , updateCurrentPanel ] = useState('')

    useEffect( () => {
        if ( props.containers){
            setContainers(prev => props.containers )
        }
    } , props.containers)

    return (

        <CollapsableContainerContext.Provider value={{currentPanel , updateCurrentPanel}} >
            {
                containers.map( ( item , i ) => {
                    return(
                        <CollapsableContainer panel={'panel'+i}  key={getRandomId()} className={'no-border'} header={item.header} onClicl={item.onClick}   >
                            {props.children}
                        </CollapsableContainer>
                    )
                })
            }
         </CollapsableContainerContext.Provider>
    )
}
