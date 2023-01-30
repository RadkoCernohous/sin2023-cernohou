<?php 
$serverIP="127.0.0.1";
$username="root";
$dtbsPassword="";
$dtbsName="sin2023-cernohous";
 ?>
 <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/cssMain.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
<script
  src="https://code.jquery.com/jquery-3.6.1.js"
  integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI="
  crossorigin="anonymous"></script>
<title>Document</title>
</head>
<body>
<div class="body"> 

<?php 

session_start();
$correctDetails=true;
$dataImport=true;
$_SESSION["prihlaseno"]=false;

$message = "You entered nothing!";

if(isset($_REQUEST["id"]) and isset($_REQUEST["type"]) and isset($_REQUEST["language"]) and isset($_REQUEST["lesson"]) and isset($_REQUEST["name"])){
  $_SESSION["id"]=$_REQUEST["id"];
  $_SESSION["type"]=$_REQUEST["type"];
  $_SESSION["language"]=$_REQUEST["language"];
  $_SESSION["lesson"]=$_REQUEST["lesson"];
  $_SESSION["name"]=$_REQUEST["name"];
  if($_SESSION["type"]=="language"){
    $_SESSION["descr"]="User <b>".$_SESSION["name"]."</b> is sharing language <b>".$_SESSION["language"].".</b>"; 
  }
  else{
    $_SESSION["descr"]="User <b>".$_SESSION["name"]."</b> is sharing lesson <b>".$_SESSION["lesson"]."</b> from language <b>".$_SESSION["language"].".</b>"; 
  }



  mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
  $conn = mysqli_connect($serverIP, $username, $dtbsPassword, $dtbsName);

  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }

  $conn->set_charset("utf8mb4");
  $sql = "SELECT userdata FROM users WHERE id= ?"; 


  $statement = $conn->prepare($sql);
  $statement->bind_param("i",$_SESSION["id"]);
  if($statement->execute()){
    $result = $statement->get_result();
    if (mysqli_num_rows($result) > 0) {
      $_SESSION["data"]="";
      while($row = mysqli_fetch_array($result)) {
        $_SESSION["data"]=$_SESSION["data"].$row["userdata"];
      }
      $_SESSION["data"]=str_replace("\"","'",$_SESSION["data"]);
    }
    else{
      $message="Invalid link!";
      $dataImport=false;
    }
  }
}
else{
  $message="Invalid link!";
  $dataImport=false;
}
//print($_SESSION["data"]);

if(isset($_REQUEST["prihlasitSe"]) and isset($_REQUEST["prihlaseniEmail"]) and isset($_REQUEST["prihlaseniHeslo"])){
 if($_REQUEST["prihlaseniEmail"]!=="" and $_REQUEST["prihlaseniHeslo"]!==""){

  $_SESSION["email2"]=trim($_REQUEST["prihlaseniEmail"]);
  $_SESSION["heslo2"]=trim($_REQUEST["prihlaseniHeslo"]);

  mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
  $conn = mysqli_connect($serverIP, $username, $dtbsPassword, $dtbsName);
  
  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }
  
  $conn->set_charset("utf8mb4");
  $sql = "SELECT userdata,active FROM users WHERE email= ? and password= ?";
  $statement = $conn->prepare($sql);
  $statement->bind_param("ss",$_SESSION["email2"],$_SESSION["heslo2"]);
  if($statement->execute()){
    $result = $statement->get_result();
    if (mysqli_num_rows($result) > 0) {
      $_SESSION["active2"]="";
      $_SESSION["data2"]="";
      while($row = mysqli_fetch_array($result)) {
        $_SESSION["active2"]=$_SESSION["data2"].$row["active"];
        $_SESSION["data2"]=$_SESSION["data2"].$row["userdata"];
      }
      if($_SESSION["active2"]==0){
        $_SESSION["prihlaseno"]=false;
        $message="Account not activated!";
      }
      else{
        $_SESSION["prihlaseno"]=true;
        $_SESSION["data2"]=str_replace("\"","'",$_SESSION["data2"]);
        //print($_SESSION["data2"]);
      }
    }
    else{
      $_SESSION["prihlaseno"]=false;
      $correctDetails=false;
      $message="Incorrect credentials!";
    }
  }
  mysqli_close($conn);
 }
}


?>


<header>
  <h1 class="h1UvodniStrana">Langlet - Vocabulary share</h1>
<form autocomplete="off">
  <input  hidden id="schovanyKontejner" name="schovanyKontejner" <?php if(isset($_SESSION["data"])){print("value=\"".$_SESSION["data"]."\"");} ?> >
  <input hidden id="schovanyKontejner2" name="schovanyKontejner2" <?php if($_SESSION["prihlaseno"]===true){print("value=\"".$_SESSION["data2"]."\"");} ?> >
  <input  hidden id="schovanyKontejner3" name="schovanyKontejner3" <?php if(isset($_SESSION["type"])){print("value=\"".$_SESSION["type"]."\"");} ?> >
  <input  hidden id="schovanyKontejner4" name="schovanyKontejner4" <?php if(isset($_SESSION["language"])){print("value=\"".$_SESSION["language"]."\"");} ?> >
  <input  hidden id="schovanyKontejner5" name="schovanyKontejner5" <?php if(isset($_SESSION["lesson"])){print("value=\"".$_SESSION["lesson"]."\"");} ?> >
</form>
<form action="shareUpdatedtbs.php" method="post" autocomplete="off">
<input  hidden id="schovanyKontejner6" name="schovanyKontejner6"  >
<input hidden type="submit" class="hlavniStranabtn" id="update" value="update" name="update">
</form>  
</header>
<main>
  <div  class="hlavniStrana ">
    <p class="popisStranky"><?php if (isset($_SESSION["descr"])){print($_SESSION["descr"]);} ?> To import this data to Your database, fill-in your credentials in the form below. After a successfull import, you will be redirected to your Langlet account.</p>
    <form autocomplete="off" action="<?php echo basename($_SERVER["PHP_SELF"]) ?>" class="prihlaseni" method="post">
      <h2>Fill-in Your credentials</h2>
      <label for="email">E-mail</label>
      <br>
      <input type="email" id="prihlaseniEmail" name="prihlaseniEmail" class="hlavniStranaInput" autocomplete="off">
      <br>
      <label for="prihlaseniHeslo">Password</label>
      <br>
      <input type="password" class="hlavniStranaInput" id="prihlaseniHeslo" name="prihlaseniHeslo" autocomplete="off">
      <br>
      <input type="submit" class="hlavniStranabtn" id="prihlasitSe" name="prihlasitSe" value="Import to my vocabulary" autocomplete="off">
      <p hidden class="cervene" id="errorKontejner"></p>
      <?php if($correctDetails===false or $dataImport===false){echo("<p class=\"cervene\">".$message."</p>");} ?>
    </form>
  </div>
</main>
<footer class="sdilet">
  <p>Radko Černohous, 2023</p>
</footer>
<script type="module" src="js/share.js"></script>
</body>
</html>