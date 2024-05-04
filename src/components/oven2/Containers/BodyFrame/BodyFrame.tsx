// @ts-nocheck
import React, { forwardRef , useState , useRef  } from 'react'


const uiClasses = ['app-frame-sub-container-body']

export const BodyFrame = forwardRef( (props, ref) => {
    
    const { bodyClasses , bgcolor , children } = props
    const [ defaults , setDefaults ] = useState({
        ref : ref ? ref : useRef() ,
        bgcolor : bgcolor ? bgcolor : '#fff' ,
        bodyClasses : bodyClasses ? bodyClasses : []
    })

    function getUiClasses(){
        return uiClasses.concat(defaults.bodyClasses).join(' ')
    }

    return(
        <div ref={ref} className={getUiClasses()}>
            {children}
        </div>
    )

})

