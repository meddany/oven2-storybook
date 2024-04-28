// @ts-nocheck
import Headline from "../components/oven2/Headlines/Headline";
import PropTypes from 'prop-types'
import { getRandomId } from "../components/oven2/commonsjs/common";
import '../components/oven2/fonts/openSans/stylesheet.css'

export default {
  title: "Headline",
  component: Headline,
}

const Template = (args) => <Headline {...args} />

export const OvenHeadline = Template.bind({})

OvenHeadline.args = {
    children : 'Welcome to Oven Headlines ...' ,
    size : 'large' ,
    padding : 10 ,
    color : 'black',
    userselect : true , 
    oargs : {
        background: '#e4e6f1' ,
        id : getRandomId() , 
        marginLeft : 100 , 
        paddingRight : 15
    } ,
    fontFamily : 'open_sansregular' ,
    textPixel : 20 
}

OvenHeadline.argTypes = {
    size : {
        options : ['xsmall' , 'small' , 'mid' , 'large' , 'xlarge'] ,
        control : {'type' : 'select'}
    } ,
    
}