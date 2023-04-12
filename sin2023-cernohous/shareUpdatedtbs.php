<?php
  require "utilities.php";
$url = $linkIndex;

session_start();


$data = $_POST["schovanyKontejner6"];


mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = mysqli_connect($serverIP, $username, $dtbsPassword, $dtbsName);
$conn->set_charset("utf8mb4");

if (!$conn) {
  echo "Unable to connect to the database. Please try again later.";
  error_log("Database connection failed: " . mysqli_connect_error());
}

$sql = 'UPDATE '.$tableName.' SET userdata = ? WHERE email= ?';   
$email =$_SESSION["email2"];
    
    
$statement = $conn->prepare($sql);
$statement->bind_param("ss",$data,$email);
if($statement->execute()){
  //echo "data succesfully saved";
}
mysqli_close($conn);
$url =$url."?reg=1&email=".$_SESSION["email2"]."&psw=".$_SESSION["passwordDtbs"];
session_destroy();
header("Location: ".$url);
   
?>