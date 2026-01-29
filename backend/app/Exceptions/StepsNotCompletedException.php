<?php

namespace App\Exceptions;

class StepsNotCompletedException extends ApiException
{
    protected $message = "You need to complete the steps first!";
    protected $code = 400;
}
