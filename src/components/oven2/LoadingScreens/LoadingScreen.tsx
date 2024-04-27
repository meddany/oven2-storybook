//@ts-nocheck

import { Loading } from "@nextui-org/react";
import React , {useState, useEffect, useContext , useRef } from 'react'
import GlobalContext from "@/components/Contexts/GlobalContext";
import '@/oven/fonts/Roboto/Roboto.css'
import Dialog from '@mui/material/Dialog';


const LoadingScreen = () => {

    const [ visible , setVisible] = useState(false)
    const [ message , setMessage ] = useState("Loading...")
    const [ view , setView ] = useState(false)
    const { anyloading } = useContext(GlobalContext)
    const onScreen = useRef(false)

    useEffect( () => {
        setView(visible)
    } , [visible])

    const stop = function(data){
        if ( data == undefined ){
            data = {'force' : true }
        }
        else {
            data.force = true
        }
        
        anyl(data)
    }

    const anyl = function(data){

        if (onScreen.current == true ){
            setVisible(true)
        }

        if ( data == undefined ){var data = {}}

        if (data.force == false || data.force == undefined ){
            var s = ! visible
            onScreen.current = s
            setVisible(s)
        }
        else if (data.force == true ){
            setVisible(false)
            onScreen.current = false
        }




        if ( data.message != undefined ) {
            setMessage(data.message)
        }
        else {
            setMessage("Loading...")
        }

        
        return s
    }

    window.anyLoading = anyl
    anyloading.start = anyl
    anyloading.stop = stop

    const style3 = {
        width : '100px',
        height : '110px',
        display : 'flex' ,
        alignItems : 'center',
        justifyContent : 'center' ,
        backgroundColor : 'white',
        zIndex : 3 ,
        fontFamily : 'Roboto' ,
        borderRadius : '10px'
    }


    return (

        <>
            <React.Fragment>
                <Dialog
                    open={view}
                >   
                    <div style={style3} >
                        <Loading>{message}</Loading>
                    </div>
                    
                </Dialog>
            </React.Fragment>
        </>
    )
}

export default LoadingScreen