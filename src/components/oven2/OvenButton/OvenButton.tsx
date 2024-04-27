// @ts-nocheck
import React , { useState, useEffect , useRef  } from 'react'
import { Button } from '@mui/material'
import './oven-buttons.css'
import '../fonts/nokia/nokia-fonts.css'
import Tooltip from '@mui/material/Tooltip'
import PropTypes from 'prop-types';
import $ from 'jquery'

export default function OvenButton({ light , disable , bordered , background , color ,title , children , oargs , onClick   }) {

    const [ orignalArgs , setOriginalArgs] = useState({})

    const [ defaults , setDefaults ] = useState({
        light : true , 
        bordered : false ,
        disable : false  , 
        title : '' ,
        ref : useRef() ,
        background: false ,
        style: ['css-oven-button'] ,
        color : '' ,
        textColor : undefined,
        onClick : () => {} 
    })
    
    function handleClick(event){
        console.log(defaults)
        defaults.onClick(event , defaults.ref )
    }


    useEffect( () => {
        if ( oargs ){ setOriginalArgs( prev => ({ ...prev , ...oargs }))}
    } , [oargs])

    useEffect(() => {
        console.log(bordered)
        if ( disable ){ setDefaults( prev => ({...prev , disable : true })) ; return }
        color ? setDefaults( prev => ({...prev, color : color })) : setDefaults( prev => ({...prev, color : undefined }))
        light ? $(defaults.ref.current).addClass('css-light-j7fh31') : $(defaults.ref.current).removeClass('css-light-j7fh31')
        disable ? setDefaults( prev => ({...prev , disable : true })) : setDefaults( prev => ({...prev , disable : false }))
        background ? $(defaults.ref.current).addClass('css-background-oven-button-jh2b2g12') : $(defaults.ref.current).removeClass('css-background-oven-button-jh2b2g12')
        bordered ? $(defaults.ref.current).addClass('css-bordered-oven-button-jh2bg12') : $(defaults.ref.current).removeClass('css-bordered-oven-button-jh2bg12')
        onClick ? setDefaults( prev => ({...prev , onClick : onClick})) : setDefaults( prev => ({...prev, onClick : () => {} }) )
        title ? setDefaults( prev => ({...prev , title : title})) : setDefaults( prev => ({...prev, title : '' }) )
    }, [ defaults.ref , light , disable , background , color , onClick , title , bordered  ]);

    return (
        <>
            <Tooltip ref={defaults.ref} title={defaults.title}>
                <Button  
                    {...orignalArgs } 
                    style={{
                        backgroundColor : defaults.color ? defaults.color : null , 
                        cursor : defaults.disabled ? 'not-allowed' : 'pointer'  ,
                        borderRadius : '2px' ,
                    }} 
                    disabled={defaults.disable} 
                    onClick={handleClick}
                    >
                    {children}
                </Button>
            </Tooltip>
        </>
    )
}


