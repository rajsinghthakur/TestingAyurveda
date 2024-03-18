import express from "express";
import { Add, Remove, Update, getYoga, getYogaByCategory, saveInBulk } from "../controller/yoga.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/addYoga",
    body("yogaName", "invalid yogaName").notEmpty(),
    body("benefits", "invalid benefits").notEmpty(),
    body("instructions", "invalid instructions").notEmpty(),
    body("imageUrl", "invalid imageUrl").notEmpty(),
    body("videoUrl", "invalid videoUrl").notEmpty(),
    body("categoryname", "invalid categoryname").notEmpty(),
    Add);

router.post("/addinbulk", saveInBulk);

router.put("/updateYoga",
    body("id", "invalid id").notEmpty(),
    body("yogaName", "invalid yogaName").notEmpty(),
    body("benefits", "invalid benefits").notEmpty(),
    body("instructions", "invalid instructions").notEmpty(),
    body("imageUrl", "invalid imageUrl").notEmpty(),
    body("videoUrl", "invalid videoUrl").notEmpty(),
    body("categoryname", "invalid categoryname").notEmpty(),
    Update);

router.get("/yogalist", getYoga);

router.get("/viewByCategory/:categoryName", getYogaByCategory);

router.delete("/removeyoga", body("id", "invalid id").notEmpty(), Remove);

export default router;