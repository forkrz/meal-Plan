<?php

declare(strict_types=1);
require_once("../classes/Api.php");
$config = require_once '../config/dbconfig.php';
require_once '../config/tokenConfig.php';

header("Access-Control-Allow-Origin: http://mp.localhost");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$db = new Database($config);
$data = json_decode((file_get_contents("php://input")), true);
$api = new Api($config);

try {
    $api->getDataForSingleRandomMeal($data['JWT'], $data['mealID']);
} catch (Exception $e) {
    echo $e->getMessage();
}