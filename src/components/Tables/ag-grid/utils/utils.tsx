// @ts-nocheck
import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';


export var utils = {

  copyToClipboard : function copyToClipboard(value){
    copy( value );
    toast(`Cell copied to clipboard!`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } ,

  getTableId :  function(table){
    return table.tid
  } ,

  



}