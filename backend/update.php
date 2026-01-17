<?php

include("./db.php");
// include("./auth.php");

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$data = json_decode(file_get_contents("php://input"), true);

$firstName = $data["first_name"];
$lastName = $data["last_name"];
$idNumber= $data["id_number"];
$phone = $data["phone"];
$dob = $data["dob"];
$gender = $data["gender"];
$address = $data["address"];
$city = $data["city"];
$region= $data["region"];

$email = $data["email"];
$password = $data["password"] ;


$q = "SELECT email, password FROM customers WHERE email = '$email'";
$up = "update customers set first_name='$firstName', last_name='$lastName' , phone='$phone', dob='$dob', gender='$gender' , address='$address' ,city='$city', region='$region' where email='$email'";
$result = mysqli_query($con, $q);

if(mysqli_num_rows($result)> 0){
    while($user = mysqli_fetch_assoc($result)){
        if( $user['email']==$email && password_verify($password ,$user['password'])){
            if(mysqli_query($con , $up)){
                echo json_encode([
                "status" => "success",
                "message" => "user updated"
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
