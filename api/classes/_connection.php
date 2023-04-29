<?php
class Connection
{
    public $connection;
    public $conn;
    // Create connection
    function __construct()
    {
        $servername = $_ENV['DB_HOST'];
        $username = $_ENV['DB_USER'];
        $password = $_ENV['DB_PASSWORD'];
        $db = $_ENV['DB_NAME'];
        $this->connection = new mysqli($servername, $username, $password, $db);
        $this->conn = $this->connection;

        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
        
    }
}

?>