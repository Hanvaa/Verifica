<?php 
     $jObj = null;
     $conn = mysqli_connect("localhost", "root", "", "4_hotel");
     if($conn->connect_errno>0){
         $jObj = preparaRisp(-1, "Connessione rifiutata");
     }else{
         $jObj = preparaRisp(0, "Connessione ok");
     }

     //Prendere i parametri
 
     //Inserisco nella tabella
     $query = "INSERT INTO prenotazioni (email, codStanza, inizioSoggiorno, fineSoggiorno, pagato) 
        VALUES ('$email', $codStanza, '$dataDa', '$dataA', 0)";
     $ris = $conn->query($query);
     if($ris){
        
     }else
         $jObj = preparaRisp(-1, "Errore nella query: ".$conn->error);
 
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