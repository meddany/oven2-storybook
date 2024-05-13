// @ts-nocheck
import React , { useState, useEffect , useRef , forwardRef  } from 'react'
import { Button } from '@mui/material'
import '../../fonts/nokia/nokia-fonts.css'
import Tooltip from '@mui/material/Tooltip'
import PropTypes from 'prop-types';
import $ from 'jquery'
import './oven-buttons.css'
import CircularProgress from '@mui/joy/CircularProgress';
import {Stack} from '@mui/material'
import '../../colors/palette.css'
import '../../fonts/IBM/ibm-fonts.css'
import { Headline } from '../../Paragraph/Headlines'

function getInlineStyles(defaults){
    const styles = {}
    styles["&:disabled"]={
        cursor: "not-allowed",
        pointerEvents: "all !important",
    }
    styles.fontSize='14px'
    styles.color='var(--oven-black-blue)'
    styles.borderRadius='2px'
    styles.height= '30px'
    if ( defaults.light ){
        styles.backgroundColor= '#fff'
    }
    if ( defaults.danger ){
        styles.color= 'var(--oven-danger-red)'
    }
    if ( defaults.disable ){
        styles.opacity= .3
        styles.cursor= 'not-allowed'
    }
    if ( defaults.bordered ){
        styles.border='2px solid '+defaults.borderColor
    }
    if ( defaults.background ){
        styles.backgroundColor=defaults.background
    }
    return styles
}

function CustomLabel(props){
    const { text , style } = props
    return(
        <label
        style={{
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            color: style.color,
            pointerEvents: 'none',
        }}
        >{text}</label>
    )
}

function CircularProgressForButtons({defaults}){
    const s = getInlineStyles(defaults)
    const style = {
        '--CircularProgress-progressColor' : defaults.progressColor
    }
    return (
        <Stack direction={'row'} spacing={1}>
            <CircularProgress style={style} size="sm" thickness={2} />
            <CustomLabel style={s} text={defaults.progressText} />
        </Stack>
    )
}

function ChildrenAsFlex({children , icon , defaults }){
    const s = getInlineStyles(defaults)
    return (
        <Stack  direction={'row'} spacing={1}>
            { icon ? <div className='slide-fwd-center icon-ov-kw1' >{icon}</div> : null }
            <CustomLabel style={s} text={children} />
        </Stack>
    )
}

const OvenButton = forwardRef( ( {  borderColor , danger , icon , progressColor , progressText , light , disable , bordered , background , color ,title , children , oargs , onClick, progress   }  , ref ) => {

    const [ orignalArgs , setOriginalArgs] = useState({})
    const [ defaults , setDefaults ] = useState({
        light : true , 
        bordered : false ,
        disable : false  , 
        title : '' ,
        background: background ? background : false ,
        style: ['css-oven-button'] ,
        color : '' ,
        textColor : undefined,
        onClick : () => {} ,
        progress: progress || false ,
        borderColor: borderColor || 'var(--oven-nice-darker-blue)' ,
        progressText : progressText || 'submitting ...' ,
        progressColor : progressColor || 'var(--oven-mid-blue)' ,
        icon: icon || null ,
        ref : ref || useRef() ,
        danger : danger ? danger : false
    })
    
    function handleClick(event){
        if ( progress){return}
        defaults.onClick(event , defaults.ref )
    }

    function handleProgress(value){
        setDefaults( prev => ({...prev , progress : value}))
    }

    useEffect( () => {
        if ( defaults.danger){
            setDefaults( prev => ({...prev  , color:'var(--oven-danger-red)' , borderColor : 'var(--oven-danger-red)' }))
        }
    } , [defaults.danger])

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
        bordered ? setDefaults( prev => ({...prev , bordered : true})) : setDefaults( prev => ({...prev , bordered : false}))
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
                    sx={getInlineStyles(defaults)}
                    className='slide-fwd-center'
                    disabled={defaults.disable} 
                    onClick={handleClick}
                    
                >
                    { defaults.progress ? <CircularProgressForButtons  icon={icon}  defaults={defaults} />  : <ChildrenAsFlex icon={icon} defaults={defaults} children={children} /> }
                </Button>
            </Tooltip>
        </>
    )
} ) 

export default OvenButton


