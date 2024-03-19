import { validationResult } from "express-validator";
import Doctor from "../model/doctor.model.js";
import DoctorDetail from "../model/doctordetail.model.js";
import Appointment from "../model/appointment.model.js";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const SignUp = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Doctor.create({
        doctorName: request.body.doctorName,
        email: request.body.email,
        password: request.body.password,
        contactNumber: request.body.contactNumber,
        registrationNumber: request.body.registrationNumber
    })
        .then((result) => {
            return response.status(200).json({ data: result.dataValues, message: "Doctor created..." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const signIn = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    let email = request.body.email;
    let password = request.body.password;

    let doctor = await Doctor.findOne({ where: { email: email }, raw: true });
    if (doctor) {
        if (Doctor.checkPassword(password, doctor.password)) {
            let payload = { subject: email };
            let token = jwt.sign(payload, 'fdfjfjrwieroerivxcnmvnnvrweiorddfsdfdlkfjlfjljlraj');
            return response.status(200).json({ message: "Sign In Success", doctor, token: token });
        } else {
            return response.status(401).json({ error: "Unauthorized doctor" });
        }
    }
    else
        return response.status(401).json({ error: "Unauthorized doctor" });
}

export const list = (request, response, next) => {
    Doctor.findAll({ raw: true })
        .then((result) => {
            return response.status(200).json({ data: result });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const remove = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Doctor.destroy({
        where: { email: request.body.email }, raw: true
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ message: 'Doctor deleted....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error.....", err })
        })
}

export const update = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Doctor.update(
        {
            doctorName: request.body.doctorName,
            email: request.body.email,
            password: request.body.password,
            contactNumber: request.body.contactNumber,
            registrationNumber: request.body.registrationNumber
        }, {
        where: { id: request.body.id },
        raw: true
    }
    )
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'Doctor updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const AddDoctorDetail = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    DoctorDetail.create({
        qualificationImage: request.body.qualificationImage,
        experience: request.body.experience,
        gender: request.body.gender,
        language: request.body.language,
        clinicAddress: request.body.clinicAddress,
        doctorimage: request.body.doctorimage,
        specialization: request.body.specialization,
        doctorId: request.body.doctorId
    })
        .then((result) => {
            return response.status(200).json({ message: "DoctorDetail Saved...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const UpdateDoctorDetail = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    DoctorDetail.update(
        {
            qualificationImage: request.body.qualificationImage,
            experience: request.body.experience,
            gender: request.body.gender,
            language: request.body.language,
            clinicAddress: request.body.clinicAddress,
            doctorimage: request.body.doctorimage,
            specialization: request.body.specialization,
            doctorId: request.body.doctorId
        },
        {
            where: { id: request.body.id },
            raw: true
        }
    )
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'DoctorDetail updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const doctorProfile = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Doctor.findOne({
        where: { id: request.body.id },
        include: [{ model: DoctorDetail, required: true }]
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result });
            return response.status(500).json({ error: "unautherized request", });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const doctorAppointment = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Appointment.create({
        status: "pending",
        appointmentTime: "pending",
        userId: request.body.userId,
        doctorId: request.body.doctorId
    })
        .then((result) => {
            return response.status(200).json({ message: "Appointment Saved...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const appointmentList = (request, response, next) => {
    Appointment.findAll()
        .then((result) => {
            return response.status(200).json({ Data: result });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const appointmentDetailslist = (request, response, next) => {

    Appointment.findAll({ include: [{ model: Doctor, required: true }, { model: User, required: true }] })
        .then((result) => {
            return response.status(200).json({ Data: result });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const appointmentDetailsperticular = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Appointment.findAll({ where: { id: request.body.id }, include: [{ model: Doctor, required: true }, { model: User, required: true }] })
        .then((result) => {
            return response.status(200).json({ Data: result });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const updateAppointmentStatus = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Appointment.update({
        status: request.body.status
    },
        {
            where: { id: request.body.id },
            raw: true
        })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'Status updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error...", err });
        })
}