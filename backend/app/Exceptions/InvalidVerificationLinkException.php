<?php

namespace App\Exceptions;

class InvalidVerificationLinkException extends ApiException
{
    protected $message = 'Invalid verification link';
    protected $code = 400;
}
