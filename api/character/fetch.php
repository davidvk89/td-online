<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require('../../vendor/autoload.php');

use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable('../../');
$dotenv->load();

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

//THIS IS A PROTECTED ROUTE.. CHECK THE AUTHORIZATION BEFORE LOADING
require("../classes/_connection.php");
require("../classes/CharacterHandler.php");

$token = $_GET['token'];

try{
        $jwt = JWT::decode($token, new Key($_ENV['JWT_KEY'], 'HS256'));
        $api = new CharacterHandler(15);
        $api->return_game_file_character_slots($jwt->account_id);  
      
      
}catch(ExpiredException $e){
        $response = ['desc'=> "Token expired."];
        die(json_encode($response)); 
}



?>