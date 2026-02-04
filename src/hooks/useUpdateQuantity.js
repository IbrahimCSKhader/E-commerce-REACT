import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";

export default function useUpdateQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cartItemId, count }) => {
      return axiosInstance.patch(`/Carts/${cartItemId}`, { Count: count });
    },

    onMutate: async ({ cartItemId, count }) => {
      await queryClient.cancelQueries({ queryKey: ["carts"] });
      const previous = queryClient.getQueryData(["carts"]);

      queryClient.setQueryData(["carts"], (old) => {
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
      if (context?.previous) {
        queryClient.setQueryData(["carts"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
}
