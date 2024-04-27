// @ts-nocheck
import PropertiesItem from "../components/oven2/PropertiesItem/PropertiesItem";
import PropTypes from 'prop-types';

export default {
    title : 'Properties' , 
    component : PropertiesItem  , 
}

const Template = args => {
    return (
        <div style={{width : args.width +'px' , height : args.height +'px' , position : 'relative'}} >
            <PropertiesItem {...args} />
        </div>
    )
} ;

export const SinglePropertiesItem = Template.bind({})
SinglePropertiesItem.args = {
    header : 'Label' ,
    value : 'Oven2 Story Book' ,
    width : 190 ,
    height: 40,
    border : true 
}
