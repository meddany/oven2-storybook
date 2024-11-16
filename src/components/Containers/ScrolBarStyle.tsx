/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react'
import '../Containers/Sub_Components/ScrolBarStyle.css'

export const ScrolBarStyle = (props) => {
    const { children } = props;

    return (
        <div {...props}  className='custom-scroll-bar1' >
            {children}
        </div>
    )
}