import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"

    const navigate = useNavigate();

    const[token , setToken] = useState("");
    const[showLogin , setShowLogin] = useState("");

   

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken); // Set token in context/state
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem("token")
        setToken("")
        navigate("/")

    }
    

    const contextValue = {
            url,
            token,
            setToken,
            showLogin,
            setShowLogin,
            logOut
    }

    return <StoreContext.Provider value={contextValue}>
            {props.children}
    </StoreContext.Provider>

}

export default StoreContextProvider;