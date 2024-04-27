//@ts-nocheck

import { useCallback, useEffect, useMemo, useRef , useState } from 'react';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './ag-grid-custom.css';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import * as FileSaver from "file-saver"
import * as XLSX from 'xlsx';
import OvenContextmenu from '../ContextMenu/OvenContextMenu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import '../fonts/nokia/nokia-fonts.css'
import Paper from './paper'
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "../fonts/Roboto/Roboto.css"
import SearchField from './plugins/SearchField/SearchField';
import TableGlobalContext from './plugins/context/TableGlobalContext';
import { Stack } from '@mui/material';
import $ from 'jquery'
import PaginationField from './plugins/PaginationField/PaginationField';
import ManageColumns from './plugins/ManageColumns/ManageColumns';
import {utils} from './utils/utils'
import FilterLayout from './plugins/FilterLayout/FilterLayout';
import CustomFooter from './plugins/CustomFooter/CustomFooter';
import { useOvenify } from '../ovenify/OvenGlobalState';

var selectedCell = {}
const defaultHeaders = [
  { field: '' , 
  maxWidth : 50 , 
  checkboxSelection: true  , 
  sortable: false , 
  suppressMenu: true , 
  headerCheckboxSelection: true,
  headerCheckboxSelectionFilteredOnly: true , 
  pinned : true ,
  } ,
]

export default function DataTable(props) {

  const defaultMenus = [
    {
      'label' : 'Copy Cell' , action : 
      function(){
        utils.copyToClipboard(selectedCell)
        } , divider : false
    } ,    
  ]


  const [menuItems , setMenuItems ] = useState(defaultMenus)
  const [rowData, setRowData] = useState([]);
  const [tid] = useState(null);
  const gridRef =  useRef(null)
  const [columnDefs , setColumnDefs] = useState(defaultHeaders)
  const table = useRef()
  const [onCellSelectedEvents , setOnCellSelectedEvents] = useState([])
  const [ options , setOptions ] = useState({
    enableMultiRowSelection : true ,
    autoGenerateHeaders : true ,
    rowHeight : 30 ,
    enableContextMenu : true ,
    enableSearch : true ,
    enableOvenFilterLayout: true ,
    enableCustomFooter : true,
    enableToolBar : true,
    enableTitle: true,
    enableTopbar:true
  })

  const progressTableDiv = useRef()
  const rowColorRef = useRef()
  const enablePagination = props.enablePagination == undefined ? true : props.enablePagination
  const [listViewContent , setListViewContent] = useState({})
  const [viewListView , setViewListView] = useState(false)
  const [paginationPageSize , setPaginationPageSize] = useState(25)
  const [headersGenerated , setHeadersGenerated] = useState(false)
  const searchInput = useRef(null)
  const pureHeaders = useRef({})
  const [ contextMenuEvent , setContextMenuEvent ] = useState(null)
  const ovenify = useOvenify()
  const [ sideBarComponent , setSideBarComponent ] = useState(
    {
      'toolPanels' : ['columns' , 'filters'],
      'hiddenByDefault': false ,
    }
  )

  function autoGenerateHeaders(dataset ,hides){
    const headers = []
    const added= []
    var data = dataset

    data.map( row => {

      for (let key2 in row ){ // iter on each cell in each row
          var isHide = false
          var header = key2      

          if ( hides.includes(header)){ isHide = true}

          if (props.translator !== undefined ){
            // console.log(props.translator[key2])
            header = props.translator[key2]
            var headerName = header
            var tmp = {field : key2 , headerName : headerName , hide: isHide }
          }

          else {
            var headerName = header.charAt(0).toUpperCase() + header.slice(1);
            var tmp = {field : key2 , headerName : headerName , hide: isHide ,  enableRowGroup: true , cellStyle: { borderLeft: '.5px solid #ddd' }}
          }

          if ( typeof(row[key2]) === 'boolean' || row[key2] == 'true' || row[key2] == 'false' ||   row[key2] == 'Yes' || row[key2] == 'No' ){ 
            tmp.cellRenderer = function(params){
              // console.log(row[key2])
              if ( params.value === true || params.value == 'Yes') {
                return <CheckIcon style={{ color : '#136F63' }}/>;
              } 
              else if ( params.value === false || params.value == 'No' )  {
                return <ClearIcon style={{ color : '#D00000' }} />
              }

              else if  ( params.value === 'true' || params.value == 'Yes' ) {
                return <CheckIcon style={{ color : '#136F63' }}/>;
              } 
              else if ( params.value === 'false' || params.value == 'No' )  {
                return <ClearIcon style={{ color : '#D00000' }} />
              }
            }
          }


          if (! added.includes(header)){
              headers.push(tmp)
              added.push(header)
          } 
      }



    } )


    setHeadersGenerated(true)
    pureHeaders.current = headers
    return headers
  
  }


  // ========================================================================
  // ========================================================================

  var toolbarBtns = []
  if ( props.toolbarBtns === undefined ) {
    toolbarBtns = []
  }
  else {
    toolbarBtns = props.toolbarBtns
  }


  useEffect( () => {
    setTimeout( () => {
      restoreState()
    } , 100)

    return () => {
      
      if ( props.callback.clearCustomEventRegisters ){
        props.callback.clearCustomEventRegisters()

      }

    }

  } , [rowData])



  useEffect(  () => {
    setMenuItems([...defaultMenus , ...props.menuItems])

    return () => {
      setMenuItems( prev => [] )
    }
  } , [props.menuItems])




  useEffect( () => {
    if ( props.options ){
      setOptions( prev => ({...prev , ...props.options}))
    }
    onGridReady()
  } , [props.options , props.dataset])


  const checkIfCellIsList = () => {
    const cell = selectedCell

    if (cell.value == null || cell.value == undefined ){
      cell.value = ''
    }

    if (  cell.value.toString().includes('[') && cell.value.toString().includes(']') ){
      return true
    }
    else {
      return false
    }
  }

  const _viewList = () => {
    const cell = selectedCell
    const data = JSON.parse( cell.value )
    if ( data.length === 0){window.anyAlert({body : 'No content found'}) ; return }
    const headername = cell.column.userProvidedColDef.headerName
    setListViewContent( {'header' : headername , 'content' : data })
    setViewListView(true)
  }


  // ============================================================

  // -=================================================================================
  // export the table as EXCEL FORMATE
  const exportCsv = function() {
    gridRef.current.api.exportDataAsCsv({'fileName' : `${props.tablename}.csv`});
  };

  // =============================================================================
  // =============================================================================

    const fileName = props.tablename
    const fileType = 'application/vnd/openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExntesion = '.xlsx'
    const exportToExcel = async() => {
      const ws  = XLSX.utils.json_to_sheet(rowData)
      const wb = {Sheets : {'data' : ws } ,  SheetNames: ['data']}
      const excelBuffer = XLSX.write(wb , {bookType : 'xlsx'  , type : 'array'})
      const data = new Blob([excelBuffer] , {type : fileType})
      FileSaver.saveAs(data, fileName + fileExntesion)
    }


  const refresh = () => {
    if ( props.onRefresh != false ){
      if ( props.onRefresh !== undefined ){
        props.onRefresh()
      }
      else {
        onGridReady()
      }
    }
    
    else {onGridReady()}
  }

  function convertToReadableHeaders(headers) {
      // Mapping of common abbreviations or patterns to their full forms
      const abbreviationMap = {
          "ne": "Network Element",
          "gmre": "GMRE",
          "id": "ID",
          "utilization%": "Utilization Percentage",
          'ndf' : "Network data file" ,
          'ndfp' : 'Network data file path',
          'projectname' : 'Project label',
          'TE_RELEASE' : 'Orion Release'
      };
  
      function toReadableName(keyword) {
          if (abbreviationMap[keyword]) {
              return abbreviationMap[keyword];
          }
  
          // Split on underscores, hyphens, or camelCase patterns
          let parts = keyword.match(/[A-Z]?[a-z]+|[A-Z]+(?=[A-Z]|$)/g) || [keyword];
  
          // Capitalize the first letter of each part
          parts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
  
          // Join the parts with spaces
          return parts.join(' ');
      }
  
      return headers.reduce((acc, header) => {
          acc[header] = toReadableName(header);
          return acc;
      }, {});
  }


  function autoApplyHeaders(data){
    var headers = autoGenerateHeaders( data , props.hiddenColumns)

    if (options.enableMultiRowSelection == true ){
      setColumnDefs([...defaultHeaders , ...headers])
    }
    
    else if (options.enableMultiRowSelection == false ){
      setColumnDefs([...headers])
    }

    return headers
  }


  function setGroup(column){
    console.log('setting group by ' , column)
    const col = gridRef.current.columnApi.getColumn(column)
    gridRef.current.columnApi.setRowGroupColumns([col])
  }

  // =============================================================================
  // =============================================================================
  const onGridReady = async () => {

    
    console.log(`onGridReady called .. `)
    if ( props.disableSideBar == true ){
      setSideBarComponent([])
    }

    var response
    response = {'data' : props.dataset}

    // set the rows data which came from api request or passed through the component
    setRowData(response.data) 

    

    // Genreate the headers for the table automatically ( most of the cases this is required)
    if ( options.autoGenerateHeaders === true || props.autoGenerateHeaders === undefined) {
      
      
      autoApplyHeaders(response.data)


      // by default ag-grid few milliseconds afteer on grid ready event to build the table. so lets give it some milliseconds as it Virtual DOM
      setTimeout( function(){

        // Restore the savedd states for each column ( if saved already )
        restoreState()

        // to build up the manag columns headers.
        // injectManageColumns(headers)

        // here to disable default browser behavior if contextMenu is enabled. 
        // to do : 1- add option to enable or disable context menu default
        try {
          document.querySelector(`._${props.tid}`).addEventListener('contextmenu' , function(e){
            e.preventDefault()
          })
        }
        catch(err){}

        // to savee the headers for manage columns
        // console.log(gridRef)

        // lets call back the aggrid data to parent
        props.callback.gridRef =  gridRef.current

        props.callback.data = response.data

        props.callback.table =  gridRef.current

        props.callback.getSelectedRows =  () => { return gridRef.current.api.getSelectedRows() }

        props.callback.tid = props.tid 

        props.callback.response == undefined ? {} : props.callback.response 

        props.callback.props = props 

        props.callback.updateRowsData = updateRowsData 
        
        // inject reload function in case to want to update the table.
        props.callback.reload =  onGridReady

        props.callback.refresh =  refresh

        props.callback.addRow =  addRow

        props.callback.removeSelectedRows =  removeSelectedRows

        props.callback.getTableData =  getTableData

        props.callback.isDuplicateEntry =  isDuplicateEntry

        props.callback.reset =  resetTable

        props.callback.setGroup =  setGroup

        props.callback.tableName = props.tablename

        props.callback.refresh = onGridReady

        props.callback.ovenApi = utils

        props.callback.registerEvent = _registerEvent

        props.callback.clearCustomEventRegisters = clearCustomEventRegisters

        props.callback.getRegisteredEvents = () => {return {'cell' : onCellSelectedEvents }}

        table.ovenApi = props.callback
        
      }  , 10 ) 
      
    }    
      
  };

  function resetTable(){
    gridRef.current.api.setRowData([]);
  }

  function rowsDataChangedEvent(e){
    if (props.onDataChange != undefined){
      props.callback.rowsDataChanged = e
      props.onDataChange()
    }
  }


  function _registerEvent(event,func){
    if ( event == 'onCellClicked'){
      setOnCellSelectedEvents( prev => ([...prev , func ]))
    }

  }

  function clearCustomEventRegisters(){
    // console.log('clearing events ...')
    // setOnCellSelectedEvents( prev => ([]))

  }

  function isDuplicateEntry( newRow ){
    let isDuplicate = false;

    gridRef.current.api.forEachNode(function(node) {
        if(JSON.stringify(node.data) === JSON.stringify(newRow)) {
            isDuplicate = true;
        }
    });

    return isDuplicate;

  }

  // =============================================================================
  function addRow( newItem  ){

    if (headersGenerated == false ){ autoApplyHeaders([newItem]) }

      gridRef.current.api.applyTransaction({ add: [newItem], addIndex: 0 });
  }


  function removeSelectedRows(index){
  
    var selectedNodes = gridRef.current.api.getSelectedNodes();

    // Extract selected data from nodes
    var selectedData = selectedNodes.map(node => node.data);

    // Remove selected data
    gridRef.current.api.applyTransaction({ remove: selectedData });


  }


  function getTableData(){
    let rowData = [];
    gridRef.current.api.forEachNode(function(node) {
      rowData.push(node.data);
    });

    return rowData
  }

  // =============================================================================
  function updateRowsData(data){
    gridRef.current.api.setRowData(data)
  }
  
    // ========================================================================

    const defaultColDef = useMemo(() => {
      return {
        flex: 3,
        minWidth: 150,
        filter: 'agSetColumnFilter',
        floatingFilter: false,
        resizable : true  ,
        sortable: true,
        editable : false , 
        cellStyle: { fontFamily: ''  , fontSize : "13px"}
      };
    }, []);

    useEffect ( () => {
      if ( rowData ){
        if ( props.onGridReady != undefined ){

          

          try {
          
            if ( props.groupBy){
              setGroup('log')
            }

            
            props.onGridReady()
          } catch(er){}
        }
      }
    } , [rowData])

  // ========================================================================

  const savePrefernces = function(){
    var state = gridRef.current.columnApi.getColumnState();
    window.localStorage.setItem(`_tState_${props.tablename}_${props.tid}`, JSON.stringify(state));
    console.log('table saved!')
    window.state = gridRef.current.columnApi.getColumnState()
    toast(`Table saved!`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  // ========================================================================

  const onRowSelected = function(e){
    if (e.event == null){return}

    setTimeout ( () => {
      if (props.onRowClick !== undefined && props.onRowClick !== null){
        props.onRowClick(e , gridRef.current.api.getSelectedRows()[0] )
      }
    } )
  }


  // ========================================================================
  const onCellSelected = function(e){
    selectedCell = e
    props.callback.gridRef_selectedCell =  e

    props.callback.getSelectedCell = () => {return e}

    onCellSelectedEvents.map( func => {
      func()
    } )
  }

  // ========================================================================

  const onContextMenuEvent = function(e){
    var event = e.event

    setContextMenuEvent(event)

    if ( ! event.ctrlKey && ! event.shiftKey ){
      gridRef.current.api.deselectAll()
    }

    e.node.setSelected(true);

    const isList = checkIfCellIsList() 
    if ( isList ){
      const n = [ {
        'label' : 'Display as list' , action : 
        function(){
          _viewList()
          } , divider : true
      } 
    ]
      setMenuItems([...defaultMenus , ...props.menuItems , ...n])
    }
    else {
      setMenuItems([...defaultMenus , ...props.menuItems ])
    }

  }


  // ========================================================================

  const restoreState = useCallback(() => {
    console.log('Restoring state ...')
    try{
      gridRef.current.columnApi.applyColumnState({
        state:JSON.parse( localStorage.getItem(`_tState_${props.tablename}_${props.tid}`) ) ,
        applyOrder: true,
      });
    }
    catch(error){console.warn(error)}

  } , [gridRef.current] );


  function _viewManageColumn(){

    ovenify.dialog.createDialog( {
      content : <ManageColumns table={props.callback} /> ,
      open : true ,
      header: 'Manage Columns'
    } )

  }
  

  // ========================================================================
  var rowColoredChanges = []
  const _toggleRowColor = function(r){
    var color
    try { color = rowColorRef.current.value}
    catch(e){ color = '#4DA167'}
    
    // console.log(gridRef.current.api)
    let selectedRowNode = gridRef.current.api.getSelectedNodes();

    if (r == 'reset'){
      rowColoredChanges.map( row => {
        if(row.getAttribute('color-changed') === 'yes'){
          row.style.backgroundColor = '';
          row.setAttribute('color-changed' , 'no')
        }   
      })
      rowColoredChanges = []
      return 
    }


    selectedRowNode.forEach(element => {
      var RowId = element.id
      var rows = $(table.current).find(`.ag-row[row-id="${RowId}"]`)

      rows.map( (index, row) => {

        if(row.getAttribute('color-changed') === null || row.getAttribute('color-changed') === 'no'){
          row.style.backgroundColor = color ;
          row.setAttribute('color-changed' , 'yes')
          rowColoredChanges.push(row)
        }
        else if(row.getAttribute('color-changed') === 'yes'){
            row.style.backgroundColor = '';
            row.setAttribute('color-changed' , 'no')
        }  
      })
             
  })

}

  const statusBar = useMemo(() => {
    return { statusPanels: [
        {
            statusPanel: 'agSelectedRowCountComponent',
            align: 'right',
        },
        {
            statusPanel: 'agFilteredRowCountComponent',
            align: 'right',
        } ,
        {
            statusPanel: PaginationField ,
            align: 'left',
        } ,
    ]
  }
  })

  return (
    
    <div className={`ag-grid-table-holder _${props.tid}` } ref={table} tid={tid} style={{
      position:'relative' ,
      height: 'calc(100% - 35px)'
    }}>

      <TableGlobalContext.Provider value={{ref: gridRef , table  }}>

      {
        options.enableOvenFilterLayout ? <FilterLayout /> : null
      }
       

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {
        ! options.enableContextMenu ? null :

        <OvenContextmenu  
          menuItems={menuItems}
          event={contextMenuEvent}
        /> 
      }


      { viewListView ? 
        <Paper 
          papername={`${listViewContent.header} - (${listViewContent.content.length})`}
              closeButton = {
                <IconButton
                  aria-label="close"
                  onClick={() => setViewListView(false) }
                  sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                  }}
              >
                <CloseIcon />
            </IconButton>
            }
            style = {{width : '90%' , height : 'auto', paddingBottom : '0px'  , overflow: 'auto' , minHeight : '300px'}}
            element = { 
              <div className='list-view-content'>
                {
                  listViewContent.content.map( item => 
                    <div className='list-view-col'>{item}</div>
                  )
                }
              </div>
             }
          />
       : null }

      { options.enableTopbar ? 
        <div className='ag-grid-table-header-name'>
        { options.enableTitle ?  <h5 className='table-header-name-2j1'>{props.tablename}</h5> : null}
        <div className="table-progress-block" ref={progressTableDiv}></div>
        
        {
          ! options.enableToolBar ? null :
        
          <Stack sx={{ width : '100%' ,padding:'5px 5px 5px 5px'}} direction={'row'} alignItems={'end'} justifyContent={'end'}>

            { 
              toolbarBtns.map(item => item)
            }


            {
              options.enableSearch ? <SearchField ref={searchInput}/> : null
            }


            {/* the refresh table button */}
            <IconButton onClick={refresh} aria-label="more-options">
              <RefreshIcon />
            </IconButton>


            {/* the export csv button */}
            <IconButton onClick={exportCsv} aria-label="more-options">
              <ExitToAppIcon />
            </IconButton>

            {/* this menu is related to the table settings menu buttons */}
            <Menu className="table-context-menu"
              transition
              menuButton={({ open }) => (
                <IconButton aria-label="more-options">
                  <MoreVertIcon  />
                </IconButton>
              )}
            >
              <MenuItem onClick={_toggleRowColor} >Toggle row highlight <span className="menu-shortcut" >SHIFT+H</span> </MenuItem>
              <MenuItem onClick={()=>{_toggleRowColor('reset')}} >Clear row highlight <span className="menu-shortcut" >SHIFT+C</span> </MenuItem>
              <MenuItem onClick={_viewManageColumn} >ManageColumns</MenuItem>
              <MenuItem onClick={savePrefernces} >Save preferences <span className="menu-shortcut" >SHIFT+S</span>  </MenuItem>
              <MenuItem onClick={restoreState} className="restore-state" >Restore preferences<span className="menu-shortcut" >SHIFT+R</span>  </MenuItem>
              {/* <MenuItem  className="restore-state" >Page size   <span className="menu-shortcut" >SHIFT+R</span>  </MenuItem> */}
              
              <MenuItem onClick={exportCsv} >Export CSV <span className="menu-shortcut" >SHIFT+E</span> </MenuItem>
              <MenuItem onClick={exportToExcel} >Export XLSX <span className="menu-shortcut" >SHIFT+X</span> </MenuItem>
              
              <div style={{
                  'display': 'flex' ,
                  'alignItems' : 'center' ,
                  'paddingLeft' : '25px',
                  
                }}>
                Row Color
                <input type="color" ref={rowColorRef} defaultValue={'#4DA167'} style={{
                  'marginLeft' : '10px',
                  'outline': 'none' ,
                  'borderRadius' : '30px',
                  'border' : 'none'

                }}/>
              </div>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <TextField inputProps={{min : 10 , max:1000}} defaultValue={paginationPageSize} type='number' sx={{width : '90%' , paddingBottom : '5px' , marginTop : '15px' }} label="Page Size" size='small'
                  onChange={(e) => {
                    let pageSizeNumber = e.target.value
                    if ( pageSizeNumber <= 10 ){
                      e.target.value = 10
                      return
                    }
                    setPaginationPageSize(e.target.value)
                  }}
                />
              </Stack>
            
              
            </Menu>
          
          
          </Stack>
        }
        
        </div> 
        : null
      }

      <div className="ag-theme-alpine" style={{height: '100%', width: '100%'}} >

           <AgGridReact
               tid={tid} 
               rowData={rowData}
               statusBar={statusBar}
               columnDefs={columnDefs}
               pagination= {enablePagination}
               defaultColDef= {defaultColDef}
               rowSelection = { options.enableMultiRowSelection == true ? 'multiple' : 'single' }
               cellSeection = "multiple"
               rowHeight = {options.rowHeight}
               ref={gridRef}
               onRowDataUpdated={rowsDataChangedEvent}
               sideBar= {sideBarComponent }
               paginationPageSize = {paginationPageSize}
               onRowSelected={onRowSelected}
               onCellClicked={onCellSelected}
               getContextMenuItems={function(params) {} }
               onCellContextMenu= {onContextMenuEvent}
               enableCellTextSelection = {false}
               onRowDoubleClicked={ () => {
                if (props.onRowDoubleClicked !== undefined || props.onRowDoubleClicked !== false ) {
                  props.onRowDoubleClicked() }
                } }
               onCellKeyDown={(e) => {
                
                if ( e.event.shiftKey === true && e.event.key === 'H'){
                  _toggleRowColor('')
                }

                else if ( e.event.shiftKey === true  && e.event.key === 'C'){
                  _toggleRowColor('reset')
                }

                else if ( e.event.shiftKey === true  && e.event.key === 'S'){
                  savePrefernces()
                }

                else if ( e.event.shiftKey === true  && e.event.key === 'R'){
                  restoreState()
                }
                else if ( e.event.shiftKey === true  && e.event.key === 'E'){
                  exportCsv()
                }
                else if ( e.event.shiftKey === true  && e.event.key === 'X'){
                  exportToExcel()
                }

                else if ( e.event.ctrlKey === true  && e.event.key === 'c'){
                  utils.copyToClipboard(selectedCell)
                }


               }}
               onBodyScroll = {(e) => {
                var t = table.current.querySelector('.ag-body-vertical-scroll-viewport')
                var wholeScrollArea = t.scrollHeight
                var scrollTop = t.scrollTop
                var clientH = t.clientHeight
                var height = wholeScrollArea - clientH
                var delta = scrollTop / height * 100
                progressTableDiv.current.style.width = `${delta}%`
               }}
               >
                
           </AgGridReact>
       </div>

       { options.enableCustomFooter ? <CustomFooter  /> : null }
    
       </TableGlobalContext.Provider>
    </div>
  )
}
