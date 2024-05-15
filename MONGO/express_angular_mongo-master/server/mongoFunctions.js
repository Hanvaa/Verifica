"use strict"

let mongo = require("mongodb");
let mongoClient = mongo.MongoClient;
const CONNECTIONSTRING = "mongodb://127.0.0.1:27017";

let mongoFunctions = function(){    };

function setConnection(nomeDB, collection, callback){
    let errConn = {codErr:-1, message:" "};
    let _collection = null;
    let client = null;

    let mongoConnection = mongoClient.connect(CONNECTIONSTRING);
    mongoConnection.catch((err)=>{
        console.log("Errore di Connessione al Server Mongo "+ err);
        errConn.codErr=503;
        errConn.message="Errore di Connessione al Server Mongo ";
        callback(errConn,_collection,client)
    });

    mongoConnection.then((client)=>{
        console.log("Connected to MongoDB Server");
        let db = client.db(nomeDB);
        _collection = db.collection(collection);
        callback(errConn,_collection,client);
    });
}

mongoFunctions.prototype.find = function(nomeDB,collection,query,callback){
    setConnection(nomeDB,collection,function(errConn,_collection,conn){
        if(errConn.codErr == -1){
            let dataDB = _collection.find(query).toArray();
            dataDB.then(function(data){
                console.log(data);
                let errData={codErr:-1, message:" "};
                conn.close();
                callback(errData,data);
            });
            dataDB.catch(function(error){
                let errData = {codErr:503,message:"Errore durante l'esecuzione della query"};
                conn.close()
                callback(errData,{});
            });
        }
        else
            callback(errConn,{});

    })
}

mongoFunctions.prototype.insert = function(nomeDB,collection,query,callback){
    setConnection(nomeDB,collection,function(errConn,_collection,conn){
        if(errConn.codErr == -1){
            let insertDB = _collection.insertOne(query);
            insertDB.then(function(data){
                console.log(data);
                let errData={codErr:-1, message:" "};
                conn.close();
                callback(errData,data);
            });
            insertDB.catch(function(error){
                let errData = {codErr:503,message:"Errore durante l'esecuzione della query di inserimento"};
                conn.close()
                callback(errData,{});
            });
        }
        else
            callback(errConn,{});

    })
}
mongoFunctions.prototype.update = function(nomeDB,collection,filter,query,callback){
    setConnection(nomeDB,collection,function(errConn,_collection,conn){
        if(errConn.codErr == -1){
            let updateDB = _collection.updateOne(filter,query);
            updateDB.then(function(data){
                console.log(data);
                let errData={codErr:-1, message:" "};
                conn.close();
                callback(errData,data);
            });
            updateDB.catch(function(error){
                let errData = {codErr:503,message:"Errore durante l'esecuzione della query di inserimento"};
                conn.close()
                callback(errData,{});
            });
        }
        else
            callback(errConn,{});

    })
}

mongoFunctions.prototype.aggregate = function(nomeDB,collection,options,callback){
    setConnection(nomeDB,collection,async function(errConn,_collection,conn){
        if(errConn.codErr == -1){
            try{
                let stat = await _collection.aggregate(opzioni).toArray();
                let errData = {codErr:-1,message:""};
                callback(errData,stat);
            }
            catch{
                let errData = {codErr:503,message:"Errore Durante la query di aggiornamento dati"};
                callback(errData,{});
            }
            finally{
                await conn.close()
            }
            
        }
        else{
            callback(errConn,{});
        }
    })
}



module.exports = new mongoFunctions();