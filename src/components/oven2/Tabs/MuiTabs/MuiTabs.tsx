// @ts-nocheck
import React, { useState , useRef, useEffect, memo , forwardRef , useContext  } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../fonts/openSans/stylesheet.css'
import '../fonts/nokia/nokia-fonts.css'
import '../colors/palette.css'
import { TabsContext } from '../AIOTabs/AioTabs';
import { Stack } from '@mui/material';
export default function MuiTabs({data , onChange }) {

    const {AioOptions} = useContext(TabsContext)
    const ref = useRef()
    const [tabs, setTabs] = useState([]);
    const [ lastIndex , setLastIndex ] = useState(0)
    const [options, setOptions] = useState({
        accessLabelBy: 'label',
        firstSelected: false , 
        selectedIndex : 0
    });

    function handleChange(e,v){
    }

    function updateTabSelection(index){
        setOptions( prev => ({...prev , selectedIndex : index }))
        setLastIndex( prev => index )
        
    }

    function selectTab(index){
        updateTabSelection(index)
    }

    useEffect( () => {
        setTabs( prev => data )
        data.map( (item , index ) => {
            if ( item.defaultChecked ){
                updateTabSelection(index)
                triggerOnChangeEvent( {} , item , index )
                return index
            }
        })

    } , [data])

    function handleOnClick(e,index,t){
        if ( t.disable ){ return }
        setLastIndex( prev => {
            prev != index  ? triggerOnChangeEvent(e,t,index) : null
            if( t.clickOnly ){
                return prev
            }
            return index
        })
    }

    function triggerOnChangeEvent(e,t,index){
        if ( onChange ){
            t.event=e
            t.index = index
            t.element = e.target
            onChange(t)
        }
    }

    return (
        <div ref={ref} className='oven-c-tabs'>
            <Stack direction={'row'} justifyContent={AioOptions.center ? 'center' : null }>
                <Tabs
                    onChange={handleChange}
                    value={lastIndex}
                    variant="scrollable"
                >
                    {
                        tabs.map((t, i) => (
                            <Tab 
                                onClick={(e)=>{handleOnClick(e,i,t)}} 
                                key={'o__' + i}
                                disabled={t.disable}
                                label={t.label}
                                sx={{fontFamily : 'Roboto' , color : 'var(--oven-mid-blue)' , 'cursor' : t.disable ? 'not-allowed' : null  }}
                                style={{maxWidth : '150px' , paddingLeft: '10px' , paddingRight : '10px'}}

                        />
                        ))
                    }
                </Tabs>
            </Stack>

        </div>

    )
}
