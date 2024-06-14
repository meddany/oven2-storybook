// @ts-nocheck
import React , { useRef , useEffect , useState } from 'react';
import { DataTable , IconButton , ShareIcon } from '@/components';
import { data } from '@/components/playground-data/datatableitems'

export default {
  title: 'Components/DataTable',
  component: DataTable,
  args: {
    // dataset : 
  },
}


const Template = (args) => {
    const [ d , setD ] = useState([])
    const callback = useRef({})

    useEffect ( () => {
      setTimeout( () => {
        setD( prev => data)
      } , 13000)
    } , [] )

    return (
        <>
            <div className='w-[95vw] h-[95vh] relative' >
                <DataTable  
                  {...args} 
                  dataset={d}
                  callback={callback}
                  ref={callback}
                  />
            </div>
        </>
    );
}

export const Basic = Template.bind({});
Basic.args={
  tablename : 'Basic Table Name' ,
  menuItems : [] ,
  toolbarBtns : [
    <IconButton icon={<ShareIcon />} label='Thanks' />
  ] ,
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
  // dataset: data
}
