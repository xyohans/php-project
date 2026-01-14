<?php
session_start();
include "./db.php";

header("Access-Control-Allow-Origin: http://localhost:5173"); // React dev server
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type"); // ✅ allow content-type
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$payment_id = $data['payment_id'] ?? null;
$payment_method = $data['payment_method'] ?? null;

if (!$payment_id || !$payment_method) {
    echo json_encode(["status"=>"error","message"=>"Required fields missing"]);
    exit;
}

$customer_email = $_SESSION['email'] ?? $_COOKIE['get_email'] ?? null;
if (!$customer_email) {
    echo json_encode(["status"=>"error","message"=>"You must be logged in"]);
    exit;
}

// Verify payment belongs to this user
$check = mysqli_query($con, "SELECT * FROM payments WHERE id='$payment_id' AND customer_id='$customer_email'");
if (!$check || mysqli_num_rows($check) === 0) {
    echo json_encode(["status"=>"error","message"=>"Not authorized"]);
    exit;
}

// Update payment method
$update = mysqli_query($con, "UPDATE payments SET payment_method='$payment_method' WHERE id='$payment_id'");

echo json_encode([
    "status" => $update ? "success" : "error",
    "message" => $update ? "Payment method updated" : "Failed to update"
]);
