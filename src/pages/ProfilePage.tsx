import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Edit2, Save } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getInitials, getAvatarColor } from '../utils/helpers';

export default function ProfilePage() {
    const { user, setUser } = useApp();
    const { theme, toggleTheme } = useTheme();
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        emergencyMessage: user?.emergencyMessage || t('default_emergency_message'),
    });

    const handleSave = () => {
        if (user) {
            setUser({
                ...user,
                ...formData,
            });
        }
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-20 md:pl-20 md:pb-8">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('my_profile')}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t('manage_profile_desc')}
                    </p>
                </div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Card variant="glass">
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                            {/* Avatar */}
                            <div className={`w-24 h-24 rounded-full ${getAvatarColor(user?.name || 'User')} flex items-center justify-center flex-shrink-0`}>
                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white font-bold text-3xl">
                                        {getInitials(user?.name || 'User')}
                                    </span>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    {user?.name || 'User'}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {t('member_since')} {new Date().toLocaleDateString()}
                                </p>

                                {!isEditing && (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        variant="outline"
                                        icon={<Edit2 className="w-4 h-4" />}
                                    >
                                        {t('edit_profile')}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Profile Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <Card>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                            {t('personal_info')}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <User className="w-4 h-4 inline mr-2" />
                                    {t('full_name')}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                ) : (
                                    <p className="text-gray-900 dark:text-white">{user?.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    {t('email')}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                ) : (
                                    <p className="text-gray-900 dark:text-white">{user?.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    <Phone className="w-4 h-4 inline mr-2" />
                                    {t('phone')}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                ) : (
                                    <p className="text-gray-900 dark:text-white">{user?.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t('emergency_message')}
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={formData.emergencyMessage}
                                        onChange={(e) => setFormData({ ...formData, emergencyMessage: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                    />
                                ) : (
                                    <p className="text-gray-900 dark:text-white">
                                        {user?.emergencyMessage || t('default_emergency_message')}
                                    </p>
                                )}
                            </div>

                            {isEditing && (
                                <div className="flex gap-3 pt-4">
                                    <Button onClick={handleSave} icon={<Save className="w-4 h-4" />}>
                                        {t('save_changes')}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setFormData({
                                                name: user?.name || '',
                                                email: user?.email || '',
                                                phone: user?.phone || '',
                                                emergencyMessage: user?.emergencyMessage || '',
                                            });
                                        }}
                                    >
                                        {t('cancel')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>

                {/* Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <Card>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                            {t('app_settings')}
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {t('dark_mode')}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {theme === 'dark' ? t('enabled') : t('disabled')}
                                    </p>
                                </div>
                                <button
                                    onClick={toggleTheme}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-primary-600' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
