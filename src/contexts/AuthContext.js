import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { REQUEST_URL } from "../config";
const { createContext, useState, useEffect } = require("react");

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    //states of auth context provider
    const [user,setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);
    
    const fetchUser = async () => {
        try {
            const response = await axios({
                method: 'get',
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials: true,
                credentials: 'include',
                url: REQUEST_URL + "/user/getUser"
            });
            console.log("USER",response);
            setUser(response.data?.user);
            setLoading(false);
        } catch (error) {
            setUser(null);
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await axios({
                method: 'post',
                data: {
                email,password
                },
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: REQUEST_URL + "/user/login",
            });
            console.log(response);
            let message = "";
            if(response.data?.user?.email){
                message = "Log in Successful"
            }else{
                message = response.data;
            }
            toast('🦄 ' + message, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            setUser(response.data?.user);
            setLoading(false);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            const response = await axios({
                method: 'get',
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials: true,
                url: REQUEST_URL + "/user/destroy-session"
            });
            if(response.data === "Logged Out"){
                toast("🦄 Logged Out", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                setUser(null);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    //context provider
    return(
        <>
            <AuthContext.Provider value={{user,loading,login,logout}}>
                {children}
            </AuthContext.Provider>
            <ToastContainer />
        </>
    )
    
}