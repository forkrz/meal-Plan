<?php

declare(strict_types=1);
require_once("Database.php");

class Pagination
{
    function __construct(array $config)
    {
        $this->db = new Database($config);
    }

    private function getMinMeals($min, int $totalRecords): int
    { {
            if ($min < 10) {
                return 0;
            } elseif ($min > $totalRecords) {
                return $totalRecords - $totalRecords % 10;
            } else {
                return $min;
            }
        }
    }

    public function getMeals(string $login, int $minScope)
    {
        $totalRecords = $this->db->getTotalQuantityOfPlansForUser($login);
        $minMeals = $this->getMinMeals($minScope, $totalRecords);
        $mealsData = $this->db->getPaginatedRecords($login, $minMeals);
        return $mealsData;
    }

    public function getRandomMeals(string $login, $minScope)
    {
        $totalRecords = $this->db->getTotalQuantityOfRandomMealsForUser($login);
        $minMeals = $this->getMinMeals($minScope, $totalRecords);
        $mealsData = $this->db->getRandomMealsAsPaginatedRecords($login, $minMeals);
        return $mealsData;
    }
}