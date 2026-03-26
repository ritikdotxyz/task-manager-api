import express, { Router } from "express";

import { register, login, refreshTokenHandler } from "../controllers/userController.ts";

const route: Router = express.Router();

route.post("/log-in", login )
// route.post("log-out/", )
route.post("/register", register)
route.post("/refresh", refreshTokenHandler)



export default route;