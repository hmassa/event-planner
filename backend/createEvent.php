<?php

    require_once 'pdo.php';

    $title = empty($_POST['title']) ? '' : $_POST['title'];
    $description = empty($_POST['description']) ? '' : $_POST['description'];
    $date = empty($_POST['date']) ? '' : $_POST['date'];
    $time = empty($_POST['time']) ? '' : $_POST['time'];
    $user = empty($_POST['username']) ? '' : $_POST['username'];

    $stmt = $pdo->prepare("INSERT INTO events (title, description, date, time, creator) VALUES (?, ?, ?, ?, ?)");

    

    $pdo = null;
?>