<?php

declare(strict_types=1);
require_once("Database.php");


class Verification
{
    function __construct(array $config)
    {
        $this->db = new Database($config);
    }
    private function doLoginExist(string $login)
    {
        $check = $this->db->getData($login);
        if ($check) {
            return true;
        } else {
            return false;
        }
    }

    private function passwordVerification(string $login, string $password)
    {
        $dbpassword = $this->db->getData($login)['USER_PASSWORD'];
        $passwordVerification = password_verify($password, $dbpassword);
        return $passwordVerification;
    }

    public function loginDataCheck(string $login, string $password)
    {
        if ($this->doLoginExist($login)) {
            return $this->passwordVerification($login, $password);
        } else {
            return false;
        }
    }
}