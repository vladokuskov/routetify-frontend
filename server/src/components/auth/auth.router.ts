import { Router } from "express";

import { loginUser, registerUser, getMe } from "./auth.controller";
import {
  authenticate,
  verifyAuthRequest,
} from "@core/middleware/auth.middleware";

const router: Router = Router();

router.get("/login", verifyAuthRequest, loginUser);

router.post("/register", verifyAuthRequest, registerUser);

router.get("/me", authenticate, getMe);

export default router;
