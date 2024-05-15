let http = require("http");
let url = require("url");
let fs = require("fs");

var server = http.createServer(gestisciRichieste);
server.listen(1337);
console.log("Il server è stato avviato...");

function gestisciRichieste(richiesta, risposta){
    let indirizzo = richiesta.headers.host + richiesta.url;
    let info = url.parse(indirizzo, true);
    let risorsa = info.pathname;
    let file;
    switch(risorsa){
        case "/":
            file = fs.readFileSync("public/index.html");
            risposta.writeHead(200, {"Content-Type":"text/html"});
            risposta.write(file);
            risposta.end();
            break;

        case "/index.css":
            file = fs.readFileSync("public/index.css");
            risposta.writeHead(200, {"Content-Type":"text/css"});
            risposta.write(file);
            risposta.end();
            break;

        case "/index.js":
            file = fs.readFileSync("public/index.js");
            risposta.writeHead(200, {"Content-Type":"text/javascript"});
            risposta.write(file);
            risposta.end();
            break;

        case "/addDati":
            let json = [
                {utente:"pippo", pwd:"pippo", progresso:[]},
                {utente:"pluto", pwd:"pluto", progresso:[]}
            ];

            fs.writeFile("dati.json", JSON.stringify(json), (err)=>{
                if(err){
                    risposta.writeHead(500, {"Content-type":"text/plain"});
                    risposta.write("La scrittura non è andata a buon fine.");
                    risposta.end();
                }else{
                    risposta.writeHead(200, {"Content-type":"text/html"});
                    risposta.write(`
                        <!doctype html>
                        <html>
                            <head><title>CUBI</title></head>
                            <body><script>alert("SCRITTO!");</script></body>
                        </html>
                    `);
                    risposta.end();
                }
            });
            break;

        case "/getDati":
        
            break;

        case "/aggiungiPartitaPOST":
            //Passaggio parametri in POST
               //Obbiettivo -> raccogliere il contenuto del body
            let corpoBusta = "";
            //intercetta l'arrivo di un pezzetto di body
            richiesta.on("data",(dato)=>{
                console.log();
                corpoBusta += dato;
            });

            //Intercetta la fine della comunicazione (sono arrivati tutti i pezzetti di body)
            richiesta.on("end",()=>{
                console.log(corpoBusta);
            });

            aggiungiPartita("dati.json",JSON.parse(corpoBusta),response)

            break;

            
    }
}

function scrivi(){
    fs.writeFile("dati.json", JSON.stringify(json), (err)=>{
        if(err){
            risposta.writeHead(500, {"Content-type":"text/plain"});
            risposta.write("La scrittura non è andata a buon fine.");
            risposta.end();
        }else{
            risposta.writeHead(200, {"Content-type":"text/html"});
            risposta.write(`
                <!doctype html>
                <html>
                    <head><title>CUBI</title></head>
                    <body><script>alert("SCRITTO!");</script></body>
                </html>
            `);
            risposta.end();
    }
        
        