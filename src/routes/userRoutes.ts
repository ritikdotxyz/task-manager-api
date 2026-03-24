import express, { Router } from "express";

import { register, login } from "../controllers/userController.ts";

const route: Router = express.Router();

route.post("/log-in", login )
// route.post("log-out/", )
route.post("/register", register)


export default route;