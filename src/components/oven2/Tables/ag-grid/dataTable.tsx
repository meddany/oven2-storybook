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
  import OvenContextmenu from '../../Menu/ContextMenu/OvenContextMenu';
  import ExitToAppIcon from '@mui/icons-material/ExitToApp';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import CheckIcon from '@mui/icons-material/Check';
  import ClearIcon from '@mui/icons-material/Clear';
  import RefreshIcon from '@mui/icons-material/Refresh';
  import '../../fonts/nokia/nokia-fonts.css'
  import Paper from './paper'
  import CloseIcon from '@mui/icons-material/Close';
  import TextField from '@mui/material/TextField';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import "../../fonts/roboto/roboto.css"
  import SearchField from './plugins/SearchField/SearchField';
  import TableGlobalContext from './plugins/context/TableGlobalContext';
  import { Stack } from '@mui/material';
  import $ from 'jquery'
  import PaginationField from './plugins/PaginationField/PaginationField';
  import ManageColumns from './plugins/ManageColumns/ManageColumns';
  import {utils} from './utils/utils'
  import FilterLayout from './plugins/FilterLayout/FilterLayout';
  import CustomFooter from './plugins/CustomFooter/CustomFooter';
  import { useOvenify } from '../..//ovenify/OvenGlobalState';
  import { ContextMenu as EnContextMenu } from '../../Menu';
  import { hotkeyRegister , clearAllHotkeyRegister , getAllKeyCodes } from '../../utils/hotkeyregister';
  import { getExactElementLocation } from '../../Menu/EnhancedContextMenu/plugins/GetLocations';
  import {TableTopBarRouter} from './plugins/TableTopBar/TableTopBarRouter'

  var selectedCell = {}
  const defaultHeaders = [
    { field: '' , 
    maxWidth : 50 , 
    checkboxSelection: true  , 
    sortable: false , 
    suppressHeaderMenuButton: true , 
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true , 
    pinned : true ,
    } ,
  ]

export default function DataTable(props) {

  function copySingleCell(data){
    utils.copyToClipboard(selectedCell.value)
  }

  function CopyHeaderAndCell(){
    const cell = JSON.stringify(selectedCell.data).toString()
    utils.copyToClipboard(cell)
  }

  const defaultMenus = [
    {
      label : 'Copy' ,
      subItems : [
        {
          label : 'Copy Cell' ,
          action : copySingleCell ,
          hotkeys : {
            extra : {ctrl : true , alt : false , shift : false } ,
            key : 'c'
          }
        } ,
        {
          label : 'Copy Header & Cell' ,
          action : CopyHeaderAndCell,
          hotkeys : {
            extra : {ctrl : true , alt : true , shift : false } ,
            key : 'c'
          }
        } ,
      ]
    } 
  ]


  const [menuItems , setMenuItems ] = useState(defaultMenus)
  const [rowData, setRowData] = useState([]);
  const [tid] = useState(null);
  const gridRef =  useRef(null)
  const [columnDefs , setColumnDefs] = useState(defaultHeaders)
  const table = useRef()
  const [onCellSelectedEvents , setOnCellSelectedEvents] = useState([])
  const progressTableDiv = useRef()
  const enablePagination = props.enablePagination == undefined ? true : props.enablePagination
  const [listViewContent , setListViewContent] = useState({})
  const [viewListView , setViewListView] = useState(false)
  const [paginationPageSize , setPaginationPageSize] = useState(25)
  const [headersGenerated , setHeadersGenerated] = useState(false)
  const [tablePreferencesEvent , setTablePreferencesEvent] = useState()
  const searchInput = useRef(null)
  const pureHeaders = useRef({})
  const [ contextMenuEvent , setContextMenuEvent ] = useState(null)
  const ovenify = useOvenify()
  const [ options , setOptions ] = useState({
    enableMultiRowSelection : true ,
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
    rowColor: '#03CEA4' ,
    toggleRowColor: _toggleRowColor , 
    tableRefresh : refresh ,
    updateOption : updateOption ,
    defaultHeaders ,
    toolbarBtns : props.toolbarBtns ? props.toolbarBtns : [] ,
    updateTablePreferencesEvent:  setTablePreferencesEvent
  })
  
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
            var tmp = {field : key2 , headerName : headerName , hide: isHide , cellStyle: { borderLeft: '.5px solid #ddd' }}
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

  useEffect( () => {
    setTimeout( () => {
      restoreState()
    } , 100)
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
    if ( props.dataset){
      startHotkeyRegister()
    }
    return () => {
      clearAllHotkeyRegister()
    }
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

  function updateOption(key , value ){
    setOptions( prev => ({...prev , [key] : value}))
  }

  const _viewList = () => {
    const cell = selectedCell
    const data = JSON.parse( cell.value )
    if ( data.length === 0){window.anyAlert({body : 'No content found'}) ; return }
    const headername = cell.column.userProvidedColDef.headerName
    setListViewContent( {'header' : headername , 'content' : data })
    setViewListView(true)
  }


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


    function refresh(){
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
      function toReadableName(keyword) {
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


  function startHotkeyRegister(){
    hotkeyRegister( 'c' , {ctrl : true , alt : false , shift : false } , copySingleCell , 'Copy Table cell' )
    hotkeyRegister( 'c' , {ctrl : true , alt : true , shift : false } , CopyHeaderAndCell   ,  'Copy Table header and cell' )
    hotkeyRegister( 'h' , {ctrl : false , alt : false , shift : true } , _toggleRowColor  , 'Switch row color for selected table rows.' )
    hotkeyRegister( 'c' , {ctrl : false , alt : false , shift : true } , () => {_toggleRowColor('reset')}  , 'Reset the row color for all rows')
    hotkeyRegister( 's' , {ctrl : false , alt : false , shift : true } , savePrefernces , 'Save table prefernces' )
    hotkeyRegister( 'r' , {ctrl : false , alt : false , shift : true } , restoreState , 'Restore table prefernces' )
    hotkeyRegister( 'x' , {ctrl : false , alt : false , shift : true } , exportToExcel , 'Export the current table data into excel.' )
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
        props.callback.gridRef =  gridRef.current
        props.callback.data = response.data
        props.callback.table =  gridRef.current
        props.callback.getSelectedRows =  () => { return gridRef.current.api.getSelectedRows() }
        props.callback.tid = props.tid 
        props.callback.response == undefined ? {} : props.callback.response 
        props.callback.props = props 
        props.callback.updateRowsData = updateRowsData 
        props.callback.reload =  onGridReady
        props.callback.refresh =  refresh
        props.callback.addRow =  addRow
        props.callback.getTableWidth=getTableSize
        props.callback.removeSelectedRows =  removeSelectedRows
        props.callback.getTableData =  getTableData
        props.callback.isDuplicateEntry =  isDuplicateEntry
        props.callback.reset =  resetTable
        props.callback.setGroup =  setGroup
        props.callback.tableName = props.tablename
        props.callback.refresh = onGridReady
        props.callback.api = utils
        props.callback.registerEvent = _registerEvent
        props.callback.getRegisteredEvents = () => {return {'cell' : onCellSelectedEvents }}
        table.api = props.callback
        setOptions(prev => ({...prev , api : table.api }) )
      }  , 10 ) 
    }    
  };

  function getTableSize(){
    return $(table.current).width()
}
  
  function GetColorElementBox(){
    return (
      <Stack>
          <input 
            type="color" 
            onChange={(e,v) => {
              // console.log('changing row color to ' , e.target.value)
              setOptions( prev => ({...prev , rowColor :  e.target.value}))
            }}
            defaultValue={'#4DA167'}/>
      </Stack>

    )
  }

  function GetPaginationInputBox(){
    return (
        <Stack direction={'row'} alignItems={'start'} justifyContent={'start'}>
          <TextField inputProps={{min : 10 , max:1000}} defaultValue={paginationPageSize} type='number' sx={{width : '100px' }} label="Page Size" size='small'
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
    )
  }

  function getTableMenuOptions(){
    return [
      {
        label : 'Toggle row color',
        action : _toggleRowColor ,
        hotkeys : {
          extra : {ctrl : false , alt : false , shift : true } ,
          key : 'h'
        }
      } ,
      {
        label : 'Reset row color',
        action : ()=>{_toggleRowColor('reset')} ,
        hotkeys : {
          extra : {ctrl : false , alt : false , shift : true } ,
          key : 'c'
        }
      } ,
      {
        label : 'Manage Columns',
        action : _viewManageColumn ,
        
      } ,
      {
        label : 'Save preferences',
        action : savePrefernces ,
        hotkeys : {
          extra : {ctrl : false , alt : false , shift : true } ,
          key : 's'
        }
      } ,
      {
        label : 'Restore preferences',
        action : restoreState ,
        hotkeys : {
          extra : {ctrl : false , alt : false , shift : true } ,
          key : 'r'
        }
      } ,
      {
        label : 'Exports',
        subItems: [
          {
            label : 'CSV',
            action : exportCsv
          } ,
          {
            label : 'Excel',
            action : exportToExcel,
            hotkeys : {
              extra : {ctrl : false , alt : false , shift : true } ,
              key : 'x'
            }
          } ,
        ]
      } ,
      {
        label : 'Table shortcuts',
        action : () => {alert('not available yet')}
      } ,
      {
        label : 'Preferences',
        subItems: [
          {
            label : 'Row Heighlight colors',
            custom : true , 
            frame : 'page' ,
            type : 'custom',
            element : GetColorElementBox() ,
            header : 'Row Heighlight colors' ,
            frameOptions : {
              // width : '250px' ,
              // height : '300px'
          } ,
          },
          {
            label : 'Table pagination size',
            custom : true , 
            frame : 'page' ,
            type : 'custom',
            element : GetPaginationInputBox() ,
            header : 'Table pagination size' ,
            frameOptions : {
              // width : '250px' ,
              // height : '300px'
          } ,
          },
        ]
      } ,
    ]
  }

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
          } catch(er){
            // skipp this error
          }
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
        'label' : 'Display as list' , action : _viewList
      } 
    ]
      setMenuItems([...defaultMenus , ...props.menuItems , ...n])
    }
    else {
      setMenuItems([...defaultMenus , ...props.menuItems ])
    }
    console.log(menuItems)
  }


  // ========================================================================

  const restoreState = useCallback(() => {
    console.log('Restoring state ...')
    try{
      gridRef.current.api.applyColumnState({
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
  function _toggleRowColor(r){
    const color = options.rowColor
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

  return (
    <div 
      className={`ag-grid-table-holder _${props.tid}` } 
      ref={table} tid={tid} 
      style={{
        position:'relative' ,
        height: 'calc(100% - 35px)'
      }}
      >
        <TableGlobalContext.Provider value={{ref: gridRef , table , options , toolbarBtns:options.toolbarBtns  }}>
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
              options.enableContextMenu 
              ? <EnContextMenu 
                menuItems={menuItems}
                event={contextMenuEvent}
                menuItemBorder={5}
              /> : null
            }

              <EnContextMenu 
                menuItems={getTableMenuOptions()}
                event={tablePreferencesEvent}
                menuItemBorder={5}
                customHoverColor='#2E294E'
                menuHeight={35}
              />

            <TableTopBarRouter tablename={props.tablename} progressTableDiv={progressTableDiv}  />

            <div className="ag-theme-alpine" style={{height: '100%', width: '100%'}} >
                <AgGridReact
                    tid={tid} 
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination= {enablePagination}
                    defaultColDef= {defaultColDef}
                    rowSelection = { options.enableMultiRowSelection == true ? 'multiple' : 'single' }
                    cellSeection = "multiple"
                    rowHeight = {options.rowHeight}
                    headerHeight={options.headerHeight}
                    ref={gridRef}
                    onRowDataUpdated={rowsDataChangedEvent}
                    paginationPageSize = {paginationPageSize}
                    onRowSelected={onRowSelected}
                    onCellClicked={onCellSelected}
                    onCellContextMenu= {onContextMenuEvent}
                    enableCellTextSelection = {false}
                    onGridReady={() => { $(table.current).find('.ag-horizontal-left-spacer').remove() }}
                    onRowDoubleClicked={ () => {
                      if (props.onRowDoubleClicked) {
                        props.onRowDoubleClicked() }
                      } }
                    onCellKeyDown={(e) => {
                      
                    }}
                    onBodyScroll = {(e) => {
                      const t = table.current.querySelector('.ag-body-vertical-scroll-viewport');
                      if (!t) return; // Ensure the element exists
                      const { scrollHeight, scrollTop, clientHeight } = t;
                      const height = scrollHeight - clientHeight;
                      const delta = height > 0 ? (scrollTop / height) * 100 : 0; // Avoid division by zero
                      progressTableDiv.current.style.width = `${delta}%`;
                    }}
                    >
                </AgGridReact>
            </div>
            { options.enableCustomFooter ? <CustomFooter  /> : null }
        </TableGlobalContext.Provider>
    
    </div>
  )
}
