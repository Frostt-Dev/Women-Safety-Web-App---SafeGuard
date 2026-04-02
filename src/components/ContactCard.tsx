import { Phone, Mail, Edit2, Trash2, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Contact } from '../types';
import { getInitials, getAvatarColor } from '../utils/helpers';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from './Card';

interface ContactCardProps {
    contact: Contact;
    onEdit?: (contact: Contact) => void;
    onRemove?: (id: string) => void;
}

export function ContactCard({ contact, onEdit, onRemove }: ContactCardProps) {
    const { t, language } = useLanguage();
    return (
        <Card variant="default" className="relative overflow-hidden">
            {contact.isPrimary && (
                <div className="absolute top-3 right-3">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
            )}

            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className={`w-16 h-16 rounded-full ${getAvatarColor(contact.name)} flex items-center justify-center flex-shrink-0`}>
                    {contact.avatar ? (
                        <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <span className="text-white font-bold text-xl">
                            {getInitials(contact.name)}
                        </span>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                        {language === 'hi' ? contact.name_hi || contact.name : contact.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {t(contact.relationship.toLowerCase().replace(' ', '_'))}
                    </p>

                    <div className="space-y-1">
                        <a
                            href={`tel:${contact.phone}`}
                            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                            <Phone className="w-4 h-4" />
                            {contact.phone}
                        </a>
                        {contact.email && (
                            <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                {contact.email}
                            </a>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    {onEdit && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onEdit(contact)}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            aria-label="Edit contact"
                        >
                            <Edit2 className="w-4 h-4" />
                        </motion.button>
                    )}
                    {onRemove && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onRemove(contact.id)}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-danger-100 dark:hover:bg-danger-900/30 hover:text-danger-600 dark:hover:text-danger-400 transition-colors"
                            aria-label="Remove contact"
                        >
                            <Trash2 className="w-4 h-4" />
                        </motion.button>
                    )}
                </div>
            </div>
        </Card>
    );
}
