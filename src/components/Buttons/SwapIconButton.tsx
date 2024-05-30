// @ts-nocheck
import React, { forwardRef, useEffect , useState } from 'react'
import { IconButton } from '../../components/Buttons/IconButton'

export const SwapIconButton =  forwardRef( (props, ref) => {
    const [ icon , setIcon ] = useState([])
    const [ state , setState ] = useState('')
    const [ stateIndex , setStateIndex ] = useState(1)
    const { icon1 , icon2 , tooltip1 , tooltip2 , onClick } = props;

    useEffect( () => {
        setIcon(icon1)
        setState(tooltip1)
    } , [] )

    return (
        <div ref={ref}>
            <IconButton 
                icon={ icon ? icon : null }
                tooltip={state}
                onClick={() => {
                    icon == icon1 ? setIcon(icon2) : setIcon(icon1)
                    state == tooltip1 ? setState(tooltip2) : setState(tooltip1)
                    if( onClick ){
                        const nState = stateIndex == 1 ? 2 : 1
                        onClick(nState)
                        setStateIndex(nState)
                    }
                }}
            />
        </div>
    )
})