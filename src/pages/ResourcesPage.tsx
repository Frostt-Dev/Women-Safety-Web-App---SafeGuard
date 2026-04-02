import { motion } from 'framer-motion';
import { Shield, BookOpen, Phone, Scale, Video } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/Card';
import { safetyResources, helplines, selfDefenceVideos } from '../data/mockData';

const categoryIcons = {
    self_defense: Shield,
    safety_tips: BookOpen,
    legal_rights: Scale,
    helpline: Phone,
};

const categoryColors = {
    self_defense: 'bg-primary-100 dark:bg-primary-900/20 text-primary-600',
    safety_tips: 'bg-accent-100 dark:bg-accent-900/20 text-accent-600',
    legal_rights: 'bg-secondary-100 dark:bg-secondary-900/20 text-secondary-600',
    helpline: 'bg-safe-100 dark:bg-safe-900/20 text-safe-600',
};



export default function ResourcesPage() {
    const { t, language } = useLanguage();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-20 md:pl-20 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('safety_resources')}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t('resources_desc')}
                    </p>
                </div>

                {/* Helplines Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Phone className="w-6 h-6 text-danger-600" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('emergency_helplines')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {helplines.map((helpline, index) => (
                            <motion.div
                                key={helpline.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card hover className="h-full">
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="font-bold text-gray-900 dark:text-white">
                                                {language === 'hi' ? helpline.name_hi || helpline.name : helpline.name}
                                            </h3>
                                            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs rounded-full">
                                                {helpline.category.replace('_', ' ')}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex-1">
                                            {language === 'hi' ? helpline.description_hi || helpline.description : helpline.description}
                                        </p>

                                        <div className="space-y-2">
                                            <a
                                                href={`tel:${helpline.number.replace(/[^0-9+]/g, '')}`}
                                                className="block w-full px-4 py-2 bg-danger-600 text-white rounded-lg font-medium text-center hover:bg-danger-700 transition-colors"
                                            >
                                                {helpline.number}
                                            </a>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                                {language === 'hi' ? helpline.availability_hi || helpline.availability : helpline.availability}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Self Defence Videos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Video className="w-6 h-6 text-primary-600" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('self_defence_videos')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selfDefenceVideos.map((video, index) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + index * 0.05 }}
                            >
                                <Card hover className="h-full overflow-hidden flex flex-col">
                                    <div className="relative pt-[56.25%] bg-black">
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full"
                                            src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                            {language === 'hi' ? video.title_hi || video.title : video.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                            {language === 'hi' ? video.description_hi || video.description : video.description}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Safety Resources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-2 mb-6">
                        <BookOpen className="w-6 h-6 text-accent-600" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('safety_guides_tips')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {safetyResources.map((resource, index) => {
                            const Icon = categoryIcons[resource.category];
                            const colorClass = categoryColors[resource.category];

                            return (
                                <motion.div
                                    key={resource.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.05 }}
                                >
                                    <Card hover className="h-full">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0`}>
                                                <Icon className="w-6 h-6" />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                                    {language === 'hi' ? resource.title_hi || resource.title : resource.title}
                                                </h3>
                                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                                        {(language === 'hi' ? resource.content_hi || resource.content : resource.content).split('\n').map((line, i) => (
                                                            <p key={i} className="mb-2">
                                                                {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
                                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                                        return <strong key={j}>{part.slice(2, -2)}</strong>;
                                                                    }
                                                                    return part;
                                                                })}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                                {resource.externalLink && (
                                                    <a
                                                        href={resource.externalLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block mt-4 text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
                                                    >
                                                        {t('learn_more')} →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
