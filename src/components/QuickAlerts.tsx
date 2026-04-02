import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, AlertTriangle, Eye, MapPin } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { sendQuickAlert } from '../utils/mockApi';
import { quickAlertMessages } from '../data/mockData';

const iconMap = {
    phone: Phone,
    'alert-triangle': AlertTriangle,
    eye: Eye,
    'map-pin': MapPin,
};

export function QuickAlerts() {
    const { contacts, addActivity } = useApp();
    const { t } = useLanguage();
    const [sendingId, setSendingId] = useState<string | null>(null);

    const handleSendAlert = async (alertId: string, message: string) => {
        setSendingId(alertId);

        const contactIds = contacts.map(c => c.id);
        const result = await sendQuickAlert(contactIds, message);

        if (result.success) {
            const messageKey = alertId.replace('alert-', 'alert_msg_');
            addActivity({
                id: Date.now().toString(),
                type: 'alert_sent',
                title: 'Quick Alert Sent',
                description: message,
                translationKey: 'quick_alert_sent',
                translationParams: { message, messageKey },
                timestamp: new Date(),
            });
        }

        setSendingId(null);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickAlertMessages.map((alert) => {
                const Icon = iconMap[alert.icon as keyof typeof iconMap] || AlertTriangle;
                const isSending = sendingId === alert.id;
                // Map alert-1 to alert_msg_1, etc.
                const translationKey = alert.id.replace('alert-', 'alert_msg_');
                const translatedMessage = t(translationKey);

                return (
                    <motion.button
                        key={alert.id}
                        onClick={() => handleSendAlert(alert.id, translatedMessage)}
                        disabled={isSending}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                            {isSending ? (
                                <div className="w-5 h-5 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                            ) : (
                                <Icon className="w-5 h-5" />
                            )}
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white flex-1">
                            {translatedMessage}
                        </p>
                    </motion.button>
                );
            })}
        </div>
    );
}
