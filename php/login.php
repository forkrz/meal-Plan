<?php

declare(strict_types=1);
require_once("../php/classes/Database.php");
require_once("../php/classes/Verification.php");
require_once("../php/classes/Api.php");
$config = require_once './config/dbconfig.php';
require_once './config/tokenConfig.php';

header("Access-Control-Allow-Origin: http://mp.localhost");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$db = new Database($config);
$verification = new Verification($config);
$data = json_decode(file_get_contents("php://input"));
$api = new Api($config);
try {
    $api->loginDataSender($data['login'], $data['password']);
} catch (Exception $e) {
    echo $e->getMessage();
}