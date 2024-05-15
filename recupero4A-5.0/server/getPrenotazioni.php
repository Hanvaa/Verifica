<?php 
    $jObj = null;
     $conn = mysqli_connect("localhost", "root", "", "4_hotel");
     if($conn->connect_errno>0){
         $jObj = preparaRisp(-1, "Connessione rifiutata");
     }else{
         $jObj = preparaRisp(0, "Connessione ok");
     }
 
     $query = "SELECT * FROM prenotazioni";
     $ris = $conn->query($query);
     if($ris){
        $jObj->prenotazioni = array();
         if($ris->num_rows > 0){
             while($vet = $ris->fetch_assoc()){
                array_push($jObj->prenotazioni, $vet);
             }
         }else{
             $jObj = preparaRisp(-1, "Non ho trovato prenotazioni");
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