<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;



class API_AuthHandler
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
        //   echo "<br>Connected successfully<br>";
    }

    function checkAccount($name, $email)
    {
        $stmt_check_name = $this->connection->prepare("SELECT * FROM accounts WHERE name = ?");
        $stmt_check_name->bind_param('s', $name);
        $stmt_check_name->execute();

        $result = $stmt_check_name->get_result();
        $stmt_check_name->close();

        if (!$result) {
            die(mysqli_error($this->conn));
        }
        if ($result->num_rows == '0') {
            $name_is_free = TRUE;
        } else {
            $name_is_free = FALSE;
        }

        $result = NULL;

        $stmt_check_email = $this->connection->prepare("SELECT * FROM accounts WHERE email = ?");
        $stmt_check_email->bind_param("s", $email);
        $stmt_check_email->execute();
        $result = $stmt_check_email->get_result();
        $stmt_check_email->close();

        //verify the entered email adress has a @ and . in it's string.
        $needle = "@";
        $needle2 = ".";
        $atExists = strpos($email, $needle);
        $dotExists = strpos($email, $needle2);

        if(!$atExists || !$dotExists){
            $response = ['state'=>'error', "response"=>'Enter a valid email'];
            die(json_encode($response));
        }

        if ($result->num_rows == '0') {
            $email_is_free = TRUE;
        } else {
            $email_is_free = FALSE;
        }

        $response = ["email_is_free" => $email_is_free, "name_is_free" => $name_is_free];
        return $response;
    }

    function checkPassword($password)
    {

        if (strlen($password) < 8) {
            $valid_password['status'] = FALSE;
            $valid_password['description'] = "Password is too short.";
            //debug: echo "<br>password is too short.";
            return $valid_password;
        } else {
            $valid_password['status'] = TRUE;
            //debug: echo "<br>valid password!";
            return $valid_password;
        }
    }

    function hashPassword($password)
    {
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        //debug: echo "<br>hash: $password_hash";
        return $password_hash;
    }

    function createAccount($email, $name, $password)
    {
        //debug:        echo "<br>createAccount function says hello world!";
        $confirmation_code = rand(1111, 9999);
        $data = '{"data":"data"}';
        $stmt = $this->connection->prepare("INSERT INTO accounts (email, name, password, confirmation_code, data) VALUES(?, ?, ?, ?, ?)");
        $stmt->bind_param("sssis", $email, $name, $password, $confirmation_code, $data);
        if ($stmt->execute()) {
            $stmt->close();
        } else {
            die(mysqli_error($this->connection));
        }
    }

    function loginUser($name, $password)
    {
        $stmt = $this->connection->prepare("SELECT * FROM accounts WHERE name = ? ");
        $stmt->bind_param("s", $name);
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $count = $result->num_rows;
            $account_data = $result->fetch_array(MYSQLI_ASSOC);

            if ($count == 0) {
                $response = ["state" => "error", "desc" => "<b>Wrong credentials</b>"];
                die(json_encode($response));

            } else {

                if (password_verify($password, $account_data['password'])) {
                    //login success... what to do now ehrmmm...

                    //start block add to login history
                    $login_stmt = $this->connection->prepare('INSERT INTO login_history (player_id, login_time, logout_time, login_data) VALUES(?,?,?,?)');
                    $id = $account_data['id'];
                    $login_time = time();
                    $logout_time = 0;
                    $login_data = json_encode(getallheaders());

                    $login_stmt->bind_param("iiis", $id, $login_time, $logout_time, $login_data);
                    $login_stmt->execute();
                    $login_stmt->close();
                    //end block

                    //build JWT
                    $key = $_ENV['JWT_KEY'];
                    $payload = [
                        'iss' => $_ENV['JWT_ISS'],
                        'iat' => time(),
                        'exp' => time()+60*60*12,
                        'account_id' => $account_data['id'],
                    ];
                    $jwt = JWT::encode($payload, $key, 'HS256');
                    

                    //start block building JSON response.
                    $response = [
                        "state" => "OK",
                        "desc" => "<b>You have logged in.</b>",
                        "authorizationToken"=> $jwt
                    ];
                    echo json_encode($response);
                    //end block

                } else {
                    $response = ['state'=>"error", "desc"=>"Invalid password"];
                    die(json_encode($response));
                }
            }


        } else {
            $response = ["state" => "error", "desc" => mysqli_error($this->connection)];
            die(json_encode($response));
        }

    }
}

?>