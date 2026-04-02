import { NavLink } from 'react-router-dom';
import { Home, Users, MapPin, FileText, BookOpen, MessageSquare, User, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/helpers';
import { useLanguage } from '../contexts/LanguageContext';

const navItems = [
    { to: '/dashboard', icon: Home, label: 'home' },
    { to: '/fake-call-incoming', icon: Phone, label: 'fake_call' },
    { to: '/contacts', icon: Users, label: 'contacts' },
    { to: '/location', icon: MapPin, label: 'location' },
    { to: '/incidents', icon: FileText, label: 'incidents' },
    { to: '/resources', icon: BookOpen, label: 'resources' },
    { to: '/community', icon: MessageSquare, label: 'community' },
    { to: '/profile', icon: User, label: 'profile' },
];

export function Navigation() {
    const { t } = useLanguage();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40 md:top-0 md:left-0 md:bottom-auto md:w-20 md:border-t-0 md:border-r">
            <div className="flex md:flex-col items-center justify-around md:justify-start md:py-6 md:gap-2 h-16 md:h-screen">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            cn(
                                'flex flex-col md:flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors relative group',
                                isActive
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400'
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
                                        transition={{ type: 'spring', duration: 0.5 }}
                                    />
                                )}
                                <item.icon className="w-5 h-5 relative z-10" />
                                <span className="text-xs font-medium relative z-10 hidden md:block capitalize">
                                    {t(item.label)}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
