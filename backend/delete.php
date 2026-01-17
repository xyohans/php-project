<?php

include("./db.php");
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
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
$up = "delete from customers where email='$email'";
$result = mysqli_query($con, $q);

if(mysqli_num_rows($result)> 0){
    while($user = mysqli_fetch_assoc($result)){
        if( $user['email']==$email && password_verify($password ,$user['password'])){
            if(mysqli_query($con , $up)){
                
                session_unset();
                session_destroy();
                
                if (isset($_COOKIE['PHPSESSID'])) {
                setcookie('PHPSESSID', '', time() - 3600, '/');
                }

                echo json_encode([
                "status" => "success",
                "message" => "user deleted successful"
        ]);
            }
            
        }
        else {
            echo json_encode([
            "status" => "error",
            "message" => "Invalid email or password"
         ]);
        }
    }
    
}
else{
    echo json_encode([
        "status" => "error",
        "message" => "user not found"
    ]);
}
