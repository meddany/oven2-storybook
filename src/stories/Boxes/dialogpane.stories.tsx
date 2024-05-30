// @ts-nocheck
import React , { useRef  } from 'react';
import { Button, DialogPanel } from '@/components'
import { longtext } from '@/components/playground-data/longtext';

export default {
  title: 'Components/DialogPanel',
  component: DialogPanel,
  args: {
    header : 'Information Box' ,
    shortInfo : 'having more details about this component'
  },
}

const Template= (args) => {
    const ref = useRef({})

    function handleClick(){
        ref.current.open()
    }
    
    return (
        <>
            <Button onClick={handleClick}>Click Here</Button>
            <DialogPanel {...args} ref={ref} />
        </>
    )
}

export const Basic = Template.bind({});
Basic.args= {
    children : longtext ,
}

export const BasicWithCloseButton = Template.bind({});
BasicWithCloseButton.args= {
    children : longtext ,
    close: 'button'
}

export const BasicWithCloseIcon = Template.bind({});
BasicWithCloseIcon.args= {
    children : longtext ,
    close: 'icon'
}

export const BasicWithCloseIconAndCollapsable = Template.bind({});
BasicWithCloseIconAndCollapsable.args= {
    children : longtext ,
    close: 'button',
    collapsable: true,
}