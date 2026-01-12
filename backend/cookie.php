<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");

echo json_encode([
    "email" => $_COOKIE['get_email'] ?? '',
    "password" => $_COOKIE['get_password'] ?? ''
]);