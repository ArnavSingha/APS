import './ProgressRing.css';

function ProgressRing({ percent = 0, size = 120, strokeWidth = 6 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="progress-ring" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Track */}
                <circle
                    className="progress-ring__track"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                />
                {/* Fill */}
                <circle
                    className="progress-ring__fill"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>
            <div className="progress-ring__label">
                <span className="progress-ring__percent">{percent}%</span>
                <span className="progress-ring__text">In Progress</span>
            </div>
        </div>
    );
}

export default ProgressRing;
