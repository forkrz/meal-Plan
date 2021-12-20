<?php

declare(strict_types=1);
require_once __DIR__ . "../../classes/MealPlans.php";
require_once __DIR__ . "../../classes/Database.php";
$config = require __DIR__ . '../../config/dbconfig.php';
require_once __DIR__ . "../../classes/Api.php";
header("Access-Control-Allow-Origin: http://mp.localhost");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$mealPlans = new Meals();
$database = new Database($config);
$api = new Api($config);
$data = json_decode((file_get_contents("php://input")), true);

$api->sendGeneratedMealPlan("week", '2500', 'vegeterian', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDAwMzI0NzEsImV4cCI6MTY0MDAzOTY3MSwiaXNzIjoibXAubG9jYWxob3N0IiwibG9naW4iOiJ0ZXN0MTEifQ.tskUNXJMiOorP7liGmUV6u2CaaJpSBjb6GqObIujKuM');

// try {
//     ($api->sendGeneratedMealPlan($data['TIMEFRAME'], $data['CALORIES'], $data['DIET'], $data["JWT"]));
// } catch (Exception $e) {
//     echo $e->getMessage();
// }