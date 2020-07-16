<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    require_once 'pdo.php';

    $username = empty($_POST['username']) ? '' : $_POST['username'];
	$password = empty($_POST['password']) ? '' : $_POST['password'];
    $password = hash('sha256', $password);

    $stmt = $pdo->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $results = $stmt->fetch(PDO::FETCH_ASSOC);
    if($stmt->rowCount() > 0){
        if (strcmp($password, $results['password']) == 0){
            echo($results);
        } else {
            echo('pass');
        }  
    } else {
        echo("user");
    }

    $pdo = null;
    
?>