const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const route=require("./routes/route")
const mongoose=require("mongoose")

app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://ashish123:Zq1Ts3r54Eazp00t@cluster0.frqge.mongodb.net/Ashish123-DB?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
})
.then(()=> console.log("MongoDB is connected"))
.catch((err)=>console.log(err));

app.use("/",route)


app.listen(process.env.PORT || 3000, function (){
    console.log("Express app running onn port" + (process.env.PORT || 3000))
})