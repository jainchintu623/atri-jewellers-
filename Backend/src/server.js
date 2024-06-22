const app = require("./index");
const { connectDb } = require("./Config/db");
const PORT = 5454;
app.listen(PORT, async()=>{
    await connectDb();
    console.log("Ecommerce Api Listing On Port :",PORT)
})