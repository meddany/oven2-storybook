// @ts-nocheck
import React , { useRef , useState} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function OvenTab(props) {

    const _ref = useRef(props)

    return (
        <Tab _ref={_ref} >{props.label}</Tab>
    )
}
