<?php

namespace App\Exceptions;


class AiReturnedInvalidJsonException extends ApiException
{
    protected $message = 'AI returned invalid JSON';
    protected $code = 500;
}
