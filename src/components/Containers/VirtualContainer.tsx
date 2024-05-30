// @ts-nocheck
import React, { forwardRef, useState } from 'react'
import { FixedSizeList as List } from 'react-window';
import { convertNumberToArray } from '../utils/utils';
import { Input } from '../'

const items = Array(1000).fill().map((_, index) => `Item ${index + 1}`);


const Row = ({ index, style }) => {

    const [ value , setValue ] = useState('test')


    return (
        <div style={style}>
            <Input value={value} type='email' />
          {items[index]}
        </div>
      );
}

export const VirtualContainer = forwardRef( (props, ref ) => {

    return (
        <div {...props} ref={ref} >
            <List
            height={400} // The height of the virtualized list container
            itemCount={100} // The total number of items in the list
            itemSize={30} // The height of each item
            width={300} // The width of the virtualized list container
            >
                {Row}
            </List>
        </div>
    )
})


