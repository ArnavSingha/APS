import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                (Full implementation coming in Part 3)
            </p>
            <button
                onClick={() => navigate('/scan/scan-001')}
                style={{
                    marginTop: '24px',
                    padding: '12px 32px',
                    background: 'var(--color-primary)',
                    color: '#fff',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: 'var(--font-size-md)',
                    fontWeight: 600,
                }}
            >
                View Scan Detail →
            </button>
        </div>
    );
}

export default DashboardPage;
