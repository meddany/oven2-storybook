// @ts-nocheck
import PropTypes from 'prop-types';
import InformationTable from '../components/oven2/InformationTable/InformationTable';

export default {
    title : 'Properties' , 
    component : InformationTable  , 
}

const Template = args => <InformationTable {...args} />

export const TableProperties = Template.bind({})
TableProperties.args = {
    data : [
        { header : 'Name'  , value : 'Ahmed Abdellatif'} ,
        { header : 'Address'  , value : 'Cairo/Egypt'} ,
            
    ] ,
    dark : false ,
    size : 'small'
}
TableProperties.argTypes = {
    size : {
        options : ['small' , 'medium' , 'xlrg'] , 
        control: { type: 'select' },
    }
}
