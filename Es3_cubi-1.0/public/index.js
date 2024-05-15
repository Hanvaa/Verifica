//GESTIONE sparizione icone
var cnt=0, a, b, bool=true;

//GESTIONE TIMER
var timer = null; 
var tempoInizio, tempoFinale;
var _lblTempo = null;

//GESTIONE DATI FINALI
var dati = {};
var iconeEliminate = [];

window.onload= function(){
    document.getElementById("btnStart").addEventListener("click", startTimer);
    _lblTempo = document.querySelector("#tempo");

    //Icone prime righe
    let d=document.querySelectorAll("section > .material-symbols-rounded");
    for(let i=0;i<d.length;i++)
        d[i].addEventListener("click", chk);

    //Icone accanto al menù
    d=document.querySelectorAll("section > div > .material-symbols-rounded");
    for(let i=0;i<d.length;i++)
        d[i].addEventListener("click", chk);
}

function startTimer(){
  tempoInizio = new Date();
  timer = setInterval(()=>{
    //Richiamata quando passano 100 millisecondi
    tempoFinale = new Date();
    //millisecondi che passano tra l'ora attuale e quella di inizio
    let differenza = tempoFinale - tempoInizio;
    let minuti = parseInt(differenza/60000);
    let secondi = parseInt(differenza/1000) - (minuti*60);
    let millisecondi = differenza-(secondi*1000)-(minuti*60000);

    //METODO 2
    if(_lblTempo.childNodes.length == 4)
      _lblTempo.childNodes[3].nodeValue =  minuti +":" + secondi + ":" + millisecondi;
    //METODO 1
    //_lblTempo.innerHTML = `<span class="material-symbols-rounded">timer</span><br>`+ minuti +":" + secondi + ":" + millisecondi;
  }, 100);
    
}

function chk(d){
  let nomeUtente = document.getElementById("nomeUtente");
  if(timer){
    cnt++;
    if(bool){
      a=d.target;
      bool=false;
    }
    else{
      b=d.target;
      bool=true;
    }
    
    //Quando ho cliccato su due icone
    if(cnt==2){
      if(a.innerHTML==b.innerHTML)
      {
        //Elimino gli elementi html
        a.remove(); 
        b.remove();

        //Nascondo gli elementi html -> devo poi saper capire quali sono nascosti
        //a.style.display = "none";
        //b.style.display = "none";
      
        let d=document.querySelectorAll("section > .material-symbols-rounded");
        let d2 =document.querySelectorAll("section > div > .material-symbols-rounded");
        if(!d && !d2){
          alert("Hai vinto!");

          //JSON
          clearInterval(timer);
          dati.tempo = tempoFinale - tempoInizio;
          let objJson = '{"nomeUt":"{"' + nomeUtente + '","tempo":"'+ dati.tempo +' "}';
          console.log(JSON.parse(objJson));
        }
      }
      cnt = 0;
    } 
  }

  
}

async function gestisciVincita(){
  alert("hai vinto");

  clearInterval(timer);
  dati.tempo = tempoFinale - tempoInizio;
  dati.nome = prompt("Inserisci il tuo nome per salvare i dati della partira.");
  
  //Mandare al server i dati
  console.log(dati);

  let busta = await fetch("http://localhost:10420/aggiungiPartitaPOST",{"method": "POST","headers" : {"Content-type":"application/json"} ,body:JSON.stringify(dati)});

  let risposta = await busta.json();
  console.log(risposta);
}