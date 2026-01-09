<?php
include("./db.php");
include("./auth.php");

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");

$data = json_decode(file_get_contents("php://input"), true);
$userId = $_SESSION["user_id"];

// Verify password
$stmt = $con->prepare("SELECT password FROM customers WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!password_verify($data["currentPassword"], $user["password"])) {
    echo json_encode(["success" => false, "message" => "Incorrect password"]);
    exit;
}

// Delete account
$stmt = $con->prepare("DELETE FROM customers WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();

session_unset();
session_destroy();
setcookie("user_login", "", time() - 3600, "/");

echo json_encode(["success" => true]);
