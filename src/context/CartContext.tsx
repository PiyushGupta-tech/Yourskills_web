import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { COURSES, PLUS_MEMBERSHIP, type Course } from "../data/courses";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  kind: "course" | "membership";
  category?: string;
  qty: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

type CartContextValue = {
  items: CartItem[];
  isCartOpen: boolean;
  lastOrder: Order | null;
  count: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  addCourse: (course: Course) => void;
  addMembership: () => void;
  buyNow: (course: Course) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  placeOrder: (details: { name: string; email: string; phone: string }) => Order;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "yourskills-cart-v1";

function loadItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() =>
    typeof window === "undefined" ? [] : loadItems(),
  );
  const [isCartOpen, setCartOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addCourse = useCallback((course: Course) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === course.id);
      if (existing) {
        return prev.map((i) =>
          i.id === course.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          id: course.id,
          title: course.title,
          price: course.price,
          kind: "course",
          category: course.category,
          qty: 1,
        },
      ];
    });
    setCartOpen(true);
  }, []);

  const addMembership = useCallback(() => {
    setItems((prev) => {
      if (prev.some((i) => i.id === PLUS_MEMBERSHIP.id)) return prev;
      return [
        ...prev,
        {
          id: PLUS_MEMBERSHIP.id,
          title: PLUS_MEMBERSHIP.title,
          price: PLUS_MEMBERSHIP.price,
          kind: "membership",
          qty: 1,
        },
      ];
    });
    setCartOpen(true);
  }, []);

  const buyNow = useCallback((course: Course) => {
    setItems([
      {
        id: course.id,
        title: course.title,
        price: course.price,
        kind: "course",
        category: course.category,
        qty: 1,
      },
    ]);
    setCartOpen(false);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const placeOrder = useCallback(
    (details: { name: string; email: string; phone: string }) => {
      const order: Order = {
        id: `YS-${Date.now().toString(36).toUpperCase()}`,
        items: items.map((i) => ({ ...i })),
        total: items.reduce((sum, i) => sum + i.price * i.qty, 0),
        name: details.name,
        email: details.email,
        phone: details.phone,
        createdAt: new Date().toISOString(),
      };
      setLastOrder(order);
      setItems([]);
      setCartOpen(false);
      return order;
    },
    [items],
  );

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    return {
      items,
      isCartOpen,
      lastOrder,
      count,
      subtotal,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      addCourse,
      addMembership,
      buyNow,
      removeItem,
      updateQty,
      clearCart,
      placeOrder,
    };
  }, [
    items,
    isCartOpen,
    lastOrder,
    addCourse,
    addMembership,
    buyNow,
    removeItem,
    updateQty,
    clearCart,
    placeOrder,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function knownCourseIds() {
  return new Set(COURSES.map((c) => c.id));
}
