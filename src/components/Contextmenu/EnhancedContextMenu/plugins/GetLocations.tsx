// @ts-nocheck
import $ from 'jquery'

export const getMousePosition = (event) => {
    console.log(event)
    if ( ! event ){ return { X:  0 ,  Y : 0 } } 
    if ( ! event.clientX ){ return { X:  0 ,  Y : 0 } } 
    let X = event.clientX;
    let Y = event.clientY;
    return { X , Y}
}

export const getLocations = ( event , ref , options ) => {
    if (! options ){ options = { extraPadding : 5  } }
    // Use native DOM methods where possible
    let { X , Y } = getMousePosition(event)
    let $ref = $(ref.current);
    let $enhCmBox = $ref.find('.enh-cm-box');
    if ( ! $enhCmBox[0] ) {return { X: 0, Y: 0 }; }
    let MenuBoxWidth = $enhCmBox[0].clientWidth;
    let MenuBoxHeight = $enhCmBox[0].clientHeight;
    let pageSizeW = document.body.clientWidth;
    let pageSizeH = document.body.clientHeight;
    // Minimize reflows
    if (X + MenuBoxWidth >= pageSizeW) { X = pageSizeW - MenuBoxWidth - options.extraPadding ; }
    if (Y + MenuBoxHeight >= pageSizeH) { Y = pageSizeH - MenuBoxHeight - options.extraPadding  }
    return { X: X, Y: Y };
}

export const getExactElementLocation = (event , element , options )=>{
    return getMousePosition(event)
}