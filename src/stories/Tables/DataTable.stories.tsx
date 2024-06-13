// @ts-nocheck
import React , { useRef } from 'react';
import { DataTable } from '@/components';
import { data } from '@/components/playground-data/datatableitems'

export default {
  title: 'Components/DataTable',
  component: DataTable,
  args: {
    // dataset : 
  },
}


const Template = (args) => {
    return (
        <>
            <div className='w-[95vw] h-[95vh] relative' >
                <DataTable  
                  {...args} />
            </div>
        </>
    );
}

export const Basic = Template.bind({});
Basic.args={
  tablename : 'Basic Table Name' ,
  menuItems : [] ,
  enableMultiRowSelection: true ,
  autoRefresh : (callback) => {
    console.log('auto refresh triggered ...' , callback )
  } ,
  autoRefreshPeriod: 10000,
  onRefresh : (callback) => {
    console.log('manual refresh triggered ...' , callback)
  } ,
  onRowClick : (e,row , callback) => {
    console.log('row selected triggered ... ' , e,row,callback)
  } ,
  onRowDoubleClicked : (e,row , callback) => {
    console.log('row double clicked triggered ... ' , e,row,callback)
  },
  onDataChange : (e,data,callback) => {
    console.log('data change triggered ...' , e, data, callback)
  } ,
  dataset: data
}
