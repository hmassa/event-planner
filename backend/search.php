<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    require_once "pdo.php";

    $username = empty($_GET['username']) ? '' : $_GET['username'];
    
    $stmt = $pdo->prepare("SELECT username FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if($results = $stmt->fetch()){
        echo('match');
    } else {
        echo('unique');
    }
    $stmt = null;
?>