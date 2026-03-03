import { useNavigate, useParams } from 'react-router-dom';

function ScanDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Scan Detail: {id}</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                (Full implementation coming in Part 4)
            </p>
            <button
                onClick={() => navigate('/dashboard')}
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
                ← Back to Dashboard
            </button>
        </div>
    );
}

export default ScanDetailPage;
