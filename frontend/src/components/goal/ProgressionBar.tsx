interface ProgressionBarProps {
    percentage: number;
}

export default function ProgressionBar({percentage}: ProgressionBarProps) {
    return (
        <div
            className="relative px-4 w-full bg-[var(--surface-soft)] rounded-xl overflow-hidden h-6 flex items-center justify-center">
            <div
                className={`h-full absolute left-0 top-0
                    ${percentage === 100 ? 'bg-[var(--complete)]' : 'bg-[var(--primary-muted)]'}`}
                style={{width: `${percentage}%`, transition: 'width 0.3s ease'}}
            />
            <div className="z-10">
                <span>{percentage}%</span>
            </div>
        </div>
    );
}