// @ts-nocheck
import React, { useRef, useState  , useMemo  ,  useContext, useEffect, useCallback, memo } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import TextField from '@mui/material/TextField';
import './styles.css';
import TableGlobalContext from '../context/TableGlobalContext';
import $ from 'jquery'
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import CustomIconButton from '../../../../Buttons/CustomIconButton/CustomIconButton';
import { callback } from '../../callbacks/callback';
const SearchField = (props) => {

    const inputRef = useRef(null);
    const { ref : agGridRef , table , options } = useContext(TableGlobalContext);
    const [ show , setShow ] = useState(true)
    const [ searchText , setSearchText ] = useState('')

    function hideSearchBar(e) {
        if (searchText == ''){setShow(false)}
        
    }
    const getTableSize = useCallback(() => {
        if ( table.api ){
            return callback.getTableSize()
        }
        return 200
    } , [])

    const handleInputChange = useCallback(() => {
        const searchTxt = e.target.value;
        setSearchText(prev => searchTxt )
        agGridRef.current.api.setQuickFilter(searchTxt);
    })

    function showSearchBar(){ $(inputRef.current).show() ; setShow(true)}

    function unmountSearchBar(){
        // 
        if ( show == false ){
            if (searchText != ''){return}
            setTimeout(()=>{$(inputRef.current).hide()} , 300)
        }
    }

    return (
        <ClickAwayListener onClickAway={hideSearchBar}>
            <Box>
                <Zoom in={show} addEndListener={unmountSearchBar}>
                    <TextField 
                        onChange={handleInputChange} 
                        ref={inputRef}
                        size='small'
                        label="Search..."
                        InputProps={{
                            style: { 
                                borderRadius: 25 ,
                                width : `${getTableSize()*.5}px` || '100px'
                             }
                          }}
                    />
                </Zoom>
                <CustomIconButton 
                    icon={<SearchIcon />}
                    onClick={showSearchBar}
                    title='Search'
                />
            </Box>
        </ClickAwayListener>
    );
}

export default memo(SearchField)
