<?php
include("./db.php");
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

if (empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required"
    ]);
    exit;
}

// Fetch user
$stmt = $con->prepare("SELECT * FROM customers WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email or password"
    ]);
    exit;
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user["password"])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email or password"
    ]);
    exit;
}

// SESSION (expires in 30 minutes)
session_regenerate_id(true);
$_SESSION["user_id"] = $user["id"];
$_SESSION["last_activity"] = time();

// COOKIE (remember login)
setcookie(
    "user_login",
    $user["id"],
    time() + (86400 * 7), // 7 days
    "/",
    "",
    false,
    true
);

echo json_encode([
    "success" => true,
    "message" => "Login successful"
]);
