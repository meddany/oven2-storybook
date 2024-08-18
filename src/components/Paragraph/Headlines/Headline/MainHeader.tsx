import { Header } from "./MHeader";

export const MainHeader = (props) => {
    return (<Header {...props} type='main' />)
}

export const SubHeader = (props) => {
    return (<Header {...props} type='sub' />)
}

export const Label = (props) => {
    return (<Header {...props} type='normal' />)
}