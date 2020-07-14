<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    if(!session_start()){
        echo "session";
        exit;
    }

    require_once "pdo.php";

    $function = empty($_GET['function']) ? '' : $_GET['function'];
    $username = empty($_GET['username']) ? '' : $_GET['username'];

    if (strcmp($function, "search") == 0){
        if ($username != ''){
            $stmt = $pdo->prepare("SELECT username FROM users WHERE username = ?");
            $stmt->execute([$username]);
            if($results = $stmt->fetch()){
                echo('unique');
            } else {
                echo('match');
            }
            $stmt = null;
        }
    } else {
        $fname = empty($_GET['fname']) ? '' : $_GET['fname'];
        $lname = empty($_GET['lname']) ? '' : $_GET['lname'];
        $username = empty($_GET['username']) ? '' : $_GET['username'];
        $password = empty($_GET['password']) ? '' : $_GET['password'];
        $password = hash('sha256', $password);
        $email = empty($_GET['email']) ? '' : $_GET['email'];

        $stmt = $pdo->prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?)");
        $value = $stmt->execute([$fname, $lname, $username, $password, $email]);
        if ($value){
            $_SESSION['loggedin'] = $username;
            echo("success");
        } else {
            print_r($stmt->errorInfo(), true);
        }
        $stmt = null;
    }
    $pdo = null;
?>