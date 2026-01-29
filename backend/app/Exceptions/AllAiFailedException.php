<?php

namespace App\Exceptions;

class AllAiFailedException extends ApiException
{
    protected $message = 'AI service currently unavailable, please try again later.';
    protected $code = 503;
}
