const  mongoose = require("mongoose")

const mondbUrl = "mongodb+srv://jainchintu623:wT7Db5IYaSgpSK5u@cluster0.oks8y1v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const connectDb = ()=>{
    return mongoose.connect(mondbUrl)
}

module.exports = {connectDb}