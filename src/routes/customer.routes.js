import { Router } from "express";
import { GetWebsiteVisitCountForCustomer, VisiteWebsite } from "../controllers/customer.controller.js";

const router = Router();

router.route("/visite").post(VisiteWebsite);
router.route("/getVisitCount").post(GetWebsiteVisitCountForCustomer);

export default router;