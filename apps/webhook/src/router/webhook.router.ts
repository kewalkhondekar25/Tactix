import { Router } from "express";
import webHook from "../controller/webhook.controller";

const router = Router();

router.route("/catch/:userId/:flowId").post(webHook);

export default router;