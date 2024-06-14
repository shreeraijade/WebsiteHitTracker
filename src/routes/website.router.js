import { Router } from "express";
import { getTotalVisitCount } from "../controllers/website.controller.js";

const router = Router();

router.route("/getCount/:websiteId").get(getTotalVisitCount);

export default router;