import { motion } from 'framer-motion';
import { Navigation2, Shield } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { MapView } from '../components/MapView';
import { SafePlaceCard } from '../components/SafePlaceCard';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { mockSafeZones, mockSafePlaces } from '../data/mockData';
import type { SafePlace } from '../types';

export default function LocationPage() {
    const { currentLocation, isLocationSharing, toggleLocationSharing, contacts } = useApp();
    const { t } = useLanguage();

    const handleGetDirections = (place: SafePlace) => {
        // In production, this would open Google Maps or similar
        const url = `https://www.google.com/maps/dir/?api=1&destination=${place.location.lat},${place.location.lng}`;
        window.open(url, '_blank');
    };

    const userLocationCoords: [number, number] = currentLocation
        ? [currentLocation.latitude, currentLocation.longitude]
        : [22.7196, 75.8577]; // Indore, India

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-20 md:pl-20 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('location_safety')}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t('share_location')}
                    </p>
                </div>

                {/* Location Sharing Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Card variant="glass">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isLocationSharing
                                    ? 'bg-safe-100 dark:bg-safe-900/20 text-safe-600'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600'
                                    }`}>
                                    <Navigation2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {t('live_location_sharing')}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {isLocationSharing
                                            ? t('sharing_with_contacts').replace('{count}', contacts.length.toString())
                                            : t('share_realtime_location')}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant={isLocationSharing ? 'danger' : 'primary'}
                                onClick={toggleLocationSharing}
                            >
                                {isLocationSharing ? t('stop_sharing') : t('start_sharing')}
                            </Button>
                        </div>
                    </Card>
                </motion.div>

                {/* Map */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <Card>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {t('safety_map')}
                            </h3>
                            <div className="flex gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-safe-500" />
                                    <span className="text-gray-600 dark:text-gray-400">{t('safe_zones')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-danger-500" />
                                    <span className="text-gray-600 dark:text-gray-400">{t('unsafe_zones')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[500px]">
                            <MapView
                                center={userLocationCoords}
                                zoom={13}
                                safeZones={mockSafeZones}
                                safePlaces={mockSafePlaces}
                                userLocation={userLocationCoords}
                            />
                        </div>
                    </Card>
                </motion.div>

                {/* Nearby Safe Places */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Shield className="w-6 h-6 text-safe-600" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('nearby_safe_places')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockSafePlaces.map((place, index) => (
                            <motion.div
                                key={place.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                            >
                                <SafePlaceCard
                                    place={place}
                                    onGetDirections={handleGetDirections}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
