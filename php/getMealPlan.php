<?php

declare(strict_types=1);
require_once "../php/classes/MealPlans.php";
require_once "../php/classes/Database.php";
$config = require '../php/config/dbconfig.php';
header("Access-Control-Allow-Origin: http://mp.localhost");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$mealPlans = new Meals();
$database = new Database($config);
// $response = file_get_contents($mealPlans->generateMealPlan("day", "2500", ""));
// file_put_contents("../temporary/test.json", $response);

// $json = file_get_contents("../temporary/test.json");
// $decode = json_decode($json, true);
// $database->addMeals($decode['meals'], 'test11');

print_r($database->getPaginatedRecords('test11'));