import express from "express";
import * as contact from "./../controllers/contact";

const router = express.Router();

router.post("/message", contact.createMessage);

export default router;
