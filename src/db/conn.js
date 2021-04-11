const mongoose = require("mongoose");

// Creating database
mongoose.connect("mongodb://localhost:27017/dynamicweb",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database  connected successfully")
}).catch((e)=>{
    console.log(e);
});