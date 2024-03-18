import express from 'express';
import { body } from 'express-validator';
import { SignUp, forgotpassword, setnewpassword, signIn } from '../controller/admin.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/signUp",
    body("email", "invalid email").isEmail().notEmpty(),
    body("password", "invalid password").notEmpty(),
    body("name", "invalid name").notEmpty(),
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

// in future use

// router.delete("/remove", body("email", "invalid email").isEmail().notEmpty(), remove);

// router.get("/listbyemail", body("email", "invalid email").isEmail().notEmpty(), listbyemail);

// router.get("/list", list);

export default router;