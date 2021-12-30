<?php

declare(strict_types=1);

require_once("../classes/Api.php");
$config = require_once '../config/dbconfig.php';


header("Access-Control-Allow-Origin: http://mp.localhost");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$data = json_decode((file_get_contents("php://input")), true);
$api = new Api($config);
try {
    $api->getPaginatedRecords($data['JWT'], $data['minScope']);
} catch (Exception $e) {
    echo $e->getMessage();
}