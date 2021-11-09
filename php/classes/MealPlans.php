<?php

declare(strict_types=1);

class MealPLans
{
    public function generateMealPlan(string $timeFrame, string $targetCalories, string $diet)
    {
        $url = "https://api.spoonacular.com/mealplanner/generate?apiKey=405902d98d8745d5a055a828ea0d7330&timeFrame={$timeFrame}&targetCalories={$targetCalories}&diet={$diet}.";
        return $url;
    }
}