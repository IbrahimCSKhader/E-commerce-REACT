import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

const loginRequest = async (data)=>{
    const res= await axiosInstance.post("Auth/Account/Login",data);
    return res.data
}
export default function useLogin(){
    const navigate = useNavigate();
    const login= useAuthStore((state)=>state.login);
    const loginMutation=useMutation({
        mutationFn:  loginRequest,
        onSuccess:(data)=> {
            login(data.accessToken,data.user)
            console.log(data.accessToken)
            navigate("/home");
        },
    });
    return {
        loginMutation
    };
}