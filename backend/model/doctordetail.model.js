import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const DoctorDetail = sequelize.define('doctordetail', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    qualificationImage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: true
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clinicAddress: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    doctorimage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});


sequelize.sync().then(() => {
    console.log("DoctorDetail table created....");
}).catch(err => {
    console.log(err);
    console.log("Error in DoctorDetail table");
})

export default DoctorDetail;