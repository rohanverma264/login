import React, { useState } from 'react';

const Context = React.createContext();
const { Consumer, Provider } = Context;
export { Context, Provider, Consumer };

// export class ContextProvider extends Component {
//     state = {
//         value: 'check'
//     }

//     setValue = (key, value) => {
//         this.setState({[key]: value})
//     }

//     render() {
//         return (
//             <Provider value={{data: this.state, setValue: this.setValue}}>
//                 {this.props.children}
//             </Provider>
//         )
//     }
// }

export const ContextProvider = (props) => {

    const [value, setValue] = useState("check");

    const newValue = (key, value) => {
        setValue({[key]: value});
    }

    return(
        <Provider value={{data: value, newValue: newValue}}>
            {props.children}
        </Provider>
    )
}