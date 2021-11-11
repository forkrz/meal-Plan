<?php

declare(strict_types=1);

class Meals
{
    public function generateMealPlan(string $timeFrame, string $targetCalories, string $diet)
    {
        $url = "https://api.spoonacular.com/mealplanner/generate?apiKey=405902d98d8745d5a055a828ea0d7330&timeFrame={$timeFrame}&targetCalories={$targetCalories}&diet={$diet}.";
        return $url;
    }

    public function getRandomRecipe(string $quantity, string $tags)
    {
        $url = "https://api.spoonacular.com/recipes/random?apiKey=405902d98d8745d5a055a828ea0d7330&number={$quantity}&tags={$tags}&limitLicense=true.";
        return json_decode($url);
    }
}