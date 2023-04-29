<?php
require('../../vendor/autoload.php');
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable('../../');
$dotenv->load();

require("../classes/API_AuthHandler.php");
$loginAPI = new API_AuthHandler();

if(isset($_POST['login'])){
    $loginAPI->loginUser($_POST['account'], $_POST['password']);
}

?>