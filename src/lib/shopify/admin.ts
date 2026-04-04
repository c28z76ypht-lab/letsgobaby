const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN || "";

const adminEndpoint = SHOPIFY_STORE_DOMAIN
  ? `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-10`
  : "";

export function isAdminConfigured(): boolean {
  return Boolean(SHOPIFY_STORE_DOMAIN && SHOPIFY_ADMIN_TOKEN);
}

async function adminFetch<T>(
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<T> {
  if (!isAdminConfigured()) {
    throw new Error("Shopify Admin API not configured");
  }

  const res = await fetch(`${adminEndpoint}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify Admin API error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

export type DraftOrderLineItem =
  | {
      variant_id: number;
      quantity: number;
      properties?: { name: string; value: string }[];
    }
  | {
      title: string;
      price: string;
      quantity: number;
      taxable: boolean;
      requires_shipping: boolean;
    };

export type CreateDraftOrderInput = {
  lineItems: DraftOrderLineItem[];
  email: string;
  note: string;
  tags?: string[];
  shippingAddress?: {
    first_name: string;
    last_name: string;
    address1: string;
    address2?: string;
    city: string;
    province?: string;
    country: string;
    zip?: string;
    phone?: string;
  };
};

export type DraftOrderResult = {
  id: number;
  name: string;
  invoice_url: string;
  status: string;
  total_price: string;
  created_at: string;
};

export async function createDraftOrder(
  input: CreateDraftOrderInput
): Promise<DraftOrderResult> {
  type DraftOrderResponse = {
    draft_order: {
      id: number;
      name: string;
      invoice_url: string;
      status: string;
      total_price: string;
      created_at: string;
    };
  };

  const body = {
    draft_order: {
      line_items: input.lineItems,
      email: input.email,
      note: input.note,
      tags: input.tags?.join(", ") || "website-booking",
      ...(input.shippingAddress
        ? { shipping_address: input.shippingAddress }
        : {}),
    },
  };

  const data = await adminFetch<DraftOrderResponse>(
    "/draft_orders.json",
    { method: "POST", body }
  );

  return {
    id: data.draft_order.id,
    name: data.draft_order.name,
    invoice_url: data.draft_order.invoice_url,
    status: data.draft_order.status,
    total_price: data.draft_order.total_price,
    created_at: data.draft_order.created_at,
  };
}
