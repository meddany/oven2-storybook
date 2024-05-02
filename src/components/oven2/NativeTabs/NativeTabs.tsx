// @ts-nocheck
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React, { useState , useRef, useEffect, memo , forwardRef } from 'react'
import './style.css'
import '../fonts/openSans/stylesheet.css'
import '../fonts/nokia/nokia-fonts.css'
import '../colors/palette.css'
import SingleTab from './SingleTab';

const NativeTabs = ({data , onChange }) => {
    const [tabs, setTabs] = useState([]);
    const ref = useRef()
    const [ lastIndex , setLastIndex ] = useState(0)
    const [options, setOptions] = useState({
        accessLabelBy: 'label',
        firstSelected: false , 
        selectedIndex : 0 ,
    });
    const api = useRef({
        selectTab : selectTab
    })

    function selectTab(index){
        updateTabSelection(index)
    }

    function updateTabSelection(index){
        setOptions( prev => ({...prev , selectedIndex : index }))
        setLastIndex( prev => index )
        
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

    function triggerOnChangeEvent(e,t,index){
        if ( onChange ){
            t.event=e
            t.index = index
            t.element = e.target
            onChange(t)
        }
    }

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
    function test(s){ 
    }
    return (
        <div ref={ref} className='oven-c-tabs'>
            <Tabs onSelect={test} selectedIndex={lastIndex}>
                <TabList>
                    {tabs.map((t, i) => (
                        <Tab 
                            onClick={(e)=>{handleOnClick(e,i,t)}} 
                            key={'o__' + i}
                            disabled={t.disable}
                            style={{'cursor' : t.disable ? 'not-allowed' : null }}
                        >{t.label}
                        </Tab>
                    ))}
                </TabList>
            </Tabs>
        </div>
    );
}

export default NativeTabs