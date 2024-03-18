import express from "express";
import { Add, ProductList, getProductByCategory, removeProduct, saveInBulk, updateProduct } from "../controller/product.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/addProduct",
    body("title", "invalid title").notEmpty(),
    body("brand", "invalid brand").notEmpty(),
    body("price", "invalid price").notEmpty(),
    body("description", "invalid description").notEmpty(),
    body("imageUrl", "invalid imageUrl").notEmpty(),
    body("categoryname", "invalid categoryname").notEmpty(),
    Add);

router.post("/addinbulk", saveInBulk);

router.put("/updateProduct",
    body("id", "invalid id").notEmpty(),
    body("title", "invalid title").notEmpty(),
    body("brand", "invalid brand").notEmpty(),
    body("price", "invalid price").notEmpty(),
    body("description", "invalid description").notEmpty(),
    body("imageUrl", "invalid imageUrl").notEmpty(),
    body("categoryname", "invalid categoryname").notEmpty(),
    updateProduct);

router.get("/productlist", ProductList);

router.get("/viewByCategory/:categoryName", getProductByCategory);

router.delete("/removeProduct", body("id", "invalid id").notEmpty(), removeProduct);

export default router;