import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
import i18n from "../i18n";

export default function useCategories() {
  return useQuery({
    queryKey: ["categories", i18n.language],
    queryFn: async () => {
      const res = await axiosInstance.get("Categories");
      return res.data.response; // ✅
    },
  });
}
