import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
import i18n from "../i18n";

export default function useProductDetails(id) {
  const fetchProductDetails = async () => {
    const res = await axiosInstance.get(`Products/${id}?lang=${i18n.language}`);
    const payload = res?.data?.response;

    if (!payload || typeof payload !== "object") {
      return payload;
    }

    return {
      ...payload,
      reviews: Array.isArray(payload.reviews) ? payload.reviews : [],
      subImages: Array.isArray(payload.subImages) ? payload.subImages : [],
    };
  };

  const query = useQuery({
    queryKey: ["productsDetails", id, i18n.language],
    staleTime: 500000,
    queryFn: fetchProductDetails,
    enabled: !!id && id !== "undefined" && id !== "null",
  });

  return query;
}
