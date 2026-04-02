import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PhoneOff, Mic, Volume2, Grid, User, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';


export default function OngoingCallPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const caller = location.state?.caller || { name: 'Unknown Caller' };
    const [duration, setDuration] = useState(0);
    const { theme } = useTheme();
    const { t, language } = useLanguage();


    useEffect(() => {
        const timer = setInterval(() => {
            setDuration((prev) => prev + 1);
        }, 1000);

        // Automated Voice
        const speak = () => {
            if ('speechSynthesis' in window) {
                const text = t('fake_call_message');
                const utterance = new SpeechSynthesisUtterance(text);

                if (language === 'hi') {
                    utterance.lang = 'hi-IN';
                    // Try to find a Hindi voice
                    const voices = window.speechSynthesis.getVoices();
                    const hindiVoice = voices.find(v => v.lang.includes('hi') || v.name.includes('Hindi'));
                    if (hindiVoice) {
                        utterance.voice = hindiVoice;
                    }
                } else {
                    utterance.lang = 'en-US';
                    const voices = window.speechSynthesis.getVoices();
                    const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google US English'));
                    if (femaleVoice) utterance.voice = femaleVoice;
                }

                utterance.rate = 0.9;
                utterance.pitch = 1.1;
                window.speechSynthesis.speak(utterance);
            }
        };

        // Small delay before speaking to simulate connection
        const speechTimeout = setTimeout(speak, 1000);

        return () => {
            clearInterval(timer);
            clearTimeout(speechTimeout);
            window.speechSynthesis.cancel();
        };
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEndCall = () => {
        navigate('/dashboard');
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-between py-12 px-4 relative overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            {/* Casual Background - Soft Gradient */}
            <div className={`absolute inset-0 z-0 ${theme === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-blue-50 to-indigo-100'}`} />

            {/* Caller Info */}
            <div className="z-10 flex flex-col items-center gap-4 mt-8">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center border-2 shadow-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-white'}`}>
                    {caller.avatar ? (
                        <img src={caller.avatar} alt={caller.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <User className={`w-12 h-12 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    )}
                </div>
                <div className="text-center">
                    <h2 className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{caller.name}</h2>
                    <p className={`text-xl font-mono ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{formatTime(duration)}</p>
                </div>
            </div>

            {/* Call Controls */}
            <div className="z-10 w-full max-w-sm grid grid-cols-3 gap-8 mb-8">
                <button className={`flex flex-col items-center gap-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`}>
                    <div className={`w-14 h-14 rounded-full shadow-sm flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <Mic className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium">{t('mute')}</span>
                </button>
                <button className={`flex flex-col items-center gap-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`}>
                    <div className={`w-14 h-14 rounded-full shadow-sm flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <Grid className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium">{t('keypad')}</span>
                </button>
                <button className={`flex flex-col items-center gap-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`}>
                    <div className={`w-14 h-14 rounded-full shadow-sm flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <Volume2 className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium">{t('speaker')}</span>
                </button>
                <button className={`flex flex-col items-center gap-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`}>
                    <div className={`w-14 h-14 rounded-full shadow-sm flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <Video className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium">{t('video')}</span>
                </button>
                <button className={`flex flex-col items-center gap-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`}>
                    <div className={`w-14 h-14 rounded-full shadow-sm flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <User className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium">{t('contacts')}</span>
                </button>
                <button className={`flex flex-col items-center gap-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`}>
                    <div className={`w-14 h-14 rounded-full shadow-sm flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <User className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium">{t('add_call')}</span>
                </button>
            </div>

            {/* End Call Button */}
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="z-10 mb-8"
            >
                <button
                    onClick={handleEndCall}
                    className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                >
                    <PhoneOff className="w-10 h-10 text-white" />
                </button>
            </motion.div>
        </div>
    );
}
