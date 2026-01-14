<?php
session_start();
include "./db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");

// get logged in email
$customer_email = $_SESSION['email'] ?? null;

if (!$customer_email) {
    echo json_encode([
        "status" => "error",
        "message" => "You must be logged in"
    ]);
    exit;
}

// fetch user's services
$q = "
SELECT p.id AS payment_id, s.service_name, s.description, p.amount, p.payment_method, p.payment_status, p.canceled_at
FROM payments p
JOIN services s ON p.service_id = s.id
WHERE p.customer_id = '$customer_email'
ORDER BY p.created_at DESC
";

$result = mysqli_query($con, $q);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Database error"
    ]);
    exit;
}

$services = [];
while ($row = mysqli_fetch_assoc($result)) {
    $services[] = $row;
}

echo json_encode([
    "status" => "success",
    "data" => $services
]);
