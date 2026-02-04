interface GoalType {
    id: number;
    goal: string;
    deadline: string;
    achieved_at: string | null;
    completed: 0 | 1;
    steps: StepType[];
}
