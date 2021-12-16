<?php

declare(strict_types=1);

class Meals
{
    public function generateMealPlan(string $timeFrame, string $targetCalories, string $diet)
    {
        if ($url = file_get_contents("https://api.spoonacular.com/mealplanner/generate?apiKey=405902d98d8745d5a055a828ea0d7330&timeFrame=" . $timeFrame . "&targetCalories={$targetCalories}&diet={$diet}.")) {
            return json_decode($url, true);
        } else {
            return false;
        }
    }

    public function getRandomRecipe(string $diet, string $cuisine, string $meal)
    {
        if ($url = file_get_contents("https://api.spoonacular.com/recipes/random?apiKey=405902d98d8745d5a055a828ea0d7330&number=3&tags={$diet},{$cuisine},{$meal}&limitLicense=true.")) {
            return json_decode($url, true);
        } else {
            return false;
        }
    }

    public function getMoreInforForRecipeFromMealsPlan($recipeId)
    {
        if ($url = file_get_contents("https://api.spoonacular.com/recipes/{$recipeId}/information?apiKey=405902d98d8745d5a055a828ea0d7330")) {
            return json_decode($url, true);
        } else {
            return false;
        }
    }
}