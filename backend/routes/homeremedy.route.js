import express from "express";
import { Add, Remove, Update, getHomeRemedy, getHomeRemedyByCategory, saveInBulk } from "../controller/homeremedy.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/addHomeremedy",
    body("remedyName", "invalid remedyName").notEmpty(),
    body("description", "invalid description").notEmpty(),
    body("ingredients", "invalid ingredients").notEmpty(),
    body("instructions", "invalid instructions").notEmpty(),
    body("imageUrl", "invalid imageUrl").notEmpty(),
    body("caution", "invalid caution").notEmpty(),
    body("categoryname", "invalid categoryname").notEmpty(),
    Add);

router.post("/addinbulk", saveInBulk);

router.put("/updatehomeremedy", body("remedyName", "invalid remedyName").notEmpty(),
    body("id", "invalid id").notEmpty(),
    body("description", "invalid description").notEmpty(),
    body("ingredients", "invalid ingredients").notEmpty(),
    body("instructions", "invalid instructions").notEmpty(),
    body("imageUrl", "invalid imageUrl").notEmpty(),
    body("caution", "invalid caution").notEmpty(),
    body("categoryname", "invalid categoryname").notEmpty(),
    Update);


router.get("/homeremedylist", getHomeRemedy);

router.get("/viewByCategory/:categoryName", getHomeRemedyByCategory);

router.delete("/removehomeremedy", body("id", "invalid id").notEmpty(), Remove);

export default router;