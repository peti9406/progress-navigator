<?php

namespace App\Http\Controllers;

use App\Facades\ProgService;
use App\Services\ProgressionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgressionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        return ProgService::createGoal($request);
    }

    public function index(Request $request): JsonResponse
    {
        return ProgService::getGoals($request);
    }

    public function toggle(string $id): JsonResponse
    {
        return ProgService::toggleCompleted($id);
    }

    public function complete(string $id)
    {
        return ProgService::completeGoal($id);
    }


}
