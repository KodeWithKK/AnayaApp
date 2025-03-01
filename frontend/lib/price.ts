export function findDiscountedPrice(mrp: number, discountPercentage: number) {
  const discount = (mrp * discountPercentage) / 100;
  return Math.trunc(mrp - discount);
}
