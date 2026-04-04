import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookingItem, DeliveryDetails, CustomerDetails } from "./types";
import { NIGHT_SURCHARGE, NIGHT_START_HOUR, NIGHT_END_HOUR } from "./types";

function isNightTime(time: string): boolean {
  if (!time) return false;
  const hour = parseInt(time.split(":")[0], 10);
  return hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
}

type CartStore = {
  items: BookingItem[];
  delivery: DeliveryDetails;
  customer: CustomerDetails;
  cartOpen: boolean;

  addItem: (item: BookingItem) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setDelivery: (delivery: Partial<DeliveryDetails>) => void;
  setCustomer: (customer: Partial<CustomerDetails>) => void;
  setCartOpen: (open: boolean) => void;

  getSubtotal: () => number;
  getNightSurcharge: () => number;
  getTotal: () => number;
  getItemCount: () => number;
};

const defaultDelivery: DeliveryDetails = {
  deliveryAddress: "",
  pickupAddress: "",
  pickupSameAsDelivery: true,
  deliveryTime: "",
  pickupTime: "",
  isNightDelivery: false,
  isNightPickup: false,
};

const defaultCustomer: CustomerDetails = {
  name: "",
  email: "",
  phone: "",
  flightNumber: "",
  flightArrivalTime: "",
  notes: "",
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      delivery: defaultDelivery,
      customer: defaultCustomer,
      cartOpen: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.productId === item.productId &&
              i.startDate === item.startDate &&
              i.endDate === item.endDate
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId &&
                i.startDate === item.startDate &&
                i.endDate === item.endDate
                  ? {
                      ...i,
                      quantity: i.quantity + item.quantity,
                      subtotal:
                        (i.quantity + item.quantity) * i.pricePerDay * i.days,
                    }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      updateItemQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity, subtotal: quantity * i.pricePerDay * i.days }
              : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], delivery: defaultDelivery, customer: defaultCustomer });
      },

      setDelivery: (delivery) => {
        set((state) => {
          const updated = { ...state.delivery, ...delivery };
          updated.isNightDelivery = isNightTime(updated.deliveryTime);
          updated.isNightPickup = isNightTime(updated.pickupTime);
          if (updated.pickupSameAsDelivery) {
            updated.pickupAddress = updated.deliveryAddress;
          }
          return { delivery: updated };
        });
      },

      setCustomer: (customer) => {
        set((state) => ({ customer: { ...state.customer, ...customer } }));
      },

      setCartOpen: (open) => set({ cartOpen: open }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.subtotal, 0);
      },

      getNightSurcharge: () => {
        const { delivery } = get();
        let surcharge = 0;
        if (delivery.isNightDelivery) surcharge += NIGHT_SURCHARGE;
        if (delivery.isNightPickup) surcharge += NIGHT_SURCHARGE;
        return surcharge;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getNightSurcharge();
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "letsgobaby-cart",
      partialize: (state) => ({
        items: state.items,
        delivery: state.delivery,
        customer: state.customer,
      }),
    }
  )
);
