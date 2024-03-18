import { validationResult } from "express-validator";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const SignUp = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.create({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        contactNumber: request.body.contactNumber
    })
        .then((result) => {
            return response.status(200).json({ data: result.dataValues, message: "User created..." });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const signIn = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    let email = request.body.email;
    let password = request.body.password;

    let user = await User.findOne({ where: { email: email }, raw: true });
    if (user) {
        if (User.checkPassword(password, user.password)) {
            let payload = { subject: email };
            let token = jwt.sign(payload, 'fdfjfjrwieroerivxcnmvnnvrweiorddfsdfdlkfjlfjljlraj');
            return response.status(200).json({ message: "Sign In Success", user, token: token });
        } else {
            return response.status(401).json({ error: "Unauthorized user" });
        }
    }
    else
        return response.status(401).json({ error: "Unauthorized user" });

}

export const forgotpassword = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.findOne({
        where: {
            name: request.body.name,
            email: request.body.email
        }
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ message: 'User exist....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const setnewpassword = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.update({
        password: request.body.password,
    }, {
        where: {
            name: request.body.name,
            email: request.body.email
        }, raw: true
    })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'password updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const update = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });
    User.update(
        {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            contactNumber: request.body.contactNumber
        },
        { where: { id: request.body.id }, raw: true })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'user updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const listbyemail = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.findOne({
        where: { email: request.body.email }, raw: true
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result });
            return response.status(401).json({ message: 'unauthorized request' });
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server err.....', err })
        })
}

export const list = (request, response, next) => {
    User.findAll({ raw: true })
        .then((result) => {
            return response.status(200).json({ data: result });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

// export const remove = (request, response, next) => {
//     const errors = validationResult(request);
//     if (!errors.isEmpty())
//         return response.status(401).json({ error: errors.array() });

//     User.destroy({ where: { email: request.body.email }, raw: true7 })
//         .then((result) => {
//             if (result)
//                 return response.status(200).json({ message: 'user deleted....' })
//             return response.status(401).json({ message: 'unauthorized request....' })
//         })
//         .catch((err) => {
//             return response.status(500).json({ error: "Internal server error.....", err })
//         })
// }