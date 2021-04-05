import express from "express";
import { checkIfAuthenticated } from "../utils/checkAuth";
import * as userController from "./../controllers/userController";

const router = express.Router();

router.post("/create", userController.createUser);
router.patch(
  "/addCommodity",
  checkIfAuthenticated,
  userController.addCommodity
);
router.get("/dashboardData", checkIfAuthenticated, userController.getUserData);

export default router;
