// @ts-nocheck
import React from 'react'
import { useMemo , useEffect , useRef , useContext , useState } from 'react';
import Stack from '@mui/material/Stack';
import OvenTableContext from './plugins/Contexts/OvenTableContext';
import { AutoHeadersGenerate } from './plugins/utils';
import { ReactTabulator } from 'react-tabulator'
// import 'react-tabulator/css/tabulator.css'
import 'react-tabulator/css/tabulator_semanticui.css'


export default function OvenTable(props) {

  const [ table , setTable ] = useState(null)
  const [ data , setData ] = useState([])
  const [ options , setOptions ] = useState({
    selectable : true ,
  })
  const [ columns , setColumns ] = useState([])
  const [rowSelection, setRowSelection] = useState({});
  const nativeTable = useRef(null)


  useEffect( () => {console.log("Oven Table Params " , table)} , [table])

  useEffect( () => {
    if ( props.options ){
      setOptions( prev => ({...prev , ...props.options}))
    }
  } , [props.options])


  useEffect( () => {
    if ( props.data ){ 
      const cols = AutoHeadersGenerate( props.data )
      setColumns( prev => cols  )
      setData( prev => { return props.data} )
    }
  } , [props.data])

  const columns1 = [
    { title: "Name", field: "name", width: 150 },
    { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
    { title: "Favourite Color", field: "col" },
    { title: "Date Of Birth", field: "dob", hozAlign: "center" },
    { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
    { title: "Passed?", field: "passed", hozAlign: "center", formatter: "tickCross" }
  ];
  var data1 = [
    {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
    {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
    {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
  ];




    return (
      <OvenTableContext.Provider value={{table , data }} >
   
            <ReactTabulator
              data={data}
              height='100%'
              width='100%'
              columns={columns}
              options={{
                pagination : true ,
                paginationSize : 25 ,
                paginationSizeSelector:[10, 25, 50, 100, true],
                selectable: options.selectable ,
                renderVerticalBuffer:300,
                esponsiveLayout:"hide",
                layout:"fitColumns",
                // layout:"fitDataTable",
                layoutColumnsOnNewData:true,
                selectableRangeMode: "click" ,
                rowSelection: "checkbox"
              }}
              />
      </OvenTableContext.Provider>
    )
}
