import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Shield, Users, MapPin, AlertCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';



export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const navigate = useNavigate();
    const { completeOnboarding } = useApp();
    const { t } = useLanguage();

    const onboardingSteps = [
        {
            title: t('welcome_safeguard'),
            description: t('welcome_desc'),
            icon: Shield,
            gradient: 'from-primary-500 to-primary-700',
        },
        {
            title: t('emergency_contacts_title'),
            description: t('emergency_contacts_desc'),
            icon: Users,
            gradient: 'from-secondary-500 to-secondary-700',
        },
        {
            title: t('location_sharing_title'),
            description: t('location_sharing_desc'),
            icon: MapPin,
            gradient: 'from-accent-500 to-accent-700',
        },
        {
            title: t('quick_sos_title'),
            description: t('quick_sos_desc'),
            icon: AlertCircle,
            gradient: 'from-danger-500 to-danger-700',
        },
    ];

    const isLastStep = currentStep === onboardingSteps.length;
    const currentOnboarding = onboardingSteps[currentStep];

    const handleNext = () => {
        if (currentStep < onboardingSteps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleComplete = () => {
        if (userData.name && userData.email && userData.phone) {
            completeOnboarding({
                id: Date.now().toString(),
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                hasCompletedOnboarding: true,
            });
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <AnimatePresence mode="wait">
                    {!isLastStep ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-center"
                        >
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className={`w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br ${currentOnboarding.gradient} flex items-center justify-center shadow-2xl`}
                            >
                                <currentOnboarding.icon className="w-16 h-16 text-white" />
                            </motion.div>

                            {/* Content */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                            >
                                {currentOnboarding.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl text-gray-600 dark:text-gray-300 mb-12"
                            >
                                {currentOnboarding.description}
                            </motion.p>

                            {/* Progress Dots */}
                            <div className="flex justify-center gap-2 mb-8">
                                {onboardingSteps.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === currentStep
                                            ? 'w-8 bg-primary-600'
                                            : index < currentStep
                                                ? 'w-2 bg-primary-400'
                                                : 'w-2 bg-gray-300 dark:bg-gray-600'
                                            }`}
                                    />
                                ))}
                            </div>

                            <Button
                                onClick={handleNext}
                                size="lg"
                                icon={<ChevronRight className="w-5 h-5" />}
                                className="px-8"
                            >
                                {currentStep === onboardingSteps.length - 1 ? t('get_started') : t('next')}
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-strong rounded-2xl p-8 shadow-2xl"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                                {t('create_profile')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                                {t('profile_setup_desc')}
                            </p>

                            <form onSubmit={(e) => { e.preventDefault(); handleComplete(); }} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {t('full_name')}
                                    </label>
                                    <input
                                        type="text"
                                        value={userData.name}
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder={t('enter_name')}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {t('email')}
                                    </label>
                                    <input
                                        type="email"
                                        value={userData.email}
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder={t('enter_email')}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {t('phone')}
                                    </label>
                                    <input
                                        type="tel"
                                        value={userData.phone}
                                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder={t('enter_phone')}
                                        required
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full">
                                    {t('complete_setup')}
                                </Button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
