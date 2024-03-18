import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const HomeRemedy = sequelize.define('homeremedy', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    remedyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ingredients: {
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
    caution: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoryname: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

sequelize.sync().then(() => {
    console.log("HomeRemedy table created....");
}).catch(err => {
    console.log(err);
    console.log("Error in HomeRemedy table");
})

export default HomeRemedy;