import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const Category = sequelize.define("category", {
    categoryName: {
        type: DataTypes.STRING,
        primaryKey: true
    }
});

Category.sync().then(() => {
    console.log("category table created...")
}).catch(err => {
    console.log(err)
})

export default Category; 