"use strict"
let express = require("express");
let bodyParser = require("body-parser");//Per raccogliere i dati fra client e server, devo installarlo
let fs = require("fs");
let cors = require("cors");//Serve per evitare che la chiamata venga bloccata dal browser

let mongofunctions = require("./mongofunctions");
let app = express();//Puntatore alle funzionalità di express
let port = 8888;

app.listen(port,function(){
    console.log("Server is running on port "+port);//così il server è in esecuzione nella porta 8888
});

//--------------------Middleware--------------------//

//INTERCETTA PARAMETRI PASSATI IN FORMA URL-ENCODED


app.use(bodyParser.urlencoded({extended:true}));//Funzione di express che indirizzano i pacchetti o servono i servizi richiesti
//extended:true significa che i dati possono essere di qualsiasi tipo e express può interpretarli,tipo json,xml, es
//app.post raccoglie un messaggio fatto da una chiamata post dal client
//Utiliziamo app.use perchpè sono piu generiche e possono essere utilizzate per tutte le chiamate, inoltre instradano i pacchetti ai servizi


//INTERCETTA PARAMETRI PASSATI IN FORMA JSON

app.use(bodyParser.json());
app.use(cors());

//MIDDLEWARE: CHIAMATA GET o POST
app.use(function(req,res,next){//use: quando il MIDDLEWARE SI ATTIVA(in questo caso quando riceve una richiesta get o post)
    let d = new Date();
    console.log(d.toLocaleTimeString() + ">>>" + req.method + ":" + req.originalUrl);//Feedback della mia chiamata
    //ES stampo GET e la risorsa richiesta
    if(Object.keys(req.query).length != 0){//req.query parametri in GET,object.keys vedo se ci sono chiavi nella url(dove ci sono i parametri in get)
        console.log("Parametri GET:" + JSON.stringify(req.query));
    }
    if(Object.keys(req.body).length != 0){
        console.log("Parametri POST:" + JSON.stringify(req.body));//req.body parametri in POST
    }
    next();

});

//Chiamata GET,dopo questa chiamata si attiva il MIDDLEWARE
app.get("/api/getData",function(req,res){
    
    mongofunctions.find("nba","players",{},function(err,data){//{} vuoto perchè voglio vedere tutti i dati db.players.find({}) ECCO PERCHè

        if(err.codeErr == -1){
            res.send(data);//no problem
        }else{
            error(req,res,err);
        }
        

    });
});


function error(req,res,err){
    res.status(err.codeErr).send(err.message);
}