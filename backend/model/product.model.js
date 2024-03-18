import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";
import Cart from "./cart.model.js";
import CartItems from "./cartitems.model.js";

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoryname: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

sequelize.sync().then(() => {
    console.log("Product table created....");
}).catch(err => {
    console.log(err);
    console.log("Error in Product table");
})

Cart.belongsToMany(Product, { through: CartItems })
Product.belongsToMany(Cart, { through: CartItems })

export default Product;