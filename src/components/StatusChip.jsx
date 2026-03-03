import './StatusChip.css';

const statusConfig = {
    Completed: {
        bg: 'var(--color-completed-bg)',
        color: 'var(--color-completed)',
        border: 'var(--color-completed)',
    },
    Scheduled: {
        bg: 'var(--color-scheduled-bg)',
        color: 'var(--color-scheduled)',
        border: 'var(--color-scheduled)',
    },
    Failed: {
        bg: 'var(--color-failed-bg)',
        color: 'var(--color-failed)',
        border: 'var(--color-failed)',
    },
};

function StatusChip({ status }) {
    const config = statusConfig[status] || statusConfig.Scheduled;

    return (
        <span
            className="status-chip"
            style={{
                background: config.bg,
                color: config.color,
                borderColor: config.border,
            }}
        >
            {status}
        </span>
    );
}

export default StatusChip;
