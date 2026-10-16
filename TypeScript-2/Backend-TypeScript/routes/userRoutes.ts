import { Router } from 'express';

import signup from "../controllers/User/signup.js";
import login from "../controllers/User/login.js";

const router: Router = Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
