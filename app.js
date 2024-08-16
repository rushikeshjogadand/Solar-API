require('dotenv').config();

var express = require("express")
var cors = require("cors");
var mongoclient = require("mongodb").MongoClient;

// var conString = "mongodb://127.0.0.1:27017";
// var conString='mongodb+srv://jogadand4:mNeoWfFCLUrB1G48@solar.txki1wv.mongodb.net/?retryWrites=true&w=majority&appName=Solar'

const PORT = process.env.PORT || 3030;

var app = express();
app.use(cors());

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/service" ,(req , res )=>{
    mongoclient.connect(process.env.MONGODB_URL).then((clientobj)=>{
        var database = clientobj.db("Solar");
        database.collection("Services").find({}).toArray().then((docs)=>{
           res.send(docs)
           res.end()
        })
    })
})

app.get("/service/:title" , ( req ,res) =>{
    mongoclient.connect(process.env.MONGODB_URL).then((clientobj)=>{
        var database = clientobj.db("Solar");
        database.collection("Services").find({Title:req.params.title}).toArray().then((docs)=>{
            res.send(docs)
            res.end()
        })
    })
})




app.get("/register/:name", (req , res) =>{

    mongoclient.connect(process.env.MONGODB_URL).then((clientobj)=>{
        var database = clientobj.db("Solar");
        database.collection("Register").find({Name:req.params.name}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        })
    })
} )


app.get("/product" , (req , res) =>{
    mongoclient.connect(process.env.MONGODB_URL).then(clientobj =>{
        var database = clientobj.db("Solar");
        database.collection("Products").find({}).toArray().then(docs =>{
            res.send(docs);
            res.end();
        })
    })
})

app.get('/product/:title' , (req , res ) =>{
    mongoclient.connect(process.env.MONGODB_URL).then(clientobj =>{
        var database = clientobj.db("Solar");
        database.collection("Products").find({Title:req.params.title}).toArray().then(docs =>{
            res.send(docs);
            res.end()
        })
    })
})


app.post("/register" , (req , res) =>{
    var data = {
        Name:req.body.Name,
        Last:req.body.Last,
        Mobaile:req.body.Mobaile,
        Address:req.body.Address ,
        City:req.body.City
    }
    mongoclient.connect(process.env.MONGODB_URL).then((clientobj)=>{
        var database = clientobj.db("Solar")
        database.collection("Register").insertOne(data).then((docs)=>{
            console.log("User Added")
            res.end();
        })
    })
})

app.post("/order" , (req , res) =>{
    var data = {
        Name:req.body.Name,
        Mobaile:req.body.Mobaile,
        Pincode:req.body.Pincode,
        Address:req.body.Address ,
        City:req.body.City,
        State:req.body.State,
        Payment:req.body.Payment,
        Brand:req.body.Brand,
        Price:req.body.Price
       
    }
    mongoclient.connect(process.env.MONGODB_URL).then((clientobj)=>{
        var database = clientobj.db("Solar")
        database.collection("Order").insertOne(data).then((docs)=>{
            console.log("Order Added")
            res.end();
        })
    })
})

app.listen(PORT);
console.log(`Server Started : http://127.0.0.1:3030`);
