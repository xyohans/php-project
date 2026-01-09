<?php
include("./db.php");

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$data = json_decode(file_get_contents("php://input"), true);

// Basic validation
if (
    empty($data["email"]) ||
    empty($data["password"]) ||
    empty($data["firstName"])
) {
    echo json_encode([
        "success" => false,
        "message" => "Required fields are missing"
    ]);
    exit;
}

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
$rdate     = date("Y-m-d");

// Check if email already exists
$check = $con->prepare("SELECT email FROM customers WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email already registered"
    ]);
    exit;
}

// Insert user
$stmt = $con->prepare("
    INSERT INTO customers
    (firstName, lastName, idNumber, phone, dob, gender, address, city, region, email, password, rdate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssssssssss",
    $firstName,
    $lastName,
    $idNumber,
    $phone,
    $dob,
    $gender,
    $address,
    $city,
    $region,
    $email,
    $password,
    $rdate
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Registration successful"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Registration failed"
    ]);
}
