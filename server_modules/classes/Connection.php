<?php

class Connection {
    public $connection;
    function __construct(){
        $this->connection =  mysqli_connect($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME']);
            if(!$this->connection){
                die('database connection error:' . mysqli_connect_error());
            }
    }
}

?>