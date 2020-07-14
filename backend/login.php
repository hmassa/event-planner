<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    if(!session_start()){
        echo "session";
        exit;
    }

    $username = empty($_SESSION['loggedin']) ? '' : $_SESSION['loggedin'];

    require_once 'pdo.php';

    $username = empty($_POST['username']) ? '' : $_POST['username'];
	$password = empty($_POST['password']) ? '' : $_POST['password'];
    $password = hash('sha256', $password);

    $stmt = $pdo->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if($results = $stmt->fetch(PDO::FETCH_ASSOC)){
        if (strcmp($password, $results['password']) == 0){
            $_SESSION['loggedin'] = $username;
            echo('success');
        } else {
            echo('fail');
        }  
    } else {
        echo($stmt->errorInfo());
    }

    $pdo = null;
    
?>