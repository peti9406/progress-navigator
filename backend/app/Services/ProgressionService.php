<?php

namespace App\Services;

use App\Models\Goal;
use App\Repositories\GoalRepository;
use App\Repositories\StepRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;

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

        $created = $this->goalRepository->find($goal->id);

        return response()->json(['message' => 'Goal created', 'goal' => $created], 201);
    }

    public function getGoals(Request $request): JsonResponse
    {
        $user = Auth::user();

        $completed = $request->completed;

        $goals = $this->goalRepository->findAll($user->id, $completed);
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

    public function toggleCompleted(string $id): JsonResponse
    {
        $this->stepRepository->toggleCompleted($id);
        return response()->json(['message' => 'Goal updated'], 201);
    }

    public function completeGoal(string $id): JsonResponse
    {
        $this->goalRepository->update(
            $id,
            [
                'completed' => 1,
                'achieved_at' => Date::now(),
            ]
        );

        $steps = $this->stepRepository->findByGoalId($id);

        foreach ($steps as $step) {
            $this->stepRepository->complete($step->id,
                [
                'completed' => 1,
            ]);
        }

        return response()->json(['message' => 'Goal completed'], 201);
    }

    public function delete(string $id): JsonResponse
    {
        $this->goalRepository->delete($id);
        return response()->json(['message' => 'Goal deleted'], 201);
    }

}
