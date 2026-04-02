import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, PhoneOff, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function IncomingCallPage() {
    const navigate = useNavigate();
    const { contacts } = useApp();
    const { theme } = useTheme();
    const { t, language } = useLanguage();

    // Initialize caller state immediately to prevent blink
    const [caller] = useState(() => {
        if (contacts.length > 0) {
            const randomIndex = Math.floor(Math.random() * contacts.length);
            return contacts[randomIndex];
        }
        return { name: 'Unknown Caller', name_hi: 'अज्ञात कॉलर', avatar: undefined, id: 'unknown', phone: '', relationship: '' };
    });

    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        const playRingingSound = () => {
            try {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                const ctx = new AudioContext();
                audioContextRef.current = ctx;

                // Function to play a single "trill" segment
                const playTrill = (startTime: number) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();

                    // Digital phone sound characteristics
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(1000, startTime);

                    // Modulate frequency for a "warble" effect
                    const modulator = ctx.createOscillator();
                    const modGain = ctx.createGain();
                    modulator.frequency.value = 25; // 25Hz trill
                    modGain.gain.value = 50; // Modulation depth

                    modulator.connect(modGain);
                    modGain.connect(osc.frequency);

                    osc.connect(gain);
                    gain.connect(ctx.destination);

                    // Envelope
                    gain.gain.setValueAtTime(0, startTime);
                    gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
                    gain.gain.setValueAtTime(0.1, startTime + 1.5); // Ring duration
                    gain.gain.linearRampToValueAtTime(0, startTime + 2.0);

                    osc.start(startTime);
                    modulator.start(startTime);

                    osc.stop(startTime + 2.0);
                    modulator.stop(startTime + 2.0);
                };

                // Initial ring
                playTrill(ctx.currentTime);

                // Loop every 3 seconds
                const interval = setInterval(() => {
                    if (ctx.state === 'closed') return;
                    playTrill(ctx.currentTime);
                }, 3000);

                return () => clearInterval(interval);

            } catch (e) {
                console.error("Audio setup failed", e);
            }
        };

        const cleanup = playRingingSound();

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (cleanup && typeof cleanup === 'function') cleanup();
        };
    }, []);

    const handleAccept = () => {
        navigate('/fake-call-ongoing', { state: { caller } });
    };

    const handleDecline = () => {
        navigate('/dashboard');
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-between py-20 px-4 relative overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            {/* Casual Background - Soft Gradient */}
            <div className={`absolute inset-0 z-0 ${theme === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-blue-50 to-indigo-100'}`} />

            {/* Caller Info */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 flex flex-col items-center gap-6 mt-10"
            >
                <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 shadow-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-white'}`}>
                    {caller.avatar ? (
                        <img src={caller.avatar} alt={caller.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <User className={`w-16 h-16 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    )}
                </div>
                <div className="text-center">
                    <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        {language === 'hi' ? caller.name_hi || caller.name : caller.name}
                    </h2>
                    <p className={`text-lg animate-pulse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t('incoming_call')}</p>
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 w-full max-w-sm flex justify-between items-center px-8 mb-10"
            >
                {/* Decline Button */}
                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={handleDecline}
                        className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                    >
                        <PhoneOff className="w-8 h-8 text-white" />
                    </button>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t('decline')}</span>
                </div>

                {/* Accept Button */}
                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={handleAccept}
                        className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 animate-bounce"
                    >
                        <Phone className="w-8 h-8 text-white" />
                    </button>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t('accept')}</span>
                </div>
            </motion.div>
        </div>
    );
}
