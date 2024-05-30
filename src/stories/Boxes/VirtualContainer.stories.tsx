import { VirtualContainer } from '@/components';

export default {
  title: 'Components/VirtualContainer',
  component: VirtualContainer,
  args: {},
}

const Template = (args) => {
  return (
    <div className='w-screen h-screen'>
      <VirtualContainer {...args} />
    </div>
  )
}

export const Basic = Template.bind({});
Basic.args = {
    children : 'Container'
};