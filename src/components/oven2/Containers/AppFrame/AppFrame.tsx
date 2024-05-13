// @ts-nocheck
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import './styles.css'
import { Topbar } from '../Topbar'
import { Body } from '../BodyFrame'
import { Footer } from '../Footer'
import '../../OvenScrollbar/OvenScrollbar.css'

const uiClasses = ['app-frame-main-container-body']


export const AppFrame = forwardRef( (props, ref) => {

    const { title , enableCustomScrollbar , topbarContent , bodyContent , footerContent ,callback , footerRef ,footerHeight ,footerColor , footer  , topbarClasses , bodyClasses , frameClasses , bodyRef , body , topbarRef , topbarColor ,bgcolor , topbar , width , height , topbarHeight  } = props ;
    const [ defaults , setDefaults] = useState({
        ref : ref ? ref : useRef({}) ,
        topbarRef : topbarRef ? topbarRef : useRef() ,
        bodyRef : bodyRef ? bodyRef : useRef() ,
        footerRef : footerRef ? footerRef : useRef() ,
        topbar : topbar ? topbar : false ,
        bgcolor : bgcolor ? bgcolor : '#fff' ,
        topbarColor : topbarColor ? topbarColor : '#9aa2b3' ,
        footerColor : footerColor ? footerColor : '#9aa2b3' ,
        width : width ? width : '100vw' ,
        height : height ? height : '100vh' ,
        topbarHeight : topbarHeight ? topbarHeight : 40 ,
        footerHeight : footerHeight ? footerHeight : 40 ,
        body  : body ? body : false ,
        footer  : footer ? footer : false ,
        enableCustomScrollbar  : enableCustomScrollbar ? enableCustomScrollbar : false ,
        frameClasses  : frameClasses ? frameClasses : [] ,
        bodyClasses  : bodyClasses ? bodyClasses : [] ,
        topbarClasses  :topbarClasses ? topbarClasses : [] ,
        topbarContent : topbarContent ? topbarContent : null ,
        bodyContent : bodyContent ? bodyContent : null ,
        footerContent : footerContent ? footerContent : null ,
        documentTitle: title ? title : ''
    })

    function getUiClasses(){
        if ( defaults.enableCustomScrollbar ){ uiClasses.push('custom-scroll-bar')}
        return uiClasses.concat(defaults.frameClasses).join(' ')
    }  

    const api = {
            changeDocumentTitle : (title) => {document.title=title},
            options : defaults ,
            updateOption : (key , value) => {
                setDefaults( prev => ({...prev , [key] : value }))
            }
        }


    useEffect( () => {
        if ( defaults.title ){
            api.changeDocumentTitle(defaults.title)
        }
    } , [defaults.title])

    useEffect( () => {
        if (defaults.ref.current){
            defaults.ref.current.api = api
        }
    } , [defaults.ref])

    return (
        <div 
            className={getUiClasses()} 
            style={{background : defaults.bgcolor , width : defaults.width , height : defaults.height  }} 
            ref={defaults.ref}
        >
            {
                topbar 
                    ? 
                    <Topbar 
                        topbarHeight={defaults.topbarHeight} 
                        ref={defaults.topbarRef}
                        bgcolor={defaults.topbarColor}
                        children={topbarContent}
                    /> 
                    : null
            }

            {
                body ? 
                    <Body 
                        bodyClasses={defaults.bodyClasses}
                        ref={bodyRef}
                        children={bodyContent}
                    />
                : null
            }

            {
                footer 
                    ? 
                    <Footer 
                        footerHeight={defaults.footerHeight} 
                        ref={defaults.footerRef}
                        bgcolor={defaults.footerColor}
                        children={footerContent}
                    /> 
                    : null
            }

        </div>
    )

} )
