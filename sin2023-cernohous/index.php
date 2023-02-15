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
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
  rel="stylesheet">
<link
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  rel="stylesheet">
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.1.0/mdb.min.css"
  rel="stylesheet">
  <script
  type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.1.0/mdb.min.js"
></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<title>Document</title>
</head>
<body>
<div class="body"> 

<?php 

session_start();
$correctDetails=true;
$prihlaseno=false;
$data="";
$loginMessage = "Invalid credentials!";
$registrace = true;


if(isset($_SESSION["registrace"])){
  $registrace = $_SESSION["registrace"];
}

$message = "You entered nothing!";
if(isset($_SESSION["message"])){
  $message = $_SESSION["message"];
}

if(isset($_REQUEST["reg"]) and isset($_REQUEST["email"]) and isset($_REQUEST["psw"]) and $prihlaseno==false){
  $email=$_REQUEST["email"];
  $password=$_REQUEST["psw"];

  mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
  $conn = mysqli_connect($serverIP, $username, $dtbsPassword, $dtbsName);

  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }

  $conn->set_charset("utf8mb4");
  $sql = "SELECT id,userdata,password  FROM users WHERE email= ?";
  $statement=$conn->prepare($sql);

  if($statement){
    $statement->bind_param("s",$email);
    $_SESSION["logMail"] = $email;
    
    if($statement->execute()){
      $result = $statement->get_result();
      if (mysqli_num_rows($result) > 0) {
        $data="";
        $id="";
        $passwordDtbs="";
        while($row = mysqli_fetch_array($result)) {
          $data=$data.$row["userdata"];
          $id=$id.$row["id"];
          $passwordDtbs=$passwordDtbs.$row["password"];
        }
        if(password_verify($passwordDtbs, $password)){
          $prihlaseno=true;
        }
        $data=str_replace("\"","'",$data);
      }
    }
    mysqli_close($conn);
  }
}

if($prihlaseno==false){
if (isset($_REQUEST["prihlasitSe"])){
  if(isset($_REQUEST["prihlaseniEmail"])){
    if(isset($_REQUEST["prihlaseniHeslo"])){
      $email=trim($_REQUEST["prihlaseniEmail"]);
      $password=trim($_REQUEST["prihlaseniHeslo"]);
        
      // Create connection
      mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
      $conn = mysqli_connect($serverIP, $username, $dtbsPassword, $dtbsName);

      // Check connection
      if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
      }

      //set encoding to utf8
        $conn->set_charset("utf8mb4");
        
        //prepare and execute sql 
        $sql = "SELECT id,userdata,active,password FROM users WHERE email= ?";
        $statement=$conn->prepare($sql);
        if($statement){
          $statement->bind_param("s",$email);
          $_SESSION["logMail"] = $email;

          if($statement->execute()){
            $result = $statement->get_result();
            if(mysqli_num_rows($result)>0){
              $data="";
              $id="";
              $isActive="";
              $passwordDtbs="";
              while($row = mysqli_fetch_array($result)) {
                $data=$data.$row["userdata"];
                $id=$id.$row["id"];
                $isActive = $row["active"];
                $passwordDtbs=$passwordDtbs.$row["password"];
              }
              if($isActive == 0){
                $loginMessage = "Account is not activated!";
                $correctDetails = false;
              }
              elseif(password_verify($passwordDtbs, $password)){
                  $correctDetails = false;
                }
              else{
                $prihlaseno=true;
                $data=str_replace("\"","'",$data);
              }
            }
            else{
              $correctDetails=false;
            }
          }
          mysqli_close($conn);
        }  
    }
  }
}
}
?>









<header>
  <p <?php if($prihlaseno===false){print("hidden");} ?> class="jmeno ">Name</p>
  <h1 <?php if($prihlaseno===false){print("class=\"h1UvodniStrana\"");} ?>>Langlet</h1>
  <form <?php if($prihlaseno===false){print("hidden");} ?> class="odhlasit" id="formOdhlasit" action="logout.php" method="post">
  <input  hidden id="schovanyKontejner" name="schovanyKontejner" <?php if($prihlaseno===true){print("value=\"".$data."\"");} ?> >
  <input hidden id="schovanyKontejner2" name="schovanyKontejner2" <?php if($prihlaseno===true){print("value=\"".$id."\"");} ?> >
 <input  type="submit" class="hlavniStranabtn" id="logout" value="Log-out" name="logout">
</form>
  
</header>
<main>
  <div <?php if($prihlaseno===true){print("hidden");} ?> class="hlavniStrana ">
    <p class="popisStranky">Welcome to Langlet, your vocabulary learning helper. Langlet helps you to organize, practise,test and also share the vocabulary with friends. Let's get started now, by Loggin-in or Signing-up.</p>
    <form action="<?php echo basename($_SERVER["PHP_SELF"]) ?>" class="prihlaseni" method="post">
      <h2>Log-in</h2>
      <label for="prihlaseniEmail">E.mail</label>
      <br>
      <input type="email" id="prihlaseniEmail" name="prihlaseniEmail" class="hlavniStranaInput" required>
      <br>
      <label for="prihlaseniHeslo">Password</label>
      <br>
      <input type="password" class="hlavniStranaInput" id="prihlaseniHeslo" name="prihlaseniHeslo" required>
      <br>
      <input type="submit" class="hlavniStranabtn" id="prihlasitSe" name="prihlasitSe" value="Log-in">
      <?php if($correctDetails===false){echo("<p class=\"cervene\">".$loginMessage."</p>");} ?>
    </form>


    <form action="signUp.php" class="registrace " method="post">
      <h2>Sign-up</h2>
      <label for="registraceJmeno">Username</label>
      <br>
      <input type="text" class="hlavniStranaInput" id="registraceJmeno" name="registraceJmeno">
      <br>
      <label for="registraceEmail">E-mail</label>
      <br>
      <input type="email" id="registraceEmail" name="registraceEmail" class="hlavniStranaInput">
      <br>
      <label for="registraceHeslo">Password</label>
      <br>
      <input type="password" class="hlavniStranaInput" id="registraceHeslo" name="registraceHeslo">
      <br>
      <label for="registraceHesloPotrvdit">Confirm password</label>
      <br>
      <input type="password" class="hlavniStranaInput" id="registraceHesloPotrvdit"
          name="registraceHesloPotrvdit">
      <br>
      
      <input type="submit" class="hlavniStranabtn" id="registrovat" value="Sign-up" name="registrovat">
      <?php if($registrace===false){echo("<p class=\"cervene\">".$message."</p>");} ?>
    
    </form>
  </div>








  
  <div <?php if($prihlaseno===false){print("hidden");} ?> class="druhaStrana ">
    
    <form class="vybratJazyk">
      <label for="vybratJazyk" class="nadpisVybratJazyk">Language:</label>
      <select class="selectLekciJazyku" name="vybratJazyk" id="vybratJazyk">
        <option value="jazyk" selected disabled hidden>Choose language</option>
      </select>
    </form>
    <form class="vybratLekci ">
      <label for="vybratLekci" class="nadpisVybratLekci">Lesson:</label>
      <select class="selectLekciJazyku" name="vybratLekci" id="vybratLekci">
        <option value="lekce" selected disabled hidden>Choose lesson</option>
      </select>
    </form>

    <p class="soucasnyMod">Practise mode</p>

    <form class="formPreklad1" autocomplete="off">
      <p class="popis" id="popis1"></p>
      <p class="slovoJazyk1 slovo">Exercise 1</p>
      <input type="text" spellcheck="false" class="druhaStranaInput" name="preklad1" id="preklad1">
      <button class="druhaStranabtn" id="btnPreklad1">&#8594;</button>
    </form>
    <form class="formPreklad2" autocomplete="off">
    <p class="popis" id="popis2"></p>
      <p class="slovoJazyk2 slovo">Exercise 2</p>
      <input type="text" spellcheck="false" class="druhaStranaInput" name="preklad2" id="preklad2">
      <button class="druhaStranabtn" id="btnPreklad2">&#8594;</button>
    </form>
    <form class="formVyberZe3">
    <p class="popis" id="popis3"></p>
      <p class="vyberZe3 slovo">Exercise 3</p>
      <div class="vyberZe3Kontejner">
        <div class="vyberZe3Radek vyberZe3RadekSpatne"><a href="#">Option 1</a></div>
        <div class="vyberZe3Radek"><a href="#">Option 2</a></div>
        <div class="vyberZe3Radek"><a href="#">Option 3</a></div>
      </div>
    </form>
    <form class="formSibenice" autocomplete="off">
    <p class="popis" id="popis4"></p>
      <p class="sibenice slovo">Exercise 4</p>
      <input type="text" spellcheck="false" class="druhaStranaInput" maxlength="1" id="sibenice">
      <button class="druhaStranabtn" id="btnSibenice">&#8594;</button>
    </form>


    <form class="nastaveniTestu " id="nastaveniTestu">
      <h2 class="nastaveniTestuNadpis">Test mode</h2>
      <div id="nastaveniTestuKontejner">
      <label for="vybratPocetOtazek" class=" labelVybratPocetOtazek">Number of words in test:</label> <br>
      <input type="number" min="1" max="100" id="vybratPocetOtazek" class="vybratPocetOtazek" value="5"> <br>
      <button class="hlavniStranabtn" id="startTest">Start test</button>
      </div>
    </form>

    <form class="nastaveniTestu schovane" id="nastaveniTestuProbiha">
      <h2 class="nastaveniTestuNadpis">Test mode</h2>
      <div id="nastaveniTestuProbihaKontejner">
      <p>Test is <b>undergoing</b></p>
      <p>Currently testing</p>
      </div>
      <div class="btnUprostred">
      <button class="hlavniStranabtn" id="stopTest">Stop test</button>
      </div>
    </form>

    <section class="prehled">
      <h2 class="prehledNadpis">Vocabulary overview</h2>
      <input type="checkbox" id="odstranit" name="odstranit" value="odstranitPotvrdit">
      <label for="odstranit">Delete on right-click</label><br>
      <p class="prehledPopis" id="prehledPopis"></p>
      <button class="prehledZpet">&#8592; Go back</button>
      <div class="prehledKontejner">
        <div class="prehledRadek schovane "><a href="#">Language</a></div>
        <div class="prehledRadek schovane"><a href="#">Language</a></div>
        <div class="prehledRadek schovane"><a href="#">Language</a></div>
      </div>
    </section>

    <form class="vysledkyTestu" autocomplete="off">
      <h2 class="nastaveniTestuNadpis">Tests results</h2>
      <div class="filtorvaniVysledku">
      <label class="popisvysledkyTestuFilter" for="vysledkyTestuFilter">Filter test results</label>
      <br>
      <input type="text" spellcheck="false" class="hlavniStranaInput" id="vysledkyTestuFilter" name="vysledkyTestuFilter" placeholder="Language or Lesson you want to show">
      </div>
      <div class="vysledkyTestuKontejner">
        <div class="vysledkyTestuRadek">
          <div class="datumTestu vysledkyTestuRadekElement"><a href=" #!">Date</a></div>
          <div class="jazykTestu vysledkyTestuRadekElement"><a href=" #!">Language</a></div>
          <div class="lekceTestu vysledkyTestuRadekElement"><a href=" #!">Lesson</a></div>
          <div class="hodnoceniTestu vysledkyTestuRadekElement"><a href=" #!">Score</a></div>
        </div>
       </div>
       <div class="smazaniTestu">
       <label for="smazaniTestu" >Select how many old test results do you want to delete:</label> <br>
       <div class="inputRange">
       <input type="range"  name="inputsmazaniTestu" id="inputSmazaniTestu"> <br>
       </div> 
       </div>
       <button class="hlavniStranabtn" id="btnsmazatTest">Delete old test results</button>
    </form>

    <form class="pridaniJazyka" autocomplete="off">
      <h2>Add Language</h2>
      <label for="pridanyJazyk">New Language</label>
      <br>
      <input type="text" spellcheck="false" class="hlavniStranaInput" id="pridanyJazyk" name="pridanyJazyk">
      <br>
      <button class="hlavniStranabtn" id="btnPridatJazyk">Add</button>
    </form>
    <form class="pridaniLekce ">
      <h2>Add Lesson</h2>
      <label for="pridaniLekcevybratJazyk">Language</label>
      <br>
      <select class="selectLekciJazyku" name="pridaniLekcevybratJazyk" id="pridaniLekcevybratJazyk">
        <option value="jazyk" selected disabled hidden>Choose language</option>
      </select>
      <br>
      <label for="pridanaLekce">New lesson</label>
      <br>
      <input type="text" spellcheck="false" class="hlavniStranaInput" id="pridanaLekce" name="pridanaLekce">
      <br>
      <button class="hlavniStranabtn" id="btnPridatLekci">Add</button>
    </form>
    <form class="pridaniSlova ">
      <h2>Add Word</h2>
      <label for="pridaniSlovavybratJazyk">Language</label>
      <br>
      <select class="selectLekciJazyku" name="pridaniSlovavybratJazyk" id="pridaniSlovavybratJazyk">
        <option value="jazyk" selected disabled hidden>Choose language</option>
      </select>
      <br>
      <label for="pridaniSlovavybratLekci">Lesson</label>
      <br>
      <select class="selectLekciJazyku" name="pridaniSlovavybratLekci" id="pridaniSlovavybratLekci">
        <option value="lekce" selected disabled hidden>Choose lesson</option>
      </select>
      <br>
      <label for="pridaneSlovo">New Word</label>
      <br>
      <input type="text" spellcheck="false" class="hlavniStranaInput" id="pridaneSlovo" name="pridaneSlovo">
      <br>
      <label for="pridaneSlovoPreklad">New Word Translated<br>(Multiple translations seperate by comma)</label>
      <br>
      <input type="text" spellcheck="false" class="hlavniStranaInput" id="pridaneSlovoPreklad" name="pridaneSlovoPreklad">
      <br>
      <button class="hlavniStranabtn" id="btnPridatSlova">Add</button>
    </form>
    <form class="sdileni">
    <h2>Share your data</h2>
    <p class="vyberSdileni">You want to share:</p>
    <input class="form-check-input" type="radio" id="sdileniTypJazyk" name="typSdileni" value="jazyk" checked>
    <label class="form-check-label" for="sdileniTypJazyk">Language</label><br>
    <input class="typSdileniLekce form-check-input" type="radio" id="sdileniTypLekce" name="typSdileni" value="lekce" >
    <label class="form-check-label" for="sdileniTypLekce">Lesson</label><br> 
    <label for="sdileniJazyk">Language</label>
      <br>
      <select class="selectLekciJazyku" name="sdileniJazyk" id="sdileniJazyk">
        <option value="jazyk" selected disabled hidden>Choose language</option>
      </select>
      <br>
      <label for="sdileniLekce">Lesson</label>
      <br>
      <select disabled class="selectLekciJazyku" name="sdileniLekce" id="sdileniLekce">
        <option value="lekce" selected disabled hidden>Choose lesson</option>
      </select>
      <br>
      <button class="hlavniStranabtn" id="btnVytvoritLink">Generate link</button>
      <p id="sdileniLink"></p>
      <button hidden class="kopirovatbtn" id="kopirovatLink">Copy the link</button>
    </form>
    <p id="odpocetLogout">You will be logged out in:</p>
    <form hidden id="aktualizovatDtbs" method="post" class="ukazatManual">
    <input id="schovanyKontejner3" name="schovanyKontejner3" <?php if($prihlaseno===true){print("value=\"".$data."\"");} ?> >
    <input type="submit" class="hlavniStranabtn"  id="updateDtbs" value="Update Vocabulary">
    </form>
    <form class="ukazatManual">
    <button class="hlavniStranabtn" id="btnUkazatManual">Show User manual</button>
    </form>
  </div>

  <div id="modalInfo" class="modalInfo">
    <div class="modalInfoObsah" id="modalInfoObsah">
    <span class="zavritInfoModal" id="zavritInfoModal">&times;</span>
    <h2 class="modalInfoNadpis" id="modalInfoNadpis">Tutorial</h2>
    <div class="modalInfoKontejner">
    <img id="modalImage" src="tutorial1.png" alt="tutorial" style="width: 85%; height: auto;">
    <button class="hlavniStranabtn" style="float: right; width: 15%; padding-right:1%; font-size:2rem; text-decoration:none;"><span id="tutorialCislo">1/7</span><br><u id="tutorialNext">Next</u></button>
    <div style="clear: both;"></div>
      </div>
    <div id="zobrazitZnova"></div>
    </div>

  </div>

  <div id="modalVysledky" class="modalVysledky">
    <div class="modalObsah" id="modalObsah">
    <span class="zavritModal" id="zavritModal">&times;</span>
    <h2 class="modalVysledkyNadpis" id="modalVysledkyNadpis">Test results</h2>
    <p class="modalVysledkyText" id="modalVysledkyText"></p>
    </div>
  </div>

</main>
<footer>
  <p>Radko Černohous, 2023</p>
</footer>
</div>
<?php
if($prihlaseno===true){
?>
<script src="js/lodash.js"></script>
<script type="module" src="js/scriptMain.js"></script>
<?php
}
?>
</body>
</html>