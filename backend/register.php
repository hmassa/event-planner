<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    if(!session_start()){
        echo "session";
        exit;
    }

    require_once "pdo.php";

    $function = empty($_POST['function']) ? '' : $_POST['function'];
    $username = empty($_POST['username']) ? '' : $_POST['username'];

    if (strcmp($function, "search") == 0){
        if ($username != ''){
            $stmt = $pdo->prepare("SELECT username FROM users WHERE username = ?");
            $stmt->execute([$username]);
            if($results = $stmt->fetch()){
                echo('match');
            } else {
                echo('unique');
            }
            $stmt = null;
        }
    } else {
        $fname = empty($_POST['fname']) ? '' : $_POST['fname'];
        $lname = empty($_POST['lname']) ? '' : $_POST['lname'];
        $password = empty($_POST['password']) ? '' : $_POST['password'];
        $password = hash('sha256', $password);
        $email = empty($_POST['email']) ? '' : $_POST['email'];

        echo("fist: $fname last: $lname user: $username pass: $password email: $email");
        // $stmt = $pdo->prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?)");
        // $value = $stmt->execute([$fname, $lname, $username, $password, $email]);
        // if ($value){
        //     $_SESSION['loggedin'] = $username;
        //     echo("success");
        // } else {
        //     echo("failure");
        //     // print_r($stmt->errorInfo(), true);
        // }
        // $stmt = null;
    }
    $pdo = null;
?>