import { Product } from "~/types";

export function findDiscountedPrice(mrp: number, discountPercentage: number) {
  const discount = (mrp * discountPercentage) / 100;
  return Math.trunc(mrp - discount);
}

export function formatPrice(price: number) {
  return `₹ ${new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(price)}`;
}

export function getDefaultSizeIdx(sizes: Product["sizes"]) {
  const mediumSizeIdx = sizes.findIndex((s) => s.label === "M");
  if (mediumSizeIdx != -1) return mediumSizeIdx;
  return 0;
}
