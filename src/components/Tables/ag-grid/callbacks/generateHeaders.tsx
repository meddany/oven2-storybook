// @ts-nocheck
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export const GenerateHeaders = (dataset , hides , props  ) => {
    const headers = []
    const added= []
    if ( ! hides ){
      var hides = []
    }
    var data = dataset
    data.map( row => {
      for (let key2 in row ){ // iter on each cell in each row
          var isHide = false
          var header = key2      
          if ( hides.includes(header)){ isHide = true}
          if (props.translator !== undefined ){
            header = props.translator[key2]
            var headerName = header
            var tmp = {field : key2 , headerName : headerName , hide: isHide }
          }
          else {
            var headerName = header.charAt(0).toUpperCase() + header.slice(1);
            var tmp = {field : key2 , headerName : headerName , hide: isHide }
          }
          if ( typeof(row[key2]) === 'boolean' || row[key2] == 'true' || row[key2] == 'false' ||   row[key2] == 'Yes' || row[key2] == 'No' ){ 
            tmp.cellRenderer = function(params){
              // console.log(row[key2])
              if ( params.value === true || params.value == 'Yes') {
                return <CheckIcon style={{ color : '#136F63' }}/>;
              } 
              else if ( params.value === false || params.value == 'No' )  {
                return <ClearIcon style={{ color : '#D00000' }} />
              }

              else if  ( params.value === 'true' || params.value == 'Yes' ) {
                return <CheckIcon style={{ color : '#136F63' }}/>;
              } 
              else if ( params.value === 'false' || params.value == 'No' )  {
                return <ClearIcon style={{ color : '#D00000' }} />
              }
            }
          }
          if (! added.includes(header)){
              headers.push(tmp)
              added.push(header)
          } 
      }
    } )
    return headers
}