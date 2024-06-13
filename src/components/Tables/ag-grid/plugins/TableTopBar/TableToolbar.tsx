// @ts-nocheck
import React , { useContext , forwardRef  } from "react";
import TableGlobalContext from '../context/TableGlobalContext'
import SearchField from "../SearchField/SearchField";
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Fullscreen } from '@/components'
import { callback } from "../../callbacks/callback";
import { IconButton as OvenIconButton } from '../../../../Buttons/IconButton'
import $ from 'jquery'
export const Tabletoolbar = forwardRef(() =>{
    const { options ,  table , toolbarBtns  } = useContext(TableGlobalContext);
    
    return(
        <>
            {
                ! options.enableToolBar 
                    ? 
                    null
                    :
                    <div className="flex p-4 items-center justify-end w-full relative" >
                        <div className="flex w-fit">
                            { toolbarBtns.map( item => item) }
                        </div>

                        {options.enableSearch ? <SearchField  />  : null }

                        <OvenIconButton 
                            onClick={callback.refreshTable}
                            tooltip='Refresh'
                            icon={<RefreshIcon className="text-blue-600"  />}
                            disable={
                                function(){
                                    if (callback.ready){
                                        const s = callback.props.onRefresh ? false : true
                                        return s  
                                    }
                                }()
                            }
                        />

                        <OvenIconButton 
                            onClick={callback.exportAsCsv}
                            tooltip='Export CSV'
                            icon={<ExitToAppIcon className="text-blue-600"  />}
                            disable={false}
                        />

                        <OvenIconButton 
                            onClick={callback.toggleFullScreenMode}                           
                            tooltip='Full screen'
                            icon={<Fullscreen className="text-blue-600"  />}
                            disable={false}
                        />

                        <OvenIconButton 
                            onClick={(e) => { options.updateTablePreferencesEvent( prev => e )}}                            
                            tooltip='save preferences'
                            icon={<MoreVertIcon className="text-blue-600"  />}
                            disable={false}
                        />
                     
                    </div>
            }

        </>
    )

})