import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
import i18n from "../i18n";

export default function useUpdateQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cartItemId, count }) => {
      return axiosInstance.patch(`/Carts/${cartItemId}`, { Count: count });
    },

    onMutate: async ({ cartItemId, count }) => {
      const key = ["carts", i18n.language];
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData(key);

      queryClient.setQueryData(key, (old) => {
        if (!old) return old;
        const items = old.items.map((it) => {
          const idMatches =
            it.id === cartItemId ||
            it.cartItemId === cartItemId ||
            it.cartItemID === cartItemId ||
            it.cartId === cartItemId ||
            it.productId === cartItemId ||
            it.product?.id === cartItemId;

          if (!idMatches) return it;
          return { ...it, count };
        });

        return { ...old, items };
      });

      return { previous };
    },

    onError: (err, variables, context) => {
      const key = ["carts", i18n.language];
      if (context?.previous) {
        queryClient.setQueryData(key, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["carts", i18n.language] });
    },
  });
}
