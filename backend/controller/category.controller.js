import { validationResult } from "express-validator";
import Category from "../model/category.model.js";
import Product from "../model/product.model.js";
import HomeRemedy from "../model/homeremedy.model.js";
import Yoga from "../model/yoga.model.js";

export const save = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Category.create({ categoryName: request.body.categoryName })
        .then((result) => {
            return response.status(200).json({ data: result.dataValues, message: "category created..." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const saveInBulk = async (request, response, next) => {
    try {
        let categoryList = request.body.categoryName;
        for (let category of categoryList)
            await Category.create({ categoryName: category });
        return response.status(200).json({ message: "All Category Saved.." });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error", err });
    }
}

export const Categorylist = (request, response, next) => {
    Category.findAll().then(result => {
        return response.status(200).json({ categories: result });
    }).catch(err => {
        return response.status(500).json({ error: "Internal server error", err });
    })
}

export const Categorydata = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Category.findOne({
        where: { categoryName: request.body.categoryName }, include: [{ model: Product, required: true }, { model: HomeRemedy, required: true }, { model: Yoga, required: true }]
    }).then(result => {
        if (result)
            return response.status(200).json({ categories: result });
        return response.status(401).json({ message: "unauthorized request" });
    }).catch(err => {
        return response.status(500).json({ error: "Internal server error", err });
    })
}

