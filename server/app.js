const express=require("express")
const app=express();
const cors=require("cors");
const { default: mongoose, isObjectIdOrHexString } = require("mongoose");
dotenv=require("dotenv")
dotenv.config()
const session=require("express-session")
const mongoStore=require("connect-mongo")
app.use(express.urlencoded({extended:true}))
const Flight = require('./Schema.js');
const bodyParser=require("body-parser")
app.use(bodyParser.json())
app.use(cors())


const dburl=process.env.ATLAS_URL
const connectdb=async()=>{
    try{
        const conn=await mongoose.connect(dburl)
        console.log("connected to db")
        
    }
    catch(e){
        console.log(e)
    }
}
connectdb()
const Store=mongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
        touchAfter:24*3600
    }
})
app.use(session({
    Store,
    resave:false,
    saveUninitialized:false,
    secret:process.env.SECRET
}))





// const mongoose = require('mongoose');
// const Flight = require('./models/Flight');
// app.get('/',async(req,res)=>{
//     const crtd=await Flight.create({
//         origin:"t",
//         destination:"p"
//     })
//     console.log(crtd);
// })

app.post('/find',async(req,res)=> {
    const { from, to } = req.body;

    try {
        const flights = await Flight.find({
            origin:from,
            destination:to
        });
        console.log(flights) 
        if(flights.length==0){
            res.json("ERROR");
        }
        else{
            res.json(flights);
        }
        
    } catch (error) {
        
        res.json("ERROR");
    }
}
)

// module.exports = { searchFlights };


app.listen(8000 , ()=>{
    console.log("Listening to port 8000");
})
