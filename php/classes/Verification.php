<?php

declare(strict_types=1);
require_once("./Database.php");


class Verification
{
    function __construct()
    {
        $config = require_once './config/config.php';
        $this->db = new Database($config);
    }

    public function passwordVerification(string $login, string $password)
    {
        $dbpassword = $this->db->getData($login)['USER_PASSWORD'];
        $passwordVerification = password_verify($password, $dbpassword);
        return $passwordVerification;
    }
}