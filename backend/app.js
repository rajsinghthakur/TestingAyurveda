import express from 'express';
import bodyParser from 'body-parser';
import AdminRouter from './routes/admin.route.js';
import UserRouter from './routes/user.route.js';
import DoctorRouter from './routes/doctor.route.js';
import CategoryRouter from './routes/category.route.js';
import ProductRouter from './routes/product.route.js';
import CartRouter from './routes/cart.route.js';
import YogaRouter from './routes/yoga.routes.js';
import HomeRemedyRouter from './routes/homeremedy.route.js';
import OrderRouter from './routes/order.route.js';
import './model/association.js';
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/admin', AdminRouter);
app.use('/user', UserRouter);
app.use('/doctor', DoctorRouter);
app.use('/category', CategoryRouter);
app.use('/product', ProductRouter);
app.use('/homeremedy', HomeRemedyRouter);
app.use('/yoga', YogaRouter);
app.use('/cart', CartRouter);
app.use('/order', OrderRouter);
app.listen(3000, () => { console.log("server started.....") })