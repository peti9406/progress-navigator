<?php

namespace App\Enums;

enum AiPrompt: string
{
    case STEP_HELP = '
The user is stuck on the current_step, help proceed to the next step even if no problem is provided, the reason the user is stuck is defined in the problem property.

Rules:
- Return STRICT JSON ONLY.
- Do NOT include any markdown, code blocks, backticks, or extra text.
- Provide a JSON object with keys "steps" and "reflection" exactly.
- Provide clear, practical, step-by-step guidance.
- Be concise.
- Do not ask questions.
- ONLY If all steps are completed and no problem was provided write this: The goal appears to be successfully completed, you just need to archive it now.
- Example format:
{
  "steps": [
    "First step",
    "Second step",
    "Third step"
  ],
  "reflection": "Short reflection if applicable, otherwise null, if no problem is provided write something like you did not specify the reason you are stuck."
}
- If the goal or step is incomprehensible, return:
{
  "error": "Incomprehensible goal or step"
}';

    case GOAL_HELP = '
The user wants to achieve a new goal, help plan a step by step guidance.

Rules:
- Return STRICT JSON ONLY.
- Do NOT include any markdown, code blocks, backticks, or extra text.
- Provide a JSON object with keys "steps" and "goal" exactly.
- Provide clear, practical, step-by-step guidance.
- Be concise.
- Do not ask questions.
- Minimum 3 steps, maximum 12 steps.
- Goal field STRICT between 6 characters and 50 characters long.
- Example format:
{
  "steps": [
    { "step": "First step", "description": "Short description" }
  ],
  "goal": "Short description of the goal"
}
- If the goal is incomprehensible, return:
{
  "error": "Incomprehensible goal."
}';

}
