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
- If all steps are completed and no problem was provided write this: The goal appears to be successfully completed, you just need to archive it now.
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
- Return STRICT JSON ONLY.
- Do NOT include any markdown, code blocks, backticks, or extra text.
- Provide a JSON object with keys "steps" and "goal" exactly.
- Example format:
{
  "steps": [
    { "step": "First step", "description": "Short description" }
  ],
  "goal": "Short description of the goal"
}
- Provide clear, practical, step-by-step guidance.
- Be concise.
- Do not ask questions.
- Minimum 3 steps, maximum 12 steps.
- Goal field STRICT between 6 characters and 50 characters long.
- If the goal is incomprehensible, return:
{
  "error": "Incomprehensible goal."
}';
}
