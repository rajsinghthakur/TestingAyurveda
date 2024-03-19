import Cart from "../model/cart.model.js";
import CartItems from "../model/cartitems.model.js";
import Product from "../model/product.model.js";
import Order from "../model/order.model.js";
import orderItem from "../model/orderitems.model.js";
import { validationResult } from "express-validator";

export const placedOrder = async (request, res, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return res.status(401).json({ error: errors.array() });

    let date = new Date();
    let currentDate = date.toString().split("GM")[0];
    let userId = request.body.userId;
    let cartResult = await Cart.findOne({ where: { userId: userId } });
    if (!cartResult)
        return res.status(401).json({ message: "unautherized request........" });
    let cartId = cartResult.dataValues.id;
    let cartItemResult = await CartItems.findAll({ where: { cartId: cartId }, raw: true });
    // console.log(cartItemResult);

    await CartItems.destroy({ where: { cartId: cartId } });
    let orderItemRes;
    for (let i = 0; i < cartItemResult.length; i++) {
        let productId = cartItemResult[i].productId;
        let quantity = cartItemResult[i].quantity;
        await Order.create({
            OrderDate: currentDate,
            State: request.body.State,
            City: request.body.City,
            Address: request.body.Address,
            Pincode: request.body.Pincode,
            status: "pending",
            UserContact: request.body.UserContact,
            userId: request.body.userId
        });
        let orderId = await Order.findAll({ where: { OrderDate: currentDate }, raw: true })
        orderId = orderId[i].id;
        // console.log("orderid :" + orderId);
        orderItemRes = await orderItem.create({
            productId: productId,
            Quantity: quantity,
            orderId: orderId
        })
    }
    if (orderItemRes)
        return res.status(200).json({ message: "Order placed successfully..." })
    return res.status(401).json({ message: "Something went wrong", orderItemRes })
}



export const viewOrderList = (request, res, next) => {
    Order.findAll({ include: [orderItem] })
        .then((result) => {
            return res.status(200).json({ orders: result })
        })
        .catch((err) => {
            return res.status(401).json({ message: "Something went wrong", err })
        })
}
export const Orderbyuser = (request, res, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return res.status(401).json({ error: errors.array() });

    Order.findAll({ where: { userId: request.body.userId }, include: [orderItem] })
        .then((result) => {
            if (result[0])
                return res.status(200).json({ orders: result })
            return res.status(401).json({ message: "unautherized request" })
        })
        .catch((err) => {
            return res.status(401).json({ message: "Something went wrong", err })
        })
}

export const orderHistory = (request, res, next) => {
    Order.findOne({ include: [{ model: Product }] })
        .then((result) => {
            return res.status(200).json({ data: result })
        })
        .catch((err) => {
            return res.status(401).json({ message: "Something went wrong", err })
        })
}