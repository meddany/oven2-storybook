  //@ts-nocheck

  import { forwardRef, memo, useCallback, useEffect, useMemo, useRef , useState } from 'react';
  import { AgGridReact } from 'ag-grid-react'
  import { Menu, MenuItem } from "@szhsin/react-menu";
  import "@szhsin/react-menu/dist/index.css";
  import "@szhsin/react-menu/dist/transitions/slide.css";
  import OvenContextmenu from '../../Menu/ContextMenu/OvenContextMenu';
  import ExitToAppIcon from '@mui/icons-material/ExitToApp';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import '../../fonts/nokia/nokia-fonts.css'
  import Paper from './paper'
  import CloseIcon from '@mui/icons-material/Close';
  import TextField from '@mui/material/TextField';
  import "../../fonts/roboto/roboto.css"
  import SearchField from './plugins/SearchField/SearchField';
  import TableGlobalContext from './plugins/context/TableGlobalContext';
  import { Stack } from '@mui/material';
  import $ from 'jquery'
  import PaginationField from './plugins/PaginationField/PaginationField';
  import {utils} from './utils/utils'
  import FilterLayout from './plugins/FilterLayout/FilterLayout';
  import CustomFooter from './plugins/CustomFooter/CustomFooter';
  import { useOvenify } from '../..//ovenify/OvenGlobalState';
  import { ContextMenu as EnContextMenu } from '../../Menu';
  import { hotkeyRegister , clearAllHotkeyRegister , getAllKeyCodes } from '../../utils/hotkeyregister';
  import { getExactElementLocation } from '../../Menu/EnhancedContextMenu/plugins/GetLocations';
  import {TableTopBarRouter} from './plugins/TableTopBar/TableTopBarRouter'
  import { callback } from './callbacks/callback';
  import ManageColumns from "../plugins/ManageColumns/ManageColumns"
  import { getRandomId } from '../../utils/common';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import './ag-grid-custom.css';

const DataTable = forwardRef((props ,callbackRef ) => {

  const { enableMultiRowSelection , onRefresh , disableContextMenu , toolbarBtns , tablename , tid  } = props;
  const defaultHeaders = callback.defaultHeaders()
  const defaultMenus = callback.getDefaultMenus()
  const [menuItems , setMenuItems ] = useState([])
  const [rowData, setRowData] = useState([]);
  const gridRef =  useRef(null)
  const [columnDefs , setColumnDefs] = useState(defaultHeaders)
  const [ selectedRow , setSelectedRow] = useState()
  const table = useRef()
  const [onCellSelectedEvents , setOnCellSelectedEvents] = useState([])
  const progressTableDiv = useRef()
  const enablePagination = props.enablePagination == undefined ? true : props.enablePagination
  const [listViewContent , setListViewContent] = useState({})
  const [viewListView , setViewListView] = useState(false)
  const [paginationPageSize , setPaginationPageSize] = useState(20)
  const [headersGenerated , setHeadersGenerated] = useState(false)
  const [tablePreferencesEvent , setTablePreferencesEvent] = useState()
  const searchInput = useRef(null)
  const [ contextMenuEvent , setContextMenuEvent ] = useState(null)
  const ovenify = useOvenify()
  const updatedState = useRef({api : {} })
  const [ options , setOptions ] = useState({
    enableMultiRowSelection : enableMultiRowSelection ? enableMultiRowSelection : false ,
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
    toggleRowColor: callback.changeRowColor , 
    tableRefresh : callback.refreshTable ,
    updateOption : updateOption ,
    defaultHeaders ,
    defaultPageInputSize : 20 , 
    toolbarBtns : toolbarBtns ? toolbarBtns : [] ,
    updateTablePreferencesEvent:  setTablePreferencesEvent,
    onRefresh : onRefresh ? onRefresh : () => {},
    disableContextMenu : disableContextMenu ? disableContextMenu : false,
    callbackRef : callbackRef ? callbackRef : {} ,
    tableName : tablename ? tablename : '',
    tid : tid ? tid : getRandomId() ,
    paginationPageSize : paginationPageSize ,
    onRefreshButtonDisable : props.onRefresh ? false : true 
  })

  function copySingleCell(){
    callback.copySingleCell(updatedState.current.cell)
  }
  
  function CopyHeaderAndCell(){
    callback.copyHeaderAndCell(updatedState.current.cell)
  }

  global.updateMenuItems = function updateMenuItems(){
    setMenuItems([...defaultMenus , ...props.menuItems])
  }

  // ========================================================================
  // ========================================================================

  useEffect( () => {
    console.log('updating dataset ...')
    if ( ! props.dataset ){ return }
    if ( props.options ){
      setOptions( prev => ({...prev , ...props.options}))
    }
    if ( props.dataset){
      console.log(props.dataset)
      onGridReady()
      callback.registerHoykeys()
      callback.loadShortcutPreferences()
    }
    if ( props.menuItems ){
      global.updateMenuItems()
    }
    return () => {
      clearAllHotkeyRegister()
      setMenuItems( prev => [] )
      $(document).off('contextmenu' , callback.stopContextMenuDefaults )
    }
  } , [props.options , props.dataset , props.menuItems ])


  function updateOption(key , value ){
    setOptions( prev => ({...prev , [key] : value}))
  }

  const _viewList = () => {
    const cell = updatedState.current.cell
    const data = JSON.parse( cell.value )
    if ( data.length === 0){window.anyAlert({body : 'No content found'}) ; return }
    const headername = cell.column.userProvidedColDef.headerName
    setListViewContent( {'header' : headername , 'content' : data })
    setViewListView(true)
  }


  function updateColumnDef(headers){
    setColumnDefs([...defaultHeaders , ...headers])
  }

  function resetColumnDef(headers){
    setColumnDefs([...headers])
  }

  function createCallbacks(){
    callback.api={ updatedState , options : options ,  ...updatedState.current.api , ...updatedState  , ...callback.api , live : updatedState }
    updatedState.current.api.gridRef=gridRef.current
    callback.addOnCellSelectEvent=addOnCellSelectEvent
    updatedState.current.api.options = options
    updatedState.current.api.updateOption = updateOption
    updatedState.current.api.table =  gridRef.current
    updatedState.current.api.mtable =  table.current
    updatedState.current.api.callback =  callback
    updatedState.current.api.getSelectedRows =  () => { return gridRef.current.api.getSelectedRows() }
    updatedState.current.api.tid = props.tid 
    updatedState.current.api.response == undefined ? {} : updatedState.current.api.response 
    updatedState.current.api.props = props 
    updatedState.current.api.updateRowsData = callback.updateRowsData 
    updatedState.current.api.reload =  onGridReady
    updatedState.current.api.refresh =  callback.refreshTable
    updatedState.current.api.addRow =  addRow
    updatedState.current.api.isHeadersGenerated = () => {return headersGenerated }
    updatedState.current.api.getTableData =  getTableData
    updatedState.current.api.isDuplicateEntry =  callback.isDuplicateEntry
    updatedState.current.api.reset =  callback.reset
    updatedState.current.api.setGroup =  () => { console.warn('this option is not supported anymore.')}
    updatedState.current.api.tableName = props.tablename
    updatedState.current.api.api = utils
    updatedState.current.api.updateColumnDef = updateColumnDef
    updatedState.current.api.resetColumnDef = resetColumnDef
    updatedState.current.api.updatePageSize = updatePageSize
    updatedState.current.api.getRegisteredEvents = () => {return {'cell' : onCellSelectedEvents }}
    table.api = updatedState.current.api
    callback.agGridRef = gridRef.current
    callbackRef.current = callback
    updateOption('api' , table.api )
    callback.ready= true
  }

  // =============================================================================
  // =============================================================================
  const onGridReady = () => {
    createCallbacks()
    console.log(`onGridReady called .. `)
    var response
    response = {'data' : props.dataset}
    // set the rows data which came from api request or passed through the component
    setRowData(response.data) 
    // Genreate the headers for the table automatically ( most of the cases this is required)
    if ( options.autoGenerateHeaders === true || props.autoGenerateHeaders === undefined) {
      callback.autoApplyHeaders(response.data,options)
      if (!options.disableContextMenu){
        $(document).on('contextmenu', callback.api.mtable , callback.stopContextMenuDefaults )
      }
      updatedState.current.api.data = response.data
      callback.restoreState()
    }    
  };

  
  function updatePageSize(e){
    setPaginationPageSize(e.target.value)
  }

  function rowsDataChangedEvent(e){
    if (props.onDataChange){
      updatedState.current.api.rowsDataChanged = e
      props.onDataChange(e)
    }
  }

  // =============================================================================
  function addRow( newItem  ){
    callback.addRow(newItem)
  }

  function addOnCellSelectEvent(event){
    setOnCellSelectedEvents( prev => ([...prev , event ]))
  }

  function getTableData(){
    let rowData = [];
    gridRef.current.api.forEachNode(function(node) {
      rowData.push(node.data);
    });
    return rowData
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


  // ========================================================================

  const onRowSelected = function(e,d){
    if (e.event == null){return}
    console.log('updatedState ' , updatedState.current, 'api callback ' , callback  )
    const rows = gridRef.current.api.getSelectedRows()
    setSelectedRow( prev => rows )
    if (props.onRowClick !== undefined && props.onRowClick !== null){
      props.onRowClick(e , rows[0] )
    }
  }


  // ========================================================================
  const onCellSelected = function(e){
    updatedState.current.cell = e
    updatedState.current.api.gridRef_selectedCell =  e
    updatedState.current.api.getSelectedCell = () => {return e}
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
    const isList = callback.isCellAsArray() 
    if ( isList ){
      const n = [ {'label' : 'Display as list' , action : _viewList} ]
      setMenuItems([...defaultMenus , ...props.menuItems , ...n])
    }
    else {
      setMenuItems([...defaultMenus , ...props.menuItems ])
    }
  }

  // ========================================================================
  function _toggleRowColor(r){
    callback.changeRowColor(r);
  }

  // =========================================================================
  return (
    <div 
      className={`ag-grid-table-holder _${props.tid}` } 
      ref={table} 
      tid={tid} 
      id={tid}
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

            <TableTopBarRouter tablename={options.tableName} progressTableDiv={progressTableDiv}  />

            <div className="ag-theme-alpine" style={{height: '100%', width: '100%'}} >
                <AgGridReact
                    tid={tid} 
                    // suppressAnimationFrame={true}
                    // suppressColumnMoveAnimation={true}
                    rowData={rowData}
                    // animateRows={false}
                    columnDefs={columnDefs}
                    pagination= {enablePagination}
                    defaultColDef= {defaultColDef}
                    rowSelection = { options.enableMultiRowSelection ? 'multiple' : 'single' }
                    cellSeection = "multiple"
                    rowHeight = {options.rowHeight}
                    headerHeight={options.headerHeight}
                    ref={gridRef}
                    onRowDataUpdated={rowsDataChangedEvent}
                    paginationPageSize = {paginationPageSize}
                    onRowSelected={onRowSelected}
                    onCellClicked={onCellSelected}
                    onCellContextMenu= {onContextMenuEvent}
                    enableCellTextSelection = {true}
                    onGridReady={() => { 
                      $(table.current).find('.ag-horizontal-left-spacer').remove()
                     }}
                    onRowDoubleClicked={ () => {
                      if (props.onRowDoubleClicked) {
                        const row = callback.getSelectedRow()
                        props.onRowDoubleClicked(options.callbackRef , row ) 
                      }
                      } }
                    >
                </AgGridReact>
            </div>
            
            { options.enableCustomFooter ? <CustomFooter  /> : null }

            <EnContextMenu 
                menuItems={callback.getTableMenuOptions()}
                event={tablePreferencesEvent}
                menuItemBorder={5}
                customHoverColor='#2E294E'
                menuHeight={35}
              />
        </TableGlobalContext.Provider>
    </div>
  )
})
export default memo(DataTable)