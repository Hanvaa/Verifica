
window.onload = async ()=>{

    //Apertura di una sessione
    let parametri = JSON.stringify({nome:"Daniele"});
    let busta = await fetch("/getSessione", 
        {
            "method":"POST", headers: {"Content-Type": "application/json"}, 
            "body":parametri}
    );
    console.log(await busta.text());

/*    parametri = JSON.stringify({nome:"Daniele"});
    busta = await fetch("/init", 
        {
            "method":"POST", headers: {"Content-Type": "application/json"}, 
            "body":parametri}
    );
    console.log(await busta.text());
    */


    //Risposta di una sessione aperta precedentemente
   busta = await fetch("/getSessione");
   console.log(await busta.text());
}