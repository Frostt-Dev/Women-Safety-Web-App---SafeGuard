import { AlertCircle, MessageSquare, MapPin, UserPlus, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Activity } from '../types';
import { getRelativeTime } from '../utils/helpers';
import { useLanguage } from '../contexts/LanguageContext';

interface ActivityTimelineProps {
    activities: Activity[];
    maxItems?: number;
}

const activityIcons = {
    sos: AlertCircle,
    alert_sent: MessageSquare,
    location_shared: MapPin,
    contact_added: UserPlus,
    incident_reported: FileText,
};

const activityColors = {
    sos: 'text-danger-600 bg-danger-100 dark:bg-danger-900/20',
    alert_sent: 'text-secondary-600 bg-secondary-100 dark:bg-secondary-900/20',
    location_shared: 'text-accent-600 bg-accent-100 dark:bg-accent-900/20',
    contact_added: 'text-safe-600 bg-safe-100 dark:bg-safe-900/20',
    incident_reported: 'text-primary-600 bg-primary-100 dark:bg-primary-900/20',
};

export function ActivityTimeline({ activities, maxItems = 10 }: ActivityTimelineProps) {
    const { language, t } = useLanguage();
    const displayedActivities = activities.slice(0, maxItems);

    return (
        <div className="space-y-4">
            {displayedActivities.map((activity, index) => {
                const Icon = activityIcons[activity.type];
                const colorClass = activityColors[activity.type];

                return (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-3 items-start"
                    >
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${colorClass} flex items-center justify-center`}>
                            <Icon className="w-5 h-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                    {activity.translationKey ? t(activity.translationKey) : (language === 'hi' ? activity.title_hi || activity.title : activity.title)}
                                </h4>
                                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                    {getRelativeTime(activity.timestamp)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                                {activity.translationKey === 'emergency_sos_activated'
                                    ? t('alert_sent_to_contacts').replace('{count}', activity.translationParams?.count || '0')
                                    : activity.translationKey === 'quick_alert_sent' && activity.translationParams?.messageKey
                                        ? t(activity.translationParams.messageKey)
                                        : (language === 'hi' ? activity.description_hi || activity.description : activity.description)}
                            </p>
                        </div>
                    </motion.div>
                );
            })}

            {activities.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>No recent activities</p>
                </div>
            )}
        </div>
    );
}
