import { Router } from "express";

import { clearDataset, loadDataset } from "../controller/dataset.controller";

const router = Router();

router.post("/load", loadDataset);
router.post("/clear", clearDataset);

export default router;
