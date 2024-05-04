// @ts-nocheck
import React , { useState, useEffect , useRef , useMemo , useContext , forwardRef  } from "react";
import TableGlobalContext from '../context/TableGlobalContext'
import { Stack } from "@mui/material";
import SearchField from "../SearchField/SearchField";
import {IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export const Tabletoolbar = forwardRef(( props, ref ) =>{
    const { options ,  table , toolbarBtns  } = useContext(TableGlobalContext);
    return(
        <>
            {
                ! options.enableToolBar 
                    ? 
                    null
                    :
                    <Stack sx={{ width : '100%' ,padding:'5px 5px 5px 5px'}} direction={'row'} alignItems={'end'} justifyContent={'end'}>

                        { toolbarBtns.map(item => item) }

                        {options.enableSearch ? <SearchField /> : null }

                        <IconButton sx={{borderRadius: 2 }} onClick={table.api.refresh} aria-label="more-options">
                        <RefreshIcon  />
                        </IconButton>

                        {/* <IconButton onClick={exportCsv} aria-label="more-options">
                        <ExitToAppIcon />
                        </IconButton>
 */}
                        <IconButton  onClick={(e) => { options.updateTablePreferencesEvent( prev => e )}} >
                        <MoreVertIcon />
                        </IconButton>      

                    </Stack>
            }

        </>
    )

})