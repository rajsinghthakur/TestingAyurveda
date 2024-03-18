import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const CartItems = sequelize.define("cartItem", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

CartItems.sync()
    .then((result) => {
        console.log("cart table created successfully");
    })
    .catch((err) => {
        console.log("error in created table", err);
    });

export default CartItems;