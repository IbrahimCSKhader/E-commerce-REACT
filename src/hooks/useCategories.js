import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
 
 export default function useCategories() {
  const fetchCategories = async () => {
    const res = await axiosInstance.get("/Categories");
return Array.isArray(res.data.response) ? res.data.response : [];
  }
  const query =  useQuery({
    queryKey: ["categories"],
    staleTime: 5*60*100, 
    queryFn: fetchCategories,
  });

    return query;

}