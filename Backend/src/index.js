const express = require("express")


const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors());


app.get('/',(req,res)=>{
    return res.status(200).send({message:"Welcome to Eccomerce Api -Node", status:true})
})



const authRouters = require('./Routes/authRoute')
app.use('/api/auth',authRouters)



const userRouters = require('./Routes/userRouter')
app.use('/api/users',userRouters)


const productRouter = require('./Routes/productRoute')
app.use("/api/products",productRouter)


const adminProductRouter = require('./Routes/adminProductRoute')
app.use("/api/admin/products",adminProductRouter)

const cartRouter = require('./Routes/cartRoutes')
app.use("/api/cart",cartRouter)


const cartItemRouter = require('./Routes/cartItemRoutes')
app.use("/api/cart_Items",cartItemRouter)

const orderRouter = require('./Routes/orderRoute')
app.use("/api/orders",orderRouter)

const adminOrderRouter = require('./Routes/adminOrderRoutes');
app.use('/api/admin/orders',adminOrderRouter)

const reviewRouter = require('./Routes/reviewRoute')
app.use("/api/reviews",reviewRouter)

const ratingRouter = require('./Routes/ratingRoute');

app.use("/api/ratings",ratingRouter)




module.exports = app;