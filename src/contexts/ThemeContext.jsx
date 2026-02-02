import { createContext, useReducer } from "react";

const ThemeContext = createContext();
let themeReducer = (state,actions)=>{
    switch(actions.type){
        case "CHANGE_THEME" :
            return {...state, theme : actions.payload}
        default :
            return state;
    }
}
const ThemeContextProvider = ({children})=>{
    let [state,dispatch] = useReducer(themeReducer,{
        theme : 'light'
    })

    let changeTheme = (theme)=>{
        dispatch({type : "CHANGE_THEME",payload : theme})
    }

    const isDark = state.theme === 'dark';
    return <ThemeContext.Provider value={{...state,changeTheme,isDark}}>
            {children}
    </ThemeContext.Provider>
}

export {ThemeContext,ThemeContextProvider}