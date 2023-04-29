<?php
require('../../vendor/autoload.php');
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable('../../');
$dotenv->load();
require('../classes/API_AuthHandler.php');

//debug: echo "Hello world, this is the server speaking from register.php";

if (isset($_POST['register'])) {

    $connection = new API_AuthHandler();
    $status = $connection->checkAccount($_POST['account'], $_POST['email']);
    $response = [];

    //this block checks the input for a valid account name and email.
    // it returns a JSON file to the application by state (fail/succes) and response which is a
    // description of the result in text.
    if ($status['name_is_free'] === TRUE && $status['email_is_free'] === TRUE) {
        $email_and_name_are_available = TRUE;
    } else if ($status['name_is_free'] === TRUE && $status['email_is_free'] === FALSE) {
        $email_and_name_are_available = FALSE;
        $response['state'] = "error";
        $response['response'] = "<b>Cannot use this email adress.</b>";
        die(json_encode($response));
    } else if ($status['email_is_free'] === TRUE && $status['name_is_free'] === FALSE) {
        $email_and_name_are_available = FALSE;
        $response['state'] = "error";
        $response['response'] = "<b>Cannot use this account name.</b>";
        die(json_encode($response));
    } else {
        //DEBUG echo "<br> Name and email are already in use";
        $email_and_name_are_available = FALSE;
        $response['state'] = "error";
        $response['response'] = "<b>Cannot use this email adress or name.</b>";
        die(json_encode($response));
    }

    // this block only executes if the previous block confirms that the user input
    // is valid. 
    // If a non valid password is entered an error is returned to the application by JSON.
    // If a valid password is entered it hashes the password for use and creates a new
    // account in the accounts table.
    if ($email_and_name_are_available) {
    //     //check password
        $password_check = $connection->checkPassword($_POST['password']);
        if ($password_check['status'] === TRUE) {
            $password_hash = $connection->hashPassword($_POST['password']);
            $connection->createAccount($_POST['email'], $_POST['account'], $password_hash);
            $response["state"] = "OK";
            $response['response'] = "<b>Account created. You can now log in.</b>";
            echo json_encode($response);
        } else {
           $response['state'] = 'error';
           $response['response'] = "<b>Your password is too short.</b>";
           die(json_encode($response));
        }
    }
}
?>