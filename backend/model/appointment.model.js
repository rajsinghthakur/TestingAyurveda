import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const Appointment = sequelize.define('appointment', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log("Appointment table created....");
}).catch(err => {
    console.log("Error in Appointment", err);
})

export default Appointment;
