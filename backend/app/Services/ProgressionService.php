<?php

namespace App\Services;

use App\Models\Goal;
use App\Repositories\GoalRepository;
use App\Repositories\StepRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProgressionService
{
    protected GoalRepository $goalRepository;
    protected StepRepository $stepRepository;

    public function __construct(GoalRepository $goalRepository, StepRepository $stepRepository)
    {
        $this->goalRepository = $goalRepository;
        $this->stepRepository = $stepRepository;
    }

    public function createGoal(Request $request): JsonResponse
    {
        $user = Auth::user();

        $validated = $this->validateGoalRequest($request);
        $goal = $this->createGoalEntity($user->id, $validated);
        $this->createSteps($goal->id, $validated['steps']);

        return response()->json(['message' => 'Goal created'], 201);
    }

    public function getGoals(Request $request): JsonResponse
    {
        $user = Auth::user();

        $goals = $this->goalRepository->findAll($user->id);
        return response()->json($goals);
    }

    private function validateGoalRequest(Request $request): array
    {
        return $request->validate([
            'goal' => 'required|string|max:50',
            'deadline' => 'required|date|after:today',
            'steps' => 'required|array|max:12',
        ]);
    }

    private function createGoalEntity(int $userId, array $validated): Goal
    {
        return $this->goalRepository->save([
            'user_id' => $userId,
            'goal' => $validated['goal'],
            'deadline' => $validated['deadline'],
        ]);
    }

    private function createSteps(mixed $goalId, array $steps): void
    {
        foreach ($steps as $step) {
            $this->stepRepository->save([
                'goal_id' => $goalId,
                'step' => $step,
            ]);
        }
    }

}
