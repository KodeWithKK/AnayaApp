import { Router } from "express";

import {
  addProduct,
  getProduct,
  getProducts,
  searchProducts,
} from "../controller/product.controller";

const router = Router();

router.route("/all").get(getProducts);
router.route("/search").get(searchProducts);
router.route("/:productId").get(getProduct);
router.route("/add").post(addProduct);

export default router;
