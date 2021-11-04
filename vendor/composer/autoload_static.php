<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit41ec3d8a8d0225de8fb2b56bb65d6b7b
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit41ec3d8a8d0225de8fb2b56bb65d6b7b::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit41ec3d8a8d0225de8fb2b56bb65d6b7b::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit41ec3d8a8d0225de8fb2b56bb65d6b7b::$classMap;

        }, null, ClassLoader::class);
    }
}