// @ts-nocheck

export default function CustomFonts(options){
    const sizes = [14,16,18,20,22,24,26,28,30,32,34]
    const Template = args => {
        return (
            <>
                <p style={{ fontFamily: options[0] , ...args}} {...args} />
                <div style={{height : '3px' , width : '100%' , background : 'gray'}}></div>
                {
                    sizes.map( size =>  <p style={{ fontFamily: options[0] , ...args , fontSize : size + 'px'}} {...args}/> )
                }
            </>
        )
    } ;


    const Font = Template.bind({})
    Font.args = {
        fontSize : 29 , 
        children : `WELCOME TO MY OVEN STORYBOOK Where everyone can work TogeEther`, 
        color : 'black',
    }
    Font.argTypes = {
        fontFamily: {
            options : options , 
            control: { type: 'select' },
        }
    }

    return Font
}