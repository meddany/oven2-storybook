//@ts-nocheck

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export var parseUrl =  function(target){
    const url = `${window.location.href}`
    const queryString = url.substring(url.indexOf("?") + 1);
    const params = new URLSearchParams(queryString);
    const pid = params.get(target);
    return pid
}


export function getRandomId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    };
 
export function getSpectrumRange(start, end ) {
      const fn = [start]
      while (true){
        const lastElement = fn[fn.length - 1 ]
        if (lastElement === end ){return fn}
         fn.push(  lastElement + .625)
      }
}

export function removeItemFromArrey(arrey,item){
      var n = arrey
      n = n.filter(x => x !==  item );
      return n
  }

  export const  convertNumberToArray =  (number) => {
    return Array.from({ length: number });
  }


export function getFullBandOfCf(cf, width, step = 6.25) {
      var totalSteps = Math.floor(width / step);
      var totalStepsForward = Math.floor(totalSteps / 2) - 1;
      var totalStepsBackward = Math.floor(totalSteps / 2);
      var fullBand = [cf];
    
      for (var i = 0; i < totalStepsForward; i++) {
        var freq = fullBand[fullBand.length - 1];
        fullBand.push(freq + 0.625);
      }
    
      for (var i = 0; i < totalStepsBackward; i++) {
        var freq = fullBand[0];
        fullBand.unshift(freq - 0.625);
      }
    
      console.log(fullBand);
      return fullBand;
    }

    
    
    
    
    