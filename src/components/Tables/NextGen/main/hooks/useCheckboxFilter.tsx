// @ts-nocheck
import { useState  , useRef , useContext } from "react";
import { Label } from "@/components"
import { TableContext } from "../main";
import useSecondEffect from "@/components/Api/useSecondEffect"; 
import { Checkbox } from '@mui/material';


export function getColumnFilterAllSelected(filterItems,field){
    return filterItems.filter( element => element.view == false && element.key == field) == 0
}

export const CustomCheckboxFilter = (props) => {
    const {
        api ,
        colDef,
    } = props;

    const field = colDef.field;
    const filteredDataArray = props.colDef.data
    const { filterItems  ,setFilterItems , triggerFilterEventChange , filterEventChanged  } = useContext(TableContext)
    const ref = useRef()
    const [ isAllSelected , setIsAllSelected ] = useState(true)

    const handleFilterChange = (event,item) => {
        const checked = event.target.checked
        colDef?.row?.map( row => {
            for ( let key in row ){
                const header = key 
                const value = row[key]
                if ( field == header && item == value){
                    row.view = checked
                    if ( checked == false ){
                        setIsAllSelected(false)
                    }
                }
            }
        })
        setFilterItems( colDef ) 
        triggerFilterEventChange()   
    }

    const selectAll= (checked) => {
        ref.current.querySelectorAll('input').forEach( element => {
            element.checked = checked
        })
        setIsAllSelected(checked)
        colDef?.row?.map( row => {
            for ( let key in row ){
                const header = key 
                if ( field == header ){
                    row.view = checked
                }
            }
        })
        setFilterItems( colDef ) 
        triggerFilterEventChange() 
    }

    function getColumnFilterAllSelected(filterItems,field){
        return filterItems.row?.filter( row => row.view == false && Object.keys(row).includes(field) ).length == 0
    }
    
    useSecondEffect( () => {
        const visibleRows = filterItems.row.filter( element => element.view == true)
        const isSelectAll = getColumnFilterAllSelected(filterItems,field)
        if ( isSelectAll ){
            setIsAllSelected(true)
        }
        columnApi.setColumnFilterModel( field, {
            filterTo : null ,
            values: visibleRows.map( item => item[field])
        })
        .then(() => {
            api.onFilterChanged();
        })
        if ( isSelectAll ){
            api.setFilterModel({[field] : null  })
        }

    } , [filterEventChanged])


    const getDefaultCheckValue = (label) => {
        for (let key in colDef.row ){
            const rows = colDef.row[key]
            for ( let key in rows ){
                const header = key 
                const value = rows[key]
                if ( label == value && header == field ){
                    if ( rows.view == false && isAllSelected == true ){
                        setIsAllSelected(false)
                    }
                    return rows.view
                }
            }
        }
    }

    return(
        <div ref={ref} className="p-2 max-h-[50vh] min-w-[200px] overflow-auto relative">
            <div className="uppercase border-b text-black">
                <Label>{field}</Label>
                <div className="flex gap-1 items-center">
                    <div>
                        <Checkbox 
                            checked={isAllSelected}
                            onChange={(event) => {
                                selectAll(event.target.checked)
                            }}
                        />
                    </div>
                    <div>
                        <Label>Select All</Label>
                    </div>
                </div>
            </div>
            <div className="h-full overflow-auto p-2">
                {
                    filteredDataArray.map( (item,index) => {
                        return(
                            <div key={index} className="flex gap-1 items-center">
                                <div>
                                    <input 
                                        className="w-[20px] h-[20px] rounded-full"
                                        type='checkbox'
                                        checked={getDefaultCheckValue(item)}
                                        onChange={(event) => {
                                            handleFilterChange(event,item)
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label>{item}</Label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
