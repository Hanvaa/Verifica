window.onload = async function (){
    let busta = await fetch("http://localhost/gestioneStanze",{method : 'GET'});//ottenuto la busta
    let risposta = await busta.json();//Aperto la busta
    if(risposta.cod == 0){
        console.log(risposta);
    }else{
        console.log("Errore:" + risposta.desc);
    }


    for(let item of risposta.stanze){
        let card = `
    <div id="cardGroup">
    <div class="card">
        <img src="img/camera.png">
        <div class="dettagli">
            <div >
                <input type="checkbox" id="checkTv1" ${item.tv == "1"?"checked":""}>
                <label for="checkTv1">
                    <span class="material-symbols-outlined">tv</span>
                </label>
            </div>
            <div>
                <input type="checkbox" id="checkBalcone1">
                <label for="checkBalcone1">
                    <span class="material-symbols-outlined">balcony</span>
                </label>
            </div>
            <div>
                <input type="checkbox" id="checkMare1">
                <label for="checkMare1">
                    <span class="material-symbols-outlined">beach_access</span>
                </label>
            </div>
            <div>
                <input type="checkbox" id="checkMatrimoniale1">
                <label for="checkMatrimoniale1">
                    <span class="material-symbols-outlined">bed</span>
                </label>
            </div>
        </div>
    </div>`; 

    stanze.innerHTML += card; 

    
    }
    for(let card of stanze.children){
        card.addEventListener("click",() =>{
            stanze.querySelector(".cardClick").classList.remove("cardClick");
            card.classList.add("cardClick");
        })
    }
    
};

