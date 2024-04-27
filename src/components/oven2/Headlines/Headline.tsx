// @ts-nocheck
import React, { useEffect , useState} from 'react'
import '../fonts/nokia/nokia-fonts.css'

export default function Headline(props) {

    const [ size , setSize ] = useState('16px')
    const [ userSelect , setUserselect ] = useState('none')
    const [ oargs , setOargs ] = useState({})
    const [ fontFamily , setFontFamily ] = useState('nokia_pure_headlineregular')

    useEffect( () => {
        if (props.size == undefined){setSize('16px')}
        else if (props.size == 'xsmall'){setSize('13px')}
        else if (props.size == 'small'){setSize('16px')}
        else if (props.size == 'mid'){setSize('18px')}
        else if (props.size == 'large'){setSize('22px')}
        else if (props.size == 'xlarge'){setSize('24px')}
        if ( props.oargs ){setOargs( prev => ({ ...prev , ...props.oargs })) }
        if (props.userselect == true ){setUserselect('text')}
        else {setUserselect('none')}
        if ( props.fontFamily ){ setFontFamily( props.fontFamily ) }
        if ( props.textPixel && props.textPixel != 0 ){ setSize( props.textPixel + 'px' ) }
    } , [props.size  , props.oargs , props.userselect , props.fontFamily , props.textPixel  ])

  return (
    <label {...oargs}  className={props.className} style={{ ...oargs ,  fontSize: size , fontFamily , position:'relative' , paddingLeft : props.padding  , userSelect : userSelect , pointerEvents : 'none' , color : props.color}} >{props.children}</label>
  )
}
