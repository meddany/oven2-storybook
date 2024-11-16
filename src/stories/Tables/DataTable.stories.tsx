// @ts-nocheck
import React , { useRef , useEffect , useState } from 'react';
import { DataTable , IconButton , ShareIcon , Button } from '@/components';
import { data , generateCustomData  } from '@/components/playground-data/datatableitems'

export default {
  title: 'Components/DataTable',
  component: DataTable,
  args: {
  },
}

const Template = (args) => {
    const [ d , setD ] = useState([])
    const callback = useRef({})
    const [ h , setH ] = useState('sm')

    useEffect ( () => {
      setTimeout( () => {
        console.log('will pass now dataset ...')
        setD( prev => generateCustomData(4000) )
      } , 1000)
    } , [] )

    return (
        <div>   
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
                callback.current.gridRef.columncolumnApi.setColumnFilterModel("sport", { values: ["Swimming"] })
              }} >Apply Filter</Button>

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
                    toolbarBtns={[]}
                    ref={callback}
                    enablePagination={true}
                    pageSize={50}
                    hidden={['country']}
                    filter={
                      [
                        {
                          column : 'age' ,
                          filter : 'checkbox'
                        } ,
                        {
                          column : 'athlete' ,
                          filter : 'checkbox'
                        } ,
                      ]
                    }
                    multiple={false}
                    formater={{
                      year : (params) => {
                        if (params.value == 2008){
                          return <div className='bg-red-200 h-full'><p className='text-red-500'>{params.value}</p></div>
                        }
                        return params.value
                      }
                    }}
                    viewAsArray={['array']}
                    hideFromTable={['extras']}
                    headerMapper={[
                      {
                        key : 'age' ,
                        value : 'CusAge.'
                      }
                    ]}
                    menuItems={[
                      {
                        label : "Remvoe" , 
                        type : 'default' ,
                        size : 'sm' ,
                        action : () => {
                          const finals = callback.current.removeSelectedRows()
                          console.log(finals)
                        } 

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
                      const data = generateCustomData(300)
                      setD( prev => data )
                    }}
                  />
            </div>
        </div>
    );
}

export const Basic = Template.bind({});
