// @ts-nocheck

import React , {useState , useEffect , useRef , useCallback  } from 'react'
import { Stack } from '@mui/material';
import Headline from '../Headlines/Headline';
import '../colors/palette.css'
import './simple-card-box.css'
import MenuItem from '@mui/material/MenuItem';

export default function SimpleCardCheckbox(props) {

    
    const element = useRef(null)
    const checkboxRef = useRef(null)
    const [header , setHeader ]= useState('')
    const [desc , setDesc ]= useState('')
    const [defaultChecked  , setDefaultChecked ] = useState(false)
    const [stateChanged , setStateChanged] = useState(defaultChecked)
    const [mode , setMode ] = useState('horz')
    const [radius , setRadius ] = useState(50)

    useEffect( () => {
        if (props.block){
            setMode('vert')
            setRadius(2)
        }
    } , [props.block])


    useEffect( () => {
        if (mode){

            if ( mode == 'vert'){
                
                if (element.current){
                    element.current.classList.add('mode-vert')
                }
            }

        }
    } , [mode])


    function checkedIcon(){
        return(
            <img className='oven-icon-position' alt='checked-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABuUlEQVR4nNWXv0pDMRTGM+lDOIgKYnF2cao+gjq6aaGVVvAPV6gP0E5OgpPaDm6CL+BiK1qnqyAt6CAtDUhtA6L7p6e510btLalNGwx8cMlN8v1OchISxrzyAAxzgXUuUKgKvHMBmJQ3ZoELJMiLqaVSxwhv4Na0aaAacMmzFfkgzRWI5kx40w5LihPAjUWAa1YVeLMFQN7MYvRNsX8HkCsCTgaYSwJTMSn6pjr61zeAcg3YOATGVoHRlfYajwBbR7KtUYByDVhIBRv/1GJaH4LpNKLIdc19bR8bAsgV5dR2C0B98iUDAE5Gz3DWAc4KwMxmq4769gwQTuqZu0/A+R0wGW3Vz+8aAAit/U4wdVZU8+n497bU1zjA8h5QqQOp087mxgDCbZYgeiAhHp+DzY0tgZNtP3hkHzi5CDYn7WQNAORLf9+Glya2IRfyeO0WQGcLagPQsUrZr2u+lAYqLwYBuAdBx2un5ZiIyMh1zbsCUHOCTCjDQzEp+qaE01nzngG4YTHrAFW7l9JX+9dyLpCwCBD3n2buwM0bcO+BIfVxOjgI9XHqF6KhKaF16UdiemNekcdX5J/GH9+6DkMrvqrIAAAAAElFTkSuQmCC"></img>
        )
    }
    
    useEffect( () => {
        if (props.desc){
            setDesc(props.desc)
        }
    } , [props.desc])

    useEffect( () => {
        if (props.header ){
            setHeader(props.header)
        }

        if (props.defaultChecked){
            setDefaultChecked(true)
            toggleBox(true)
            setStateChanged(true)

        }

    } , [props.header])


    useEffect( () => {
        console.log(props.header , '  ' , defaultChecked)
        toggleBox(defaultChecked)
    } , [defaultChecked])

    function toggleBox(checked){
        if (checked){element.current.classList.add('over-simple-card-wrappe-selected')}
        else if ( ! checked){element.current.classList.remove('over-simple-card-wrappe-selected')}
    }

    function boxChanged(event){
        if ( checkboxRef.current){
            
            if (props.onClick){
                const d1 = {
                    checkbox : checkboxRef.current ,
                    checked : checkboxRef.current.checked ,
                    element : element ,
                    header : header,
                    data : props.data
                }
                props.onClick( d1 , checkboxRef.current.checked )
            }


            const checked = ! checkboxRef.current.checked
            setDefaultChecked(checked)
            toggleBox(checked)
            setStateChanged(checked)
            if (props.onChange){
                const d2 = {
                    checkbox : checkboxRef.current ,
                    checked : checked ,
                    element : element ,
                    header : header ,
                    data : props.data
                }
                props.onChange( d2 , checked )
            }
        }
        
    }


    useEffect( () => {
        if (props.radius){
            setRadius(props.radius)
        }
    } , [props.radius])
    

    return(
        <div >

            <Stack>

                <MenuItem sx={{borderRadius : radius }} ref={element} onClick={boxChanged} className='oven-simple-card-wrapper'>
                    {/* <div ref={element} onClick={boxChanged} className='oven-simple-card-wrapper' > */}
                    
                        <input checked={defaultChecked} onChange={()=>{}} ref={checkboxRef} type="checkbox"  hidden ></input>
                        <Headline className={'oven-input-jsdbu2'}>{header}</Headline>
                    
                        <div className='bottom-j3u1n2'>
                            <Headline padding={0} color='var(--oven-dark-gray)' >{desc}</Headline>
                        </div>


                        <Stack  direction={'row'} alignItems={'center'} justifyContent={'start'} sx={{width : '100%' , height : '60px'}} >
                            {stateChanged ? checkedIcon() : null }
                        </Stack>
                    {/* </div> */}
                
                </MenuItem>
                

                

            </Stack>
        </div>
        


    )
}
