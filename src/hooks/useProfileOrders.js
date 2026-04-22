import { useEffect, useMemo } from "react";
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

  const apiOrders = useMemo(() => extractOrdersFromProfile(profile), [profile]);
  const localOrders = useMemo(() => readProfileOrderHistory(user?.id), [user?.id]);

  const orders = useMemo(() => {
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
  }, [apiOrders, localOrders]);

  useEffect(() => {
    if (orders.length === 0) {
      console.info("[ProfileOrders] No orders were found.", {
        userId: user?.id ?? null,
        profile,
        apiOrders,
        localOrders,
      });
      return;
    }

    console.groupCollapsed(
      `[ProfileOrders] Loaded ${orders.length} order(s) for profile`,
    );
    console.log("User ID:", user?.id ?? null);
    console.log("Raw profile payload:", profile);
    console.log("Orders extracted from Profile API:", apiOrders);
    console.log("Orders restored from local checkout history:", localOrders);
    console.log("Merged normalized orders:", orders);

    orders.forEach((order, index) => {
      console.group(`Order ${index + 1}: #${order.id}`);
      console.log("Order payload:", order);
      console.log("Status:", order.status);
      console.log("Payment method:", order.paymentMethod);
      console.log("Created at:", order.createdAt);
      console.log("Total:", order.total);
      console.log("Source:", order.source);
      console.log("Payment URL:", order.paymentUrl ?? null);

      if (order.items.length > 0) {
        console.table(
          order.items.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal,
          })),
        );
      } else {
        console.log("Items: []");
      }

      console.groupEnd();
    });

    console.groupEnd();
  }, [apiOrders, localOrders, orders, profile, user?.id]);

  return orders;
}
