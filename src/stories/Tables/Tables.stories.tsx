// @ts-nocheck
import PropTypes from 'prop-types'
import { DataTable } from '../../components/oven2'
import { useRef, useState } from 'react'
import { Stack } from '@mui/material'
import { useArgs } from '@storybook/store'
import { Button } from '../../components/oven2'
import { api } from '../../components/oven2/utils/apiGate'

export default {
    title: "Data Table",
    component: DataTable,
}
function getData(){
    return new Promise( async (resolve , reject ) => {
        console.log('getting data from ag-grid json examples ...')
        const engine = api('https://www.ag-grid.com')
        const response = await engine.get('/example-assets/olympic-winners.json')
        resolve(response.data)
    })

}

const Template = args => {
    const callback = useRef({})
    const [ _ , updateArgs ] = useArgs()

    return (
        <Stack style={{width : 'calc(100vw)' , height : 'calc(100vh - 80px)', position : 'relative'}} >
            <Button theme='mui' bordered={true} light={true} children="DO SOMETHING" onClick={() => {
                console.log('refresh table..' , callback)
                getData().then( data => {
                    console.log('data received.')
                    updateArgs({dataset : data })
                })
            }} />
            <DataTable {...args} ref={callback} />
        </Stack>
    )
}

export const AgGridCustomTable = Template.bind({})



AgGridCustomTable.args={
    tablename : 'agGridCustom' ,
    tid:"1211" ,
    hiddenColumns : [] ,
    dataset: [] ,
    toolbarBtns : [] ,
    disableContextMenu:false ,
    menuItems : [] ,
    options : {
        autoGenerateHeaders : true ,
        rowHeight : 30 ,
        headerHeight : 30 ,
        enableContextMenu : true ,
        enableSearch : true ,
        enableOvenFilterLayout: true ,
        enableCustomFooter : true,
        enableToolBar : true,
        enableTitle: true,
        enableTopbar:true,
        rowColor: '#03CEA4',
    } ,
    onRowClick : (e) => {
        console.log( 'row clicked ' , e)
    } ,
    onRefresh: (event) => {
        const l = []
        console.log('table refreshed.')
    } ,
    onGridReady : (e) => {
        console.log( 'onGridReady ' , e)
    } ,
    onRowDoubleClicked: (ref,row) => {
        console.log('row db clicked ' , row )
    },
    onDataChange : (e) => {
        console.log('data changed'  , e)
    }
}