<?php
session_start();
session_unset();
session_destroy();
include("./db.php");

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");

if(isset($_SESSION['email'])){
    $email = $_SESSION['email'];

    // Check if the user still exists
    $q = "SELECT email FROM customers WHERE email='$email'";
    $result = mysqli_query($con, $q);

    if(mysqli_num_rows($result) > 0){
        echo json_encode([
            "loggedIn" => true,
            "email" => $email
        ]);
    } else {
        // User deleted, destroy session
        session_unset();
        session_destroy();
        if (isset($_COOKIE['PHPSESSID'])) {
            setcookie('PHPSESSID', '', time() - 3600, '/');
        }
        echo json_encode([
            "loggedIn" => false
        ]);
    }

} else {
    echo json_encode([
        "loggedIn" => false
    ]);
}
