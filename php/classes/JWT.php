<?php

declare(strict_types=1);

declare(strict_types=1);
require_once("Database.php");
require_once("Verification.php");
require_once("./config/tokenConfig.php");
require __DIR__ . "../../../vendor/autoload.php";

use Firebase\JWT\JWT;

class JWTTokens
{
    function __construct()
    {
        $config = require_once './config/config.php';
        $this->db = new Database($config);
        $this->ver = new Verification($config);
    }

    public function generateToken(string $login)
    {
        $token = tokenConfig($login);
        $jwt = JWT::encode($token, "example_key");
        return $jwt;
    }
}