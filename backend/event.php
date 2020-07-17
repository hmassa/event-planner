<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    require_once 'pdo.php';

    $function = empty($_POST['function']) ? '' : $_POST['function'];

    if(strcmp($function, "delete") === 0){
        $id = empty($_POST['id']) ? '' : $_POST['id'];
        echo($id);
        $stmt = $pdo->prepare("DELETE FROM events WHERE event_id = ?");
        $success = $stmt->execute([$id]);

        $rtrn = $success ? "success" : "fail";
        echo $rtrn;
    } else if(strcmp($function, "create") === 0){
        $title = empty($_POST['title']) ? '' : $_POST['title'];
        $description = empty($_POST['description']) ? '' : $_POST['description'];
        $date = empty($_POST['date']) ? '' : $_POST['date'];
        $time = empty($_POST['time']) ? '' : $_POST['time'];
        $user = empty($_POST['username']) ? '' : $_POST['username'];

        $stmt = $pdo->prepare("INSERT INTO events (title, date, time, description, creator) VALUES (?, ?, ?, ?, ?)");  
        $success = $stmt->execute([$title, $date, $time, $description, $user]);
        
        $rtrn = $success ? "success" : "fail";
        echo $rtrn;
    } else if(strcmp($function, "update")) {
        $id = empty($_POST['id']) ? '' : $_POST['id'];
        $title = empty($_POST['title']) ? '' : $_POST['title'];
        $description = empty($_POST['description']) ? '' : $_POST['description'];
        $date = empty($_POST['date']) ? '' : $_POST['date'];
        $time = empty($_POST['time']) ? '' : $_POST['time'];

        $stmt = $pdo->prepare("UPDATE events SET title=?, description=?, date=?, time=? WHERE event_id=?");
        $success = $stmt->execute([$title, $description, $date, $time, $id]);
        
        $rtrn = $success ? "success" : "fail";
        echo $rtrn;
    }

    $pdo = null;
?>