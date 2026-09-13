/**
 * Builds wa.me deep links with a pre-filled message so a customer never has
 * to copy the phone number or type their own opening message.
 */

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

/** Normalises a Ghanaian number (e.g. "055 903 8376" or "233559038376")
 * into the international digits wa.me expects, with no leading zero and
 * no "+". */
export function toWhatsAppNumber(rawNumber: string): string {
  const digits = digitsOnly(rawNumber);
  if (digits.startsWith("233")) return digits;
  if (digits.startsWith("0")) return `233${digits.slice(1)}`;
  return digits;
}

export function buildWhatsAppLink(whatsappNumber: string, message: string): string {
  const number = toWhatsAppNumber(whatsappNumber);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function generalEnquiryMessage(): string {
  return "Hello JC-OWNS, I would like to make an enquiry.";
}

export function generalOrderMessage(): string {
  return "Hello JC-OWNS, I would like to place an order.";
}

export function productOrderMessage(params: {
  productName: string;
  variantLabel?: string | null;
  quantity?: number;
}): string {
  const { productName, variantLabel, quantity = 1 } = params;
  const lines = [
    "Hello JC-OWNS, I would like to order:",
    `Product: ${productName}`,
  ];
  if (variantLabel) lines.push(`Size: ${variantLabel}`);
  lines.push(`Quantity: ${quantity}`);
  lines.push("Please let me know availability and delivery options.");
  return lines.join("\n");
}

export function categoryEnquiryMessage(categoryName: string): string {
  return `Hello JC-OWNS, I'm interested in your ${categoryName} collection. Could you tell me more?`;
}
