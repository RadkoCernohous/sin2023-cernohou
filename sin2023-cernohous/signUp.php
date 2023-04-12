<?php
  require "utilities.php";
$url = $linkIndex; 

session_start();

$registrace = false;
$_SESSION["registrace"] = $registrace;
$expire = 1 * 24  * 60 * 60;
$isAdmin = (int)false;
$active=1;

function generateCode()
{
    return bin2hex(random_bytes(16));
}

$activationCode = generateCode();

$_SESSION["code"] = $activationCode;
if (isset($_REQUEST["registrovat"])){
    if(isset($_REQUEST["registraceJmeno"]) and $_REQUEST["registraceJmeno"] != ""){
        $_SESSION["username"]=$_REQUEST["registraceJmeno"];
        if(isset($_REQUEST["registraceEmail"]) and $_REQUEST["registraceEmail"] != ""){
            $_SESSION["email"] = $_REQUEST["registraceEmail"];
            if(isset($_REQUEST["registraceHeslo"])and $_REQUEST["registraceHeslo"] != ""){
                if(isset($_REQUEST["registraceHesloPotrvdit"])and $_REQUEST["registraceHesloPotrvdit"] != ""){
                    $pswd = $_REQUEST["registraceHeslo"];
                    $confirmPswd = $_REQUEST["registraceHesloPotrvdit"];
                    if(strcmp($pswd,$confirmPswd)==0){
    
                    
                        // Create connection
                        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
                        $conn = mysqli_connect($serverIP, $username, $dtbsPassword, $dtbsName);
                        // Check connection
                        if (!$conn) {
                            echo "Unable to connect to the database. Please try again later.";
                            error_log("Database connection failed: " . mysqli_connect_error());
                        }   
                        
                        //set encoding
                        $conn->set_charset("utf8mb4");
                        $email =trim($_REQUEST["registraceEmail"]);
                        $username=trim($_REQUEST["registraceJmeno"]);
                        $password=trim($_REQUEST["registraceHeslo"]);
                        $password=password_hash($password, PASSWORD_DEFAULT);
                        $jsInfo ="{\"jmeno\":\"".$username."\",".file_get_contents("users-userdata.bin");
                        //$jsInfo="test";
                        $_SESSION["logmail"] = $email;
                                           

                        $sql = 'SELECT email FROM '.$tableName.' WHERE email= ?';
                        $statement = $conn->prepare($sql);
                        if($statement){
                            $statement->bind_param("s",$email);
                            if($statement->execute()){
                                $result = $statement->get_result();
                            }
                            
                        
    
                        if (mysqli_num_rows($result) == 0) { 
                                                      
                            $sql = "INSERT INTO ".$tableName." (username,email, password, isAdmin, activationCode, activationExpiry, userdata) VALUES (?,?,?,?,?,\"".date('Y-m-d H:i:s',  time() + $expire)."\",?)";
                            $statement = $conn->prepare($sql);
                            $statement->bind_param("sssiss",$username,$email,$password,$isAdmin,$activationCode,$jsInfo);

                            if($statement->execute()){
                                $registrace = true;
                                $_SESSION["registrace"] = $registrace;
                                $url=$url."?reg=1&email=".$_SESSION["logmail"]."&psw=".$password;
                                header("Location:".$url);
                                          
                            }
                         } else { 
                            
                            $registrace = false;
                            $_SESSION["message"] = "An account with this email already exists!";
                            header("Location: ".$url);
                            
                         }  
                        }
                        
    
                    }else{
                        $registrace = false;
                        $_SESSION["message"] = "Password was confirmed incorrectly!";
                        header("Location: ".$url); 
                        
                    }
                }
                else{
                    $registrace = false;
                    $_SESSION["message"] = "You did not confirm the password!";
                    header("Location: ".$url); 
                    
                }
            }else{
                $registrace = false;
                $_SESSION["message"] = "You did not enter a password!";
                header("Location: ".$url); 
                
            }
        }else{
            $registrace = false;
            $_SESSION["message"] = "You did not enter an email!";
            header("Location: ".$url); 
            
        }
    }else{
        $registrace = false;
        $_SESSION["message"] = "You did not enter a username!";
        header("Location: ".$url); 
        
    }

}

?>