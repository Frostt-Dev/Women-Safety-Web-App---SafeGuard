import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive translations for English and Hindi
const translations: Record<Language, Record<string, string>> = {
    en: {
        // App general
        app_name: 'SafeGuard',
        welcome: 'Welcome',

        // Navigation
        home: 'Home',
        sos: 'SOS',
        emergency: 'Emergency',
        contacts: 'Contacts',
        location: 'Location',
        incidents: 'Incidents',
        resources: 'Resources',
        community: 'Community',
        profile: 'Profile',
        fake_call: 'Fake Call',
        incoming_call: 'Incoming Call...',
        accept: 'Accept',
        decline: 'Decline',
        mute: 'Mute',
        keypad: 'Keypad',
        speaker: 'Speaker',
        video: 'Video',
        add_call: 'Add Call',
        fake_call_message: "Hello? Is everything okay? I'm listening. Please tell me where you are. I'm here to help.",



        // Dashboard
        dashboard_title: 'Dashboard',
        safety_score: 'Safety Score',
        location_sharing: 'Location Sharing',
        active: 'Active',
        inactive: 'Inactive',
        sos_button: 'SOS Button',
        press_and_hold: 'Press and Hold 3s',
        quick_alerts: 'Quick Alerts',
        recent_activity: 'Recent Activity',


        // Location
        location_safety: 'Location & Safety',
        your_location: 'Your Location',
        share_location: 'Share your location and find safe places nearby',

        live_location_sharing: 'Live Location Sharing',
        sharing_with_contacts: 'Sharing with {count} contacts',
        share_realtime_location: 'Share your real-time location with trusted contacts',
        nearby_safe_places: 'Nearby Safe Places',
        start_sharing: 'Start Sharing',
        stop_sharing: 'Stop Sharing',
        safety_map: 'Safety Map',
        safe_zones: 'Safe Zones',
        unsafe_zones: 'Unsafe Zones',
        alert_msg_1: 'I need help! Please call me ASAP!',
        alert_msg_2: "I'm in danger. Please track my location!",
        alert_msg_3: "Check on me. I don't feel safe.",
        alert_msg_4: 'Following me. Stay on call.',
        quick_alert_sent: 'Quick Alert Sent',
        emergency_sos_activated: 'Emergency SOS Activated',
        alert_sent_to_contacts: 'Alert sent to {count} contacts',


        // SOS Modal
        emergency_alert: 'Emergency Alert',
        alert_sent_title: 'Alert Sent!',
        sending_in: 'Sending in',
        seconds: 'seconds',
        alert_desc: 'This will send your location and an emergency message to your trusted contacts.',
        location_desc: 'Your live location will be shared continuously.',
        cancel: 'Cancel',
        alert_sent_desc: 'Your emergency contacts have been notified with your location.',


        // Incidents
        incident_reports: 'Incident Reports',
        report_incident: 'Report Incident',
        incident_title: 'Incident Title',
        description: 'Description',
        type: 'Type',
        severity: 'Severity',
        report_anonymously: 'Report anonymously',
        submit_report: 'Submit Report',
        no_incidents: 'No incidents reported',
        you: 'You',


        // Incident Types & Severity
        harassment: 'Harassment',
        suspicious_activity: 'Suspicious Activity',
        assault: 'Assault',
        other: 'Other',
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        reported: 'Reported',
        investigating: 'Investigating',
        resolved: 'Resolved',

        // Resources
        safety_resources: 'Safety Resources',
        emergency_helplines: 'Emergency Helplines',
        safety_guides: 'Safety Guides & Tips',

        // Community
        community_board: 'Community Notice Board',
        safety_alerts: 'Stay informed about safety alerts and community updates',
        create_post: 'Create Post',
        title: 'Title',
        content: 'Content',
        post: 'Post',
        write_comment: 'Write a comment...',
        send: 'Send',
        hashtags: 'Hashtags (comma separated)',

        // Profile
        my_profile: 'My Profile',
        manage_profile_desc: 'Manage your personal information and settings',
        edit_profile: 'Edit Profile',
        personal_info: 'Personal Information',
        app_settings: 'App Settings',
        dark_mode: 'Dark Mode',
        enabled: 'Enabled',
        disabled: 'Disabled',
        member_since: 'Member since',
        full_name: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        emergency_message: 'Emergency Message',
        default_emergency_message: "I'm in an emergency! Please check on me immediately.",
        save_changes: 'Save Changes',


        // Community
        community_notice_board: 'Community Notice Board',
        community_desc: 'Stay informed about safety alerts and community updates',

        // Resources
        resources_desc: 'Tips, guides, and important information to stay safe',
        safety_guides_tips: 'Safety Guides & Tips',
        learn_more: 'Learn More',
        self_defence_videos: 'Self Defence Videos',

        // Contacts
        trusted_contacts: 'Trusted Contacts',
        manage_contacts: 'Manage your emergency contacts',
        add_contact: 'Add Contact',
        no_contacts: 'No contacts added yet',
        add_first_contact: 'Add Your First Contact',
        edit_contact: 'Edit Contact',
        add_new_contact: 'Add New Contact',
        relationship: 'Relationship',
        relationship_placeholder: 'e.g., Mother, Friend, Sister',
        mark_primary: 'Mark as primary emergency contact',
        update: 'Update',
        add: 'Add',

        // Onboarding
        welcome_safeguard: 'Welcome to SafeGuard',
        welcome_desc: 'Your personal safety companion, always by your side',
        emergency_contacts_title: 'Emergency Contacts',
        emergency_contacts_desc: 'Add trusted contacts who will be notified in emergencies',
        location_sharing_title: 'Location Sharing',
        location_sharing_desc: 'Share your real-time location with your trusted contacts',
        quick_sos_title: 'Quick SOS Access',
        quick_sos_desc: 'One-tap emergency alert to all your contacts with your location',
        get_started: 'Get Started',
        next: 'Next',
        create_profile: 'Create Your Profile',
        profile_setup_desc: 'Just a few details to get you started',
        enter_name: 'Enter your name',
        enter_email: 'your@email.com',
        enter_phone: '+91 98765 43210',
        complete_setup: 'Complete Setup',

        // Relationships
        sister: 'Sister',
        mother: 'Mother',
        father: 'Father',
        brother: 'Brother',
        friend: 'Friend',
        best_friend: 'Best Friend',
        husband: 'Husband',
        wife: 'Wife',
        partner: 'Partner',
        other_rel: 'Other',

        // Common
        get_directions: 'Get Directions',
        open_24_7: 'Open 24/7',
    },

    hi: {
        // App general
        app_name: 'सुरक्षा',
        welcome: 'स्वागत',

        // Navigation
        home: 'होम',
        sos: 'एस ओ एस',
        emergency: 'आपातकाल',
        contacts: 'संपर्क',
        location: 'स्थान',
        incidents: 'घटनाएं',
        resources: 'संसाधन',
        community: 'समुदाय',
        profile: 'प्रोफ़ाइल',
        fake_call: 'फर्जी कॉल',
        incoming_call: 'आने वाली कॉल...',
        accept: 'स्वीकार करें',
        decline: 'अस्वीकार करें',
        mute: 'म्यूट',
        keypad: 'कीपैड',
        speaker: 'स्पीकर',
        video: 'वीडियो',
        add_call: 'कॉल जोड़ें',
        fake_call_message: "नमस्ते? क्या सब ठीक है? मैं सुन रही हूँ। कृपया मुझे बताएं कि आप कहाँ हैं। मैं आपकी मदद के लिए यहाँ हूँ।",



        // Dashboard
        dashboard_title: 'डैशबोर्ड',
        safety_score: 'सुरक्षा स्कोर',
        location_sharing: 'स्थान साझाकरण',
        active: 'सक्रिय',
        inactive: 'निष्क्रिय',
        sos_button: 'एसओएस बटन',
        press_and_hold: '3 सेकंड दबाकर रखें',
        quick_alerts: 'त्वरित अलर्ट',
        recent_activity: 'हाल की गतिविधि',


        // Location
        location_safety: 'स्थान और सुरक्षा',
        your_location: 'आपका स्थान',
        share_location: 'अपना स्थान साझा करें और पास के सुरक्षित स्थान खोजें',

        description: 'विवरण',
        type: 'प्रकार',
        severity: 'गंभीरता',
        report_anonymously: 'गुमनाम रूप से रिपोर्ट करें',
        submit_report: 'रिपोर्ट जमा करें',
        no_incidents: 'कोई घटना रिपोर्ट नहीं की गई',
        you: 'आप',


        // Incident Types & Severity
        harassment: 'उत्पीड़न',
        suspicious_activity: 'संदिग्ध गतिविधि',
        assault: 'हमला',
        other: 'अन्य',
        low: 'कम',
        medium: 'मध्यम',
        high: 'उच्च',
        reported: 'रिपोर्ट किया गया',
        investigating: 'जांच जारी है',
        resolved: 'सुलझा लिया गया',

        // Resources
        safety_resources: 'सुरक्षा संसाधन',
        emergency_helplines: 'आपातकालीन हेल्पलाइन',
        safety_guides: 'सुरक्षा गाइड और सुझाव',

        // Community
        community_board: 'सामुदायिक सूचना पट्ट',
        safety_alerts: 'सुरक्षा अलर्ट और सामुदायिक अपडेट के बारे में सूचित रहें',
        create_post: 'पोस्ट बनाएँ',
        title: 'शीर्षक',
        content: 'सामग्री',
        post: 'पोस्ट करें',
        write_comment: 'एक टिप्पणी लिखें...',
        send: 'भेजें',
        hashtags: 'हैशटैग (अल्पविराम से अलग)',

        // Profile
        my_profile: 'मेरी प्रोफ़ाइल',
        manage_profile_desc: 'अपनी व्यक्तिगत जानकारी और सेटिंग्स प्रबंधित करें',
        edit_profile: 'प्रोफ़ाइल संपादित करें',
        personal_info: 'व्यक्तिगत जानकारी',
        app_settings: 'ऐप सेटिंग्स',
        dark_mode: 'डार्क मोड',
        enabled: 'सक्षम',
        disabled: 'अक्षम',
        member_since: 'सदस्यता तिथि',
        full_name: 'पूरा नाम',
        email: 'ईमेल',
        phone: 'फ़ोन',
        emergency_message: 'आपातकालीन संदेश',
        default_emergency_message: "मैं आपात स्थिति में हूँ! कृपया तुरंत मेरी जाँच करें।",
        save_changes: 'परिवर्तन सहेजें',


        // Community
        community_notice_board: 'सामुदायिक सूचना बोर्ड',
        community_desc: 'सुरक्षा अलर्ट और सामुदायिक अपडेट के बारे में सूचित रहें',

        // Resources
        resources_desc: 'सुरक्षित रहने के लिए सुझाव, गाइड और महत्वपूर्ण जानकारी',
        safety_guides_tips: 'सुरक्षा गाइड और सुझाव',
        learn_more: 'और जानें',
        self_defence_videos: 'आत्मरक्षा वीडियो',

        // Contacts
        trusted_contacts: 'विश्वसनीय संपर्क',
        manage_contacts: 'अपने आपातकालीन संपर्क प्रबंधित करें',
        add_contact: 'संपर्क जोड़ें',
        no_contacts: 'अभी तक कोई संपर्क नहीं जोड़ा गया',
        add_first_contact: 'अपना पहला संपर्क जोड़ें',
        edit_contact: 'संपर्क संपादित करें',
        add_new_contact: 'नया संपर्क जोड़ें',
        relationship: 'रिश्ता',
        relationship_placeholder: 'जैसे, माँ, दोस्त, बहन',
        mark_primary: 'प्राथमिक आपातकालीन संपर्क के रूप में चिह्नित करें',
        update: 'अपडेट करें',
        add: 'जोड़ें',

        // Onboarding
        welcome_safeguard: 'सेफगार्ड में आपका स्वागत है',
        welcome_desc: 'आपका व्यक्तिगत सुरक्षा साथी, हमेशा आपके साथ',
        emergency_contacts_title: 'आपातकालीन संपर्क',
        emergency_contacts_desc: 'विश्वसनीय संपर्क जोड़ें जिन्हें आपात स्थिति में सूचित किया जाएगा',
        location_sharing_title: 'स्थान साझाकरण',
        location_sharing_desc: 'अपने विश्वसनीय संपर्कों के साथ अपना वास्तविक समय स्थान साझा करें',
        quick_sos_title: 'त्वरित एसओएस एक्सेस',
        quick_sos_desc: 'अपने स्थान के साथ अपने सभी संपर्कों को एक-टैप आपातकालीन अलर्ट',
        get_started: 'शुरू करें',
        next: 'अगला',
        create_profile: 'अपनी प्रोफ़ाइल बनाएं',
        profile_setup_desc: 'शुरू करने के लिए बस कुछ विवरण',
        enter_name: 'अपना नाम दर्ज करें',
        enter_email: 'your@email.com',
        enter_phone: '+91 98765 43210',
        complete_setup: 'सेटअप पूरा करें',

        // Relationships
        sister: 'बहन',
        mother: 'माँ',
        father: 'पिता',
        brother: 'भाई',
        friend: 'दोस्त',
        best_friend: 'सबसे अच्छा दोस्त',
        // Missing Alert keys
        alert_msg_1: 'मुझे मदद चाहिए! कृपया मुझे जल्द से जल्द कॉल करें!',
        alert_msg_2: 'मैं खतरे में हूँ। कृपया मेरे स्थान को ट्रैक करें!',
        alert_msg_3: "मुझे देखो। मैं सुरक्षित महसूस नहीं कर रही हूँ।",
        alert_msg_4: 'मेरा पीछा किया जा रहा है। कॉल पर रहें।',
        quick_alert_sent: 'त्वरित अलर्ट भेजा गया',
        emergency_sos_activated: 'आपातकालीन एसओएस सक्रिय',
        alert_sent_to_contacts: '{count} संपर्कों को अलर्ट भेजा गया',

        // Location
        nearby_safe_places: 'आसपास के सुरक्षित स्थान',
        start_sharing: 'साझा करना शुरू करें',
        stop_sharing: 'साझा करना बंद करें',
        share_realtime_location: 'अपने विश्वसनीय संपर्कों के साथ अपना वास्तविक समय स्थान साझा करें',
        safety_map: 'सुरक्षा मानचित्र',
        safe_zones: 'सुरक्षित क्षेत्र',
        unsafe_zones: 'असुरक्षित क्षेत्र',

        // Incidents
        incident_reports: 'घटना रिपोर्ट',
        report_incident: 'घटना की रिपोर्ट करें',
        incident_title: 'घटना का शीर्षक',

        // Missing keys
        live_location_sharing: 'लाइव लोकेशन शेयरिंग',
        get_directions: 'दिशा - निर्देश प्राप्त करें',
        open_24_7: '24/7 खुला',
        husband: 'पति',
        wife: 'पत्नी',
        partner: 'साथी',
        other_rel: 'अन्य',

        // SOS Modal
        emergency_alert: 'आपातकालीन चेतावनी',
        alert_sent_title: 'चेतावनी भेजी गई!',
        sending_in: 'भेजा जा रहा है',
        seconds: 'सेकंड',
        alert_desc: 'यह आपके विश्वसनीय संपर्कों को आपका स्थान और एक आपातकालीन संदेश भेजेगा।',
        location_desc: 'आपका लाइव स्थान लगातार साझा किया जाएगा।',
        cancel: 'रद्द करें',
        alert_sent_desc: 'आपके आपातकालीन संपर्कों को आपके स्थान के साथ सूचित कर दिया गया है।',
    },

};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}
