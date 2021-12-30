<?php

declare(strict_types=1);

$config = require __DIR__ . '../../config/dbconfig.php';
require_once __DIR__ . "../../classes/Api.php";

header("Access-Control-Allow-Origin: http://mp.localhost");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$api = new Api($config);
$data = json_decode((file_get_contents("php://input")), true);

try {
    ($api->sendGeneratedMealPlan($data['TIMEFRAME'], $data['CALORIES'], $data['DIET'], $data["JWT"]));
} catch (Exception $e) {
    echo $e->getMessage();
}