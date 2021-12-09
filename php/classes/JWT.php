<?php

declare(strict_types=1);

declare(strict_types=1);
require_once("Database.php");
require_once("Verification.php");
require_once(__DIR__ . "/../config/tokenConfig.php");
require __DIR__ . "../../../vendor/autoload.php";

use Firebase\JWT\JWT;

class JWTTokens
{
    function __construct($config)
    {
        $this->db = new Database($config);
        $this->ver = new Verification($config);
    }

    public function generateToken(string $login)
    {
        $token = tokenConfig($login);
        $jwt = JWT::encode($token, "example_key");
        return $jwt;
    }
    public function decodeJwt($JWT)
    {
        if (isset($JWT)) {
            try {
                $decode = JWT::decode($JWT, "example_key", array_keys(JWT::$supported_algs));
                return $decode;
            } catch (Exception $e) {
                return false;
            }
        } else {
            return false;
        }
    }
}