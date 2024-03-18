import express from "express";
import { Categorydata, Categorylist, save, saveInBulk } from "../controller/category.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/addCategory", body("categoryName", "invalid categoryName").notEmpty(), save);

router.post("/addinbulk", saveInBulk);

router.get("/list", Categorylist);

router.get("/data", body("categoryName", "invalid categoryName").notEmpty(), Categorydata);


export default router; 