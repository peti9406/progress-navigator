<?php

namespace App\Enums;

enum AiPrompt: string
{
    case STEP_HELP = 'Return ONLY valid JSON with keys "steps" and "reflection".
Do not include ```json or any markdown, do not add extra text.
The user is stuck on the current_step, help proceed to the next step even if no problem is provided.

The JSON format must be:
{
  "steps": [
    "First step",
    "Second step",
    "Third step"
  ],
  "reflection": "Short reflection if applicable, otherwise null, if no problem is provided write something like you did not specify the reason you are stuck."
}

Rules:
- Provide clear, practical, step-by-step guidance.
- Be concise.
- Do not ask questions.
- If the goal or step is incomprehensible, return:
{
  "error": "Incomprehensible goal or step"
}';

    case GOAL_HELP = 'Return ONLY valid JSON with keys "steps" and "goal".
Do not include ```json or any markdown, do not add extra text.
The user wants to achieve a new goal, help plan a step by step guidance.

The JSON format must be:
{
  "steps": [
      {
      "step": "First step",
      "description": "Short description"
      },
      {
      "step": "Second step",
      "description": "Short description"
      },
        {
      "step": "Third step",
      "description": "Short description"
      },
  ],
  "goal": "Short description of the goal"
}

Rules:
- Provide clear, practical, step-by-step guidance.
- Be concise.
- Do not ask questions.
- Minimum 3 steps, maximum 12 steps.
- Goal field minimum 6 characters and maximum 50 characters long.
- If the goal is incomprehensible, return:
{
  "error": "Incomprehensible goal."
}';

}
