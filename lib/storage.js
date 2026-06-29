import { products as defaultProducts } from "@/lib/data";

export const STORAGE_KEYS = {
  products: "curator_products",
  cart: "curator_cart",
  wishlist: "curator_wishlist",
  users: "curator_users",
  session: "curator_session",
  shipping: "curator_shipping",
  promo: "curator_promo",
  order: "curator_latest_order",
  orders: "curator_orders",
};

const isBrowser = () => typeof window !== "undefined";
const GUEST_SCOPE_ID = "guest";
const SCOPED_KEYS = [
  STORAGE_KEYS.cart,
  STORAGE_KEYS.wishlist,
  STORAGE_KEYS.shipping,
  STORAGE_KEYS.promo,
  STORAGE_KEYS.order,
  STORAGE_KEYS.orders,
];

const fallbackClone = (fallback) => {
  if (Array.isArray(fallback)) return [...fallback];
  if (fallback && typeof fallback === "object") return { ...fallback };
  return fallback;
};

export function readStorage(key, fallback) {
  if (!isBrowser()) return fallbackClone(fallback);

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallbackClone(fallback);
  } catch {
    return fallbackClone(fallback);
  }
}

export function writeStorage(key, value) {
  if (!isBrowser()) return value;

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(
    new CustomEvent("curator-storage", { detail: { key, value } })
  );
  return value;
}

export function removeStorage(key) {
  if (!isBrowser()) return;

  window.localStorage.removeItem(key);
  window.dispatchEvent(new CustomEvent("curator-storage", { detail: { key } }));
}

function getActiveScopeId() {
  const session = readStorage(STORAGE_KEYS.session, null);
  return session?.id || GUEST_SCOPE_ID;
}

function getScopedKey(key, scopeId = getActiveScopeId()) {
  return SCOPED_KEYS.includes(key) ? `${key}:${scopeId}` : key;
}

function readScopedStorage(key, fallback, scopeId) {
  return readStorage(getScopedKey(key, scopeId), fallback);
}

function writeScopedStorage(key, value, scopeId) {
  return writeStorage(getScopedKey(key, scopeId), value);
}

function removeScopedStorage(key, scopeId) {
  removeStorage(getScopedKey(key, scopeId));
}

function clearScopedState(scopeId) {
  SCOPED_KEYS.forEach((key) => removeScopedStorage(key, scopeId));
}

function mergeCartItems(baseItems, incomingItems) {
  const merged = [...baseItems];

  incomingItems.forEach((incoming) => {
    const existingIndex = merged.findIndex(
      (item) =>
        Number(item.productId) === Number(incoming.productId) &&
        item.size === incoming.size
    );

    if (existingIndex >= 0) {
      merged[existingIndex] = {
        ...merged[existingIndex],
        quantity: Math.min(
          10,
          Number(merged[existingIndex].quantity || 0) +
            Number(incoming.quantity || 0)
        ),
      };
      return;
    }

    merged.push(incoming);
  });

  return merged;
}

function mergeWishlistItems(baseItems, incomingItems) {
  const productIds = new Set(baseItems.map((item) => Number(item.productId)));
  return [
    ...baseItems,
    ...incomingItems.filter((item) => !productIds.has(Number(item.productId))),
  ];
}

function hasShippingValues(shipping) {
  return Object.entries(shipping || {}).some(
    ([key, value]) => key !== "country" && key !== "paymentMethod" && value
  );
}

function moveGuestStateToUser(session) {
  if (!session?.id || session.id === GUEST_SCOPE_ID) return;

  const guestCart = readScopedStorage(STORAGE_KEYS.cart, [], GUEST_SCOPE_ID);
  const guestWishlist = readScopedStorage(
    STORAGE_KEYS.wishlist,
    [],
    GUEST_SCOPE_ID
  );
  const guestShipping = readScopedStorage(
    STORAGE_KEYS.shipping,
    emptyShipping,
    GUEST_SCOPE_ID
  );
  const guestPromo = readScopedStorage(STORAGE_KEYS.promo, "", GUEST_SCOPE_ID);
  const guestOrder = readScopedStorage(STORAGE_KEYS.order, null, GUEST_SCOPE_ID);
  const guestOrders = readScopedStorage(STORAGE_KEYS.orders, [], GUEST_SCOPE_ID);

  if (guestCart.length) {
    const userCart = readScopedStorage(STORAGE_KEYS.cart, [], session.id);
    writeScopedStorage(
      STORAGE_KEYS.cart,
      mergeCartItems(userCart, guestCart),
      session.id
    );
  }

  if (guestWishlist.length) {
    const userWishlist = readScopedStorage(STORAGE_KEYS.wishlist, [], session.id);
    writeScopedStorage(
      STORAGE_KEYS.wishlist,
      mergeWishlistItems(userWishlist, guestWishlist),
      session.id
    );
  }

  if (hasShippingValues(guestShipping)) {
    writeScopedStorage(STORAGE_KEYS.shipping, guestShipping, session.id);
  }

  if (guestPromo) {
    writeScopedStorage(STORAGE_KEYS.promo, guestPromo, session.id);
  }

  if (guestOrder) {
    const linkedOrder = {
      ...guestOrder,
      userId: session.id,
      userEmail: session.email,
      userName: session.name,
    };
    writeScopedStorage(STORAGE_KEYS.order, linkedOrder, session.id);
  }

  if (guestOrders.length) {
    const userOrders = readScopedStorage(STORAGE_KEYS.orders, [], session.id);
    const linkedOrders = guestOrders.map((order) => ({
      ...order,
      userId: session.id,
      userEmail: session.email,
      userName: session.name,
    }));
    writeScopedStorage(
      STORAGE_KEYS.orders,
      [...userOrders, ...linkedOrders],
      session.id
    );
  }

  clearScopedState(GUEST_SCOPE_ID);
}

export function subscribeToStorage(callback) {
  if (!isBrowser()) return () => {};

  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener("curator-storage", handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("curator-storage", handler);
  };
}

export function getProducts() {
  const stored = readStorage(STORAGE_KEYS.products, null);
  if (Array.isArray(stored) && stored.length) return stored;

  return writeStorage(STORAGE_KEYS.products, defaultProducts);
}

export function findProductById(productId) {
  const id = Number(productId);
  return getProducts().find((product) => Number(product.id) === id) || null;
}

export function getCart() {
  return readScopedStorage(STORAGE_KEYS.cart, []);
}

export function getWishlist() {
  return readScopedStorage(STORAGE_KEYS.wishlist, []);
}

export function isProductInWishlist(productId) {
  return getWishlist().some((item) => Number(item.productId) === Number(productId));
}

export function toggleWishlist(product) {
  const wishlist = getWishlist();
  const exists = wishlist.some(
    (item) => Number(item.productId) === Number(product.id)
  );

  if (exists) {
    return writeStorage(
      getScopedKey(STORAGE_KEYS.wishlist),
      wishlist.filter((item) => Number(item.productId) !== Number(product.id))
    );
  }

  return writeScopedStorage(STORAGE_KEYS.wishlist, [
    ...wishlist,
    {
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      addedAt: new Date().toISOString(),
    },
  ]);
}

export function addToCart(product, options = {}) {
  const size = options.size || "50ML";
  const quantity = Math.max(1, Number(options.quantity) || 1);
  const cart = getCart();
  const existingIndex = cart.findIndex(
    (item) => Number(item.productId) === Number(product.id) && item.size === size
  );

  if (existingIndex >= 0) {
    const nextCart = cart.map((item, index) =>
      index === existingIndex
        ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
        : item
    );
    return writeScopedStorage(STORAGE_KEYS.cart, nextCart);
  }

  const cartItem = {
    cartId: `${product.id}-${size}-${Date.now().toString(36)}`,
    productId: product.id,
    name: product.name,
    brand: product.brand,
    price: Number(product.price),
    image: product.image,
    category: product.category,
    scentType: product.scentType,
    description: product.description,
    size,
    quantity: Math.min(10, quantity),
    addedAt: new Date().toISOString(),
  };

  return writeScopedStorage(STORAGE_KEYS.cart, [...cart, cartItem]);
}

export function updateCartQuantity(cartId, quantity) {
  const nextQuantity = Math.max(1, Math.min(10, Number(quantity) || 1));
  const cart = getCart().map((item) =>
    item.cartId === cartId ? { ...item, quantity: nextQuantity } : item
  );

  return writeScopedStorage(STORAGE_KEYS.cart, cart);
}

export function removeCartItem(cartId) {
  return writeScopedStorage(
    STORAGE_KEYS.cart,
    getCart().filter((item) => item.cartId !== cartId)
  );
}

export function clearCart() {
  return writeScopedStorage(STORAGE_KEYS.cart, []);
}

export function getPromo() {
  return readScopedStorage(STORAGE_KEYS.promo, "");
}

export function setPromo(code) {
  return writeScopedStorage(
    STORAGE_KEYS.promo,
    String(code || "").trim().toUpperCase()
  );
}

export function getCartCount(cart = getCart()) {
  return cart.reduce((total, item) => total + Number(item.quantity || 0), 0);
}

export function getCartSummary(cart = getCart(), promoCode = getPromo()) {
  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
  const discount = promoCode === "CURATOR10" ? subtotal * 0.1 : 0;
  const taxable = Math.max(0, subtotal - discount);
  const shipping = cart.length === 0 || subtotal >= 200 ? 0 : 18;
  const tax = taxable * 0.08;
  const total = taxable + shipping + tax;

  return {
    count: getCartCount(cart),
    subtotal,
    discount,
    shipping,
    tax,
    total,
    promoCode,
  };
}

export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value || 0));
}

export function getUsers() {
  return readStorage(STORAGE_KEYS.users, []);
}

export function registerUser({ name, email, password }) {
  const users = getUsers();
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("This email already has an atelier account.");
  }

  const user = {
    id: `user-${Date.now().toString(36)}`,
    name: String(name || "").trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  };

  writeStorage(STORAGE_KEYS.users, [...users, user]);
  return setSession(user, true);
}

export function loginUser({ email, password, remember }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const user = getUsers().find(
    (item) => item.email === normalizedEmail && item.password === password
  );

  if (!user) {
    throw new Error("Email or password is not correct.");
  }

  return setSession(user, remember);
}

export function setSession(user, remember = true) {
  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    remember,
    signedInAt: new Date().toISOString(),
  };

  writeStorage(STORAGE_KEYS.session, session);
  moveGuestStateToUser(session);
  return session;
}

export function getSession() {
  return readStorage(STORAGE_KEYS.session, null);
}

export function logoutUser() {
  const session = getSession();
  removeStorage(STORAGE_KEYS.session);
  clearScopedState(GUEST_SCOPE_ID);
  return session;
}

export const emptyShipping = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postalCode: "",
  country: "United States",
  paymentMethod: "Credit Card",
};

export function getShipping() {
  return readScopedStorage(STORAGE_KEYS.shipping, emptyShipping);
}

export function saveShipping(shipping) {
  return writeScopedStorage(STORAGE_KEYS.shipping, {
    ...emptyShipping,
    ...shipping,
  });
}

function getDeliveryWindow() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const start = new Date();
  const end = new Date();
  start.setDate(start.getDate() + 4);
  end.setDate(end.getDate() + 6);

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

export function createOrder(shipping) {
  const cart = getCart();
  const session = getSession();

  if (!cart.length) {
    throw new Error("Your cart is empty.");
  }

  const order = {
    id: `TC-${Date.now().toString(36).toUpperCase()}`,
    userId: session?.id || GUEST_SCOPE_ID,
    userEmail: session?.email || "guest@curator.local",
    userName: session?.name || "Guest Curator",
    createdAt: new Date().toISOString(),
    items: cart,
    shipping: { ...emptyShipping, ...shipping },
    summary: getCartSummary(cart),
    deliveryWindow: getDeliveryWindow(),
    status: "Confirmed",
  };

  writeScopedStorage(STORAGE_KEYS.order, order);
  writeScopedStorage(STORAGE_KEYS.orders, [...getUserOrders(), order]);
  clearCart();
  return order;
}

export function getLatestOrder() {
  return readScopedStorage(STORAGE_KEYS.order, null);
}

export function getUserOrders() {
  return readScopedStorage(STORAGE_KEYS.orders, []);
}
