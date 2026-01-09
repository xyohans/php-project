<?php
session_start();

// Session timeout (30 minutes)
$timeout = 1800;

if (isset($_SESSION["last_activity"]) && time() - $_SESSION["last_activity"] > $timeout) {
    session_unset();
    session_destroy();
    echo json_encode([
        "success" => false,
        "message" => "Session expired. Please login again."
    ]);
    exit;
}

$_SESSION["last_activity"] = time();

// Restore session from cookie
if (!isset($_SESSION["user_id"]) && isset($_COOKIE["user_login"])) {
    $_SESSION["user_id"] = $_COOKIE["user_login"];
}

if (!isset($_SESSION["user_id"])) {
    echo json_encode([
        "success" => false,
        "message" => "Not authenticated"
    ]);
    exit;
}
