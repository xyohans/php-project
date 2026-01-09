<?php
include ('./db.php');

session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid data"]);
    exit;
}

/* ================= UPDATE ACCOUNT ================= */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

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

    if (!empty($data["password"])) {
        $password = password_hash($data["password"], PASSWORD_DEFAULT);
        $password_sql = ", password='$password'";
    } else {
        $password_sql = "";
    }

    $sql = "UPDATE customers SET
        first_name='$firstName',
        last_name='$lastName',
        phone='$phone',
        date_of_birth='$dob',
        gender='$gender',
        address='$address',
        city='$city',
        region='$region',
        email='$email'
        $password_sql
        WHERE id_number='$idNumber'";

    if (mysqli_query($con, $sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => mysqli_error($con)]);
    }
}
