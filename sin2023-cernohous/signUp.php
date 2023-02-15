<?php
$serverIP="127.0.0.1";
$username="root";
$dtbsPassword="";
$dtbsName="sin2023-cernohous"; 
$url = "http://127.0.0.1/cernohous/sin2023-cernohous/sin2023-cernohous/index.php"; //Změnit url adresu
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
        if(isset($_REQUEST["registraceEmail"]) and $_REQUEST["registraceEmail"] != ""){
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
                            die("Connection failed: " . mysqli_connect_error());
                        }   
                        
                        //set encoding
                        $conn->set_charset("utf8mb4");
                        $email =trim($_REQUEST["registraceEmail"]);
                        $username=trim($_REQUEST["registraceJmeno"]);
                        $password=trim($_REQUEST["registraceHeslo"]);
                        $password=password_hash($password, PASSWORD_DEFAULT);
                        $jsInfo ="{\"jmeno\":\"".$username."\",".file_get_contents("users-userdata.bin");
                        //$jsInfo="test";
                        $_SESSION["email"] = $email;

                        $sql = 'SELECT email FROM users WHERE email= ?';
                        $statement = $conn->prepare($sql);
                        if($statement){
                            $statement->bind_param("s",$email);
                            if($statement->execute()){
                                $result = $statement->get_result();
                            }
                            
                        
    
                        if (mysqli_num_rows($result) == 0) { 
                                                      
                            $sql = "INSERT INTO users (username,email, password, isAdmin, activationCode, activationExpiry, userdata) VALUES (?,?,?,?,?,\"".date('Y-m-d H:i:s',  time() + $expire)."\",?)";
                            $statement = $conn->prepare($sql);
                            $statement->bind_param("sssiss",$username,$email,$password,$isAdmin,$activationCode,$jsInfo);

                            if($statement->execute()){
                                $registrace = true;
                                $_SESSION["registrace"] = $registrace;
                                $pswHashed=password_hash($password,PASSWORD_DEFAULT);
                                $url=$url."?reg=1&email=".$_SESSION["email"]."&psw=".$pswHashed;
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

function sendEmail(string $email, string $activationCode):void
{
    $activation_link = APP_URL . "/email.php?email=$email&activationCode=$activationCode";
    $mail = new PHPMailer(true);
    try{
        //settings
        $mail->SMTPOptions = array(
            'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
            )
            );
        $mail->SMTPDebug=SMTP::DEBUG_SERVER; 
        $mail->isSMTP();
        $mail->Host       =  "smtp.gmail.com";
        $mail->SMTPAuth   = true;
        $mail->Username   = "bot867261.noreply@gmail.com";
        $mail->password   = "ryedvlsosdnatjvy";
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            
        $mail->Port       = 465;                                    
        
        //recipients
        $mail->setFrom("bot867261.noreply@gmail.com","BOT");
        $mail->addAddress($email);
        
        //content
        $mail->isHTML(true);
        $mail->Subject = "Activate your account";
        $mail->Body = <<<MESSAGE
                        Hi,
                        To activate your account, click the following link:
                        $activation_link
                        MESSAGE;
        print("email sent");
        $mail->send();
    }catch(Exception $e){
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
    


}




?>