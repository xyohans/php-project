<?php
include ('./db.php');
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"];
$password = $data["password"] ;


$q = "SELECT email, password FROM customers WHERE email = '$email'";
$result = mysqli_query($con, $q);

if(mysqli_num_rows($result)> 0){
    $user = mysqli_fetch_assoc($result);
        if( $user['email']==$email && password_verify($password ,$user['password'])){
            // $_SESSION['password'] = $user['password'];
            $_SESSION['email'] = $user['email'];
            
            setcookie("get_email","$email");
            setcookie("get_password","$password");
            
            echo json_encode([
                "status" => "success",
                "message" => "Login Successfull",
                "email" => $user['email']
        ]);
        }
        else {
            echo json_encode([
            "status" => "error",
            "message" => "Invalid email or password"
         ]);
        }
}
else{
    echo json_encode([
        "status" => "error",
        "message" => "user not found"
    ]);
}

