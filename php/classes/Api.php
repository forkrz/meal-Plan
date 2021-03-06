<?php

declare(strict_types=1);
require_once("Database.php");
require_once("Verification.php");
require_once("ExternalApiEndpoints.php");
require_once("Pagination.php");
require_once("JWT.php");
class Api
{
    function __construct(array $config)
    {
        $this->db = new Database($config);
        $this->ver = new Verification($config);
        $this->JWT = new JWTTokens($config);
        $this->pag = new Pagination($config);
        $this->meals = new ExternalApiEndpoints();
    }

    public function sendLoginData(string $login, string $password)
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
            if ($this->db->addMealPlansController($login, $timeFrame, $targetCalories, $diet) !== false) {
                http_response_code(200);
                echo json_encode(
                    array(
                        "message" => "Meal Plan generated. You can close these window."
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

        if ($this->JWT->decodeJwt($JWT) !== false) {
            $login = $this->JWT->decodeJwt($JWT)->login;
            if ($this->db->saveRandomMeal($login, $name, $prepTime, $servings, $ingridients, $instruction) !== false) {
                http_response_code(200);
                echo json_encode(array("message" => "Meal saved"));
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Unable to save Meal.Please try again later."));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Unable to save Meal.Please try again later"));
        }
    }

    public function getPaginatedRecords(string $JWT, int $minScope)
    {

        if ($this->JWT->decodeJwt($JWT) !== false) {
            $login = $this->JWT->decodeJwt($JWT)->login;
            if ($this->pag->getMeals($login, $minScope)) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Ok",
                    "meals" => $this->pag->getMeals($login, $minScope),
                    "TotalPlansForUser" => $this->db->getTotalQuantityOfPlansForUser($login)
                ));
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Unable to load Meals.Please try again later."));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Unable to load Meals.Please try again later."));
        }
    }

    public function getPaginatedRecordsForRandomRecipes(string $JWT, int $minScope)
    {

        if ($this->JWT->decodeJwt($JWT) !== false) {
            $login = $this->JWT->decodeJwt($JWT)->login;
            if ($this->pag->getRandomMeals($login, $minScope)) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Ok",
                    "meals" => $this->pag->getRandomMeals($login, $minScope),
                    "TotalPlansForUser" => $this->db->getTotalQuantityOfRandomMealsForUser($login)
                ));
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Unable to load Meals.Please try again later."));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Unable to load Meals.Please try again later."));
        }
    }

    public function getMealsDataForMealPlan(string $JWT, string $planId)
    {

        if ($this->JWT->decodeJwt($JWT) !== false) {
            if ($this->db->getAllRecipesForMealPlan($planId)) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Ok",
                    "meals" => $this->db->getAllRecipesForMealPlan($planId),
                ));
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Unable to load Meals.Please try again later."));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Unable to load Meals.Please try again later."));
        }
    }

    public function getDataForSingleRandomMeal(string $JWT, string $mealId)
    {

        if ($this->JWT->decodeJwt($JWT) !== false) {
            if ($this->db->getDataForOneRandomMeal($mealId)) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Ok",
                    "meals" => $this->db->getDataForOneRandomMeal($mealId),
                ));
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Unable to load Meals.Please try again later."));
            }
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Unable to load Meals.Please try again later."));
        }
    }
}