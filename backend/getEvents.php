<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    require_once 'pdo.php';

    $username = $_GET['username']; // No need to keep calling $_GET['username']
    if(empty($username)) {
        echo('fail');
    } else {
      $rows = array();
      $stmt = $pdo->prepare("SELECT * FROM events WHERE creator = ?");
      $stmt->execute([$username]);
      while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
          array_push($rows, $result);
      }
      
      echo json_encode($rows);
    }
    
    
?>