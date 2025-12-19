export default function ProgressionBar({percentage}) {
    return (
        <div
            className="relative px-4 w-full bg-blue-100 rounded-xl overflow-hidden h-6 flex items-center justify-center">
            <div
                className="bg-blue-500 h-full absolute left-0 top-0"
                style={{width: `${percentage}%`, transition: 'width 0.3s ease'}}
            />
            <div className="z-10">
                <span>{percentage} %</span>
            </div>
        </div>
    );
}