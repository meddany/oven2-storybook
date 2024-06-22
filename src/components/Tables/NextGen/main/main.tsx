// @ts-nocheck
import React, { createContext, forwardRef, useEffect, useRef , useCallback, useState   } from "react";
import { AgGridReact, AgGridReactProps } from 'ag-grid-react'
import { useHeaders } from "./hooks/useGenerateHeaders";
import './themes/main.css'
import './themes/light-minimal.css'
import { usePageSize } from "./hooks/usePaginationPageSizeSelector";
import { useRowHeight } from "./hooks/useRowHeight";
import '../../../Containers/Sub_Components/custom-scrollbar.css'
import { useTableCallback } from "./hooks/useCustomCallback";
import { useAutofit } from "./hooks/useAutoFit";
import { Topbar } from "./plugins/Topbar/Topbar";
import '../styles.css'
import { InlineSpinner } from '../../../Spinner/InlineSpinner'
import { ContextMenu } from '../../../Contextmenu/ContextMenuNG/ContextMenu'
import { useTablePreferencesMenu } from "./hooks/useTablePreferencesMenu";
import * as FileSaver from "file-saver"
import * as XLSX from 'xlsx';
import { useTableMenu } from "./hooks/useTableMenu";
import { DialogPanel } from '@/components'
import ManageColumns from "./plugins/ManageColumns/ManageColumns";
import { ArrayViewer } from "./plugins/ArrayViewer/ArrayViewer";

export const TableContext = createContext({})

export interface TableProps {
    onRowClick : void 
    ref? : React.Ref ,
    aggrid: AgGridReactProps ,
    tid : string | number,
    dataset : Array ,
    pageSize : number ,
    enablePagination : boolean ,
    rowHeight : string ,
    onCellClick : void
    onTableBuilt : void ,
    tableName : string ,
    onRowDoubleClicked : void,
    onRefresh? : void | null ,
    enableContextMenu : boolean , 
    hidden : Array ,
    toolbarBtns : Array ,
    ready : boolean,
    autoHideSpinner: boolean
    headerMapper : [
        {
            key : string , 
            value : any
        } 
    ]  ,
    menuItems : [
        {
            label : string ,
            icon : HTMLAllCollection ,
            action : void ,
            type : string ,
            size : string
        }
    ]
}

export const Table = forwardRef<HTMLDivElement , TableProps> ( (props,ref) => {
    
    if ( ! ref ){
        var ref = useRef()
    }

    // =================================================================================
    const { 
        tid , 
        dataset=[] , 
        aggrid , 
        enablePagination=true , 
        pageSize   ,
        rowHeight = 'sm' ,
        onCellClick= function(){} ,
        onTableBuilt= function(){} ,
        tableName,
        onRowClick= function(){},
        onRowDoubleClicked= function(){},
        onRefresh ,
        headerMapper=[] ,
        hidden=[] ,
        enableContextMenu= true,
        menuItems=[] ,
        ready,
        autoHideSpinner=false ,
        toolbarBtns=[]
    } = props
    const tref = useRef()
    const PanelDialogRef = useRef({})
    const [ columnDefs ] = useHeaders(dataset,headerMapper,hidden)
    const [ data , setData ] = useState([])
    const [ pageSizeArray ] = usePageSize(pageSize,dataset)
    const gridRef= useRef()
    const [ callback , updateCallback ]  = useTableCallback(gridRef , ref , props , tref , data   )
    const [ rHeight , changeRowHeight ] = useRowHeight(rowHeight,updateCallback)
    const [ autofitApplied ] = useAutofit(callback)
    const [ showTableSpinner , setShowTableSpinner ] = useState(true)
    const [ tablePreferencesEvent, setTablePreferencesEvent] = useState(null)
    const [ tableBodyMenuEvent, setTableBodyMenuEvent] = useState(null)
    const [ TableMenuItems ] = useTablePreferencesMenu(callback , changeRowHeight )
    const [ TableBodyMenuItems ] = useTableMenu(callback,menuItems)

    // =================================================================================

    const autoSizeAll = useCallback((skipHeader: boolean) => {
        console.log('auto size all ..')
        const allColumnIds: string[] = [];
        if ( ! gridRef.current.api ){ return }
        gridRef.current!.api.getColumns()!.forEach((column) => {
          allColumnIds.push(column.getId());
        });
        gridRef.current!.api.autoSizeColumns(allColumnIds, skipHeader);
    } , [callback.ready]);

    const exportAsCsv = useCallback( () => {
        gridRef.current.api.exportDataAsCsv({'fileName' : `${tableName}.csv`});
    } , [gridRef])


    const exportAsExcel = useCallback( (callback) => {
        const fileName =  tableName
        const fileType = 'application/vnd/openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const fileExntesion = '.xlsx'
        const ws  = XLSX.utils.json_to_sheet(callback.props.dataset)
        const wb = {Sheets : {'data' : ws } ,  SheetNames: ['data']}
        const excelBuffer = XLSX.write(wb , {bookType : 'xlsx'  , type : 'array'})
        const data = new Blob([excelBuffer] , {type : fileType})
        FileSaver.saveAs(data, fileName + fileExntesion)
    } , [callback.ready])


    const onCellSelected = useCallback( (params) => {
        updateCallback( prev => ({...prev , selectedCell : params.value, selectedHeader : params.colDef.field }))
        onCellClick(params, params.value , params.colDef.field)
    } , [callback])

    const onCellContextMenu = useCallback( (params) => {
        const { event , value } = params
        event.preventDefault()
        setTableBodyMenuEvent( event )
    } , [callback])

    useEffect(() => {
        if ( ready ){
            updateCallback( prev => ({...prev , ready : true }))
        }
        else if ( ready == false ) {
            updateCallback( prev => ({...prev , ready : false }))
        }
    } , [ready])


    const onRowSelected= (params) => {
        const row = callback.getSelectedRow()
        onRowClick( params , row )
    }

    function getTableData() {
        const rowData: any[] = [];
        gridRef.current.api!.forEachNode(function (node) {
          rowData.push(node.data);
        });
        return rowData
    }

    const removeSelectedRows = useCallback( () => {
        const rows = getSelectedRows()
        gridRef.current.api.applyTransaction({remove: rows})
        return getTableData()

    } ,[callback.ready])


    const getSelectedRows = useCallback( () => {
        return gridRef.current.api.getSelectedRows() || []
    } , [callback.ready])

    const getSelectedRow = useCallback( () => {
        return gridRef.current.api.getSelectedRows()[0] || null
    } , [callback.ready])

    const handleOnRowDoubleClicked = useCallback( ( params ) => {
        onRowDoubleClicked( params , params.data )
    } , [dataset])

    const reset = useCallback( () => {
        if ( callback.ready){
            setData(prev=>[])
        }
    } , [callback.ready])

    const onRefreshTrigger = useCallback( (callback) => {
        callback.updateSingleCallbackKey('ready' , false )
        onRefresh(callback)
        setTimeout( () => {callback.updateSingleCallbackKey('ready' , true )} , 1000)
    }  , [])

    useEffect( () => {
        if ( dataset ){
            setData(dataset)
        }
    } , [dataset])

    useEffect( () => {
        if ( gridRef.current ){
            updateCallback( prev => (
                {...prev , 
                    autoFit : autoSizeAll , 
                    exportAsCsv , 
                    exportAsExcel ,
                    getSelectedRows,
                    getSelectedRow ,
                    onRefreshTrigger ,
                    PanelDialogRef,
                    reset,
                    removeSelectedRows,
                    getTableData
                }
            ))
        }
    } , [])



    const onGridUpdated = useCallback( (params) => {
        if ( gridRef.current && dataset.length > 0 ){
            setTimeout( () => {
                updateCallback( prev => ({...prev , ready : true }))
            } , 1000)
        }
    } , [dataset])

    useEffect( () => {
        if ( callback.ready ){
            onTableBuilt( callback )
            setShowTableSpinner(false)
        }
        else {
            setShowTableSpinner(true)
        }

        if ( autoHideSpinner ){
            setShowTableSpinner(false)
        }
    } , [callback.ready , autoHideSpinner ])
    


    return (
        <TableContext.Provider value={{tref , ...props , gridRef , tid , callback , changeRowHeight  }}>
            <div data-tid={tid} onContextMenu={(e)=>{enableContextMenu ? e.preventDefault() : null }} ref={tref} className="ng-aggrid-wrapper w-full h-full light-minimal-theme custom-scroll-bar relative rounded-lg border-[1px] border-[#d0e6f6] border-solid pointer-events-auto" >
                <Topbar updateCallback={updateCallback} toolbarBtns={toolbarBtns} updateEvent={setTablePreferencesEvent} />
                {/* contextmenu for table preferences */}
                <ContextMenu 
                    items={{ items : TableMenuItems }}
                    event={tablePreferencesEvent}
                />
                {/* contextmenu for table itself */}
                <ContextMenu 
                    items={{ items : TableBodyMenuItems }}
                    event={tableBodyMenuEvent}
                />
                <DialogPanel 
                    children={<ManageColumns callback={callback} />}
                    header={'Columns Panel'}
                    collapsable={false}
                    ref={PanelDialogRef}
                    close={false}
                />
                <ArrayViewer 
                    callback={callback}
                />
                <div className="css-j2jo1l23">
                    { showTableSpinner ?  <InlineSpinner variant='white' defaultOpen={true} /> : false }
                    <AgGridReact
                        tid={tid} 
                        ref={gridRef}
                        rowData={data}
                        onSelectionChanged={onRowSelected}
                        columnDefs={columnDefs}
                        pagination= {enablePagination}
                        paginationPageSize={pageSize || 50 }
                        paginationPageSizeSelector={pageSizeArray}
                        headerHeight={40}
                        rowHeight = {rHeight}
                        rowSelection = 'multiple'
                        cellSeection = "multiple"
                        onRowDataUpdated={onGridUpdated}
                        onCellClicked={onCellSelected}
                        onCellContextMenu= {enableContextMenu ? onCellContextMenu : null }
                        onRowDoubleClicked={handleOnRowDoubleClicked}
                        { ... aggrid}
                        >
                    </AgGridReact>
                </div>
            </div>
        </TableContext.Provider>
    )
}) 