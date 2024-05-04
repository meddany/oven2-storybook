// @ts-nocheck
import React, { memo, useRef } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function SingleTab({i,t,label,onClick}) {

    function handleOnClick(e,i,t){
        onClick(e,i,t,ref)
    }

    const ref = useRef()
    return (
        <Tab 
            onClick={(e)=>{handleOnClick(e,i,t)}} 
            domRef={ref}
            key={'o__' + i}
            >{label}
        </Tab>
    )
}

export default memo(SingleTab)
