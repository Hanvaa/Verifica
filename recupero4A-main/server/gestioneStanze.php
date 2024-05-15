<?php
    $jObj = null;

    //1. Collegarci al db
    $indirizzoServerDBMS = "localhost:8081";
    $nomeDb = "4_hotel";
    $conn = mysqli_connect($indirizzoServerDBMS, "root", "", $nomeDb);
    if($conn->connect_errno>0){
        $jObj = preparaRisp(-1, "Connessione rifiutata");
    }else{
        $jObj = preparaRisp(0, "Connessione ok");
    }

    //3 Verificare se non esiste già il record
    $query = "SELECT * from stanze";
    $ris = $conn->query($query);
    if($ris){
       $jObj->$mezzi = array();
        $cont =0;
        if($ris->num_rows > 0){
            while($vet = $ris->fetch_assoc()){
                array_push($jObj->mezzi, $vet);
            }
            $jObj->mezzi = $mezzi;
        }else{
            $jObj = preparaRisp(-1, "Non ho trovato mezzi");
        }
    }else{
        //Quando ci sono errori
        $jObj = preparaRisp(-1, "Errore nella query: ".$conn->error);
    }

    //Rispondo al javascript (al client)
    echo json_encode($jObj);


function preparaRisp($cod, $desc, $jObj = null){
    if(is_null($jObj)){
        $jObj = new stdClass();
    }
    $jObj->cod = $cod;
    $jObj->desc = $desc;
    return $jObj;
}


?>