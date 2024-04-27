//@ts-nocheck

import axios from "axios";
const https = require('https');

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export function api(address , options={} , headers={}){
  if ( options.user == undefined){ options.user = null }
  if ( options.uuid == undefined){ options.uuid = null }
  return  axios.create({
    baseURL: address  ,
    httpsAgent: httpsAgent,
    headers: {
      'user' : options.user ,
      'uuid' : options.uuid ,
      'Content-Type': 'multipart/form-data',
      ...headers
    }
  });
}




