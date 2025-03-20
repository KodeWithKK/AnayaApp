export function findDiscountedPrice(mrp: number, discountPercentage: number) {
  const discount = (mrp * discountPercentage) / 100;
  return Math.trunc(mrp - discount);
}

export function formatPrice(price: number) {
  return `₹ ${new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  })
    .format(price)
    .replaceAll(",", " ")}`;
}
