import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Phone, MapPin } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { sendEmergencyAlert } from '../utils/mockApi';
import { Modal } from './Modal';

export function SosButton() {
    const { contacts, currentLocation, addActivity } = useApp();
    const { t } = useLanguage();
    const [isPressed, setIsPressed] = useState(false);
    const [countdown, setCountDown] = useState(3);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertSent, setAlertSent] = useState(false);

    const handlePress = () => {
        setIsPressed(true);
        setIsModalOpen(true);

        // Start countdown
        let count = 3;
        setCountDown(count);

        const interval = setInterval(() => {
            count--;
            setCountDown(count);

            if (count === 0) {
                clearInterval(interval);
                sendAlert();
            }
        }, 1000);
    };

    const sendAlert = async () => {
        const emergencyContacts = contacts.filter(c => c.isPrimary).map(c => c.id);

        if (currentLocation) {
            // Send emergency alert to all emergency contacts
            const result = await sendEmergencyAlert(
                emergencyContacts.length > 0 ? emergencyContacts : contacts.map(c => c.id),
                t('default_emergency_message'),
                { lat: currentLocation.latitude, lng: currentLocation.longitude }
            );

            if (result.success) {
                setAlertSent(true);

                // Add to activity log
                addActivity({
                    id: Date.now().toString(),
                    type: 'sos',
                    title: 'Emergency SOS Activated',
                    description: `Alert sent to ${(emergencyContacts.length || contacts.length)} contacts`,
                    translationKey: 'emergency_sos_activated',
                    translationParams: { count: (emergencyContacts.length || contacts.length).toString() },
                    timestamp: new Date(),
                });

                // Reset after showing success
                setTimeout(() => {
                    setIsPressed(false);
                    setAlertSent(false);
                    setIsModalOpen(false);
                }, 3000);
            }
        }
    };

    const cancelAlert = () => {
        setIsPressed(false);
        setIsModalOpen(false);
        setCountDown(3);
    };

    return (
        <>
            {/* SOS Button */}
            <motion.button
                onClick={handlePress}
                className="relative w-48 h-48 rounded-full gradient-primary text-white shadow-2xl sos-pulse"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isPressed}
            >
                <div className="flex flex-col items-center justify-center gap-2">
                    <AlertCircle className="w-16 h-16" />
                    <span className="text-3xl font-bold">SOS</span>
                    <span className="text-sm font-medium">{t('emergency')}</span>
                </div>
            </motion.button>

            {/* Countdown & Confirmation Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={cancelAlert}
                title={alertSent ? t('alert_sent_title') : t('emergency_alert')}
                size="md"
                showCloseButton={!alertSent}
            >
                {!alertSent ? (
                    <div className="text-center space-y-6">
                        {countdown > 0 ? (
                            <>
                                <div className="text-6xl font-bold text-primary-600 dark:text-primary-400">
                                    {countdown}
                                </div>
                                <p className="text-lg text-gray-700 dark:text-gray-300">
                                    {t('sending_in')} {countdown} {t('seconds')}...
                                </p>
                                <div className="space-y-3 text-left bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Phone className="w-4 h-4" />
                                        {t('alert_desc')}
                                    </p>
                                    <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <MapPin className="w-4 h-4" />
                                        {t('location_desc')}
                                    </p>
                                </div>
                                <button
                                    onClick={cancelAlert}
                                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    {t('cancel')}
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center justify-center py-8">
                                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center space-y-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 mx-auto bg-safe-500 rounded-full flex items-center justify-center"
                        >
                            <motion.svg
                                className="w-12 h-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </motion.svg>
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('alert_sent_title')}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('alert_sent_desc')}
                        </p>
                    </div>
                )}
            </Modal>
        </>
    );
}
