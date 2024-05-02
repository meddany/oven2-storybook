// @ts-nocheck
import AioTabs from '../components/oven2/AIOTabs/AioTabs'

export default {
  title: 'Tabs',
  component: AioTabs,
  docs: {
    source: {
      code: "disabled"
    }
  }
}
const Template = (args) => <AioTabs {...args} />
export const AIOTabsComponent = Template.bind({})

AIOTabsComponent.args = {
    theme : 'mui' || 'native',
    virtualization : true , 
    addTabsBody: true,
    bodyHeight : '200px' , 
    center : true ,
    data : [
        {
            label : 'Connections Array' ,
            defaultChecked :false ,
            virtualization : true , 
            body : <><p>Tab1</p> <input type='text' /> </> , 
            onSelected : function(tab){
                console.log('Tab1 selected ' , tab)
            }
        } ,
        {
            label : 'Physical Connections' ,
            defaultChecked :false ,
            virtualization : true , 
            body : <><p>Tab1</p> <input type='text' /> </> , 
            onSelected : function(tab){
                console.log('Tab1 selected ' , tab)
            }
        } ,
        {
            label : 'Network Assureance' ,
            defaultChecked :false ,
            virtualization : true , 
            body : <><p>Tab1</p> <input type='text' /> </> , 
            onSelected : function(tab){
                console.log('Tab1 selected ' , tab)
            }
        } ,
        {
            label : 'Add' ,
            defaultChecked :false ,
            virtualization : true , 
            clickOnly : true , 
            body : <p>Tab4</p> , 
            onSelected : function(tab){
                console.log('Add selected ' , tab)
            }
        } ,
        
    ]
}

AIOTabsComponent.argTypes = {
    theme : {
        options : ['native' , 'mui'] , 
        control: { type: 'select' },
    }
}