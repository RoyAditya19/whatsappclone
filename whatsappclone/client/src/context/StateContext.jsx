import { createContext, useContext, useReducer } from "react"

//working of context api: at first all the constants and variable necessary are stored and declared. now as usual createcontext is used, then a stateprovider has been used
//which is accepting and passing the props from app.jsx file to statecontext provider. now as the statecontext has all the required context, a new usestateprovider is used
//and exported. now using this usestateprovider we can use the required contexts at whatever depth of the components.
export const StateContext = createContext()
export const StateProvider = ({initialState,reducer,children})=>
(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
    </StateContext.Provider>
)
export const useStateProvider = ()=>useContext(StateContext)