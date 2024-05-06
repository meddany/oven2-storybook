// @ts-nocheck
import React , { useState, useEffect , useRef , useMemo , useContext , forwardRef  } from "react";
import TableGlobalContext from '../context/TableGlobalContext'
import { Stack } from "@mui/material";
import SearchField from "../SearchField/SearchField";
import {IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { callback } from "../../callbacks/callback";
import { IconButton as OvenIconButton } from "../../../../Buttons";
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

                        <OvenIconButton 
                            onClick={table.api.refresh}
                            title='Refresh'
                            icon={<RefreshIcon  />}
                            disable={callback.api.options.onRefreshButtonDisable ? true : false}
                        />

                        <OvenIconButton 
                            onClick={callback.exportAsCsv}
                            title='Export CSV'
                            icon={<ExitToAppIcon  />}
                            disable={false}
                        />

                        <OvenIconButton 
                            onClick={(e) => { options.updateTablePreferencesEvent( prev => e )}}                            
                            title='save preferences'
                            icon={<MoreVertIcon  />}
                            disable={false}
                        />
                     
                    </Stack>
            }

        </>
    )

})