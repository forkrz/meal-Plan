<?php

declare(strict_types=1);

use Firebase\JWT\JWT;

require_once "../php/classes/MealPlans.php";
require_once "../php/classes/Database.php";
require_once "../php/classes/Api.php";
$config = require '../php/config/dbconfig.php';
require_once("../php/classes/JWT.php");
header("Access-Control-Allow-Origin: http://mp.localhost");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$mealPlans = new Meals();
$database = new Database($config);
$mealPlans = new Meals();
$database = new Database($config);
$tokens = new JWTTokens($config);
$api = new Api($config);
$data = json_decode((file_get_contents("php://input")), true);
$jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Mzc3MDA4MjIsImV4cCI6MTYzNzcwODAyMiwiaXNzIjoibXAubG9jYWxob3N0IiwibG9naW4iOiJ0ZXN0MTEifQ._w8pC_s0KBz-jRoDUMJkg_LcV538a0F84nEpPnb02HM";
$decode = $tokens->decodeJwt($jwt);
print_r($decode);
// try {
//     $database->addMeals($mealPlans->generateMealPlan('day', '2500', 'Ketogenic'), $jwtDecode->login);
// } catch (Exception $e) {
//     echo $e->getMessage();
// }

try {
    ($api->sendGeneratedMealPlan('day', '2500', 'Ketogenic', $jwt));
} catch (Exception $e) {
    echo $e->getMessage();
}