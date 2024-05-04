// @ts-nocheck
import React, { useEffect, useState  } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const lightMode = {
  background: '#f9fafb' ,
  borderRight : '1px solid #e0e0e0'
}
const darkMode = {
  background: '#222425' ,
  borderRight : '1px solid #e0e0e0' ,
  color : '#7a7e7f' ,
  bodyColor : '#292c2e' ,
  bodyTextColor : '#b1bdc6'
}


export default function InformationTable(props) {

  const [ data , setData ] = useState([])
  const [ style , setStyle ] = useState(lightMode)
  const [ size , setSize ] = useState('small')
  useEffect( () => {
    if ( props.data){
      setData( prev => props.data)
    }
  } , props.data)

  useEffect( () => {
    if ( props.dark){ setStyle( darkMode ) }
    if ( ! props.dark){ setStyle( lightMode ) }
    if ( props.size){ setSize( props.size ) }
  } , [props.dark , props.size])

  return(
    <TableContainer sx={{padding:'5px 5px 5px 5px', background : style.bodyColor}} component={Paper}>
        <Table  size={size}>
          <TableHead>
            <TableRow sx={{background : style.background}}>
              <TableCell  sx={{borderRight : style.borderRight , color : style.color  }} align="left">Header</TableCell>
              <TableCell sx={{color : style.color }} align="left">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.header} >
                <TableCell sx={{borderRight : style.borderRight ,  color : style.bodyTextColor }} component="th" scope="row">
                  {row.header}
                </TableCell>
                <TableCell sx={{ color : style.bodyTextColor}} >{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
}