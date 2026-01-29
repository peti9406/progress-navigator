<?php

namespace App\Exceptions;

class AiFailedException extends ApiException
{
    protected $code = 503;
    protected $message;

    public function __construct(string $model)
    {
        $message = $model . ' failed';
        parent::__construct($message);
    }
}
