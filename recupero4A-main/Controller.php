<?php
   $request =  $_SERVER['REQUEST_URI'];//REQUEST_URI mi preleva tutto ciò che c'è all'interno del nostro link,il percorso
   // echo $request."<br>";

    switch($request){
        case '/':
            break;
        case '':
            include("index.html");
            break;
        case '/test':
            include("server/test.php");
            break;
        default:
            echo "Nessuna risorsa trovata";
            break;
        
            
    }




?>