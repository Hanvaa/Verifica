/*********************************************
 * 
 * PER STARTARE IL SERVER EXPRESS DEVO FARE:
 * 
 * npm i
 * node server.js
 *********************************************/



//Rispetto i cookie, perchè utilizzerò le sessioni?
//Le sessioni sono più sicure dei cookie, perchè i cookie sono salvati nel browser e possono essere modificati
//Le sessioni sono salvate nel server e non possono essere modificate, e quando chiudo il browser, la sessione viene eliminata



//"import" della libreria (npm i express)
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

/*
    app.listen(porta, callback)
    callback -> richiamata all'avvio del server

    node server -> per avviare il server definito con express
*/
app.listen(1337, ()=>{
    console.log("Il server è avviato sulla porta 1337");
});

/*
    MIDDLEWARE -> intercetta tutti i pacchetti senza filtri

    Intercetta i pacchetti tra l'arrivo e la send!
*/
app.use((richiesta, risposta, next)=>{
    console.log("Pacchetto ricevuto: " + richiesta.method + " - "+ richiesta.url);
    next(); //Permette di mandare avanti il processo di elaborazione della richieste alle get/post successive
});

app.use((richiesta, risposta, next)=>{
    console.log("Seconda use");
    next();
});

/*
 l'ORDINE è importante!
 Se io intercetto la risorsa radice prima di express.static("public")
 allora non verrà ritornato il file index.html

*/
app.get("/", (richiesta, risposta)=>{
    // .send -> imposta automaticamente un content-type
    risposta.send("<h1>Salve mondo!</h1>");
    console.log("/ intercettata");
});

/*
    Intercetta tutte le risorse statiche (file html, css, ...)
    e li restituisce all'utente automaticamente
*/
app.use(express.static("public"));

/* ha il compito di prelevare i parametri JSON passati in POST */

app.use(bodyParser.json());

app.get("/pag2", (richiesta, risposta)=>{
    risposta.writeHead(200, {"Content-Type":"text/plain"});
    risposta.end("<h1>Salve mondo!</h1>");
});

app.post("/init", (richiesta, risposta)=>{
    console.log(richiesta.body);
    let nome = richiesta.body.nome;
    risposta.writeHead(200, {"Content-Type":"text/plain"});
    risposta.end(`<h1>Ciao ${nome}</h1>`);
});

//Non considerata se una get/post effettuano una send 
//use intercetta tutti i casi in cui nessun get/post soddisfano la richiesta
app.use((richiesta, risposta, next)=>{
    console.log("Risorsa non trovata");
    risposta.status(404);
    risposta.send("<h1>RISORSA NON TROVATA</h1>");
});


app.use(session({
    //Parametro necessario per codificare la sessione

    secret:"test",//parola chiave per criptare e codificare i dati nei cookie
    //Parametro che permette di salvare la sessione anche se non è stata modificata

    //la sessione è collegata a dei dati nel db?
    resave:false,//tipo di memorizzazione,memoria della sessione, se true salva sempre la sessione se è false, solo quando è stato modificato
    saveUninitialized:true
}))

app.use((richiesta,risposta , next)=>{
    console.log("Risorsa non trovata");
    risposta.status(404);
    risposta.send("<h1>RISORSA NON TROVATA</h1>");
})