import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
import i18n from "../i18n";
import useAuthStore from "../store/AuthStore";
import { unwrapApiResponse } from "../utils/api";

export default function useProfile() {
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery({
    queryKey: ["profile", i18n.language],
    queryFn: async () => {
      const response = await axiosInstance.get("Profile");
      const profile = unwrapApiResponse(response.data);

      if (profile && typeof profile === "object" && !Array.isArray(profile)) {
        setUser(profile);
      }

      return profile;
    },
    enabled: hasHydrated && !!token,
    staleTime: 5 * 60 * 1000,
  });
}
