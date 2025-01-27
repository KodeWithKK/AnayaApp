import { bestSellers, expertChoices, newArrivals } from "~/data";

export const sectionListData = [
  {
    title: "New Arrivals",
    slug: "new-arrivals",
    data: newArrivals.slice(0, 4),
  },
  {
    title: "Best Sellers",
    slug: "best-sellers",
    data: bestSellers.slice(0, 4),
  },
  {
    title: "Expert Choices",
    slug: "expert-choices",
    data: expertChoices.slice(0, 4),
  },
];

export const categoryListData = [
  {
    title: "Earrings",
    uri: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw04122f7b/images/hi-res/50D3DTSRZABA10_1.jpg?sw=640&sh=640",
  },
  {
    title: "Finger Rings",
    uri: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw86fc2d04/images/hi-res/50D3I3FKBAA02_2.jpg?sw=640&sh=640",
  },
  {
    title: "Chains",
    uri: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw0dcb7a77/images/hi-res/51G4B1CAGAA00_1.jpg?sw=640&sh=640",
  },
  {
    title: "Mangalsutra",
    uri: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw4c8415bc/images/hi-res/51D3B2YCBAACZ_2.jpg?sw=640&sh=640",
  },
];
