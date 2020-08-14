<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    require_once 'pdo.php';

    $function = $_POST['function'] ?: ''; // This will accept the $_POST['function'] value if it isn't empty, or '' if it is

    if(strcmp($function, "delete") === 0){
        $id = $_POST['id'] ?: '';
        echo($id);
        $stmt = $pdo->prepare("DELETE FROM events WHERE event_id = ?");
        $success = $stmt->execute([$id]);

        echo ($success ? "success" : "fail");
    } else if(strcmp($function, "create") === 0){
        $title = $_POST['title'] ?: '';
        $description = $_POST['description'] ?: '';
        $date = $_POST['date'] ?: '';
        $time = $_POST['time'] ?: '';
        $user = $_POST['username'] ?: '';

        $stmt = $pdo->prepare("INSERT INTO events (title, date, time, description, creator) VALUES (?, ?, ?, ?, ?)");  
        $success = $stmt->execute([$title, $date, $time, $description, $user]);
        
        echo ($success ? "success" : "fail");
    } else if(strcmp($function, "update")) {
        $id = $_POST['id'] ?: '';
        $title = $_POST['title'] ?: '';
        $description = $_POST['description'] ?: '';
        $date = $_POST['date'] ?: '';
        $time = $_POST['time'] ?: '';

        $stmt = $pdo->prepare("UPDATE events SET title=?, description=?, date=?, time=? WHERE event_id=?");
        $success = $stmt->execute([$title, $description, $date, $time, $id]);
        
        echo ($success ? "success" : "fail");
    }

    $pdo = null;
?>