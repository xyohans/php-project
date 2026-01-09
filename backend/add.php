<?php
include ('./db.php');

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

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
    mysqli_query($con, $sql);

    
