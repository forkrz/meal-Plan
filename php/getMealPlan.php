<?php

declare(strict_types=1);
require_once "../php/classes/MealPlans.php";

header("Access-Control-Allow-Origin: http://mp.localhost");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$mealPlans = new Meals();
$response = file_get_contents($mealPlans->getRandomRecipe("50", "vegetarian,dessert"));
var_dump($response);