import React from "react";

export const useRandomId = length => "_"+ Math.random().toString(36).substr(2, length || 8 );


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function range(start,end, step=1) {
    let result = [];
    if( ! end ){ end=start ; start=0 }
    for (let i = start; i < end; i += step) {
        result.push(i);
    }
    return result;
}


export const  convertNumberToArray =  (number) => {
    return Array.from({ length: number });
  }
  