import { validationResult } from "express-validator"
import Cart from "../model/cart.model.js";
import CartItems from "../model/cartitems.model.js";
import sequelize from "../db/dbConfig.js";
import Product from "../model/product.model.js";

export const addToCart = async (request, response, next) => {
    let transaction = await sequelize.transaction();
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty())
            return response.status(401).json({ error: "Bad request..." });
        let { userId, productId, quantity } = request.body;
        let cart = await Cart.findOne({ raw: true, where: { userId: userId * 1 } });
        if (cart) {
            let isExists = !! await CartItems.findOne({ raw: true, where: { cartId: cart.id, productId, quantity } });
            if (isExists)
                return response.status(200).json({ message: "Product is already added in cart" });

            await CartItems.create({ cartId: cart.id, productId, quantity }, { transaction });
            await transaction.commit();
            return response.status(201).json({ message: 'Product successfully added into cart' });
        }
        else {
            cart = await Cart.create({ userId: userId * 1 }, { transaction })
                .then(result => { return result.dataValues });

            await CartItems.create({ cartId: cart.id, productId: productId, quantity: quantity }, { transaction })
                .then(result => { return result.dataValues });

            await transaction.commit();

            return response.status(201).json({ message: "Item Successfully added into cart" });
        }
    }
    catch (err) {
        await transaction.rollback();
        return response.status(500).json({ error: 'Internal Server Error...', err });
    }
}

export const fetchCartItems = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Cart.findAll({
        raw: true, where: { userId: request.params.userId * 1 },
        include: [{ model: Product, required: true }]
    })
        .then(result => {
            if (result[0])
                return response.status(200).json({ data: result });
            return response.status(401).json({ error: "unautherized request........" });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error", err });
        });
}

export const removeFromCart = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    let cart = await Cart.findOne({ where: { userId: request.params.userId * 1 } });
    if (cart) {
        CartItems.destroy({ where: { cartId: cart.id, productId: request.params.productId * 1 } })
            .then(result => {
                if (result)
                    return response.status(200).json({ message: "Item removed", removedItem: result });
                return response.status(401).json({ message: "unautherized request......", });
            }).catch(err => {
                return response.status(500).json({ error: "Internal Server Error", err });
            });
    } else {
        return response.status(401).json({ message: "unautherized request......", });
    }
}
