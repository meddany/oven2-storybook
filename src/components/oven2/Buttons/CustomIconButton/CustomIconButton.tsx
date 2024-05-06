// @ts-nocheck
import React, { useEffect ,useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import './base.css'

export default function CustomIconButton(props) {

    const [mode , setMode ] = useState(null)
    const [ defaultClasses , setDefaultClasses ] = useState([])
    const [ disable , setDisable ] = useState(false)
    useEffect( () => {
        if ( props.icon ){
            if ( props.icon.$$typeof == undefined){setMode('image')}
            else if (props.icon.$$typeof.toString() == 'Symbol(react.element)') setMode('react')
            else { setMode('image') }
        }
    } , [props.icon])


    useEffect( () => {
        if (props.disable == true ){
            setDefaultClasses( prev => ([...prev , 'oven-disable']))
            setDisable( true )
        }
    } , [props.disable])

    return (
        <Tooltip title={props.title} >
            <IconButton 
                style={props.styles}
                className={defaultClasses.join(' ')}
                disabled={disable}
                onClick={ (e) => {
                    props.onClick(e)
                    }
                }
            >

            {
                mode != 'react' ? 
                    <div className={'custom-icon-btn'} >
                        <img alt={props.title} className='custom-icon-btn-icon' src={props.icon} />
                    </div>
                            
                    : props.icon
            }

            </IconButton>
        </Tooltip>
    )
}
