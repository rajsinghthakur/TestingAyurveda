import { validationResult } from "express-validator";
import Product from "../model/product.model.js";

export const Add = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Product.create({
        title: request.body.title,
        brand: request.body.brand,
        price: request.body.price,
        description: request.body.description,
        imageUrl: request.body.imageUrl,
        categoryname: request.body.categoryname
    })
        .then((result) => {
            return response.status(200).json({ message: "Product Saved...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const saveInBulk = async (request, response, next) => {

    try {
        let productList = request.body;

        for (let product of productList) {
            let { id, title, brand, price, description, imageUrl, categoryname } = product;

            await Product.create({
                id, title, brand, price, description, imageUrl, categoryname
            })
        }
        return response.status(200).json({ message: "All Product Saved...." });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server Error", err });
    }
}

export const updateProduct = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Product.update({
        title: request.body.title,
        brand: request.body.brand,
        price: request.body.price,
        description: request.body.description,
        imageUrl: request.body.imageUrl,
        categoryname: request.body.categoryname
    }, { where: { id: request.body.id } })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: "Product updated...." });
            return response.status(401).json({ error: "Unauthorized request" });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const ProductList = async (request, response, next) => {
    Product.findAll()
        .then(result => {
            return response.status(200).json({ productList: result });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error", err });
        })
}

export const getProductByCategory = (request, response, next) => {
    Product.findAll({ where: { categoryname: request.params.categoryName } })
        .then(result => {
            if (result[0])
                return response.status(200).json({ productList: result })
            return response.status(401).json({ error: "Unauthorized request" });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error", err });
        })
}

export const removeProduct = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Product.destroy({ where: { id: request.body.id } })
        .then(result => {
            if (result)
                return response.status(200).json({ message: "product removed" })
            return response.status(401).json({ error: "Unauthorized request" });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error", err });
        })
}