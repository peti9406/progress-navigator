<?php

namespace App\Http\Controllers;

use App\DTO\CreateGoalData;
use App\DTO\GoalQuery;
use App\Enums\AiPrompt;
use App\Exceptions\StepsNotCompletedException;
use App\Services\GoalAiService;
use App\Services\GoalContextBuilder;
use App\Services\ProgressionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgressionController extends Controller
{
    protected ProgressionService $progressionService;
    protected GoalAiService $goalAIService;
    protected GoalContextBuilder $goalContextBuilder;

    public function __construct(ProgressionService $progressionService, GoalAiService $goalAIService, GoalContextBuilder $goalContextBuilder)
    {
        $this->progressionService = $progressionService;
        $this->goalAIService = $goalAIService;
        $this->goalContextBuilder = $goalContextBuilder;
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
        $this->progressionService->toggleCompleted($id);
        return response()->json(['message' => 'Step updated']);
    }

    /**
     * @throws StepsNotCompletedException
     */
    public function complete(string $id): JsonResponse
    {
        $this->progressionService->completeGoal($id);
        return response()->json(['message' => 'Goal completed']);

    }

    public function delete(string $id): JsonResponse
    {
        $this->progressionService->delete($id);
        return response()->json(['message' => 'Goal deleted']);
    }

    public function help(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'problem' => 'nullable|string|max:255',
        ]);

        $goal = $this->progressionService->getGoalById($request->id);

        if (auth()->user()->id !== $goal->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $problem = $validated['problem'] ?? '';
        $context = $this->goalContextBuilder->build($goal, $problem);

        $help = $this->goalAIService->getHelp($context, AiPrompt::STEP_HELP);
        return response()->json($help);
    }

    public function aiNewGoal(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'goal' => 'required|string|min:6|max:50',
        ]);

        $goal = $this->goalAIService->getHelp($validated['goal'], AiPrompt::GOAL_HELP);
        return response()->json($goal);
    }
}
