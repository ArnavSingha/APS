import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import SeverityBadge from '../components/SeverityBadge';
import StatusChip from '../components/StatusChip';
import { severityStats, scans } from '../data/mockData';
import './DashboardPage.css';

const severityIcons = {
    critical: '⊘',
    high: '△',
    medium: '△',
    low: '🔍',
};

function DashboardPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 2500);
    };

    const filteredScans = useMemo(() => {
        if (!searchQuery.trim()) return scans;
        const query = searchQuery.toLowerCase();
        return scans.filter(
            (scan) =>
                scan.name.toLowerCase().includes(query) ||
                scan.type.toLowerCase().includes(query) ||
                scan.status.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const handleRowClick = (scanId) => {
        navigate(`/scan/${scanId}`);
    };

    return (
        <AppLayout
            onNewScan={() => showToast('New Scan dialog would open here')}
            onExportReport={() => showToast('Report export started')}
            onStopScan={() => showToast('Scan stop requested')}
        >
            {/* Severity stats */}
            <div className="dashboard__stats">
                {severityStats.map((stat) => (
                    <div className="stat-card" key={stat.label}>
                        <div className="stat-card__header">
                            <span className="stat-card__label">{stat.label}</span>
                            <span className={`stat-card__icon stat-card__icon--${stat.color}`}>
                                {severityIcons[stat.color]}
                            </span>
                        </div>
                        <span className="stat-card__count">{stat.count}</span>
                        <span className={`stat-card__change stat-card__change--${stat.direction}`}>
                            {stat.direction === 'up' ? '↑' : '↓'} {stat.change} {stat.changeText}
                        </span>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="dashboard__toolbar">
                <div className="dashboard__search">
                    <svg className="dashboard__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        className="dashboard__search-input"
                        type="text"
                        placeholder="Search scans by name or type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search scans"
                    />
                </div>
                <button className="btn btn--outline" onClick={() => showToast('Filter options opened')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    Filter
                </button>
                <button className="btn btn--outline" onClick={() => showToast('Column picker opened')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                    </svg>
                    Column
                </button>
                <button className="btn btn--primary" onClick={() => showToast('New Scan dialog would open here')}>
                    + New scan
                </button>
            </div>

            {/* Scan table */}
            <div className="dashboard__table-wrap">
                <table className="scan-table">
                    <thead>
                        <tr>
                            <th>Scan Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Vulnerability</th>
                            <th>Last Scan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredScans.map((scan) => (
                            <tr key={scan.id} onClick={() => handleRowClick(scan.id)}>
                                <td>{scan.name}</td>
                                <td>{scan.type}</td>
                                <td>
                                    <StatusChip status={scan.status} />
                                </td>
                                <td>
                                    <div className="progress-cell">
                                        <div className="progress-bar">
                                            <div
                                                className={`progress-bar__fill ${scan.progress <= 20 ? 'progress-bar__fill--low' : ''}`}
                                                style={{ width: `${scan.progress}%` }}
                                            />
                                        </div>
                                        <span className="progress-text">{scan.progress}%</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="vuln-badges">
                                        {scan.vulnerabilities.critical > 0 && (
                                            <SeverityBadge severity="Critical" count={scan.vulnerabilities.critical} />
                                        )}
                                        {scan.vulnerabilities.high > 0 && (
                                            <SeverityBadge severity="High" count={scan.vulnerabilities.high} />
                                        )}
                                        {scan.vulnerabilities.medium > 0 && (
                                            <SeverityBadge severity="Medium" count={scan.vulnerabilities.medium} />
                                        )}
                                        {scan.vulnerabilities.low > 0 && (
                                            <SeverityBadge severity="Low" count={scan.vulnerabilities.low} />
                                        )}
                                    </div>
                                </td>
                                <td style={{ color: 'var(--text-secondary)' }}>{scan.lastScan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Table footer */}
                <div className="dashboard__table-footer">
                    <span>Showing {filteredScans.length} of {scans.length} Scans</span>
                    <div className="dashboard__pagination">
                        <button className="dashboard__pagination-btn" aria-label="Previous page">‹</button>
                        <button className="dashboard__pagination-btn" aria-label="Next page">›</button>
                    </div>
                </div>
            </div>

            {/* Toast notification */}
            {toast && (
                <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-primary)',
                    boxShadow: 'var(--shadow-lg)',
                    fontSize: 'var(--font-size-md)',
                    zIndex: 1000,
                    animation: 'fadeIn 200ms ease',
                }}>
                    {toast}
                </div>
            )}
        </AppLayout>
    );
}

export default DashboardPage;
