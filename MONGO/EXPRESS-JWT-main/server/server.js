"use strict";
let express=require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let cors = require("cors");
let mongoFunctions = require("./mongoFunctions");
let tokenAdministration = require("./tokenAdministration");
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

app.post("/api/loginCookie",function (req,res){
    let query = {user:req.body.username};
    mongoFunctions.findLogin(req,"studenti","users",query,function (err,data){
        if(err.codeErr == -1){
            console.log("Login OK");
            console.log(data);
            tokenAdministration.createToken(data);
            res.cookie("token", tokenAdministration); //aggiunto
           // res.cookie("token", tokenAdministration, {maxAge:900000000,secure:true,httpOnly:true});  per aggiungere delle condizioni ai cookie(httpOnly:true) accesso solo dal server
            res.send({msg:"Login OK"});
        }else
            error(req,res,err);
    });
});

app.get("/api/getStudentsCookie",function (req,res){
    tokenAdministration.ctrlToken(req, (errToken) => {
        if(errToken.codeErr == -1){   // token ok
            mongoFunctions.find("studenti","studenti",{},function (err,data){
                if(err.codeErr == -1){
                    tokenAdministration.createToken(tokenAdministration.payload);
                    res.cookie("token",tokenAdministration.token)//Creazione token dentro al cookie
                    res.send({data:data});//Dati degli studenti e aggiorna il token
                }else
                    error(req,res,err);
            });
        }else{
            //error(req,res,{codeErr:errToken.codeErr,message:errToken.message});
            error(req,res,errToken);
        }
    });
});

app.post("/api/login",function (req,res){
    let query = {user:req.body.username};
    mongoFunctions.findLogin(req,"studenti","users",query,function (err,data){
        if(err.codeErr == -1){
            console.log("Login OK");
            console.log(data);
            tokenAdministration.createToken(data);
            res.send({msg:"Login OK",token:tokenAdministration.token});
        }else
            error(req,res,err);
    });
});

app.get("/api/getStudents",function (req,res){
    tokenAdministration.ctrlTokenLocalStorage(req, payload => {
        if(!payload.err_exp){   // token ok
            mongoFunctions.find("studenti","studenti",{},function (err,data){
                if(err.codeErr == -1){
                    tokenAdministration.createToken(payload);
                    res.send({data:data,token:tokenAdministration.token});//Dati degli studenti e aggiorna il token
                }else
                    error(req,res,err);
            });
        }else{
            console.log(payload.message);
            error(req,res,{codeErr:403,message:payload.message});
        }
    });
});

    app.get("/api/addStudent",function (req,res){
        tokenAdministration.ctrlTokenLocalStorage(req, payload => {
            if(!payload.err_exp){   // token ok
                mongoFunctions.find("studenti","studenti",{},function (err,data){
                    if(err.codeErr == -1){
                        tokenAdministration.createToken(payload);
                        res.send({data:data,token:tokenAdministration.token});//Dati degli studenti e aggiorna il token
                    }else
                        error(req,res,err);
                });
            }else{
                console.log(payload.message);
                error(req,res,{codeErr:403,message:payload.message});
            }
        });
        
});




function error(req,res,err){
    res.status(err.codeErr).send(err.message);
}
