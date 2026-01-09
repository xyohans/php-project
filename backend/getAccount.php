<?php
include("./db.php");
include("./auth.php");

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");

$userId = $_SESSION["user_id"];

$stmt = $con->prepare("
SELECT 
  firstName,
  lastName,
  idNumber,
  phone,
  dob,
  gender,
  address,
  city,
  region,
  email,
  rdate AS registrationDate
FROM customers WHERE id = ?
");

$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$user = $result->fetch_assoc();

echo json_encode([
    "success" => true,
    "user" => $user
]);
