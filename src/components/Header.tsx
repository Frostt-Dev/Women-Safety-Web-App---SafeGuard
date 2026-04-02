import { Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

export function Header() {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [showLangMenu, setShowLangMenu] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 md:left-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 z-30 px-4 md:px-8 h-16">
            <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
                {/* Logo & Title */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold text-gradient-rainbow">
                        {t('app_name')}
                    </h1>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Change language"
                        >
                            <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>

                        {showLangMenu && (
                            <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[120px]">
                                <button
                                    onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${language === 'en' ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => { setLanguage('hi'); setShowLangMenu(false); }}
                                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${language === 'hi' ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    हिंदी
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        ) : (
                            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
