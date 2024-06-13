// @ts-nocheck
import { useContext , forwardRef } from "react";
import { TopBarTitle } from "./TopBarTitle";
import TableGlobalContext from '../context/TableGlobalContext'
import { Tabletoolbar } from "./TableToolbar";

export const TableTopBar = forwardRef(( props, ref ) =>{
    const { options ,  table  } = useContext(TableGlobalContext);
    const { tablename , progressTableDiv  } = props;

    return (
        <div className='ag-grid-table-header-name'>
            <TopBarTitle tablename={tablename} />
            <div className="table-progress-block" ref={progressTableDiv}></div>
            <Tabletoolbar />
        </div> 

    )

})