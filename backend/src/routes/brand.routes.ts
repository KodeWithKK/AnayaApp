import { Router } from "express";

import { addBrand } from "../controller/brand.controller";

const router = Router();

router.route("/add").post(addBrand);

export default router;
