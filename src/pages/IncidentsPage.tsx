import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { generateId, formatDateTime } from '../utils/helpers';
import type { Incident } from '../types';

const incidentTypes = ['harassment', 'suspicious_activity', 'assault', 'other'];
const severityLevels = ['low', 'medium', 'high'];

export default function IncidentsPage() {
    const { incidents, addIncident, currentLocation } = useApp();
    const { t, language } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'harassment' as Incident['type'],
        severity: 'medium' as Incident['severity'],
        isAnonymous: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newIncident: Incident = {
            id: generateId(),
            ...formData,
            location: {
                lat: currentLocation?.latitude || 22.7196,
                lng: currentLocation?.longitude || 75.8577,
            },
            timestamp: new Date(),
            status: 'reported',
            reportedBy: formData.isAnonymous ? undefined : t('you'),
        };

        addIncident(newIncident);
        setIsModalOpen(false);
        setFormData({
            title: '',
            description: '',
            type: 'harassment',
            severity: 'medium',
            isAnonymous: false,
        });
    };

    const severityColors = {
        low: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
        medium: 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400',
        high: 'bg-danger-100 dark:bg-danger-900/20 text-danger-700 dark:text-danger-400',
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-20 md:pl-20 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {t('incident_reports')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('report_incident')}
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        icon={<Plus className="w-5 h-5" />}
                    >
                        {t('report_incident')}
                    </Button>
                </div>

                {/* Incidents List */}
                <div className="space-y-6">
                    {incidents.map((incident, index) => (
                        <motion.div
                            key={incident.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card hover>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className={`w-12 h-12 rounded-full ${severityColors[incident.severity]} flex items-center justify-center`}>
                                            <AlertTriangle className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                    {language === 'hi' ? incident.title_hi || incident.title : incident.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs rounded-full capitalize">
                                                        {t(incident.type)}
                                                    </span>
                                                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${severityColors[incident.severity]}`}>
                                                        {t(incident.severity)}
                                                    </span>
                                                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full capitalize">
                                                        {t(incident.status)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                                            {language === 'hi' ? incident.description_hi || incident.description : incident.description}
                                        </p>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {formatDateTime(incident.timestamp)}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {language === 'hi' ? incident.location.address_hi || incident.location.address : incident.location.address || `${incident.location.lat.toFixed(4)}, ${incident.location.lng.toFixed(4)}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {incidents.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                            {t('no_incidents')}
                        </p>
                        <Button onClick={() => setIsModalOpen(true)}>
                            {t('report_incident')}
                        </Button>
                    </div>
                )}

                {/* Report Incident Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={t('report_incident')}
                    size="lg"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('incident_title')} *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('description')} *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t('type')} *
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Incident['type'] })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                >
                                    {incidentTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {t(type)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t('severity')} *
                                </label>
                                <select
                                    value={formData.severity}
                                    onChange={(e) => setFormData({ ...formData, severity: e.target.value as Incident['severity'] })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                >
                                    {severityLevels.map((level) => (
                                        <option key={level} value={level}>
                                            {t(level)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isAnonymous"
                                checked={formData.isAnonymous}
                                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="isAnonymous" className="text-sm text-gray-700 dark:text-gray-300">
                                {t('report_anonymously')}
                            </label>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                {t('submit_report')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                            >
                                {t('cancel')}
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
}
