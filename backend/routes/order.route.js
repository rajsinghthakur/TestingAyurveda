import express from 'express';
import { Orderbyuser, orderHistory, placedOrder, viewOrderList } from '../controller/order.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post("/placeOrder",
    body("userId", "invalid userId").notEmpty(),
    body("State", "invalid State").notEmpty(),
    body("City", "invalid City").notEmpty(),
    body("Address", "invalid Address").notEmpty(),
    body("Pincode", "invalid Pincode").notEmpty(),
    body("UserContact", "invalid UserContact").notEmpty(),
    placedOrder);

router.get("/OrderList", viewOrderList);

router.get("/OrderbyUser", body("userId", "invalid userId").notEmpty(), Orderbyuser);

router.get("/OrderHistory", orderHistory);

export default router;