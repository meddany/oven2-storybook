// @ts-nocheck
import PropertiesPaper from '../components/oven2/PropertiesPaper/PropertiesPaper';
import PropTypes from 'prop-types';

export default {
    title : 'Properties' , 
    component : PropertiesPaper  , 
}

const Template = args => <PropertiesPaper {...args} />

export const PropertiesFullPaper = Template.bind({})
PropertiesFullPaper.args = {
    data : [
        {
            'Private Information' : [
                {'header' : 'Username' , value : 'admin' } ,
                {'header' : 'Password' , value : '********' }
            ] , 
            onClick : function (header , ref , addtional){
                console.log(header , ref , addtional)
            } ,
            panelname : 'name1'
        } , 
        {
            'General Information' : [
                {'header' : 'Date' , value : '2024'  }
            ],
            onClick : function (header , ref , addtional){
                console.log(header , ref , addtional)
            } ,
            panelname : 'name2'
        } , 
    ]
}
