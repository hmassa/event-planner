<?php
    if(!session_start()) {
        $username = "";
    }
    $username = empty($_SESSION['loggedin']) ? '' : $_SESSION['loggedin'];

    if(!$username){
        require "loginForm.php";
        exit;
    }

    require_once 'db.conf';

    $title = empty($_POST['title']) ? '' : $_POST['title'];
    $description = empty($_POST['description']) ? '' : $_POST['description'];
    $date = empty($_POST['date']) ? '' : $_POST['date'];
    $time = empty($_POST['time']) ? '' : $_POST['time'];

    $sql = "INSERT INTO events (title, description, date, time, creator) VALUES ($title, $description, $date, $time, $username)";

    

    $mysqli->close();
?>