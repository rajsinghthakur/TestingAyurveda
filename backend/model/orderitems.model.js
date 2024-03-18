import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";
import Product from "./product.model.js";
import Order from "./order.model.js";
const orderItem = sequelize.define("orderItem", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    }
})


orderItem.belongsTo(Product, {
    foreignKey: 'productId',
    onDelete: 'CASCADE'
})

orderItem.sync().then(() => {
    console.log("orderItem table created ")
}).catch(err => {
    console.log(err)
});

// order
Order.hasMany(orderItem, { foreignKey: "orderId" });
orderItem.belongsTo(Order, { foreignKey: "orderId" });

// product
Order.hasMany(Product, { foreignKey: "productId" });
Product.belongsTo(Order, { foreignKey: "productId" });

export default orderItem;