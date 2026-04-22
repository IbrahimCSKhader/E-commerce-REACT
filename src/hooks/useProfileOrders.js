import { useMemo } from "react";
import useAuthStore from "../store/AuthStore";
import {
  extractOrdersFromProfile,
  readProfileOrderHistory,
} from "../utils/profileOrders";

function buildOrderIdentity(order) {
  return `${order.id}-${order.createdAt}-${order.total}`;
}

export default function useProfileOrders(profile) {
  const user = useAuthStore((state) => state.user);

  return useMemo(() => {
    const apiOrders = extractOrdersFromProfile(profile);
    const localOrders = readProfileOrderHistory(user?.id);
    const mergedOrders = [...apiOrders, ...localOrders];
    const uniqueOrders = [];
    const seenIdentities = new Set();

    for (const order of mergedOrders) {
      const identity = buildOrderIdentity(order);
      if (seenIdentities.has(identity)) {
        continue;
      }

      seenIdentities.add(identity);
      uniqueOrders.push(order);
    }

    return uniqueOrders.sort((firstOrder, secondOrder) => {
      const firstDate = new Date(firstOrder.createdAt).getTime();
      const secondDate = new Date(secondOrder.createdAt).getTime();
      return secondDate - firstDate;
    });
  }, [profile, user?.id]);
}
