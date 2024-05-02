// @ts-nocheck
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React, { useState , useRef, useEffect } from 'react'
import './style.css'
import '../fonts/openSans/stylesheet.css'
import '../fonts/nokia/nokia-fonts.css'
import '../colors/palette.css'

export default function OvenTabs(props) {

    const [ tabs , setTabs ] = useState([])
    const _ref = useRef( )
    const [ options , setOptions ] = useState({
        accessLabelBy : 'label',
        firstSelected : false 
    })

    useEffect( () => {if ( props.tabs){setTabs( props.tabs)}} , [props.tabs])
    useEffect( () => {if ( props.options){setOptions( prev => ({...prev , ...props.options}) )}} , [props.options])

    function _onChange( index ){
        const item = tabs[ index ]
        if ( props.onChange){
            props.onChange( item[options.accessLabelBy] , item ,  _ref  )
        }
    }

    return (
        <div ref={_ref} className='oven-c-tabs' >
            <Tabs defaultIndex={ options.firstSelected == true ? 0 : -1 }  onSelect={_onChange} >
                <TabList>
                    {
                        tabs.map( ( t , i ) => { return <Tab key={'o__'+i}>{t[options.accessLabelBy]}</Tab> })
                    }
                </TabList>
            </Tabs>
        </div>

    )
}
