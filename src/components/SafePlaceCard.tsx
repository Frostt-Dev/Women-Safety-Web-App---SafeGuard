import { Phone, MapPin, Navigation, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SafePlace } from '../types';
import { formatDistance } from '../utils/helpers';
import { Card } from './Card';
import { useLanguage } from '../contexts/LanguageContext';

const placeIcons = {
    police: '🚔',
    hospital: '🏥',
    shelter: '🏠',
    other: '📍',
};

interface SafePlaceCardProps {
    place: SafePlace;
    onGetDirections?: (place: SafePlace) => void;
}

export function SafePlaceCard({ place, onGetDirections }: SafePlaceCardProps) {
    const { t, language } = useLanguage();
    const icon = placeIcons[place.type];

    const name = language === 'hi' ? place.name_hi || place.name : place.name;
    const address = language === 'hi' ? place.address_hi || place.address : place.address;

    return (
        <Card variant="default" hover>
            <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-safe-100 dark:bg-safe-900/20 flex items-center justify-center text-2xl">
                    {icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                {name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                {place.type.replace('_', ' ')}
                            </p>
                        </div>
                        {place.distance !== undefined && (
                            <span className="text-sm font-medium text-accent-600 dark:text-accent-400">
                                {formatDistance(place.distance)}
                            </span>
                        )}
                    </div>

                    <div className="mt-2 space-y-1">
                        <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="w-3 h-3" />
                            {address}
                        </p>
                        {place.phone && (
                            <a
                                href={`tel:${place.phone}`}
                                className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:underline"
                            >
                                <Phone className="w-3 h-3" />
                                {place.phone}
                            </a>
                        )}
                        {place.isOpen24Hours && (
                            <p className="flex items-center gap-1 text-sm text-safe-600 dark:text-safe-400">
                                <Clock className="w-3 h-3" />
                                {t('open_24_7')}
                            </p>
                        )}
                    </div>

                    {onGetDirections && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onGetDirections(place)}
                            className="mt-3 flex items-center gap-2 px-4 py-2 bg-accent-600 text-white rounded-lg text-sm font-medium hover:bg-accent-700 transition-colors"
                        >
                            <Navigation className="w-4 h-4" />
                            {t('get_directions')}
                        </motion.button>
                    )}
                </div>
            </div>
        </Card>
    );
}
