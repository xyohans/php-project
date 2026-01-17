<?php
include ('./db.php');

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data= json_decode(file_get_contents("php://input"), true);
    $firstName = $data["firstName"];
    $lastName  = $data["lastName"];
    $idNumber  = $data["idNumber"];
    $phone     = $data["phone"];
    $dob       = $data["dob"];
    $gender    = $data["gender"];
    $address   = $data["address"];
    $city      = $data["city"];
    $region    = $data["region"];
    $email     = $data["email"];
    $password  = password_hash($data["password"], PASSWORD_DEFAULT);
    $rdate     = date('Y/M');

$sql = "INSERT INTO customers  VALUES  ('$firstName','$lastName','$idNumber','$phone','$dob','$gender','$address','$city','$region','$email','$password','$rdate')";
if (mysqli_query($con, $sql)) {
    echo json_encode([
        "status" => "success",
        "message" => "Customer registered successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to register customer"
    ]);
}