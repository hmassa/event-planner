<?php
  header('Access-Control-Allow-Origin: http://localhost:3000');
  header('Access-Control-Allow-Methods: GET, POST');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

  require_once "pdo.php";

  $username = $_POST['username'] ?: '';
  $fname = $_POST['fname'] ?: '';
  $lname = $_POST['lname'] ?: '';
  $password = $_POST['password'] ?: '';
  $password = hash('sha256', $password);
  $email = $_POST['email'] ?: '';

  $stmt = $pdo->prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?)");
  $value = $stmt->execute([$fname, $lname, $username, $password, $email]);
  if ($value){
      echo("success");
  } else {
      echo json_encode("failure");
  }
  $stmt = null;
  $pdo = null;
?>