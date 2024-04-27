//@ts-nocheck
import React from 'react'
import './paper.css'


export default function Paper(props) {
  
  var btns
  if (props.btns === undefined) {
    btns = []
  }
  else {
    btns = props.btns
  }

  return (
    <div>
        <div   style={{'width' : '100%' , 'height' : '100%' , 'position'  : 'absolute' , 'zIndex' : 350 ,
            'display' : 'flex' , 
            'alignItems' : 'center' , 
            'justifyContent' : 'center' ,
            'backgroundColor' : 'rgba(79, 79, 79, 0.5)'
            }}>
               

            {/* start */}
            <div className='manage-col-paper paper-container' style={props.style} >

                {/* insert the close button to close the paper */}
                {props.closeButton}

                <h3 style={{marginTop : '10px'}} >{props.papername}</h3>
                <div className='content'>
                    {/* paste your content or draw it here please. */}
                    {props.element}
                </div>
                    {/* Div contains manager col buttons */}
                    <div className='manage-col-btns-container' style={{'marginTop' : '5px'}} >
                        {
                        btns.map( (item) => item )
                        }
                    {props.closeBtn}
                    </div>
            </div>
        </div>
      
    </div>
  )
}
