import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Sidebar.css';

const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'Projects', path: '#', icon: 'projects' },
    { label: 'Scans', path: '#', icon: 'scans' },
    { label: 'Schedule', path: '#', icon: 'schedule' },
];

const bottomItems = [
    { label: 'Notifications', path: '#', icon: 'notifications' },
    { label: 'Settings', path: '#', icon: 'settings' },
    { label: 'Support', path: '#', icon: 'support' },
];

const icons = {
    dashboard: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    ),
    projects: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
        </svg>
    ),
    scans: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    schedule: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    notifications: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
    ),
    settings: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
    ),
    support: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    ),
};

function Sidebar({ isOpen, onClose }) {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const isActive = (path) => {
        if (path === '#') return false;
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <>
            {/* Mobile overlay */}
            <div
                className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--visible' : ''}`}
                onClick={onClose}
            />

            <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
                {/* Logo */}
                <div className="sidebar__logo">
                    <span className="sidebar__logo-dot" />
                    <span className="sidebar__logo-text">aps</span>
                </div>

                {/* Main nav */}
                <nav className="sidebar__nav">
                    <div className="sidebar__group">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                className={`sidebar__link ${isActive(item.path) ? 'sidebar__link--active' : ''}`}
                                onClick={onClose}
                            >
                                <span className="sidebar__link-icon">{icons[item.icon]}</span>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="sidebar__group sidebar__group--bottom">
                        {bottomItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                className={`sidebar__link ${isActive(item.path) ? 'sidebar__link--active' : ''}`}
                                onClick={onClose}
                            >
                                <span className="sidebar__link-icon">{icons[item.icon]}</span>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Theme toggle */}
                    <button className="sidebar__theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                        <span className="sidebar__theme-icon">
                            {theme === 'dark' ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                                </svg>
                            )}
                        </span>
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </nav>

                {/* User profile */}
                <div className="sidebar__user">
                    <div className="sidebar__user-avatar">AK</div>
                    <div className="sidebar__user-info">
                        <div className="sidebar__user-email">admin@edu.com</div>
                        <div className="sidebar__user-role">Security Lead</div>
                    </div>
                    <span className="sidebar__user-arrow">›</span>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
