<?php
require("vendor/autoload.php");
//INITIALIZE ENVIRONMENT VARIABLES, THESE WILL BE USED THROUGHOUT THE SERVER APPLICATION.
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

// START AUTH
//STEP 1: CHECK WHETHER THE CLIENT CLAIMS TO BE AUTHENTICATED.
if (isset($_COOKIE['auth'])) {
    $auth_token = $_COOKIE['auth']; //APPLICATION CLAIMS TO BE AUTHENTICATED
} else {
    $auth_token = FALSE; //APPLICATION HAS NO CLAIM.
}

//STEP 2: PERFORM ACTIONS BASED ON THE CLIENT AUTH CLAIM.             
if ($auth_token) { //CLIENT MAKES A CLAIM WITH THIS TOKEN
    // Check the authenticity of the the JWT.
    try{
        $jwt = JWT::decode($auth_token, new Key($_ENV['JWT_KEY'], 'HS256')); //VERIFY THIS CLAIM HAS NOT BEEN TAMPERED WITH.     
        $jwt = (array) $jwt;
        $passed_auth_checks = FALSE; //test script will change this value if it passes. 
        require('server_modules/tests/jwt.php');
        // require("server_modules/tests/jwt_verbose.php");
        if ($passed_auth_checks) {
            $account_id = $jwt['account_id'];
            require("application.php"); //DO THIS WHEN CLAIM IS TRUE.
        } else {
            include("launcher.php");
            die();
        }
    }catch(ExpiredException $e){
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        unset($_COOKIE['auth']);
        include("launcher.php");
        die();
   }                    
   
   

} else { //CLIENT MAKES NO CLAIM.

    include("launcher.php"); //LOAD LAUNCHER->THE LAUNCHER SETS THE AUTH CLAIM.
    die();

}

//END AUTH.

  

















?>