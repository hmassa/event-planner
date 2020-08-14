<?php
  header('Access-Control-Allow-Origin: http://localhost:3000');
  header('Access-Control-Allow-Methods: GET, POST');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

  require_once 'pdo.php';

  $username = $_POST['username'] ?: '';
  $password = $_POST['password'] ?: '';
  $password = hash('sha256', $password);

  $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
  $stmt->execute([$username]);
  $results = $stmt->fetch(PDO::FETCH_ASSOC);
  if($stmt->rowCount() > 0){
      if (strcmp($password, $results['password']) == 0) {
          $returnArray = array(
              "first_name" => $results['first_name'],
              "last_name" => $results['last_name'],
              "username" => $results["username"]
          ); 

          echo json_encode($returnArray);
      } else {
          echo('pass');
      }  
  } else {
      echo("user");
  }

  $pdo = null;
?>