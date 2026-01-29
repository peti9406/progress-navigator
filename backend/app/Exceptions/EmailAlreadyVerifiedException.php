<?php

namespace App\Exceptions;

class EmailAlreadyVerifiedException extends ApiException
{
    protected $message = 'Email already verified';
    protected $code = 409;
}
