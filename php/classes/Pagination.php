<?php

declare(strict_types=1);
require_once "../classes/Database.php";

class Pagination
{
    private function getMinMeals(string $min)
    { {
            if ($min < 10) {
                return 0;
            } else {
                return $min;
            }
        }
    }

    private function getMaxMeals(string $max, string $totalRecords)
    {
        if ($max > $totalRecords) {
            return $totalRecords;
        } else {
            return $max;
        }
    }

    public function getMeals(string $min, string $max, string $totalRecords)
    {
        $minMeals = $this->getMinMeals($min);
        $maxMeals = $this->getMaxMeals($max, $totalRecords);
        $meals = array(
            'min' => $minMeals,
            'max' => $maxMeals
        );
        return $meals;
    }
}