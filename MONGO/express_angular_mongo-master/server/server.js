"use strict";
let express = require("express");
let bodyParser = require("body-parser");// intercetta dati arrivati dal post
let fs = require("fs");
let cors = require("cors");
let mongoFunctions = require("./mongoFunctions.js"); //funzioni per gestire DB
const { error } = require("console");
let app = express();
let port = 6969;

app.listen(port,()=>{
    console.log(`# Server Avviato in http://localhost:${port}`);
});



// ----------------MIDDLEWARE-------------------
app.use(bodyParser.urlencoded({extended:true})); // extended:true = permette di interpretare oggetti complessi
app.use(bodyParser.json());
app.use(cors());

app.use(function(req,res,next){
    let d = new Date();
    console.log(d.toLocaleDateString() + " >>> " + req.method + " : " + req.originalUrl)
    if(Object.keys(req.query).length != 0)
        console.log("Parametri GET : "+JSON.stringify(req.query));
    if(Object.keys(req.body).length != 0)
        console.log("Parametri POST : "+JSON.stringify(req.body));
    next();
});

app.get("/api/getData",function(req,res){
    mongoFunctions.find("nba","players",{},function(err,data){
        if(err.codErr == -1)
            res.send(data);
        else
            errore(req,res,err);

    });
});

app.post("/api/getPlayerTeam",function(req,res){
    mongoFunctions.find("nba","players",{team: req.body.squadra},function(err,data){
        if(err.codErr == -1)
            res.send(data);
        else
            errore(req,res,err);

    });
});

app.post("/api/insertPlayer",function(req,res){
    mongoFunctions.insert("nba","players",
    {
        _id:parseInt(req.body._id), 
        nome:req.body.nome,
        punti:parseInt(req.body.punti),
        eta: parseInt(req.body.eta),
        conference:req.body.conference,
        ruolo:req.body.ruolo,
        team:req.body.squadra

    },
    function(err,data){
        if(err.codErr == -1)
            res.send(data);
        else
            errore(req,res,err);

    });
});

app.post("/api/updatePlayer",function(req,res){
    mongoFunctions.update("nba","players",{nome:req.body.nome},
    {$set:{
        punti:parseInt(req.body.punti),
        conference:req.body.conference,
        team:req.body.squadra
    }},
    function(err,data){
        if(err.codErr == -1)
            res.send(data);
        else
            errore(req,res,err);

    });
});

app.post("/api/statTeam",function(req,res){
    let opzioni = [{
        $group:{
            _id:"$team",
            totPunti:{$sum:"$punti"},
            etaMedia:{$avg:"$eta"},
        }
    }];
    mongoFunctions.aggregate("nba","players",opzioni,function(err,data){
        if(err.codErr == -1)
            res.send(data);
        else
            errore(req,res,err);

    });
    
});

function errore(req,res,err){
    res.status(err.codErr).send(err.message);
}