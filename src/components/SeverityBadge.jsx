import './SeverityBadge.css';

const colorMap = {
    critical: 'var(--color-critical)',
    high: 'var(--color-high)',
    medium: 'var(--color-medium)',
    low: 'var(--color-low)',
};

const bgMap = {
    critical: 'var(--color-critical-bg)',
    high: 'var(--color-high-bg)',
    medium: 'var(--color-medium-bg)',
    low: 'var(--color-low-bg)',
};

function SeverityBadge({ severity, count, size = 'sm' }) {
    const key = severity.toLowerCase();

    return (
        <span
            className={`severity-badge severity-badge--${size}`}
            style={{
                background: bgMap[key] || bgMap.low,
                color: colorMap[key] || colorMap.low,
            }}
            title={`${severity}: ${count}`}
        >
            {count}
        </span>
    );
}

export default SeverityBadge;
