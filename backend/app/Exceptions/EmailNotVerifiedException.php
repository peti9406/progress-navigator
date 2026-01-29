<?php

namespace App\Exceptions;

class EmailNotVerifiedException extends ApiException
{
    protected $message = 'Email not verified';
    protected $code = 401;
}
