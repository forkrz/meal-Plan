<?php

declare(strict_types=1);

class ExternalApiEndpoints
{
    function __construct()
    {
        $this->apiKey = require "../config/ApiKey.php";
    }
    public function generateMealPlan(string $timeFrame, string $targetCalories, string $diet)
    {
        if ($url = file_get_contents("https://api.spoonacular.com/mealplanner/generate?apiKey={$this->apiKey}&timeFrame=" . $timeFrame . "&targetCalories={$targetCalories}&diet={$diet}.")) {
            return json_decode($url, true);
        } else {
            return false;
        }
    }

    public function getRandomRecipe(string $diet, string $cuisine, string $meal)
    {
        if ($url = file_get_contents("https://api.spoonacular.com/recipes/random?apiKey={$this->apiKey}&number=3&tags={$diet},{$cuisine},{$meal}&limitLicense=true.")) {
            return json_decode($url, true);
        } else {
            return false;
        }
    }

    public function getMoreInforForRecipeFromMealsPlan($recipeId)
    {
        if ($url = file_get_contents("https://api.spoonacular.com/recipes/{$recipeId}/information?apiKey={$this->apiKey}")) {
            return json_decode($url, true);
        } else {
            return false;
        }
    }
}