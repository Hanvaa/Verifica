"use strict";
let express=require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let cors = require("cors");
let mongoFunctions = require("./mongoFunctions");
let app = express();
let port = 8888;

app.listen(port, function (){
    console.log("Server avviato sulla porta: " + port);
});

// ---------- MIDDLEWARE -------------
// Intercetta parametri passati in formato url-encoded
app.use(bodyParser.urlencoded({extended:true}));
// Intercetta parametri passati in formato json
app.use(bodyParser.json());
app.use(cors());

app.use(function (req,res,next){
    let d=new Date();
    console.log(d.toLocaleTimeString() + " >>> " + req.method + ": " + req.originalUrl);
    if(Object.keys(req.query).length != 0)
        console.log("Parametri GET: " + JSON.stringify(req.query));
    if(Object.keys(req.body).length != 0)
        console.log("Parametri POST: " + JSON.stringify(req.body));
    next();
});

app.get("/api/getData", function (req,res){
    mongoFunctions.find("nba","players",{},function (err, data){
        if(err.codeErr == -1)
            res.send(data);
        else
            error(req,res,err);
    });
});

app.post("/api/getPlayerTeam", function (req,res){
    mongoFunctions.find("nba","players",{squadra: req.body.team},function (err, data){
        if(err.codeErr == -1)
            res.send(data);
        else
            error(req,res,err);
    });
});

app.post("/api/insertPlayer",function (req,res){
    mongoFunctions.inserisci("nba","players",{_id:parseInt(req.body._id),
        nome: req.body.nome,
        punti: parseInt(req.body.punti),
        eta: parseInt(req.body.eta),
        conference: req.body.conference,
        ruolo: req.body.ruolo,
        squadra: req.body.team},function (err, data){
        if(err.codeErr == -1)
            res.send(data);
        else
            error(req,res,err);
    });
});

app.post("/api/updatePlayer",function (req,res){
    mongoFunctions.aggiorna("nba","players",{nome:req.body.nome},
        {$set:{punti: parseInt(req.body.punti),
        conference: req.body.conference,
        squadra: req.body.team}},function (err, data){
        if(err.codeErr == -1)
            res.send(data);
        else
            error(req,res,err);
    });
});

app.post("/api/statTeam", function (req,res){
    let opzioni = [{
        $group:{
            _id:"$squadra",
            totPunti:{$sum:"$punti"},
            etaMedia:{$avg:"$eta"}
        }
    }];
    mongoFunctions.aggrega("nba","players",opzioni,function (err, data){
            if(err.codeErr == -1)
                res.send(data);
            else
                error(req,res,err);
        });
});

function error(req,res,err){
    res.status(err.codeErr).send(err.message);
}