<?php
$serverIP="127.0.0.1";
$username="root";
$dtbsPassword="";
$dtbsName="sin2023-cernohous";
session_start();
$data = $_POST["schovanyKontejner3"];


if(strcmp($_SESSION["loginData"],$data) != 0){
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = mysqli_connect($serverIP, $username, $dtbsPassword, $dtbsName);
    $conn->set_charset("utf8mb4");

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
      }

    $sql = 'UPDATE users SET userdata = ? WHERE email= ?';   
    $email =$_SESSION["logMail"];
    
    
    $statement = $conn->prepare($sql);
    $statement->bind_param("ss",$data,$email);
    if($statement->execute()){
    echo "data succesfully saved";
    }
    mysqli_close($conn);

}

?>