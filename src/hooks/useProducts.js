import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
export default function useProducts(){
    const fetchProducts = async ()=>
    {
        const res = await axiosInstance.get('/Products');
        return Array.isArray(res.data.response.data) ?res.data.response.data : [];
    }
    const query = useQuery({
        queryKey:["products"],
        staleTime:0,
        queryFn: fetchProducts,
    });
    return query
}