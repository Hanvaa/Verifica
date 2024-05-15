<?php

$request = $_SERVER['REQUEST_URI'];
//echo $request."<br>";

switch ($request) {
    case '/' :
    case '' :
        include("pag1.html");
        break;

    case '/Inserisci' :
        include("server/inserisciDati.php");
        break;
    
    case '/Prendi' :
        include("server/prendiDati.php");
        break;

    default:
        echo "Nessuna risorsa trovata";
        break;
}