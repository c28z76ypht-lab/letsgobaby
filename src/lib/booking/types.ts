export type BookingItem = {
  productId: string;
  productName: string;
  productSlug: string;
  collection: string;
  pricePerDay: number;
  quantity: number;
  startDate: string;
  endDate: string;
  days: number;
  subtotal: number;
};

export type DeliveryDetails = {
  deliveryAddress: string;
  pickupAddress: string;
  pickupSameAsDelivery: boolean;
  deliveryTime: string;
  pickupTime: string;
  isNightDelivery: boolean;
  isNightPickup: boolean;
};

export type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  flightNumber: string;
  flightArrivalTime: string;
  notes: string;
};

export type BookingOrder = {
  id: string;
  items: BookingItem[];
  delivery: DeliveryDetails;
  customer: CustomerDetails;
  subtotal: number;
  nightSurcharge: number;
  total: number;
  status: "pending" | "confirmed" | "delivered" | "returned" | "cancelled";
  createdAt: string;
};

export type InterestRegistration = {
  productId: string;
  productName: string;
  email: string;
  startDate: string;
  endDate: string;
  createdAt: string;
};

export type ProductAvailability = {
  productId: string;
  date: string;
  totalStock: number;
  booked: number;
  available: number;
};

export const NIGHT_SURCHARGE = 15;
export const MIN_RENTAL_DAYS = 2;
export const MAX_RENTAL_DAYS = 28;
export const NIGHT_START_HOUR = 22;
export const NIGHT_END_HOUR = 6;
