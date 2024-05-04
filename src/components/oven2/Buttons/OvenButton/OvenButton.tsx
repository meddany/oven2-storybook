// @ts-nocheck
import React , { useState, useEffect , useRef , forwardRef  } from 'react'
import { Button } from '@mui/material'
import './oven-buttons.css'
import '../../fonts/nokia/nokia-fonts.css'
import Tooltip from '@mui/material/Tooltip'
import PropTypes from 'prop-types';
import $ from 'jquery'
import CircularProgress from '@mui/joy/CircularProgress';
import {Stack} from '@mui/material'
import '../../colors/palette.css'
import '../../fonts/IBM/ibm-fonts.css'
import { Headline } from '../../Paragraph/Headlines'

function CircularProgressForButtons({defaults}){
    const style = {
        '--CircularProgress-progressColor' : defaults.progressColor
    }
    return (
        <Stack  direction={'row'} spacing={1}>
            <CircularProgress style={style} size="sm" thickness={2} />
            <Headline>{defaults.progressText}</Headline>
        </Stack>
    )
}


function ChildrenAsFlex({children , icon}){
    return (
        <Stack  direction={'row'} spacing={1}>
            { icon ? <div className='slide-fwd-center icon-ov-kw1' >{icon}</div> : null }
            <Headline>{children}</Headline>
        </Stack>
    )
}

const OvenButton = forwardRef( ( { icon , progressColor , progressText , light , disable , bordered , background , color ,title , children , oargs , onClick, progress   }  , ref ) => {

    const [ orignalArgs , setOriginalArgs] = useState({})
    const [ defaults , setDefaults ] = useState({
        light : true , 
        bordered : false ,
        disable : false  , 
        title : '' ,
        background: false ,
        style: ['css-oven-button'] ,
        color : '' ,
        textColor : undefined,
        onClick : () => {} ,
        progress: progress || false ,
        progressText : progressText || 'submitting ...' ,
        progressColor : progressColor || 'var(--oven-mid-blue)' ,
        icon: icon || null ,
        ref : ref || useRef() ,
    })
    
    function handleClick(event){
        console.log(defaults)
        if ( progress){return}
        defaults.onClick(event , defaults.ref )
    }

    function handleProgress(value){
        setDefaults( prev => ({...prev , progress : value}))
    }

    useEffect( () => {
        if ( defaults.ref ){
            defaults.ref.current.updateParams = setDefaults
        }
    } , [defaults.ref ])

    useEffect( () => {
        if ( oargs ){ setOriginalArgs( prev => ({ ...prev , ...oargs }))}
    } , [oargs])

    useEffect(() => {
        if ( disable ){ setDefaults( prev => ({...prev , disable : true })) ; return }
        color ? setDefaults( prev => ({...prev, color : color })) : setDefaults( prev => ({...prev, color : undefined }))
        light ? $(defaults.ref.current).addClass('css-light-j7fh31') : $(defaults.ref.current).removeClass('css-light-j7fh31')
        disable ? setDefaults( prev => ({...prev , disable : true })) : setDefaults( prev => ({...prev , disable : false }))
        background ? $(defaults.ref.current).addClass('css-background-oven-button-jh2b2g12') : $(defaults.ref.current).removeClass('css-background-oven-button-jh2b2g12')
        bordered ? $(defaults.ref.current).addClass('css-bordered-oven-button-jh2bg12') : $(defaults.ref.current).removeClass('css-bordered-oven-button-jh2bg12')
        onClick ? setDefaults( prev => ({...prev , onClick : onClick})) : setDefaults( prev => ({...prev, onClick : () => {} }) )
        title ? setDefaults( prev => ({...prev , title : title})) : setDefaults( prev => ({...prev, title : '' }) )
        progress ? setDefaults( prev => ({...prev , progress : progress})) : setDefaults( prev => ({...prev, progress : false }) )
        progressText ? setDefaults( prev => ({...prev , progressText : progressText})) : setDefaults( prev => ({...prev, progressText : 'Submitting' }) )
        progressColor ? setDefaults( prev => ({...prev , progressColor : progressColor})) : setDefaults( prev => ({...prev, progressColor : 'var(--oven-mid-blue)' }) )
    }, [ defaults.ref , light , disable , background , color , onClick , title , bordered , progress ]);


    return (
        <>
            <Tooltip ref={defaults.ref} title={defaults.title}>
                <Button  
                    
                    style={{
                        backgroundColor : defaults.color ? defaults.color : null , 
                        cursor : defaults.disabled ? 'not-allowed' : 'pointer'  ,
                        borderRadius : '2px' ,
                    }} 
                    className='slide-fwd-center'
                    disabled={defaults.disable} 
                    onClick={handleClick}
                    >
                    { defaults.progress ? <CircularProgressForButtons  icon={icon}  defaults={defaults} />  : <ChildrenAsFlex icon={icon} children={children} /> }
                </Button>
            </Tooltip>
        </>
    )

} ) 

export default OvenButton


