"use strict";

let mongo = require("mongodb");//da installare: --------npm i mongodb-----------

let mongoClient = mongo.MongoClient;//Riferimento al client di mongo in cui andremo a lavorare

const CONNECTIONSSTRING = "mongodb://127.0.0.1:27017";//Dove inseriremo le queri, in quale porta

let mongofunctions = function(){

};

//Settare connessione
function setConnection(nomeDB, col, callback){//col : collection, callback:quando è finito, chiama qualcosa
    let errConn = {codeErr:-1, message:""};
    let collection = null;
    let clientMongo = null;
    let mongoConnection = mongoClient.connect(CONNECTIONSSTRING);//Connessione

    mongoConnection.catch((err)=>{
        console.log("Errore di connessione al server Mongo " + err);

        errConn.codeErr = 503;
        errConn.message = "Errore di connessione al server Mongo";

        callback(errConn,collection,clientMongo);//Quando non è stato possibile connettersi
    });

    mongoConnection.then((client)=>{
        //Quando va a buon fine,restituisce al mio client un puntatore
        console.log("Connected to MongoDb Server");

        let db = client.db(nomeDB);//tiro fuori il puntatore del mio DB

        collection=db.collection(col);//tiro fuori la collection dal mio db

        callback(errConn,collection,clientMongo);//E' IL PUNTATORE DELLA FUNCTION SOTTO DI SET CONNECTION
    });

}

mongofunctions.prototype.find = function(nomeDB,collection,query, callback){
    //INSTAURO LA MIA CONNESSIONE
    setConnection(nomeDB,collection,function(err,coll,conn){

        if(errConn.codeErr == -1){
            //CONNESSIONE OK
            let dataDB = coll.find(query).toArray();//Eseguo la Query però devo trasformarla in Array
            dataDB.then(function(data){

                console.log(data);//I dati della query

                let errData = {codeErr:-1,message:""};

                conn.close();//Chiudo Connessione

                callback(errData,data);//Restituisco l'oggetto di errore e i dati collezionati
            });

            dataDB.catch(function(err){
                let errData = {codeErr:503,message:"Errore durante l'esecuzione della query"};
                conn.close();

                callback(errData,{});//nulla perchè la query non è andata a buon fine
            });
        }else{
            //ERRORE CONNESSIONE
            callback(errConn,{});
        }

    });//function di callback mi rida il client,collection e errore. INTENDO QUA!!!!!!!!!!!!!!(per la cosa di sopra)
};

module.exports = new mongofunctions();