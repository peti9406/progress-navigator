<?php

namespace App\Http\Controllers;

use App\Facades\ProgService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgressionController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        return ProgService::createGoal($request);
    }

    public function index(Request $request): JsonResponse
    {
        return ProgService::getGoals($request);
    }


}
