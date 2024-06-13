  //@ts-nocheck

  import { forwardRef, useEffect, useMemo, useRef , useState } from 'react';
  import { AgGridReact } from 'ag-grid-react'
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import '../../fonts/nokia/nokia-fonts.css'
  import "../../fonts/roboto/roboto.css"
  import TableGlobalContext from './plugins/context/TableGlobalContext';
  import $ from 'jquery'
  import {utils} from './utils/utils'
  import CustomFooter from './plugins/CustomFooter/CustomFooter';
  import { ContextMenu as EnContextMenu } from '../../Contextmenu/ContextMenuNG/ContextMenu'
  import { clearAllHotkeyRegister } from '../../utils/hotkeyregister';
  import {TableTopBarRouter} from './plugins/TableTopBar/TableTopBarRouter'
  import { callback } from './callbacks/callback';
  import { useRandomId as getRandomId } from '../../utils/utils';
  import './ag-grid-custom.css';
  import './themes/ag-grid-light_1.css'
  import './themes/light-minimal.css'
  import './themes/dark-rounded.css'
  import '../../Containers/Sub_Components/custom-scrollbar.css'
  import './themes/main.css'
  import { InlineSpinner } from '@/components'

const themes = [
    {
      name : 'Light Purple' , 
      className : 'ag-theme-custom-purple',
    } ,
    {
      name : 'Light Minimal' , 
      className : 'light-minimal-theme',
    } ,
    {
      name : 'Dark Rounded' , 
      className : 'dark-rounded-theme',
    } ,
]

function getThemeClass( theme){
  for ( const key in themes ){
    const item = themes[key]
    if ( item.name  === theme ){
      return item.className
    }
  }
}

const defaultTheme = getThemeClass( 'Light Minimal' )

export const DataTable = forwardRef((props ,callbackRef ) => {
  
  const { enableMultiRowSelection , onRefresh , disableContextMenu , toolbarBtns , tablename , tid , autoRefresh , autoRefreshPeriod  } = props;
  const defaultHeaders = callback.defaultHeaders()
  const defaultMenus = callback.getDefaultMenus()
  const [menuItems , setMenuItems ] = useState([])
  const [rowData, setRowData] = useState([]);
  const gridRef =  useRef(null)
  const [columnDefs , setColumnDefs] = useState(defaultHeaders)
  const table = useRef()
  const [onCellSelectedEvents , setOnCellSelectedEvents] = useState([])
  const progressTableDiv = useRef()
  const [ showTableSpinner , setShowTableSpinner] = useState(true)
  const enablePagination = props.enablePagination == undefined ? true : props.enablePagination
  const [paginationPageSize , setPaginationPageSize] = useState(20)
  const [ theme , setTheme ] = useState( )
  const [headersGenerated] = useState(false)
  const [tablePreferencesEvent , setTablePreferencesEvent] = useState()
  const [ contextMenuEvent , setContextMenuEvent ] = useState(null)
  const updatedState = useRef({api : {} })
  const [ options , setOptions ] = useState({
    enableMultiRowSelection : enableMultiRowSelection ? enableMultiRowSelection : false ,
    autoGenerateHeaders : true ,
    rowHeight : 30 ,
    headerHeight : 40 ,
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

  const updateTheme = (theme) => {
    setTheme(theme)
    callback.theme = theme
  }

  global.updateMenuItems = function updateMenuItems(){
    setMenuItems([...defaultMenus , ...props.menuItems])
  }

  // ========================================================================
  // ========================================================================

  function buildTable( ){
    onGridReady()
    updateTheme( defaultTheme  )
    callback.registerHoykeys()
    callback.loadShortcutPreferences()
    if ( autoRefresh ){
      callback.setAutoRefreshTable( autoRefresh , autoRefreshPeriod)
    }
  }

  useEffect( () => {
    if ( props.dataset ){
      setShowTableSpinner(true)
      preGridReady()
      buildTable()
      setShowTableSpinner(false)
    }
  } , [props.dataset])

  useEffect( () => {
    console.log('updating dataset ...')
    if ( ! props.dataset ){ return }
    if ( props.options ){
      setOptions( prev => ({...prev , ...props.options}))
    }
    // if ( props.dataset){
    //   buildTable()
    // }
    if ( props.menuItems ){
      global.updateMenuItems()
    }
    return () => {
      console.warn('reseting and clearing tables ...')
      clearAllHotkeyRegister()
      setMenuItems( prev => [] )
      $(document).off('contextmenu' , callback.stopContextMenuDefaults )
      if ( callback.autoRefreshInterval){
        clearInterval(callback.autoRefreshInterval)
      }
    }
  } , [ props.dataset])


  function updateOption(key , value ){
    setOptions( prev => ({...prev , [key] : value}))
    callback.options = options
  }

  useEffect( () => {
    console.log('options are changed ' , options)
  } , [options])

  const _viewList = () => {
    // const cell = updatedState.current.cell
    // const data = JSON.parse( cell.value )
    // // if ( data.length === 0){window.anyAlert({body : 'No content found'}) ; return }
    // const headername = cell.column.userProvidedColDef.headerName
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
    callback.tid = props.tid 
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
    callbackRef ? callbackRef.current = callback : null
    updateOption('api' , table.api )
    callback.api.updateTheme = updateTheme
    callback.themes = themes
    callback.getThemeClass = getThemeClass
    callback.ready= true
    callback.defaultTheme = defaultTheme
    callback.props = props
    
  }

  // =============================================================================
  const preGridReady = () => {
      createCallbacks()
  }

  // =============================================================================
  const onGridReady = () => {
    
    // set the rows data which came from api request or passed through the component
    setRowData(props.dataset ) 
    // Genreate the headers for the table automatically ( most of the cases this is required)
    if ( options.autoGenerateHeaders === true || props.autoGenerateHeaders === undefined) {
      callback.autoApplyHeaders( props.dataset,options)
      if (!options.disableContextMenu){
        $(document).on('contextmenu', callback.api.mtable , callback.stopContextMenuDefaults )
      }
      updatedState.current.api.data = props.dataset
      if ( gridRef.current.api ){
        if ( ! gridRef.current.api.isDestroyed() ){
          callback.restoreState()
        }
      }

    }    

  };

  
  function updatePageSize(e){
    setPaginationPageSize(e.target.value)
  }

  function rowsDataChangedEvent(e){
    // gridRef.current.api.autoSizeColumns()
    if (props.onDataChange){
      updatedState.current.api.rowsDataChanged = e
      props.onDataChange(e,props.dataset , callback)
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
    const rowData = [];
    gridRef.current.api.forEachNode(function(node) {
      rowData.push(node.data);
    });
    return rowData
  }
  
    // ========================================================================

    const defaultColDef = useMemo(() => {
      return {
        flex: 3,
        resizable : true,
        minWidth: 60,
        filter: 'agSetColumnFilter',
        floatingFilter: false,
        sortable: true,
        editable : false , 
        cellStyle: { fontFamily: ''  , fontSize : "13px"}
      };
    }, []);


  // ========================================================================



  const onRowSelected = function(e){
    if (e.event == null){return}
    console.warn('debug : updatedState ' , updatedState.current, 'api callback ' , callback  )
    const rows = gridRef.current.api.getSelectedRows()
    if (props.onRowClick !== undefined && props.onRowClick !== null){
      props.onRowClick(e , rows[0] , callback )
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
    const event = e.event
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

  // =========================================================================
  return (
      <div 
        className={`_${props.tid} nextgen-table relative w-full` } 
        ref={table} 
        tid={tid} 
        id={tid}
        style={{height : 'calc(100% - 60px)'}}
      >
        <TableGlobalContext.Provider value={{ref: gridRef , table , options , toolbarBtns:options.toolbarBtns , updateOption  }}>

          { showTableSpinner ?  <InlineSpinner variant='white' defaultOpen={true} /> : false }

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
                items={{items: menuItems}}
                event={contextMenuEvent}
                menuItemBorder={5}
            /> : null
          }

          <TableTopBarRouter tablename={options.tableName} progressTableDiv={progressTableDiv}  />

          <div className={ theme +' custom-scroll-bar main-theme' } 
            // className={ cn( vrs({theme}) , )}
            style={{height: '100%', width: '100%'}} >
              <AgGridReact
                  tid={tid} 
                  suppressAnimationFrame={true}
                  suppressColumnMoveAnimation={true}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  pagination= {enablePagination}
                  defaultColDef= {defaultColDef}
                  rowSelection = { options.enableMultiRowSelection ? 'multiple' : 'single' }
                  cellSeection = "multiple"
                  autoSizeStrategy={{type : 'fitCellContents'}}
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
                  onRowDoubleClicked={ (e) => {
                    if (props.onRowDoubleClicked) {
                      const row = callback.getSelectedRow()
                      props.onRowDoubleClicked(e , row , callback ) 
                    }
                    } }
                  >
              </AgGridReact>

              { options.enableCustomFooter ? <CustomFooter  /> : null }


          </div>

          <EnContextMenu 
              items={{ items : callback.getTableMenuOptions() }}
              event={tablePreferencesEvent}
            />

        </TableGlobalContext.Provider>

      </div>
  )
})

