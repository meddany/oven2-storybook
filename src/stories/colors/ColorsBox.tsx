// @ts-nocheck
import React from 'react'
import Headline from '../../components/oven2/Headlines/Headline';
import '../../components/oven2/colors/palette.css'
import { Stack } from '@mui/material';
import MarginBox from '../../components/oven2/MarginDiv/Margin';

const cssVariables = [
    { name: 'oven-light-gray', value: '#ecebeb' },
    { name: 'oven-pure-white', value: '#fff' },
    { name: 'oven-nice-blue', value: '#1288fd' },
    { name: 'oven-nice-darker-blue', value: '#005ec8' },
    { name: 'oven-mid-gray', value: '#d0d0d0' },
    { name: 'oven-mid-blue', value: '#1e446e' },
    { name: 'oven-light-blue', value: '#4b8dd1' },
    { name: 'oven-middle-blue-green', value: '#58a79f' },
    { name: 'oven-alice-blue', value: '#d8eff6' },
    { name: 'oven-danger-red', value: '#e74c53' },
    { name: 'oven-powerful-red', value: '#f44225' },
    { name: 'oven-huge-red', value: '#ea1210' },
    { name: 'oven-cute-red', value: '#f1626e' },
    { name: 'oven-light-red', value: '#f1626e70' },
    { name: 'oven-teal-light-green', value: '#06f9d6' },
    { name: 'oven-teal-mid-green', value: '#00dcb4' },
    { name: 'oven-teal-dark-green', value: '#00aa99' },
    { name: 'oven-black-blue', value: '#0e1f3c' },
    { name: 'oven-baby-blue', value: '#c7e2ff' },
    { name: 'oven-dark-gray-2', value: '#49546e' },
    { name: 'oven-disable', value: '#888' }
  ];

export default function ColorsBox() {
    return (
        <div>
            <Headline>Oven 2 colors </Headline>
            <Stack direction={'row'} flexWrap={'wrap'} spacing={2} >
            {
                cssVariables.map( (item , index ) => {
                    return (
                        <div key={index}>
                            <div style={{background : `var(--${item.name})` , width : 'auto' , padding : '10px 10px 5px 10px' , height : '30px' , marginLeft : '20px' , borderRadius : '300px' , marginTop : '20px' }}>
                                <Headline userselect={true} >{`var(--${item.name})`}</Headline>
                                <Headline padding={30} userselect={true} >{item.value}</Headline>
                            </div>
                        <MarginBox margin={10} />
                        </div>
                    )
                })
            }
            </Stack>
        </div>
    )
}
