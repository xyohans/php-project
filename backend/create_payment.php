<?php
session_start();
include "./db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");


$customer_email = $_SESSION['email'] ?? ($_COOKIE['get_email'] ?? null);

if (!$customer_email) {
    echo json_encode([
        "status" => "error",
        "message" => "You must be logged in to pay"
    ]);
    exit;
}


$data = json_decode(file_get_contents("php://input"), true);

$service_id = $data['service_id'] ?? null;
$payment_method = $data['payment_method'] ?? null;

if (empty($service_id) || empty($payment_method)) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required fields"
    ]);
    exit;
}

// 🧾 3️⃣ VERIFY CUSTOMER EXISTS
$checkUser = mysqli_query(
    $con,
    "SELECT email FROM customers WHERE email='$customer_email'"
);

if (mysqli_num_rows($checkUser) === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Customer not found"
    ]);
    exit;
}

// 💰 4️⃣ GET SERVICE PRICE
$serviceQuery = mysqli_query(
    $con,
    "SELECT price FROM services WHERE id='$service_id'"
);

if (mysqli_num_rows($serviceQuery) === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Service not found"
    ]);
    exit;
}

$service = mysqli_fetch_assoc($serviceQuery);
$amount = $service['price'];

// 🧠 5️⃣ INSERT PAYMENT
$insert = mysqli_query(
    $con,
    "INSERT INTO payments
     (customer_id, service_id, amount, payment_method, payment_status, canceled_at)
     VALUES
     ('$customer_email', '$service_id', '$amount', '$payment_method', 'paid', NULL)"
);

if ($insert) {
    echo json_encode([
        "status" => "success",
        "message" => "Payment successful"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Payment failed"
    ]);
}
