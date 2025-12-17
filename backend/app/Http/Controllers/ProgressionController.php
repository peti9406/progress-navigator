<?php

namespace App\Http\Controllers;

use App\DTO\CreateGoalData;
use App\DTO\GoalQuery;
use App\Exceptions\StepsNotCompletedException;
use App\Facades\ProgService;
use App\Services\ProgressionService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgressionController extends Controller
{
    protected ProgressionService $progressionService;

    public function __construct(ProgressionService $progressionService)
    {
        $this->progressionService = $progressionService;
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'goal' => 'required|string|max:50',
            'deadline' => 'required|date|after:today',
            'steps' => 'required|array|max:12',
            'steps.*' => 'required|min:1'
        ]);

        $data = new CreateGoalData(
            auth()->id(),
            $validated['goal'],
            $validated['deadline'],
            $validated['steps']
        );

        $goal = $this->progressionService->createGoal($data);

        return response()->json([
            'message' => 'Goal created',
            'goal' => $goal
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $query = new GoalQuery(
            auth()->id(),
            $request->filter
        );
        $goals = $this->progressionService->getGoals($query);

        return response()->json($goals);
    }

    public function toggle(string $id): JsonResponse
    {
        try {
            $this->progressionService->toggleCompleted($id);
            return response()->json(['message' => 'Step updated']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Step not found'], 404);
        }
    }

    public function complete(string $id): JsonResponse
    {
        try {
            $this->progressionService->completeGoal($id);
            return response()->json(['message' => 'Goal completed']);
        } catch (StepsNotCompletedException  $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function delete(string $id): JsonResponse
    {
        try {
            $this->progressionService->delete($id);
            return response()->json(['message' => 'Goal deleted']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Goal not found'], 404);
        }
    }

}
