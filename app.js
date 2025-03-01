const dotenv=require("dotenv")
dotenv.config();

const express=require("express");
const cors=require("cors");
const productRotes=require('./routes/products.rourtes')
const userRoutes=require('./routes/user.routes');
const adminRoutes=require('./routes/admin.routes')
const categoryRoutes=require('./routes/category.routes')
const orderRoutes=require('./routes/order.routes');
const reportsRoutes=require('./routes/reports.routes')
const app=express();

const cookieParser=require("cookie-parser");
const connectToDb=require('./db/db')
connectToDb();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("heow world");
})
app.use('/users',userRoutes);

app.use('/admins',adminRoutes);
app.use('/products',productRotes);
app.use('/category',categoryRoutes);
app.use('/orders',orderRoutes);
app.use('/reports',reportsRoutes);
module.exports=app;