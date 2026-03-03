export const orgInfo = {
    name: 'Project X',
    owner: 'Nammagiri',
    totalScans: 100,
    scheduled: 1000,
    rescans: 100,
    failedScans: 100,
    lastUpdated: '10 mins ago',
};

export const severityStats = [
    {
        label: 'Critical Severity',
        count: 86,
        change: '+2%',
        direction: 'up',
        changeText: 'increase than yesterday',
        color: 'critical',
    },
    {
        label: 'High Severity',
        count: 16,
        change: '+0.9%',
        direction: 'up',
        changeText: 'increase than yesterday',
        color: 'high',
    },
    {
        label: 'Medium Severity',
        count: 26,
        change: '-0.9%',
        direction: 'down',
        changeText: 'decrease than yesterday',
        color: 'medium',
    },
    {
        label: 'Low Severity',
        count: 16,
        change: '+0.9%',
        direction: 'up',
        changeText: 'increase than yesterday',
        color: 'low',
    },
];

export const scans = [
    {
        id: 'scan-001',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-002',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-003',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-004',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-005',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-006',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-007',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-008',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-009',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Scheduled',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 0, low: 0 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-010',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Scheduled',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 0, low: 0 },
        lastScan: '4d ago',
    },
    {
        id: 'scan-011',
        name: 'IoT Devices',
        type: 'Blackbox',
        status: 'Failed',
        progress: 10,
        vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 },
        lastScan: '3d ago',
    },
    {
        id: 'scan-012',
        name: 'Temp Data',
        type: 'Blackbox',
        status: 'Failed',
        progress: 10,
        vulnerabilities: { critical: 1, high: 4, medium: 8, low: 1 },
        lastScan: '3d ago',
    },
];

export const activeScanDetail = {
    id: 'scan-active-001',
    name: 'Web App Servers',
    progressPercent: 0,
    currentStep: 'Spidering',
    steps: ['Spidering', 'Mapping', 'Testing', 'Validating', 'Reporting'],
    metadata: {
        scanType: 'Grey Box',
        targets: 'google.com',
        startedAt: 'Nov 22, 09:00AM',
        credentials: '2 Active',
        files: 'Control.pdf',
        checklists: '40/350',
    },
};

export const activityLogs = [
    {
        timestamp: '09:00:00',
        message:
            "I'll begin a systematic penetration test on <highlight>helpdesk.democorp.com</highlight>. Let me start with reconnaissance and enumeration.",
    },
    {
        timestamp: '09:01:00',
        message:
            'Good! target is online. Now let me perform port scanning to identify running services.',
    },
    {
        timestamp: '09:02:00',
        message:
            'Excellent reconnaissance results:\n\n  - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure.',
    },
    {
        timestamp: '09:03:00',
        message:
            'Great! I found a login page for a Help Desk Platform. I can see a useful comment: <warn>"TODO: Delete the testing account (test:test)"</warn>. Let me test this credential. The login redirects to <badge>/password/test</badge>. Let me follow that path and explore it.',
    },
    {
        timestamp: '09:04:00',
        message:
            "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to <warn>'#'</warn> which means the current page. Let me try a different approach.",
    },
    {
        timestamp: '09:05:00',
        message:
            'It redirects back to /password/test. Let me check if there\'s an /api endpoint or look for other paths. Let me also try exploring with the <link>test:test</link> password directly on other endpoints.',
    },
    {
        timestamp: '09:06:00',
        message:
            'Great! I can access the dashboard using the <badge>\'X-UserId: 10032\'</badge> header. The dashboard shows "Welcome, John Doe". This suggests an <warn>**IDOR vulnerability**</warn> - I can access any user\'s dashboard by just changing the X-UserId header. Let me explore more of the application...',
    },
];

export const findings = [
    {
        id: 'finding-001',
        severity: 'Critical',
        timestamp: '10:45:23',
        title: 'SQL Injection in Authentication Endpoint',
        endpoint: '/api/users/profile',
        description:
            'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.',
    },
    {
        id: 'finding-002',
        severity: 'High',
        timestamp: '10:45:23',
        title: 'Unauthorized Access to User Metadata',
        endpoint: '/api/auth/login',
        description:
            'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.',
    },
    {
        id: 'finding-003',
        severity: 'Medium',
        timestamp: '10:45:23',
        title: 'Broken Authentication Rate Limiting',
        endpoint: '/api/search',
        description:
            'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',
    },
];

export const scanStats = {
    subAgents: 0,
    parallelExecutions: 2,
    operations: 1,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
};
