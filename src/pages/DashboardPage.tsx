import { motion } from 'framer-motion';
import { Shield, Users, MapPin, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SosButton } from '../components/SosButton';
import { QuickAlerts } from '../components/QuickAlerts';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { Card } from '../components/Card';

export default function DashboardPage() {
    const { user, contacts, activities, isLocationSharing } = useApp();
    const { t } = useLanguage();

    const stats = [
        {
            label: t('trusted_contacts'),
            value: contacts.length,
            icon: Users,
            color: 'text-primary-600 bg-primary-100 dark:bg-primary-900/20',
        },
        {
            label: t('location_sharing'),
            value: isLocationSharing ? t('active') : t('inactive'),
            icon: MapPin,
            color: 'text-accent-600 bg-accent-100 dark:bg-accent-900/20',
        },
        {
            label: t('safety_score'),
            value: '95%',
            icon: Shield,
            color: 'text-safe-600 bg-safe-100 dark:bg-safe-900/20',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-20 md:pl-20 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('welcome')} {user?.name || t('you')}! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t('share_location')}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {stat.label}
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - SOS & Quick Alerts */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* SOS Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Card variant="glass" className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {t('sos_button')}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    {t('press_and_hold')}
                                </p>
                                <div className="flex justify-center">
                                    <SosButton />
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                                    {t('live_location_sharing')}
                                </p>
                            </Card>
                        </motion.div>

                        {/* Quick Alerts */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {t('quick_alerts')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {t('safety_alerts')}
                                </p>
                                <QuickAlerts />
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column - Activity Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card variant="glass" className="sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {t('recent_activity')}
                                </h3>
                                <TrendingUp className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                            </div>
                            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                                <ActivityTimeline activities={activities} maxItems={15} />
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
