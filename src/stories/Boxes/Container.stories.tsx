import { Container } from '@/components';

export default {
  title: 'Components/Container',
  component: Container,
  args: {},
}

const Template = (args) => {
  return (
    <div className='w-screen h-screen'>
      <Container {...args} />
    </div>
  )
}

export const Basic = Template.bind({});
Basic.args = {
    children : 'Container'
};

export const Resizable = Template.bind({});
Resizable.args = {
    children : 'Container' ,
    resizable: true ,
    color : 'secondary'
};

export const ResizableY = Template.bind({});
ResizableY.args = {
    children : 'Container' ,
    resizable: 'y' ,
    color : 'secondary' ,
};

export const CustomClass = Template.bind({});
CustomClass.args = {
    children : 'Container' ,
    color : 'secondary' ,
    resizable : 'y' ,
    className : 'w-[200px] h-[300px] bg-blue-200'
};

export const Padding = Template.bind({});
Padding.args = {
    children : 'Container' ,
    color : 'secondary' ,
    padding : 'lg' ,
    resizable : false ,
    className : 'w-[200px] h-[300px]'
};

export const ColoredBorderBlue = Template.bind({});
ColoredBorderBlue.args = {
    children : 'Container' ,
    color : 'blue' ,
    padding : 'lg' ,
    border : 'blue' ,
    shadow : true ,
    className : 'w-[200px] h-[300px]',
    resizable : false ,

};

export const Title = Template.bind({});
Title.args = {
    children : 'Container' ,
    color : 'primary' ,
    padding : 'lg' ,
    border : true ,
    shadow : true ,
    className : 'w-[700px] h-[300px]' ,
    title : 'Container Title Goes Here ...' ,
    resizable : false ,
};
