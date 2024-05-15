const jwt = require("jsonwebtoken");
const fs = require("fs");

let tokenAdministration = function (){
    this.payload = "";
    this.token = "";
    this.valoreCookie = "";
    this.privateKey = fs.readFileSync("keys/private.key","UTF8");
}

tokenAdministration.prototype.createToken = function (user){
    this.token = jwt.sign({
        _id:user._id,
        user:user.user,
        exp:Math.floor(Date.now()/1000 + 10)
        },
        this.privateKey);
    console.log("Token creato correttamente: " + this.token);
}

tokenAdministration.prototype.ctrlTokenLocalStorage = function (req,callback){
    const token = req.headers["token"];
    console.log(token);
    if(token != "null"){
        jwt.verify(token, this.privateKey, function (err,data){
            console.log(data);   // data è il payload del token
            if(!err)
                this.payload = data;
            else
                this.payload = {err_exp:true, message: "Token scaduto o corrotto"};
            callback(this.payload);
        });
    }else{
        this.payload = {err_exp:true, message: "Token inesistente"};
        callback(this.payload);
    }
}

tokenAdministration.prototype.ctrlToken = function(req,callback){
    this.payload = "";
    this.token = readCookie(req,"token");
    let errToken = {codeErr:-1,message:""};


    if(this.token = ""){//Accesso non eseguito, token inesistente
        errToken = {codeErr:403,message:"Token inesistente"};

    }else{
        try{
            this.payload = jwt.verify(this.token,this.privateKey);
            console.log("token OK");
        }catch(err){
            errToken = {codeErr:403,MESSAGE:"Token scaduto o corrotto"};
        }
    }
    callback(errToken);
}

tokenAdministration.prototype.readCookie = function(req,name){
    this.valoreCookie = "";
    if(req.headers.cookie){
        let cookies = req.headers.cookie.split("; ");//Splitto tutti i miei cookie su questa stringa di separazione(; )
        console.log(cookies);
        for(let i = 0; i < cookies.length; i++){
            cookies[i] = cookies[i].split("=");//tra cookie e valore c'è l'uguale
            if(cookies[i][0] == name){//se è il cookie che sto cercando, cioè il token
                this.valoreCookie = cookies[i][1];//Prendo il valore
                console.log(this.valoreCookie);
                break;
            }
        }
    }
    return this.valoreCookie;
}

module.exports = new tokenAdministration();



//cookies = [token= fdfadsadsadfsafasfsafsafsafsafsad, nome = Paolo; eta = 33]; esempio di come vengono salvati nel caso ho + cookies
//cookise[0] = token , cookies[1] = fddsadadafdfafafad ---  perchè abbiamo splittato sull'uguale 