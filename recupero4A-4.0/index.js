var btnPrenota, stanze;

window.onload = async function(){
    btnPrenota = document.getElementById("btnPrenota");
    btnPrenota.addEventListener("click", prenota);

    console.log("prova");
    let busta = await fetch("getStanze", {method:'GET'});
    let risposta = await busta.json();
    if(risposta.cod == 0){
        console.log(risposta);

        stanze = document.getElementById("cardGroup");
        stanze.innerHTML = "";
        for(let item of risposta.stanze){
            let card = `<div class="card">
                <img src="img/camera.png">
                <div class="dettagli">
                    <div>
                        <input type="checkbox" id="checkTv1" ${item.tv=="1"?"checked":""} disabled>
                        <label for="checkTv1">
                            <span class="material-symbols-outlined">tv</span>
                        </label>
                    </div>
                    <div>
                        <input type="checkbox" id="checkBalcone1" ${item.balcone=="1"?"checked":""} disabled>
                        <label for="checkBalcone1">
                            <span class="material-symbols-outlined">balcony</span>
                        </label>
                    </div>
                    <div>
                        <input type="checkbox" id="checkMare1" ${item.vistaMare=="1"?"checked":""} disabled>
                        <label for="checkMare1">
                            <span class="material-symbols-outlined">beach_access</span>
                        </label>
                    </div>
                    <div>
                        <input type="checkbox" id="checkMatrimoniale1" ${item.matrimoniale=="1"?"checked":""} disabled>
                        <label for="checkMatrimoniale1">
                            <span class="material-symbols-outlined">bed</span>
                        </label>
                    </div>
                </div>
            </div>`;
            stanze.innerHTML += card;
        }
        for(let card of stanze.children){
            card.addEventListener("click", ()=>{
                let prec = stanze.querySelector(".cardClick");
                if(prec)
                    prec.classList.remove("cardClick");
                card.classList.add("cardClick");
            });
        }

    }else{
        console.log("Errore:" + risposta.desc);
    }
};

function prenota(){
    let stanzaSel = stanze.querySelector(".cardClick");
    if(stanzaSel){
        let email = document.getElementById("txtEmail").value;
        if(email != ""){
            let dataDa = document.getElementById("txtDataDa").value;
            let dataA = document.getElementById("txtDataA").value;
            if(dataA != "" && dataDa != ""){
                
            }else
                alert("Date obbligatorie");
        }else
            alert("Email obbligatoria");
    }else
        alert("Nessuna stanza è stata selezionata!");
}