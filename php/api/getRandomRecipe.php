<?php

declare(strict_types=1);
require_once "../classes/MealPlans.php";
require_once "../classes/Database.php";
require_once("../classes/Api.php");
$config = require '../config/dbconfig.php';
header("Access-Control-Allow-Origin: http://mp.localhost");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$mealPlans = new Meals();
$database = new Database($config);
$api = new Api($config);
$data = json_decode((file_get_contents("php://input")), true);

try {
    ($api->sendRandomRecipes($data));
} catch (Exception $e) {
    echo $e->getMessage();
}