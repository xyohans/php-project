<?php
include "./db.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$result = mysqli_query($con, "SELECT * FROM services");

$services = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $services[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "message" => "Services fetched successfully",
        "data" => $services
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "No services found",
        "data" => []
    ]);
}
