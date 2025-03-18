import { Router } from "express";
import webHook from "../controller/webhook.controller";

const router = Router();

////https://hooks.zapier.com/hooks/catch/22095477/2l0spul
router.route("/catch/:userId/:flowId").post(webHook);

export default router;