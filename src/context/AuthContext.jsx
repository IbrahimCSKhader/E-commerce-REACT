import { createContext, useState} from "react"
export const AuthContext = createContext();


export default function AuthContextProvider({children}){
const [token,setToken]=useState(null);
const logout = ()=>{
    localStorage.removeItem('item');
    setToken(null)
}
    return(
     <AuthContext.Provider value={{token,setToken,logout}}>
        {children}
    </AuthContext.Provider>)
}