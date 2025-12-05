<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class ProgService extends Facade
{
    public static function getFacadeAccessor(): string
    {
        return 'ProgService';
    }
}
