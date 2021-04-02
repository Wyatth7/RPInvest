import express from "express";
import * as userController from "./../controllers/userController";

const router = express.Router();

router.post("/create", userController.createUser);
router.patch("/addCommodity", userController.addCommodity);

export default router;
