<?php

declare(strict_types=1);
require_once("Database.php");
require_once("Verification.php");
require_once("MealPlans.php");
require_once("JWT.php");
class Api
{
    function __construct(array $config)
    {
        $this->db = new Database($config);
        $this->ver = new Verification($config);
        $this->JWT = new JWTTokens($config);
        $this->meals = new Meals();
    }

    public function sendLoginData(string $login, $password)
    {
        if ($this->ver->loginDataCheck($login, $password)) {

            $jwt = $this->JWT->generateToken($login);
            http_response_code(200);
            echo json_encode(
                array(
                    "message" => "Successful login.",
                    "jwt" => $jwt
                )
            );
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Login failed."));
        }
    }

    public function sendRandomRecipes(string $diet, string $cuisine, string $meal, string $JWT)
    {
        if ($this->JWT->decodeJwt($JWT) !== false) {
            if ($data = $this->meals->getRandomRecipe($diet, $cuisine, $meal)) {
                http_response_code(200);
                echo json_encode(
                    array(
                        "message" => "Meals have been drawn",
                        "mealsData" => $data
                    )
                );
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Unable to draw meals.Please try again later.1"));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Unable to draw meals.Please try again later.2"));
        }
    }
    public function sendGeneratedMealPlan(string $timeFrame, string $targetCalories, string $diet, string $JWT)
    {

        if ($this->JWT->decodeJwt($JWT) !== false) {
            $login = $this->JWT->decodeJwt($JWT)->login;
            if ($this->db->addMealsTotal($login, $timeFrame, $targetCalories, $diet) !== false) {
                http_response_code(200);
                echo json_encode(
                    array(
                        "message" => "Meal Plan generated",
                        "mealsData" => $this->db->addMealsTotal($login, $timeFrame, $targetCalories, $diet)
                    )
                );
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Unable to add Plan.Please try again later."));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Unable to add Plan.Please try again later."));
        }
    }

    public function saveRandomRecipe(string $JWT, string $name, int $prepTime, int $servings, string $ingridients, string $instruction)
    {
        $login = $this->JWT->decodeJwt($JWT)->login;
        if ($this->JWT->decodeJwt($JWT) !== false) {
            if ($this->db->saveRandomMeal($login, $name, $prepTime, $servings, $ingridients, $instruction) !== false) {
                http_response_code(200);
                echo json_encode(array("message" => "Meal saved"));
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Unable to save Meal.Please try again later."));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Unable to save Meal.Please try again later."));
        }
    }
}