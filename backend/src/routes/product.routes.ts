import { Router } from "express";

import { addProduct } from "../controller/product.controller";

const router = Router();

router.route("/add").post(addProduct);

export default router;
