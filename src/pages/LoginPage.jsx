import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Login Page</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                (Full implementation coming in Part 2)
            </p>
            <button
                onClick={handleSubmit}
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
                Go to Dashboard →
            </button>
        </div>
    );
}

export default LoginPage;
