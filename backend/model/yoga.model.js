import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const Yoga = sequelize.define('yoga', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    yogaName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    benefits: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    videoUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoryname: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

sequelize.sync().then(() => {
    console.log("Yoga table created....");
}).catch(err => {
    console.log(err);
    console.log("Error in Yoga table");
})
export default Yoga;