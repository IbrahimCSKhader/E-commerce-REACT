import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
export default function useProductDetails(id) {
  console.log("iddddddddd",id)
  const fetchProductDetails = async () => {
    const res = await axiosInstance.get(`Products/${id}?lang=en`);
    console.log("resssssssssss",res)
    return  res.data.response;
  };
  const query = useQuery({
    queryKey: ["productsDetails",id],
    staleTime: 500000,
    queryFn: fetchProductDetails,
        enabled: !!id,
  });
  return query;
}
