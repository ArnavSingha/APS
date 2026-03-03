import { useState } from 'react';
import Sidebar from './Sidebar';
import { orgInfo } from '../data/mockData';
import './AppLayout.css';

function AppLayout({ children, showOrgBar = true, onNewScan, onExportReport, onStopScan }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="app-layout">
            {/* Mobile hamburger */}
            <button
                className="mobile-menu-btn"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="app-layout__main">
                {/* Top header breadcrumb */}
                <header className="app-header">
                    <div className="app-header__left">
                        <span className="header-label">Scan</span>
                        <span>/</span>
                        <span>⚙</span>
                        <span>/</span>
                        <span>Private Assets</span>
                        <span>/</span>
                        <span className="header-link" onClick={onNewScan}>New Scan</span>
                    </div>
                    <div className="app-header__right">
                        <button className="btn btn--outline" onClick={onExportReport}>Export Report</button>
                        <button className="btn btn--danger-outline" onClick={onStopScan}>Stop Scan</button>
                    </div>
                </header>

                {/* Org info bar */}
                {showOrgBar && (
                    <div className="org-bar">
                        <div className="org-bar__item">
                            Org: <strong>{orgInfo.name}</strong>
                        </div>
                        <div className="org-bar__item">
                            Owner: <strong>{orgInfo.owner}</strong>
                        </div>
                        <div className="org-bar__item">
                            Total Scans: <strong>{orgInfo.totalScans}</strong>
                        </div>
                        <div className="org-bar__item">
                            Scheduled: <strong>{orgInfo.scheduled}</strong>
                        </div>
                        <div className="org-bar__item">
                            Rescans: <strong>{orgInfo.rescans}</strong>
                        </div>
                        <div className="org-bar__item">
                            Failed Scans: <strong>{orgInfo.failedScans}</strong>
                        </div>
                        <div className="org-bar__item org-bar__item--time">
                            🕐 {orgInfo.lastUpdated}
                        </div>
                    </div>
                )}

                {/* Main content */}
                <main className="app-content">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
