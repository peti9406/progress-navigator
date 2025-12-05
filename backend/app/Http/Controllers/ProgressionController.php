<?php

namespace App\Http\Controllers;

use App\Facades\ProgService;
use Illuminate\Http\Request;

class ProgressionController extends Controller
{
    public function create(Request $request)
    {
        ProgService::createGoal($request);
    }


}
