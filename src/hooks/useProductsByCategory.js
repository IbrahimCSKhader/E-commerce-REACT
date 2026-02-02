import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";

export default function useProductsByCategory(categoryId) {
  const fetchProductsByCategory = async () => {
    const res = await axiosInstance.get(`/Products/category/${categoryId}`);
    const maybeData = res?.data?.response?.data ?? res?.data?.response;
    console.log("Fetched products for category", categoryId, ":", maybeData); 
    return Array.isArray(maybeData) ? maybeData : [];
  };

  const query = useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: fetchProductsByCategory,
    enabled: !!categoryId,
  });

  return query;
}
