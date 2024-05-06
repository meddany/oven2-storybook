// @ts-nocheck
import { utils } from "../utils/utils"
var api= {}
import { GenerateHeaders } from "./generateHeaders"
import $ from 'jquery'
import * as FileSaver from "file-saver"
import * as XLSX from 'xlsx';
import ManageColumns from '../plugins/ManageColumns/ManageColumns';
import { Stack , TextField } from "@mui/material"
import { hotkeyRegister , getAllKeyCodes , clearHotkeyRegister , clearAllHotkeyRegister } from "../../../utils/hotkeyregister"
import { Switch } from "../../../Inputs"
import TableShortcutsElement from "../plugins/TableShortcutsElement"
export var callback = {
    ready : false , 
    defaultHeaders : () => {
        return [
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
    } ,

    // =================================================================================

    copySingleCell : (cell) => {
        utils.copyToClipboard(cell.value)
    } ,

    // =================================================================================

    getDefaultMenus: () => {
        return [
            {
              label : 'Copy' ,
              subItems : [
                {
                  label : 'Copy Cell' ,
                  action : callback.copySingleCell ,
                  hotkeys : {
                    extra : {ctrl : true , alt : false , shift : false } ,
                    key : 'c'
                  }
                } ,
                {
                  label : 'Copy Header & Cell' ,
                  action : callback.copyHeaderAndCell ,
                  hotkeys : {
                    extra : {ctrl : true , alt : true , shift : false } ,
                    key : 'c'
                  }
                } ,
              ]
            } 
          ]
    } ,

    // =================================================================================
    
    api: () => {return api } ,
    // =================================================================================

    storeApi : (d) => { api=d ; return api } ,

    // =================================================================================

    copyHeaderAndCell: (cell) => {
        const cell1 = JSON.stringify(cell.data).toString()
        utils.copyToClipboard(cell1)
    },
    // =================================================================================
    
    generateHeaders : (dataset , hides , props ) => {
        return GenerateHeaders(dataset , hides , props )
    } ,
    // =================================================================================
    updateMenuItems : () => {
        global.updateMenuItems()
    },
    // =================================================================================
    getTableSize: () => {
        if ( ! callback.api ){ return 0 }
        return $(callback.api.mtable).width()
    } ,
    // =================================================================================
    updateOption: () => {} ,
    
    // =================================================================================

    convertToReadableHeaders: (headers) => {
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
    } ,

    // =================================================================================

    rowColoredChanges : [] ,
    // =================================================================================
    resetRowColorsArray: () => { callback.rowColoredChanges.length = 0} , 
    // =================================================================================
    changeRowColor: (r) => {
        const color = callback.api.options.rowColor
        let selectedRowNode = callback.api.gridRef.api.getSelectedNodes();
        if (r == 'reset'){
          callback.rowColoredChanges.map( row => {
            if(row.getAttribute('color-changed') === 'yes'){
              row.style.backgroundColor = '';
              row.setAttribute('color-changed' , 'no')
            }   
          })
          callback.resetRowColorsArray()
          return 
        }
        selectedRowNode.forEach(element => {
          var RowId = element.id
          var rows = $(callback.api.mtable).find(`.ag-row[row-id="${RowId}"]`)
          rows.map( (index, row) => {
            if(row.getAttribute('color-changed') === null || row.getAttribute('color-changed') === 'no'){
              row.style.backgroundColor = color ;
              row.setAttribute('color-changed' , 'yes')
              callback.rowColoredChanges.push(row)
            }
            else if(row.getAttribute('color-changed') === 'yes'){
                row.style.backgroundColor = '';
                row.setAttribute('color-changed' , 'no')
            }  
          })
                
      })
    } ,

    // =================================================================================
    refreshTable : () => {
        if ( callback.api ){
            if(! callback.api.live.current.api.options ){ return }
            if(! callback.api.live.current.api.options.onRefresh ){ return }
            callback.api.live.current.api.options.onRefresh(callback.api)
        }
    },

    // ======================================================
    stopContextMenuDefaults : (e) => {
        e.preventDefault()
    } ,

    // ==========================================================
    isCellAsArray : () => {
        return Array.isArray( callback.api.live.current.cell.value ?? '') 
    } ,
    getSelectedRows : () => {
        return callback.agGridRef.api.getSelectedRows()
    } ,
    // ==========================================================
    getSelectedRow : () => {
        return callback.getSelectedRows()[0]
    } ,
    // ==========================================================
    removeSelectedRows : (index) => {
        var selectedNodes = callback.agGridRef.api.getSelectedNodes();
        // Extract selected data from nodes
        var selectedData = selectedNodes.map(node => node.data);
        // Remove selected data
        callback.agGridRef.api.applyTransaction({ remove: selectedData });
    } ,
    exportAsExcel : () => {
        const fileName =  callback.api.current.api.tableName
        const fileType = 'application/vnd/openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const fileExntesion = '.xlsx'
        const exportToExcel = async() => {
          const ws  = XLSX.utils.json_to_sheet(callback.api.live.current.api.data)
          const wb = {Sheets : {'data' : ws } ,  SheetNames: ['data']}
          const excelBuffer = XLSX.write(wb , {bookType : 'xlsx'  , type : 'array'})
          const data = new Blob([excelBuffer] , {type : fileType})
          FileSaver.saveAs(data, fileName + fileExntesion)
        }
        exportToExcel()
    } ,

    // =================================================================================
    updateRowsData : (data) => {
        callback.agGridRef.api.setRowData(data)
    },

    // =================================================================================

    autoApplyHeaders : (data) => {
        const props = callback.api.updatedState.current.api.props
        const options = callback.api.options
        var headers = callback.generateHeaders( data , props.hiddenColumns , props )
        if (options.enableMultiRowSelection == true ){
          callback.api.current.api.updateColumnDef(headers)
        }
        else if (options.enableMultiRowSelection == false ){
            callback.api.current.api.resetColumnDef(headers)
        }
        return headers
    } ,

    // =================================================================================

    viewManageColumn : () => {
        if (! callback.api.updatedState ){ return <></>}
        return <ManageColumns table={callback.api.updatedState.current.api} />
    } ,

    // =================================================================================
    savePrefernces : () => {
        const tableName= callback.api.options.tableName
        const tid= callback.api.options.tid
        var state = callback.api.updatedState.current.api.gridRef.api.getColumnState();
        window.localStorage.setItem(`_tState_${tableName}_${tid}`, JSON.stringify(state));
        console.log('table saved!')
        window.state = callback.api.updatedState.current.api.gridRef.api.getColumnState()
    } ,
    
    // =================================================================================
    saveShortcutsPrefernces : () => {
        const items = getAllKeyCodes().data
        console.log(items)
        const tableName= callback.api.options.tableName
        const tid= callback.api.options.tid
        window.localStorage.setItem(`tState_${tableName}_${tid}_shortcuts`, JSON.stringify(items));
    }  ,
    // =================================================================================
    loadShortcutPreferences : () => {
        const tableName= callback.api.options.tableName
        const litems = getAllKeyCodes().data
        const tid= callback.api.options.tid
        const items = window.localStorage.getItem(`tState_${tableName}_${tid}_shortcuts`);
        if(!items){ return }
        JSON.parse(items).map( item => {
            litems.map( litem => {
                // console.log(litem , item )
                if ( litem.label == item.label){
                    litem.enable = item.enable
                    return
                }
            })
        })
        console.log('shortcuts loaded!')
    }  ,
    // =================================================================================
    restoreState : () => {
        try{
            const tableName= callback.api.options.tableName
            const tid= callback.api.options.tid
            callback.api.updatedState.current.api.gridRef.api.applyColumnState({
              state:JSON.parse( localStorage.getItem(`_tState_${tableName}_${tid}`) ) ,
              applyOrder: true,
            });
          }
          catch(error){console.warn(error)}
    } ,
    reset : () => {
        callback.api.updatedState.current.api.gridRef.api.setRowData([]);
    } ,

    // =================================================================================

    getTableMenuOptions : () =>  { return [
          {
            label : 'Toggle row color',
            action : callback.changeRowColor ,
            hotkeys : {
              extra : {ctrl : false , alt : false , shift : true } ,
              key : 'h'
            }
          } ,
          {
            label : 'Reset row color',
            action : ()=>{callback.changeRowColor('reset')} ,
            hotkeys : {
              extra : {ctrl : false , alt : false , shift : true } ,
              key : 'c'
            }
          } ,
          {
            label : 'Manage Columns',
            subItems : [
              {
                label : 'Manage Columns',
                frame : 'page' ,
                custom : true,
                type: 'custom' ,
                element : callback.viewManageColumn(),
                frameOptions : {
                  width : '250px' ,
                  height : '50vh'
                 } ,
              }
            ]
            
          } ,
          {
            label : 'Save preferences',
            action : callback.savePrefernces ,
            hotkeys : {
              extra : {ctrl : false , alt : false , shift : true } ,
              key : 's'
            }
          } ,
          {
            label : 'Restore preferences',
            action : callback.restoreState ,
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
                action : callback.exportAsCsv,
              } ,
              {
                label : 'Excel',
                action : callback.exportAsExcel,
                hotkeys : {
                  extra : {ctrl : false , alt : false , shift : true } ,
                  key : 'x'
                }
              } ,
            ]
          } ,
          {
            label : 'Table shortcuts',
            subItems : [
                {
                    label : '' ,
                    frame : 'page' ,
                    custom : true ,
                    type : 'custom' ,
                    frameOptions: {
                        width : '30vw' ,
                        height : '70vh'
                    },
                    element: <TableShortcutsElement />
                }
            ]
          } ,
          {
            label : 'Preferences',
            subItems: [
              {
                label : 'Row Heighlight colors',
                custom : true , 
                frame : 'page' ,
                type : 'custom',
                element : callback.GetColorElementBox() ,
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
                element : callback.GetPaginationInputBox() ,
                header : 'Table pagination size' ,
              },
            ]
          } ,
        ]
    },

    // =================================================================================

    GetPaginationInputBox : () => { 
        if ( !callback.api.options ){ return <></>}
        const paginationPageSize= callback.api.options.paginationPageSize
        return (
            <Stack direction={'row'} alignItems={'start'} justifyContent={'start'}>
              <TextField inputProps={{min : 10 , max:1000}} defaultValue={paginationPageSize} type='number' sx={{width : '100px' }} label="Page Size" size='small'
                onChange={(e) => {
                  let pageSizeNumber = e.target.value
                  if ( pageSizeNumber <= 10 ){
                    e.target.value = 10
                    return
                  }
                //   setPaginationPageSize(e.target.value)
                callback.api.updatePageSize(e)
                }}
              />
            </Stack>
        )
    } ,

    // =================================================================================

    GetColorElementBox : () => {
        return (
            <Stack>
                <input 
                  type="color" 
                    onChange={(e,v) => {
                    callback.updateOption('rowColor' , e.target.value  )
                  }}
                  defaultValue={'#4DA167'}/>
            </Stack>
          )
    } ,

    // =================================================================================

    addRow : (newItem) => {
        console.log(callback)
        const headersGenerated = callback.api.options.headersGenerated
        if ( headersGenerated == false ){ callback.autoApplyHeaders([newItem],options) }
        callback.agGridRef.api.applyTransaction({ add: [newItem], addIndex: 0 });
    } ,

    // =================================================================================

    registerHoykeys : () => {
        hotkeyRegister( 'c' , {ctrl : true , alt : false , shift : false } , callback.copySingleCell , 'Copy Table cell' )
        hotkeyRegister( 'c' , {ctrl : true , alt : true , shift : false } , callback.copyHeaderAndCell   ,  'Copy Table header and cell' )
        hotkeyRegister( 'h' , {ctrl : false , alt : false , shift : true } , callback.changeRowColor  , 'Switch row color for selected table rows.' )
        hotkeyRegister( 'c' , {ctrl : false , alt : false , shift : true } , () => {callback.changeRowColor('reset')}  , 'Reset the row color for all rows')
        hotkeyRegister( 's' , {ctrl : false , alt : false , shift : true } , callback.savePrefernces , 'Save table preferences' )
        hotkeyRegister( 'r' , {ctrl : false , alt : false , shift : true } , callback.restoreState , 'Restore table preferences' )
        hotkeyRegister( 'x' , {ctrl : false , alt : false , shift : true } , callback.exportAsExcel , 'Export the current table data into excel.' )
    } ,

    // =================================================================================

    exportAsCsv : () => {
        const tablename =  callback.api.current.api.tableName
        callback.agGridRef.api.exportDataAsCsv({'fileName' : `${tablename}.csv`});
    } ,

    isDuplicateEntry : () => {
        let isDuplicate = false;
        callback.agGridRef.api.forEachNode(function(node) {
            if(JSON.stringify(node.data) === JSON.stringify(newRow)) {
                isDuplicate = true;
            }
        });
        return isDuplicate;
    } ,
}   