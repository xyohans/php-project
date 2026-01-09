<?php
include("./db.php");
include("./auth.php");

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");

$data = json_decode(file_get_contents("php://input"), true);
$userId = $_SESSION["user_id"];

// Verify current password
$stmt = $con->prepare("SELECT password FROM customers WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!password_verify($data["currentPassword"], $user["password"])) {
    echo json_encode(["success" => false, "message" => "Incorrect password"]);
    exit;
}

// Optional new password
$passwordSQL = "";
$params = [
    $data["firstName"],
    $data["lastName"],
    $data["phone"],
    $data["dob"],
    $data["gender"],
    $data["address"],
    $data["city"],
    $data["region"],
    $data["email"]
];

if (!empty($data["password"])) {
    $hashed = password_hash($data["password"], PASSWORD_DEFAULT);
    $passwordSQL = ", password=?";
    $params[] = $hashed;
}

$params[] = $userId;

// Build query
$sql = "
UPDATE customers SET
  firstName=?,
  lastName=?,
  phone=?,
  dob=?,
  gender=?,
  address=?,
  city=?,
  region=?,
  email=?
  $passwordSQL
WHERE id=?
";

$stmt = $con->prepare($sql);
$stmt->bind_param(str_repeat("s", count($params) - 1) . "i", ...$params);
$stmt->execute();

echo json_encode(["success" => true]);
