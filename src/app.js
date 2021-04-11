const express = require("express");
const app = express();
const path = require("path");
require("./db/conn");
const hbs = require("hbs");
const User = require("./models/sch");

const port = process.env.PORT || 8000;
const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");



// Setting the path 
app.use("/css", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path));

app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/service",(req,res)=>{
    res.render("service");
});
app.get("/aboutus",(req,res)=>{
    res.render("about");
});


app.get("/",(req,res)=>{
    res.send("This is home page");
})
app.post("/contact",async(req,res)=>{
    try{
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index")
    } catch(e){
        res.status(500).send(e);
    }
})
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});