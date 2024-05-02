// @ts-nocheck
import React from 'react'
import './ErrorContent.css'
import Stack from '@mui/material/Stack'
// import Logo from '@/img/error.webp'

export default function ErrorContent(props) {
  return (
    <Stack className='error-boundy' direction='row' alignItems={'center'} justifyContent={'center'} style={{
        position : 'absolute' , 
        width : '100%' , 
        height : '100%',
    }} >
        <div className="wrapper">
            <div className="landing-page">
            <div style={{textAlign: 'center'}} className="error-holder icon__download">
                {/* <img alt='error-logo' src={Logo}></img> */}
            </div>
            {/* <h1>501 ERROR</h1> */}
            
            <div className='error-box' >
                <p>INTERNAL SYSTEM ERROR 
                    <br/><br/>Hint : {props.error}</p>
            </div>
            
            </div>
        </div>

    </Stack>
  )
}
