<?php
echo "<br>Running test: jwt_verbose";
     if($jwt['iss'] === $_ENV['JWT_ISS']){
        echo "<br>ISS CHECK PASSED";
        $valid_iss = TRUE;
       } else {
        echo "<br>ISS CHECK FAILED";
        $valid_iss = FALSE;
       }
     
     if($jwt['exp'] > time()){
      $valid_exp = TRUE;
        echo "<br>EXP CHECK PASSED";
     } else {
      $valid_exp = FALSE;
        echo "<br> EXP CHECK FAILED";
     }

     if($jwt['account_id'] != ""){
      $valid_account_id = TRUE;
        echo "<BR>ACCOUNT_ID CHECK PASSED";
     } else {
      $valid_account_ID = FALSE;
        echo "<BR>ACCOUNT_ID CHECK FAILED";
     }

     if($valid_iss && $valid_iss && $valid_account_id){
      $passed_auth_checks = TRUE;
      echo "<BR>jwt_verbose: ALL CHECKS PASSED";
     }
?>