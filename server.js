const { time } = require('console');
const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const { stringify, escape } = require('querystring');

const port = 3001

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/Cab')

const db= mongoose.connection

db.once('open',()=>{
    console.log('MongoDb connnection Successful')
})

const userSchema =  new mongoose.Schema({
    customer_name:String,
    phone_number:Number,
    email_address:String,
    taxi:String,
    extras:String,
    pickup_time:Date,
    pickup_place:String,
    dropoff_place:String,
    comments:String
})

const Users = mongoose.model("cab_booking",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/post',async (req,res)=>{
    const{customer_name,phone_number,email_address,taxi,extras,pickup_time,pickup_place,dropoff_place,comment} = req.body
     const user = new Users({
        customer_name,
        phone_number,
        email_address,
        taxi,
        extras,
        pickup_time,
        pickup_place,
        dropoff_place,
        comments
     })
     await user.save()
     console.log(user)
     res.send("Form Submission Successful")
})

app.listen(port,()=>{
    console.log("running....")
})