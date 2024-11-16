// @ts-nocheck
import React, { useRef, useState , useContext, memo } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import './styles.css';
import TableGlobalContext from '../context/TableGlobalContext';
import $ from 'jquery'
import { Input } from '@/components'
import SearchIcon from '@mui/icons-material/Search';
import Zoom from '@mui/material/Zoom';
import { IconButton as CustomIconButton } from '../../../../Buttons/IconButton'
import './styles.css'
import { useRandomId } from '@/components';

const cs = useRandomId()


const SearchField = () => {

    const inputRef = useRef(null);
    const { ref : agGridRef } = useContext(TableGlobalContext);
    const [ show , setShow ] = useState(true)
    const [ searchText , setSearchText ] = useState('')

    function hideSearchBar() {
        if (searchText == ''){
            setShow(false)
            $('.'+cs).find('.css-ijr312').addClass('css-ijr312-hide')
        }
        
    }

    const handleInputChange = (_,v) => {
        const searchTxt = v
        setSearchText( searchTxt )
        agGridRef.current.api.setQuickFilter(searchTxt);
    }

    function showSearchBar(){ 
        $(inputRef.current).show() ; 
        setShow(true) 
        $('.'+cs).find('.css-ijr312').removeClass('css-ijr312-hide')
    }

    function unmountSearchBar(){
        if ( show == false ){
            if (searchText != ''){return}
            console.log($(inputRef.current).find('.css-ijr312'))
            setTimeout( 
                ()=>{
                    $(inputRef.current).hide()
                    $('.'+cs).find('.css-ijr312').addClass('css-ijr312-hide')
                }    
            , 300)
        }
    }

    return (
        <div className={`flex justify-center items-center ${cs}`} >
            <ClickAwayListener onClickAway={hideSearchBar}>
                <div className='w-auto'>
                    <div className='flex items-center justify-center' >
                        <Zoom in={show} addEndListener={unmountSearchBar}>
                            <div className='mr-1 css-ijr312'>
                                <Input 
                                    placeholder = 'Search ...'
                                    onChange={handleInputChange}
                                    className='w-[200px]'
                                />
                            </div>
                        </Zoom>
                        <CustomIconButton 
                            icon={<SearchIcon className="text-blue-600"  />}
                            onClick={showSearchBar}
                            title='Search'
                        />
                    </div>
                </div>
            </ClickAwayListener>
        </div>
    );
}

export default memo(SearchField)
