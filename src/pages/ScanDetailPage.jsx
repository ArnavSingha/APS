import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import ProgressRing from '../components/ProgressRing';
import FindingCard from '../components/FindingCard';
import { useToast } from '../components/Toast';
import { activeScanDetail, activityLogs, findings, scanStats } from '../data/mockData';
import './ScanDetailPage.css';

const stepIcons = {
    Spidering: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
    ),
    Mapping: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
    Testing: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    Validating: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    ),
    Reporting: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    ),
};

function renderLogMessage(message) {
    const parts = [];
    let key = 0;

    const patterns = [
        { regex: /<highlight>(.*?)<\/highlight>/g, className: 'console-highlight' },
        { regex: /<warn>(.*?)<\/warn>/g, className: 'console-warn' },
        { regex: /<badge>(.*?)<\/badge>/g, className: 'console-badge' },
        { regex: /<link>(.*?)<\/link>/g, className: 'console-link' },
    ];

    const allMatches = [];
    for (const pattern of patterns) {
        let match;
        const regex = new RegExp(pattern.regex.source, 'g');
        while ((match = regex.exec(message)) !== null) {
            allMatches.push({
                start: match.index,
                end: match.index + match[0].length,
                text: match[1],
                className: pattern.className,
            });
        }
    }

    allMatches.sort((a, b) => a.start - b.start);

    if (allMatches.length === 0) return message;

    let lastIndex = 0;
    for (const match of allMatches) {
        if (match.start > lastIndex) {
            parts.push(message.substring(lastIndex, match.start));
        }
        parts.push(
            <span key={key++} className={match.className}>{match.text}</span>
        );
        lastIndex = match.end;
    }
    if (lastIndex < message.length) {
        parts.push(message.substring(lastIndex));
    }

    return parts;
}

function ScanDetailPage() {
    const { id } = useParams();
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState('activity');

    const scan = activeScanDetail;
    const currentStepIdx = scan.steps.indexOf(scan.currentStep);

    return (
        <AppLayout
            showOrgBar={false}
            onNewScan={() => addToast('New Scan dialog would open here', 'info')}
            onExportReport={() => addToast('Report export started', 'success')}
            onStopScan={() => addToast('Scan stopped', 'error')}
        >
            {/* Progress section */}
            <div className="scan-detail__progress animate-fade-in">
                <ProgressRing percent={scan.progressPercent} size={120} strokeWidth={6} />

                <div className="step-tracker" role="list" aria-label="Scan progress steps">
                    {scan.steps.map((step, idx) => {
                        let stepClass = 'step-tracker__item';
                        if (idx < currentStepIdx) stepClass += ' step-tracker__item--completed';
                        if (idx === currentStepIdx) stepClass += ' step-tracker__item--active';

                        return (
                            <div key={step} className={stepClass} role="listitem" aria-current={idx === currentStepIdx ? 'step' : undefined}>
                                <div className="step-tracker__icon">
                                    {stepIcons[step]}
                                </div>
                                <span className="step-tracker__label">{step}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Metadata row */}
            <div className="scan-detail__metadata animate-fade-in">
                {Object.entries(scan.metadata).map(([key, value]) => {
                    const label = key.replace(/([A-Z])/g, ' $1').trim();
                    const isTeal = key === 'checklists';
                    return (
                        <div className="scan-detail__meta-item" key={key}>
                            <span className="scan-detail__meta-label">{label}</span>
                            <span className={`scan-detail__meta-value ${isTeal ? 'scan-detail__meta-value--teal' : ''}`}>
                                {value}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Console + Finding Log panels */}
            <div className="scan-detail__panels animate-fade-in-up">
                {/* Live Console */}
                <div className="console-panel">
                    <div className="console-panel__header">
                        <div className="console-panel__title">
                            <span className="console-panel__dot" aria-hidden="true" />
                            Live Scan Console
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="console-panel__status" role="status">
                                <span className="console-panel__status-spinner" aria-hidden="true" />
                                Running...
                            </div>
                            <div className="console-panel__controls">
                                <button className="console-panel__control-btn" aria-label="Minimize console" title="Minimize">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                <button className="console-panel__control-btn" aria-label="Close console" title="Close" onClick={() => addToast('Console minimized', 'info')}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="console-panel__tabs" role="tablist" aria-label="Console views">
                        <button
                            className={`console-panel__tab ${activeTab === 'activity' ? 'console-panel__tab--active' : ''}`}
                            onClick={() => setActiveTab('activity')}
                            role="tab"
                            aria-selected={activeTab === 'activity'}
                            id="tab-activity"
                        >
                            Activity Log
                        </button>
                        <button
                            className={`console-panel__tab ${activeTab === 'verification' ? 'console-panel__tab--active' : ''}`}
                            onClick={() => setActiveTab('verification')}
                            role="tab"
                            aria-selected={activeTab === 'verification'}
                            id="tab-verification"
                        >
                            Verification Loops
                        </button>
                    </div>

                    <div className="console-panel__output" role="log" aria-live="polite" aria-labelledby={activeTab === 'activity' ? 'tab-activity' : 'tab-verification'}>
                        {activeTab === 'activity' ? (
                            activityLogs.map((entry, idx) => (
                                <div key={idx} className="console-log-entry">
                                    <span className="console-timestamp">[{entry.timestamp}]</span>{' '}
                                    {renderLogMessage(entry.message)}
                                </div>
                            ))
                        ) : (
                            <div className="console-log-entry">
                                <span className="console-timestamp">[09:06:30]</span>{' '}
                                Verification loop #1: Retesting{' '}
                                <span className="console-highlight">SQL injection</span>{' '}
                                on <span className="console-badge">/api/users/profile</span> with alternate payloads...
                                <br /><br />
                                <span className="console-timestamp">[09:07:00]</span>{' '}
                                Confirmed: <span className="console-warn">Time-based blind SQL injection</span>{' '}
                                validated with 3 independent payload variants. Confidence: <span className="console-highlight">HIGH</span>.
                                <br /><br />
                                <span className="console-timestamp">[09:07:30]</span>{' '}
                                Verification loop #2: Testing{' '}
                                <span className="console-highlight">IDOR</span>{' '}
                                on <span className="console-badge">/api/dashboard</span> with sequential user IDs...
                                <br /><br />
                                <span className="console-timestamp">[09:08:00]</span>{' '}
                                Confirmed: <span className="console-warn">IDOR vulnerability</span> allows horizontal privilege escalation.
                                Successfully accessed 5 different user dashboards with modified X-UserId header.
                            </div>
                        )}
                    </div>
                </div>

                {/* Finding Log */}
                <div className="finding-panel">
                    <div className="finding-panel__header">Finding Log</div>
                    <div className="finding-panel__list" role="list" aria-label="Vulnerability findings">
                        {findings.map((finding) => (
                            <FindingCard key={finding.id} finding={finding} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom status bar */}
            <div className="scan-detail__statusbar" role="status" aria-label="Scan statistics">
                <div className="statusbar__item">
                    <span className="statusbar__dot" aria-hidden="true" />
                    Sub-Agents: {scanStats.subAgents}
                </div>
                <div className="statusbar__item">
                    <span className="statusbar__dot" aria-hidden="true" />
                    Parallel Executions: {scanStats.parallelExecutions}
                </div>
                <div className="statusbar__item">
                    <span className="statusbar__dot" aria-hidden="true" />
                    Operations: {scanStats.operations}
                </div>
                <div className="statusbar__severity">
                    <span className="statusbar__severity-item statusbar__severity-item--critical">
                        Critical: {scanStats.criticalCount}
                    </span>
                    <span className="statusbar__severity-item statusbar__severity-item--high">
                        High: {scanStats.highCount}
                    </span>
                    <span className="statusbar__severity-item statusbar__severity-item--medium">
                        Medium: {scanStats.mediumCount}
                    </span>
                    <span className="statusbar__severity-item statusbar__severity-item--low">
                        Low: {scanStats.lowCount}
                    </span>
                </div>
            </div>
        </AppLayout>
    );
}

export default ScanDetailPage;
