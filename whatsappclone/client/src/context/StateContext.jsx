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

/*
This file is responsible for setting up the global state management in the application using React's Context API. 
It creates a context named StateContext and provides a StateProvider component. The StateProvider component wraps the application or any part of it
 that needs access to the global state, passing down the useReducer hook that manages state transitions based on the actions defined in constants.
 js. The useStateProvider hook is provided for easy access to the context value (which includes the current state and the dispatch function) from 
 any component within the application.
*/