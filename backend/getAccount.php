<?php
include("./db.php");


header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

$data = json_decode(file_get_contents("php://input"), true);

$email=$data['email'];

$q = "SELECT first_name, last_name, id_number, phone, dob, gender, address, city, region, email, created_at FROM customers WHERE email = '$email'";
$result = mysqli_query($con, $q);

if($result && mysqli_num_rows($result)> 0){
    $user = mysqli_fetch_assoc($result);
            echo json_encode([
            "status" => "success",
            "message" => "data fetched successful",
            "data"=>$user
        ]);
}
else{
    echo json_encode([
        "status" => "error",
        "message" => "user not found"
    ]);
}

