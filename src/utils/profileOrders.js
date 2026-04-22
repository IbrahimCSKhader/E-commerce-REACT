const ORDER_STORAGE_PREFIX = "profileOrderHistory";
const ORDER_ARRAY_KEYS = [
  "orders",
  "orderHistory",
  "orderHistories",
  "purchases",
  "checkouts",
  "transactions",
];

function normalizeOrderItem(item, index) {
  if (!item || typeof item !== "object") {
    return {
      id: `item-${index}`,
      name: "--",
      quantity: 1,
      price: 0,
      subtotal: 0,
    };
  }

  const quantity = Number(
    item.quantity ?? item.count ?? item.qty ?? item.amount ?? 1,
  );
  const price = Number(
    item.price ?? item.unitPrice ?? item.productPrice ?? item.totalPrice ?? 0,
  );

  return {
    id: item.id ?? item.orderItemId ?? item.productId ?? `item-${index}`,
    name:
      item.productName ??
      item.name ??
      item.title ??
      item.product?.name ??
      item.product?.title ??
      "--",
    quantity,
    price,
    subtotal:
      Number(item.subtotal ?? item.total ?? item.totalPrice ?? quantity * price) ||
      0,
  };
}

export function getOrderStorageKey(userId) {
  return `${ORDER_STORAGE_PREFIX}:${userId ?? "guest"}`;
}

export function readProfileOrderHistory(userId) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(getOrderStorageKey(userId));
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.error("Failed to read stored order history", error);
    return [];
  }
}

export function writeProfileOrderHistory(userId, orders) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      getOrderStorageKey(userId),
      JSON.stringify(orders),
    );
  } catch (error) {
    console.error("Failed to write stored order history", error);
  }
}

export function appendProfileOrderHistory(userId, order) {
  const previousOrders = readProfileOrderHistory(userId);
  const nextOrders = [order, ...previousOrders].slice(0, 50);
  writeProfileOrderHistory(userId, nextOrders);
}

export function normalizeProfileOrder(order, index = 0) {
  const rawItems =
    order?.items ??
    order?.orderItems ??
    order?.products ??
    order?.checkoutItems ??
    order?.cartItems ??
    [];

  const items = Array.isArray(rawItems)
    ? rawItems.map((item, itemIndex) => normalizeOrderItem(item, itemIndex))
    : [];

  return {
    id:
      order?.id ??
      order?.orderId ??
      order?.checkoutId ??
      order?.transactionId ??
      `order-${index}`,
    status:
      order?.status ??
      order?.paymentStatus ??
      order?.orderStatus ??
      order?.state ??
      "Placed",
    paymentMethod:
      order?.paymentMethod ??
      order?.method ??
      order?.paymentType ??
      order?.type ??
      "--",
    total: Number(
      order?.total ??
        order?.totalAmount ??
        order?.amount ??
        order?.cartTotal ??
        order?.price ??
        0,
    ),
    createdAt:
      order?.createdAt ??
      order?.date ??
      order?.orderDate ??
      order?.createdOn ??
      order?.checkoutDate ??
      new Date().toISOString(),
    items,
    paymentUrl: order?.url ?? order?.paymentUrl ?? null,
    source: order?.source ?? "api",
  };
}

export function extractOrdersFromProfile(profile) {
  if (!profile || typeof profile !== "object") {
    return [];
  }

  for (const key of ORDER_ARRAY_KEYS) {
    if (Array.isArray(profile[key])) {
      return profile[key].map((order, index) =>
        normalizeProfileOrder(order, index),
      );
    }
  }

  return [];
}

export function normalizeCheckoutOrder({ response, orderSnapshot, paymentMethod }) {
  const snapshotItems = Array.isArray(orderSnapshot?.items)
    ? orderSnapshot.items.map((item, index) => normalizeOrderItem(item, index))
    : [];

  const isVisaFlow = Boolean(response?.url);

  return {
    id:
      response?.id ??
      response?.orderId ??
      response?.checkoutId ??
      `local-${Date.now()}`,
    status:
      response?.status ??
      response?.paymentStatus ??
      response?.orderStatus ??
      (isVisaFlow ? "Pending payment" : "Placed"),
    paymentMethod,
    total: Number(
      response?.total ??
        response?.totalAmount ??
        response?.amount ??
        orderSnapshot?.cartTotal ??
        0,
    ),
    createdAt:
      response?.createdAt ??
      response?.date ??
      response?.orderDate ??
      new Date().toISOString(),
    items: snapshotItems,
    paymentUrl: response?.url ?? null,
    source: "local-checkout",
  };
}
