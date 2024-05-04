// @ts-nocheck

const getUniqueKeys =  (dataArray) => {
    

    return dataArray.reduce((acc, curr) => {
        Object.keys(curr).forEach(key => {
            acc.add(key);
        });
        return acc;
    }, new Set());
}


export  function AutoHeadersGenerate(rows){
    var headers = getUniqueKeys(rows)
    var cols = []

    cols.push({
        formatter:"rowSelection" 
    })

    headers.forEach(key => {
        cols.push({ title: key , field: key , width: 150 , headerFilter: true ,resizable  : true },)
    });

    return cols

}


