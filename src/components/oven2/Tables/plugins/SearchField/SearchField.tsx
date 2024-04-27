// @ts-nocheck
import React, { useRef, useState ,  useContext, useEffect } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import TextField from '@mui/material/TextField';
import './styles.css';
import TableGlobalContext from '../context/TableGlobalContext';
import $ from 'jquery'
import SearchIcon from '@mui/icons-material/Search';
import CustomIconButton from '../../../CustomIconButton/CustomIconButton';
import { Box } from '@mui/material';
import Zoom from '@mui/material/Zoom';


export default function SearchField(props){

    const inputRef = useRef(null);
    const { ref: agGridRef } = useContext(TableGlobalContext);
    const [ show , setShow ] = useState(true)
    const [ searchText , setSearchText ] = useState('')

    function hideSearchBar(e) {
        if (searchText == ''){setShow(false)}
        
    }

    function handleInputChange(e) {
        const searchTxt = e.target.value;
        setSearchText(prev => searchTxt )
        agGridRef.current.api.setQuickFilter(searchTxt);
    }

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
                            style: { borderRadius: 25 }
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
