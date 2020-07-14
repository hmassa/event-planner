<?php
    $host = 'localhost';
    $db = 'eventdb';
    $user = 'root';
    $pass = '';

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    } catch (Exception $e) {
        exit($e);
    }
?>