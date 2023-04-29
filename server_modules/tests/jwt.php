<?php
$jwt_time =time();
$valid_iss        = ($jwt['iss'] === $_ENV['JWT_ISS'])? true:false;
$valid_exp        = ($jwt['exp'] > $jwt_time)?true:false;
$valid_account_id = ($jwt['account_id'] != "")?true:false;     
$passed_auth_checks = ($valid_iss &&$valid_exp &&$valid_account_id)?true:false;
?>