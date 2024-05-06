//@ts-nocheck

import axios from "axios";

export function api(address , options={}){
  if ( options.user == undefined){ options.user = null }
  if ( options.uuid == undefined){ options.uuid = null }
  return  axios.create({
    baseURL: address  ,
    headers: {
      'user' : options.user ,
      'uuid' : options.uuid ,
      'Content-Type': 'multipart/form-data',
      ...options
    }
  });


}




