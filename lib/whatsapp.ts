import type { CartItem, CartProduct } from "@/lib/cart-store";
import { dogifyContact } from "@/lib/contact";

type CustomerDetails = {
  customerName: string;
  phone: string;
  address: string;
};

export function formatCurrency(value: number) {
  return `\u20b9${value.toLocaleString("en-IN")}`;
}

export function getItemSubtotal(item: Pick<CartItem, "price" | "quantity">) {
  return item.price * item.quantity;
}

export function generateBill(items: CartItem[]) {
  const lines = items.map((item) => `${item.name} x${item.quantity} = ${formatCurrency(getItemSubtotal(item))}`);
  const grandTotal = items.reduce((total, item) => total + getItemSubtotal(item), 0);

  return {
    title: "DOGIFY ORDER",
    lines,
    grandTotal,
    text: ["DOGIFY ORDER", "", ...lines, "", `Total = ${formatCurrency(grandTotal)}`].join("\n")
  };
}

export function createOrderWhatsAppMessage(items: CartItem[], customer: CustomerDetails) {
  const bill = generateBill(items);

  return [
    "Hello DOGIFY,",
    "",
    "I would like to place an order.",
    "",
    "Order Summary:",
    "",
    ...bill.lines,
    "",
    `Grand Total = ${formatCurrency(bill.grandTotal)}`,
    "",
    `Customer Name: ${customer.customerName}`,
    `Phone Number: ${customer.phone}`,
    `Address: ${customer.address}`,
    "",
    "Please confirm availability."
  ].join("\n");
}

export function createBuyNowWhatsAppMessage(product: CartProduct, quantity = 1) {
  return [
    "Hello DOGIFY,",
    "",
    "I would like to buy this product.",
    "",
    "Order Summary:",
    "",
    `${product.name} x${quantity} = ${formatCurrency(product.price * quantity)}`,
    "",
    `Grand Total = ${formatCurrency(product.price * quantity)}`,
    "",
    "Please confirm availability."
  ].join("\n");
}

export function createWhatsAppUrl(message?: string) {
  if (!message) {
    return dogifyContact.whatsappHref;
  }

  return `${dogifyContact.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message?: string) {
  window.open(createWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

export const assistantMessages = {
  order: "Hello DOGIFY,\nI would like assistance placing an order.",
  grooming: "Hello DOGIFY,\nI would like information regarding grooming services.",
  health: "Hello DOGIFY,\nI need pet health support.",
  contact: "Hello DOGIFY,\nI would like to contact your team."
};
