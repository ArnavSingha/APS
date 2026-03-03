import './FindingCard.css';

const severityColors = {
    Critical: { bg: 'var(--color-critical)', text: '#FFFFFF' },
    High: { bg: 'var(--color-high)', text: '#FFFFFF' },
    Medium: { bg: 'var(--color-medium)', text: '#333333' },
    Low: { bg: 'var(--color-low)', text: '#FFFFFF' },
};

function FindingCard({ finding }) {
    const colors = severityColors[finding.severity] || severityColors.Medium;

    return (
        <div className="finding-card">
            <div className="finding-card__header">
                <span
                    className="finding-card__severity"
                    style={{ background: colors.bg, color: colors.text }}
                >
                    {finding.severity}
                </span>
                <span className="finding-card__time">{finding.timestamp}</span>
            </div>
            <h4 className="finding-card__title">{finding.title}</h4>
            <span className="finding-card__endpoint">{finding.endpoint}</span>
            <p className="finding-card__desc">{finding.description}</p>
        </div>
    );
}

export default FindingCard;
