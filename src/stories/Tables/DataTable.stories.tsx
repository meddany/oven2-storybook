// @ts-nocheck
import React , { useRef , useEffect , useState } from 'react';
import { DataTable , IconButton , ShareIcon , Button } from '@/components';
import { data , generateCustomData  } from '@/components/playground-data/datatableitems'

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
    const [ h , setH ] = useState('sm')

    useEffect ( () => {
      setTimeout( () => {
        console.log('will pass now dataset ...')
        setD( prev => data)
      } , 1000)
    } , [] )

    return (
        <>   
            <div className='flex space-x-1'>
              <Button onClick={() => {
                const s = h == 'sm' ? 'mid' : 'sm'
                setH( s )
              }} >Toggle Height</Button>

              <Button onClick={() => {
                console.log(callback)
              }} >Print Callback</Button>

              <Button onClick={() => {
                callback.current.autoFit(false)
              }} >AutoFit</Button>

              <Button onClick={() => {
                const rows = callback.current.getSelectedRows()
                const row = callback.current.getSelectedRow()
                console.log('selected rows:', rows)
                console.log('selected row:', row)
              }} >Selected Rows</Button>

            </div>

            <div className='w-[95vw] h-[95vh] relative' >
                <DataTable  
                    {...args} 
                    tid={12}
                    tableName='Nextgen Table ...'
                    dataset={d}
                    ref={callback}
                    enablePagination={true}
                    pageSize={50}
                    hidden={['country']}
                    headerMapper={[
                      {
                        key : 'age' ,
                        value : 'CusAge.'
                      }
                    ]}
                    menuItems={[
                      {
                        label : "Click me" , 
                        type : 'default' ,
                        size : 'sm' ,
                        action : (params,row) => {console.log(params,row)} 

                      }
                    ]}
                    rowHeight={h}
                    autoFit={true}
                    onCellClick={(e,v,h)=>{
                      console.log('cell clicked ' , e,v,h)
                    }}
                    onTableBuilt={(params) => {
                      console.log('table built ' , params)
                    }}
                    onRowClick={(params,data) => {
                      console.log('rowClicked' , params , data )
                    }} 
                    onRowDoubleClicked={(params,data) => {
                      console.log('row double clicked ' , params , data )
                    }}
                    onRefresh={() => {
                      console.log('refresh manually')
                      const data = generateCustomData(5000)
                      setD( prev => data )
                    }}
                  />
            </div>
        </>
    );
}

export const Basic = Template.bind({});
// Basic.args={
//   tablename : 'Basic Table Name' ,
//   menuItems : [] ,
//   toolbarBtns : [
//     <IconButton icon={<ShareIcon />} label='Thanks' />
//   ] ,
//   enableMultiRowSelection: true ,
//   autoRefresh : (callback) => {
//     console.log('auto refresh triggered ...' , callback )
//   } ,
//   autoRefreshPeriod: 10000,
//   onRefresh : (callback) => {
//     console.log('manual refresh triggered ...' , callback)
//   } ,
//   onRowClick : (e,row , callback) => {
//     console.log('row selected triggered ... ' , e,row,callback)
//   } ,
//   onRowDoubleClicked : (e,row , callback) => {
//     console.log('row double clicked triggered ... ' , e,row,callback)
//   },
//   onDataChange : (e,data,callback) => {
//     console.log('data change triggered ...' , e, data, callback)
//   } ,
//   // dataset: data
// }
