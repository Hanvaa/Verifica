"use strict";

let mongo = require("mongodb");
let mongoClient = mongo.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";

let mongoFunctions = function (){  }

function setConnection(nomeDb, col, callback){
    let errConn = {codeErr:-1, message:""};
    let collection = null;
    let client = null;
    let mongoConnection = mongoClient.connect(CONNECTIONSTRING);
    mongoConnection.catch((err) => {
        console.log("Errore di connessione al server Mongo. " + err);
        errConn.codeErr = 503;
        errConn.message = "Errore di connessione al server Mongo";
        callback(errConn, collection, client);
    });
    mongoConnection.then((client) => {
        console.log("Connected to MongoDB server");
        let db=client.db(nomeDb);
        collection=db.collection(col);
        callback(errConn, collection, client);
    });
}

mongoFunctions.prototype.find = function (nomeDb, collection, query, callback){
    setConnection(nomeDb, collection, function (errConn, coll, conn){
        if(errConn.codeErr == -1){
            let dataDB = coll.find(query).toArray();
            dataDB.then(function (data){
                console.log(data);
                let errData={codeErr:-1, message:""};
                conn.close();
                callback(errData,data);
            });
            dataDB.catch(function (error){
                let errData={codeErr:503, message:"Errore durante l'esecuzione della query"};
                conn.close();
                callback(errData, {});
            });
        } else
            callback(errConn, {});
    });
}

mongoFunctions.prototype.inserisci = function (nomeDb, collection, query, callback){
    setConnection(nomeDb, collection, function (errConn, coll, conn){
        if(errConn.codeErr == -1){
            let insertDB = coll.insertOne(query);
            insertDB.then(function (data){
                console.log(data);
                let errData={codeErr:-1, message:""};
                conn.close();
                callback(errData,data);
            });
            insertDB.catch(function (error){
                let errData={codeErr:503, message:"Errore durante l'esecuzione della query di inserimento"};
                conn.close();
                callback(errData, {});
            });
        } else
            callback(errConn, {});
    });
}

mongoFunctions.prototype.aggiorna = function (nomeDb, collection, filter, query, callback){
    setConnection(nomeDb, collection, function (errConn, coll, conn){
        if(errConn.codeErr == -1){
            let updateDB = coll.updateOne(filter,query);
            updateDB.then(function (data){
                console.log(data);
                let errData={codeErr:-1, message:""};
                conn.close();
                callback(errData,data);
            });
            updateDB.catch(function (error){
                let errData={codeErr:503, message:"Errore durante l'esecuzione della query di aggiornamento"};
                conn.close();
                callback(errData, {});
            });
        } else
            callback(errConn, {});
    });
}

mongoFunctions.prototype.aggrega = function (nomeDb, collection, opzioni, callback){
    setConnection(nomeDb, collection, async function (errConn, coll, conn){
        if(errConn.codeErr == -1){
            try{
                let stat = await coll.aggregate(opzioni).toArray();
                let errData = {codeErr:-1, message:""};
                callback(errData,stat);
            }catch{
                let errData = {codeErr:503, message:"Errore durante la query di aggiornamento dati"};
                callback(errData,{});
            }finally {
                await conn.close();
            }
        }else
            callback(errConn,{})
    });
}

module.exports = new mongoFunctions();