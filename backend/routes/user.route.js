import express from 'express';
import { SignUp, forgotpassword, list, listbyemail, setnewpassword, signIn, update } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

router.post("/signUp",
    body("email", "invalid email").isEmail().notEmpty(),
    body("password", "invalid password").notEmpty(),
    body("name", "invalid name").notEmpty(),
    body("contactNumber", "invalid contactNumber").isNumeric().notEmpty(),
    SignUp);

router.post("/signIn",
    body("email", "invalid email").isEmail().notEmpty(),
    body("password", "invalid password").notEmpty(),
    signIn);

router.post("/forgotpassword",
    body("email", "invalid email").isEmail().notEmpty(),
    body("name", "invalid name").notEmpty(),
    forgotpassword);

router.put("/setnewpassword",
    body("email", "invalid email").isEmail().notEmpty(),
    body("name", "invalid name").notEmpty(),
    body("password", "invalid password").notEmpty(),
    setnewpassword);

router.put("/updateProfile",
    body("email", "invalid email").isEmail().notEmpty(),
    body("password", "invalid password").notEmpty(),
    body("name", "invalid name").notEmpty(),
    body("contactNumber", "invalid contactNumber").isNumeric().notEmpty(),
    update);

router.get("/viewuserbyemail",
    body("email", "invalid email").isEmail().notEmpty(),
    listbyemail);

router.get("/viewUserList", list);

// in feture use

// router.delete("/remove",
//     body("email", "invalid email").isEmail().notEmpty(),
//     remove);

export default router;