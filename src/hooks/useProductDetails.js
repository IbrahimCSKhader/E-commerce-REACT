import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
import i18n from "../i18n";
export default function useProductDetails(id) {
  console.log("iddddddddd", id);
  const fetchProductDetails = async () => {
    const res = await axiosInstance.get(`Products/${id}?lang=${i18n.language}`);
    console.log("resssssssssss", res);
    return res.data.response;
  };
  const query = useQuery({
    queryKey: ["productsDetails", id, i18n.language],
    staleTime: 500000,
    queryFn: fetchProductDetails,
    enabled: !!id && id !== "undefined" && id !== "null",
  });
  return query;
}
