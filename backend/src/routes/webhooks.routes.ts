import { Router } from "express";

import { syncUserData } from "../controller/clerk.controller";

const router = Router();

router.post("/clerk", syncUserData);

export default router;
