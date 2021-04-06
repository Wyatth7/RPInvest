import express from "express";
import { checkIfAuthenticated } from "../utils/checkAuth";
import * as userController from "./../controllers/userController";

const router = express.Router();

router.patch(
  "/addCommodity",
  checkIfAuthenticated,
  userController.addCommodity
);
router.post("/create", userController.createUser);
router.get("/dashboardData", checkIfAuthenticated, userController.getUserData);
router.patch(
  "/editCommodity",
  checkIfAuthenticated,
  userController.editCommodity
);
router.patch(
  "/deleteCommodity",
  checkIfAuthenticated,
  userController.deleteCommodity
);

export default router;
