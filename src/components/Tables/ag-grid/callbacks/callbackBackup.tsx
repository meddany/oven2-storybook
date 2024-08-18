/* eslint-disable no-empty */
// @ts-nocheck

import { utils } from "../utils/utils"
let api= {}
import { GenerateHeaders } from "./generateHeaders"
import $ from 'jquery'
import * as FileSaver from "file-saver"
import * as XLSX from 'xlsx';
import ManageColumns from '../plugins/ManageColumns/ManageColumns';
import { Stack , TextField } from "@mui/material"
import { hotkeyRegister , getAllKeyCodes } from "../../../utils/hotkeyregister"
import TableShortcutsElement from "../plugins/TableShortcutsElement"
import { Copy , Files , BaselineIcon, PaintBucketIcon , Settings , ArrowRightFromLine ,SlidersVertical  } from '@/components' 
import { ColorInputBox } from "../plugins/ColorInput/ColorInputBox"

export const callback = {
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

    copySingleCell : () => {
        const cell = callback.api.live.current.api.getSelectedCell()
        utils.copyToClipboard(cell.value)
    } ,

    // =================================================================================
    // { label : 'Back' , action : () => {} , seperator : false , size : 'sm' ,type: 'default' , shortcut : '⌘Y' , pinned : true , icon: <MoveLeft strokeWidth={1.5} absoluteStrokeWidth />  } ,
    getDefaultMenus: () => {
        return [
            {
              label : 'Copy' ,
              type: 'default' ,
              size : 'mid' ,
              seperator : true , 
              subItems : [
                {
                  label : 'Copy Cell' ,
                  action : callback.copySingleCell ,
                  type : 'default',
                  size : 'mid' ,
                  shortcut: "CTRL+C" ,
                  icon : <Copy />
                } ,
                {
                  label : 'Copy Header & Cell' ,
                  action : callback.copyHeaderAndCell ,
                  shortcut: "CTRL+ALT+C" ,
                  size : 'mid' ,
                  type : 'default',
                  icon : <Files />
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

    copyHeaderAndCell: () => {
      const cell = callback.api.live.current.api.getSelectedCell()
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
        return $(callback.api.live.current.api.mtable).width()
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
        const color = callback.options.rowColor
        const selectedRowNode = callback.api.live.current.api.gridRef.api.getSelectedNodes();
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
          const RowId = element.id
          const rows = $(callback.api.live.current.api.mtable).find(`.ag-row[row-id="${RowId}"]`)
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
            callback.api.live.current.api.options.onRefresh(callback)
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
    removeSelectedRows : () => {
      const selectedNodes = callback.agGridRef.api.getSelectedNodes();
        // Extract selected data from nodes
      const selectedData = selectedNodes.map(node => node.data);
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
      console.log('auto apply header s.. ')
      const props = callback.api.updatedState.current.api.props
      const options = callback.api.options
      const headers = callback.generateHeaders( data , props.hiddenColumns , props )
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
        const state = callback.api.updatedState.current.api.gridRef.columnApi.getColumnState();
        window.localStorage.setItem(`_tState_${tableName}_${tid}`, JSON.stringify(state));
        // console.log('table saved!')
        window.state = callback.api.updatedState.current.api.gridRef.columnApi.getColumnState()
    } ,
    
    // =================================================================================
    saveShortcutsPrefernces : () => {
        const items = getAllKeyCodes().data
        // console.log(items)
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
        // console.log('shortcuts loaded!')
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
          catch(error){}
    } ,
    reset : () => {
        callback.api.updatedState.current.api.gridRef.api.setRowData([]);
    } ,

    // =================================================================================

    getTableMenuOptions : () =>  { return [
          {
            label : 'Toggle row color',
            action : callback.changeRowColor ,
            shortcut: "shift+h" ,
            type : 'default' ,
            size : 'sm' ,
            icon : <BaselineIcon />
          } ,
          {
            label : 'Reset row color',
            action : ()=>{callback.changeRowColor('reset')} ,
            shortcut: "shift+c" ,
            type : 'default' ,
            size : 'sm' ,
            seperator : true,
            icon : <PaintBucketIcon />
          } ,
          {
            label : 'Manage Columns',
            type : 'accordion',
            size : 'sm' ,
            defaultOpen: false ,
            content : callback.viewManageColumn(),
          } ,
          {
            label : 'Save preferences',
            action : callback.savePrefernces ,
            shortcut: "shift+s" ,
            type :"default" ,
            size : 'sm' ,
            icon : <Settings className="text-blue-600" />
          } ,
          {
            label : 'Restore preferences',
            action : callback.restoreState ,
            shortcut: "shift+r" ,
            type :"default" ,
            size : 'sm' ,

          } ,
          {
            label : 'Preferences',
            type: 'default',
            size : 'sm' ,
            icon : <SlidersVertical /> ,
            seperator : true,
            subItems: [
              {
                label : 'Row Color',
                type : 'accordion',
                content : callback.GetColorElementBox(),              
              },
              {
                label : 'Table pagination size',
                type : 'accordion',
                content : callback.GetPaginationInputBox() ,
              }, 
              {
                label :"Auto refresh" , 
                type : 'switch' ,
                defaultChecked: function(){
                  if ( callback.props ){
                    if ( callback.props.autoRefresh ){
                      return true 
                    }
                    return false
                  }
                    
                }() ,
                size : 'sm' ,
                onChange: (checked) => {
                  callback.supressAutoRefresh = checked;
                }
              }
            ]
          } ,
          {
            label : 'Exports',
            type : 'default' , 
            size : 'sm' ,
            icon: <ArrowRightFromLine  />,
            subItems: [
              {
                label : 'CSV',
                action : callback.exportAsCsv,
                type : 'default' ,
              } ,
              {
                label : 'Excel',
                action : callback.exportAsExcel,
                shortcut: "shift+x" ,
                type : 'default' ,
                
              } ,
            ]
          } ,
          {
            label : 'Table shortcuts',
            size:'sm' , 
            type : 'default' ,
            subItems : [
              {
                label : 'Enable/Disable Table Hotkeys',
                type : 'accordion' ,
                defaultOpen :true,
                content : <TableShortcutsElement />
              }
            ]
          } ,
          {
            label : 'themes' , 
            type : 'default' ,
            subItems : [
              {
                type : 'radiogroup' ,
                size : 'mid' ,
                action : () => {} ,
                onChange: (e,v) => {
                  console.log('selected theme is ' , v.label)
                  const cs = callback.getThemeClass(v.label)
                  callback.api.updateTheme( cs )
                } ,
                group : function(){
                  const fn = []
                  if ( callback ){
                    if ( callback.themes ){
                      callback.themes.map( item => {
                        fn.push({label : item.name , value : item.name , defaultChecked : function(){
                          if ( callback.theme == item.className ) {
                            return true
                          } 
                          return false
                        }()  })
                      } )
                    }
                  }
                  return fn 
                }()
              }
            ]
            
          }
          
        ]
    },

    // =================================================================================

    GetPaginationInputBox : () => { 
        if ( !callback.api.options ){ return <></>}
        const paginationPageSize= callback.api.options.paginationPageSize
        return (
            <Stack  direction={'row'} alignItems={'start'} justifyContent={'start'} >
              <TextField inputProps={{min : 10 , max:1000}} defaultValue={paginationPageSize} type='number' sx={{width : '100%' }} label="Page Size" size='small'
                onChange={(e) => {
                  const pageSizeNumber = e.target.value
                  if ( pageSizeNumber <= 10 ){
                    e.target.value = 10
                    return
                  }
                callback.api.updatePageSize(e)
                }}
              />
            </Stack>
        )
    } ,

    // =================================================================================

    GetColorElementBox : () => {
        return <ColorInputBox />
    } ,

    // =================================================================================

    addRow : (newItem) => {
        const headersGenerated = callback.api.options.headersGenerated
        if ( headersGenerated == false ){ callback.autoApplyHeaders([newItem],options) }
        callback.agGridRef.api.applyTransaction({ add: [newItem], addIndex: 0 });
    } ,

    // =================================================================================

    registerHoykeys : () => {
        hotkeyRegister( 'ctrl+c' , callback.copySingleCell , 'Copy Table cell' )
        hotkeyRegister( 'ctrl+alt+c' , callback.copyHeaderAndCell   ,  'Copy Table header and cell' )
        hotkeyRegister( 'shift+h' , callback.changeRowColor  , 'Switch row color for selected table rows.' )
        hotkeyRegister( 'shift+c'  , () => {callback.changeRowColor('reset')}  , 'Reset the row color for all rows')
        hotkeyRegister( 'shift+s' , callback.savePrefernces , 'Save table preferences' )
        hotkeyRegister( 'shift+r' , callback.restoreState , 'Restore table preferences' )
        hotkeyRegister( 'shift+x'  , callback.exportAsExcel , 'Export the current table data into excel.' )
        hotkeyRegister( 'shift+f'  , callback.toggleFullScreenMode , 'Switch between full screen table.' )
    } ,

    // =================================================================================
    toggleFullScreenMode : () => {
      $(callback.api.live.current.api.mtable).parent().toggleClass('table-full-screen')
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
    // =================================================================

    supressAutoRefresh : false , 

    // =================================================================

    autoRefreshInterval : null ,
    // =================================================================

    setAutoRefreshTable : ( func , every ) => {
      const interval = setInterval( () => {
        if ( callback.supressAutoRefresh ){
          console.warn('autoRefreshTable is supressed.') ;
          return 
        }
        // console.log('auto refresh table now ...' , callback , ' supressAutoRefresh ')
        func(callback)
      } , every || 3000 )
      callback.autoRefreshInterval = interval
    }
}   