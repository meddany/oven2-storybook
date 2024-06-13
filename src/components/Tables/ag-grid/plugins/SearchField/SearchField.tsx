// @ts-nocheck
import React, { useRef, useState , useContext, memo } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import TextField from '@mui/material/TextField';
import './styles.css';
import TableGlobalContext from '../context/TableGlobalContext';
import $ from 'jquery'
import { Input } from '@/components'
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import { IconButton as CustomIconButton } from '../../../../Buttons/IconButton'
import { callback } from '../../callbacks/callback';

const SearchField = () => {

    const inputRef = useRef(null);
    const { ref : agGridRef , table } = useContext(TableGlobalContext);
    const [ show , setShow ] = useState(true)
    const [ searchText , setSearchText ] = useState('')

    function hideSearchBar() {
        if (searchText == ''){setShow(false)}
        
    }
    // const getTableSize = () => {
    //     if ( table.api ){
    //         return callback.getTableSize()
    //     }
    //     return 200
    // } 

    const handleInputChange = (_,v) => {
        const searchTxt = v
        setSearchText( searchTxt )
        agGridRef.current.api.setQuickFilter(searchTxt);
    }

    function showSearchBar(){ $(inputRef.current).show() ; setShow(true)}

    function unmountSearchBar(){
        if ( show == false ){
            if (searchText != ''){return}
            setTimeout(()=>{$(inputRef.current).hide()} , 300)
        }
    }

    return (
        <div className='flex justify-center items-center '>
            <ClickAwayListener onClickAway={hideSearchBar}>
                <Box>
                    <div className='flex items-center justify-center' >
                        <Zoom in={show} addEndListener={unmountSearchBar}>
                            <div className='mr-1'>
                                <Input 
                                    placeholder = 'Search ...'
                                    onInputChange={handleInputChange}
                                />
                            </div>
                        </Zoom>
                        <CustomIconButton 
                            icon={<SearchIcon className="text-blue-600"  />}
                            onClick={showSearchBar}
                            title='Search'
                        />
                    </div>
                </Box>
            </ClickAwayListener>
        </div>
    );
}

export default memo(SearchField)
