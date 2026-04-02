import type {
    Contact,
    SafeZone,
    SafePlace,
    Incident,
    Activity,
    QuickAlert,
    CommunityPost,
    SafetyResource,
    Helpline,
    VideoResource,
} from '../types';

// Mock contacts
export const mockContacts: Contact[] = [
    {
        id: '1',
        name: 'Priya Sharma',
        name_hi: 'प्रिया शर्मा',
        phone: '+91-98765-43210',
        email: 'priya.sharma@email.com',
        relationship: 'Sister',
        isPrimary: true,
    },
    {
        id: '2',
        name: 'Mom',
        name_hi: 'माँ',
        phone: '+91-98765-43211',
        email: 'mom@email.com',
        relationship: 'Mother',
        isPrimary: true,
    },
    {
        id: '3',
        name: 'Anjali Patel',
        name_hi: 'अंजलि पटेल',
        phone: '+91-98765-43212',
        email: 'anjali.p@email.com',
        relationship: 'Best Friend',
    },
];

// Mock safe and unsafe zones (Indore, India)
export const mockSafeZones: SafeZone[] = [
    {
        id: 'safe-1',
        name: 'Rajwada Area',
        type: 'safe',
        center: { lat: 22.7196, lng: 75.8577 },
        radius: 500,
        description: 'Well-lit area with high foot traffic and police presence',
        description_hi: 'उच्च पैदल यातायात और पुलिस उपस्थिति के साथ अच्छी रोशनी वाला क्षेत्र',
    },
    {
        id: 'safe-2',
        name: 'IIT Indore Campus',
        type: 'safe',
        center: { lat: 22.5200, lng: 75.9200 },
        radius: 800,
        description: 'Campus security and emergency call boxes',
        description_hi: 'परिसर सुरक्षा और आपातकालीन कॉल बॉक्स',
    },
    {
        id: 'unsafe-1',
        name: 'Industrial Area - Sanwer Road',
        type: 'unsafe',
        center: { lat: 22.6900, lng: 75.8400 },
        radius: 400,
        description: 'Poorly lit area, avoid after dark',
        description_hi: 'खराब रोशनी वाला क्षेत्र, अंधेरे के बाद बचें',
    },
];

// Mock nearby safe places (Indore, India)
export const mockSafePlaces: SafePlace[] = [
    {
        id: 'place-1',
        name: 'Rajwada Police Station',
        type: 'police',
        location: { lat: 22.7196, lng: 75.8577 },
        address: 'Rajwada Square, Indore, Madhya Pradesh 452002',
        phone: '0731-2525100',
        distance: 0.8,
        isOpen24Hours: true,
        name_hi: 'राजवाड़ा पुलिस स्टेशन',
        address_hi: 'राजवाड़ा चौराहा, इंदौर, मध्य प्रदेश 452002',
    },
    {
        id: 'place-2',
        name: 'MY Hospital',
        type: 'hospital',
        location: { lat: 22.7240, lng: 75.8650 },
        address: 'MG Road, Indore, Madhya Pradesh 452001',
        phone: '0731-2534567',
        distance: 1.2,
        isOpen24Hours: true,
        name_hi: 'एमवाय अस्पताल',
        address_hi: 'एमजी रोड, इंदौर, मध्य प्रदेश 452001',
    },
    {
        id: 'place-3',
        name: 'Women\'s Shelter - Sakhi',
        type: 'shelter',
        location: { lat: 22.7150, lng: 75.8520 },
        address: 'AB Road, Indore, Madhya Pradesh 452001',
        phone: '0731-2441234',
        distance: 0.5,
        isOpen24Hours: true,
        name_hi: 'महिला आश्रय - सखी',
        address_hi: 'एबी रोड, इंदौर, मध्य प्रदेश 452001',
    },
    {
        id: 'place-4',
        name: 'Vijay Nagar Police Station',
        type: 'police',
        location: { lat: 22.7520, lng: 75.8940 },
        address: 'Vijay Nagar, Indore, Madhya Pradesh 452010',
        phone: '0731-2557890',
        distance: 1.5,
        isOpen24Hours: true,
        name_hi: 'विजय नगर पुलिस स्टेशन',
        address_hi: 'विजय नगर, इंदौर, मध्य प्रदेश 452010',
    },
];

// Mock incidents (Indore locations)
export const mockIncidents: Incident[] = [
    {
        id: 'inc-1',
        title: 'Suspicious Person Following',
        title_hi: 'संदिग्ध व्यक्ति पीछा कर रहा है',
        description: 'A person was following me for 3 blocks near the metro station. He was wearing a black hoodie and kept hiding when I turned around.',
        description_hi: 'मेट्रो स्टेशन के पास 3 ब्लॉक तक एक व्यक्ति मेरा पीछा कर रहा था। उसने काली हुडी पहनी थी और जब मैं पीछे मुड़ी तो वह छिप गया।',
        type: 'suspicious_activity',
        location: {
            lat: 22.7180,
            lng: 75.8560,
            address: 'Saket Nagar, Indore',
            address_hi: 'साकेत नगर, इंदौर',
        },
        timestamp: new Date('2024-01-20T18:30:00'),
        severity: 'medium',
        status: 'reported',
        isAnonymous: false,
    },
    {
        id: 'inc-2',
        title: 'Verbal Harassment',
        title_hi: 'मौखिक उत्पीड़न',
        description: 'Group of men making inappropriate comments and gestures at passersby near the bus stop.',
        description_hi: 'बस स्टॉप के पास राहगीरों पर अनुचित टिप्पणियां और इशारे करने वाले पुरुषों का समूह।',
        type: 'harassment',
        location: {
            lat: 22.7210,
            lng: 75.8590,
            address: 'MG Road, Indore',
            address_hi: 'एमजी रोड, इंदौर',
        },
        timestamp: new Date('2024-01-19T20:15:00'),
        severity: 'high',
        status: 'investigating',
        isAnonymous: true,
    },
    {
        id: 'inc-3',
        title: 'Poor Street Lighting',
        title_hi: 'खराब स्ट्रीट लाइटिंग',
        description: 'The entire street is pitch black due to broken streetlights. Unsafe to walk alone at night.',
        description_hi: 'टूटी हुई स्ट्रीटलाइट्स के कारण पूरी सड़क पर अंधेरा है। रात में अकेले चलना असुरक्षित है।',
        type: 'other',
        location: {
            lat: 22.7450,
            lng: 75.8850,
            address: 'Vijay Nagar, Sector 54, Indore',
            address_hi: 'विजय नगर, सेक्टर 54, इंदौर',
        },
        timestamp: new Date('2024-01-22T21:00:00'),
        severity: 'medium',
        status: 'reported',
        isAnonymous: false,
    },
    {
        id: 'inc-4',
        title: 'Attempted Bag Snatching',
        title_hi: 'बैग छीनने का प्रयास',
        description: 'Two men on a bike tried to snatch my bag while I was waiting for an auto.',
        description_hi: 'जब मैं ऑटो का इंतजार कर रही थी तो बाइक सवार दो लोगों ने मेरा बैग छीनने की कोशिश की।',
        type: 'assault',
        location: {
            lat: 22.7000,
            lng: 75.8600,
            address: 'Bhawarkua Main Road, Indore',
            address_hi: 'भंवरकुआं मुख्य रोड, इंदौर',
        },
        timestamp: new Date('2024-01-23T14:30:00'),
        severity: 'high',
        status: 'resolved',
        isAnonymous: true,
    }
];

// Mock activities
export const mockActivities: Activity[] = [
    {
        id: 'act-1',
        type: 'contact_added',
        title: 'New Contact Added',
        title_hi: 'नया संपर्क जोड़ा गया',
        description: 'Anjali Patel added as trusted contact',
        description_hi: 'अंजलि पटेल को विश्वसनीय संपर्क के रूप में जोड़ा गया',
        timestamp: new Date('2024-01-21T10:00:00'),
    },
    {
        id: 'act-2',
        type: 'location_shared',
        title: 'Location Shared',
        title_hi: 'स्थान साझा किया गया',
        description: 'Live location sharing started with Mom',
        description_hi: 'माँ के साथ लाइव लोकेशन शेयरिंग शुरू हुई',
        timestamp: new Date('2024-01-20T19:30:00'),
    },
    {
        id: 'act-3',
        type: 'incident_reported',
        title: 'Incident Reported',
        title_hi: 'घटना की सूचना दी गई',
        description: 'Suspicious activity reported',
        description_hi: 'संदिग्ध गतिविधि की सूचना दी गई',
        timestamp: new Date('2024-01-20T18:30:00'),
    },
];

// Quick alert messages
export const quickAlertMessages: QuickAlert[] = [
    {
        id: 'alert-1',
        message: "I need help! Please call me ASAP!",
        icon: 'phone',
    },
    {
        id: 'alert-2',
        message: "I'm in danger. Please track my location!",
        icon: 'map-pin',
    },
    {
        id: 'alert-3',
        message: "Check on me. I don't feel safe.",
        icon: 'alert-triangle',
    },
    {
        id: 'alert-4',
        message: "Following me. Stay on call.",
        icon: 'eye',
    },
];

// Community posts (Indore locations)
export const mockCommunityPosts: CommunityPost[] = [
    {
        id: 'post-1',
        author: 'Priya M.',
        title: 'Watch out near Treasure Island Mall',
        title_hi: 'ट्रेजर आइलैंड मॉल के पास सावधान रहें',
        content: 'There have been multiple reports of eve-teasing in this area. Stay alert and keep your belongings close.',
        content_hi: 'इस क्षेत्र में छेड़खानी की कई खबरें आई हैं। सतर्क रहें और अपना सामान अपने पास रखें।',
        timestamp: new Date('2024-01-21T14:00:00'),
        location: 'Treasure Island Mall, Indore',
        location_hi: 'ट्रेजर आइलैंड मॉल, इंदौर',
        tags: ['harassment', 'mall', 'alert'],
        likes: 24,
        comments: 3,
        commentsList: [
            { id: 'c1', author: 'Neha S.', content: 'Thanks for the warning!', timestamp: new Date('2024-01-21T14:30:00') },
            { id: 'c2', author: 'Riya K.', content: 'I was there yesterday, it felt unsafe.', timestamp: new Date('2024-01-21T15:00:00') },
            { id: 'c3', author: 'Admin', content: 'Police have been notified.', timestamp: new Date('2024-01-21T16:00:00') }
        ]
    },
    {
        id: 'post-2',
        author: 'Anonymous',
        title: 'Self-Defense Class This Saturday',
        title_hi: 'इस शनिवार आत्मरक्षा कक्षा',
        content: 'Free self-defense workshop at Nehru Stadium, 2 PM. All women welcome!',
        content_hi: 'नेहरू स्टेडियम में दोपहर 2 बजे मुफ्त आत्मरक्षा कार्यशाला। सभी महिलाओं का स्वागत है!',
        timestamp: new Date('2024-01-21T09:00:00'),
        location: 'Nehru Stadium, Indore',
        location_hi: 'नेहरू स्टेडियम, इंदौर',
        tags: ['self-defense', 'workshop', 'community'],
        likes: 45,
        comments: 2,
        commentsList: [
            { id: 'c4', author: 'Suman L.', content: 'Is registration required?', timestamp: new Date('2024-01-21T10:00:00') },
            { id: 'c5', author: 'Anonymous', content: 'No, just walk in!', timestamp: new Date('2024-01-21T10:30:00') }
        ]
    },
    {
        id: 'post-3',
        author: 'Kavita L.',
        title: 'Safe Auto Rickshaw Service',
        title_hi: 'सुरक्षित ऑटो रिक्शा सेवा',
        content: 'Started using Pink Auto service for late night travels. Highly recommend - all women drivers and you can share trip details with contacts.',
        content_hi: 'देर रात की यात्राओं के लिए पिंक ऑटो सेवा का उपयोग करना शुरू किया। अत्यधिक अनुशंसा - सभी महिला ड्राइवर और आप संपर्कों के साथ यात्रा विवरण साझा कर सकते हैं।',
        timestamp: new Date('2024-01-20T22:00:00'),
        tags: ['transportation', 'recommendation'],
        likes: 18,
        comments: 1,
        commentsList: [
            { id: 'c6', author: 'Meera P.', content: 'Do they have an app?', timestamp: new Date('2024-01-21T08:00:00') }
        ]
    },
];

// Self-defense tips and safety resources
export const safetyResources: SafetyResource[] = [
    {
        id: 'res-1',
        title: 'Basic Self-Defense Moves',
        category: 'self_defense',
        content: `
1. **Palm Strike**: Strike upward with palm heel to attacker's nose
2. **Elbow Strike**: Use your elbow for close-range defense
3. **Knee Strike**: Effective against attackers at close range
4. **Escape Grabs**: Twist and pull away forcefully
5. **Use Your Voice**: Shout "NO" or "BACK OFF" loudly
    `,
        title_hi: 'बुनियादी आत्मरक्षा के तरीके',
        content_hi: `
1. **हथेली से प्रहार**: हथेली की एड़ी से हमलावर की नाक पर ऊपर की ओर प्रहार करें
2. **कोहनी का प्रहार**: नज़दीकी रक्षा के लिए अपनी कोहनी का उपयोग करें
3. **घुटने का प्रहार**: नज़दीकी सीमा पर हमलावरों के खिलाफ प्रभावी
4. **पकड़ से बचना**: मरोड़ें और जोर से दूर खींचें
5. **अपनी आवाज़ का प्रयोग करें**: जोर से "नहीं" या "पीछे हटो" चिल्लाएं
    `,
    },
    {
        id: 'res-2',
        title: 'Safety Tips When Walking Alone',
        category: 'safety_tips',
        content: `
- Stay in well-lit, populated areas
- Be aware of your surroundings - avoid phone distractions
- Trust your instincts - if something feels wrong, it probably is
- Keep keys in hand as a potential weapon
- Walk confidently and purposefully
- Share your route and ETA with someone
- Consider carrying a personal alarm
    `,
        title_hi: 'अकेले चलते समय सुरक्षा सुझाव',
        content_hi: `
- अच्छी रोशनी वाले, आबादी वाले क्षेत्रों में रहें
- अपने परिवेश के प्रति जागरूक रहें - फोन के ध्यान भटकाने से बचें
- अपनी प्रवृत्ति पर भरोसा करें - अगर कुछ गलत लगता है, तो शायद वह है
- संभावित हथियार के रूप में चाबियाँ हाथ में रखें
- आत्मविश्वास और उद्देश्य के साथ चलें
- अपना मार्ग और ईटीए किसी के साथ साझा करें
- व्यक्तिगत अलार्म ले जाने पर विचार करें
    `,
    },
    {
        id: 'res-3',
        title: 'Know Your Legal Rights',
        category: 'legal_rights',
        content: `
**You Have the Right To:**
- File an FIR for harassment or assault
- Protection orders against abusers
- Free legal aid under the Legal Services Authority Act
- Privacy and confidentiality in reporting
- Medical examination and evidence collection
- Support person during legal proceedings
- Zero FIR at any police station
    `,
        title_hi: 'अपने कानूनी अधिकार जानें',
        content_hi: `
**आपको अधिकार है:**
- उत्पीड़न या हमले के लिए एफआईआर दर्ज करना
- दुर्व्यवहार करने वालों के खिलाफ सुरक्षा आदेश
- कानूनी सेवा प्राधिकरण अधिनियम के तहत मुफ्त कानूनी सहायता
- रिपोर्टिंग में गोपनीयता और गोपनीयता
- चिकित्सा परीक्षा और सबूत संग्रह
- कानूनी कार्यवाही के दौरान सहायता व्यक्ति
- किसी भी पुलिस स्टेशन पर जीरो एफआईआर
    `,
    },
    {
        id: 'res-4',
        title: 'Digital Safety',
        category: 'safety_tips',
        content: `
- Don't share your live location publicly on social media
- Use privacy settings on all social platforms
- Be cautious about sharing personal information online
- Use strong, unique passwords
- Enable two-factor authentication
- Be wary of strangers requesting personal details
    `,
        title_hi: 'डिजिटल सुरक्षा',
        content_hi: `
- सोशल मीडिया पर अपना लाइव लोकेशन सार्वजनिक रूप से साझा न करें
- सभी सोशल प्लेटफॉर्म पर गोपनीयता सेटिंग्स का उपयोग करें
- ऑनलाइन व्यक्तिगत जानकारी साझा करने के बारे में सतर्क रहें
- मजबूत, अद्वितीय पासवर्ड का उपयोग करें
- टू-फैक्टर ऑथेंटिकेशन सक्षम करें
- व्यक्तिगत विवरण मांगने वाले अजनबियों से सावधान रहें
    `,
    },
];

// Self-defense videos
export const selfDefenceVideos: VideoResource[] = [
    {
        id: 'basic-moves',
        title: '5 Self-Defense Moves Every Woman Should Know',
        title_hi: '5 आत्मरक्षा के तरीके जो हर महिला को जानने चाहिए',
        videoId: 'KVpxP3ZZtAc', // HER Network
        description: 'Simple and effective self-defense techniques for common situations.',
        description_hi: 'सामान्य स्थितियों के लिए सरल और प्रभावी आत्मरक्षा तकनीकें।'
    },
    {
        id: 'escape-techniques',
        title: 'Women Safety Tips and Tricks',
        title_hi: 'महिलाओं की सुरक्षा के सुझाव और तरकीबें',
        videoId: '1Pfd9XRlJHw',
        description: 'Essential safety measures and tips for women in daily life.',
        description_hi: 'दैनिक जीवन में महिलाओं के लिए आवश्यक सुरक्षा उपाय और सुझाव।'
    },
    {
        id: 'situational-awareness',
        title: 'Common Self-Defense Mistakes',
        title_hi: 'आत्मरक्षा की सामान्य गलतियाँ',
        videoId: 'T7aNSRoDCmg', // Bright Side
        description: 'Tips on situational awareness and avoiding dangerous scenarios.',
        description_hi: 'स्थितिजन्य जागरूकता और खतरनाक परिदृश्यों से बचने के सुझाव।'
    }
];

// Important helplines (India)
export const helplines: Helpline[] = [
    {
        id: 'help-1',
        name: 'Police Emergency',
        number: '100',
        description: 'For immediate life-threatening emergencies',
        availability: '24/7',
        category: 'police',
        name_hi: 'पुलिस आपातकालीन',
        description_hi: 'तत्काल जीवन-धमकी वाली आपात स्थितियों के लिए',
        availability_hi: '24/7',
    },
    {
        id: 'help-2',
        name: 'Women Helpline',
        number: '1091',
        description: 'National helpline for women in distress',
        availability: '24/7',
        category: 'women_helpline',
        name_hi: 'महिला हेल्पलाइन',
        description_hi: 'संकट में महिलाओं के लिए राष्ट्रीय हेल्पलाइन',
        availability_hi: '24/7',
    },
    {
        id: 'help-3',
        name: 'National Commission for Women',
        number: '7827-170-170',
        description: 'NCW helpline for women',
        availability: '24/7',
        category: 'women_helpline',
        name_hi: 'राष्ट्रीय महिला आयोग',
        description_hi: 'महिलाओं के लिए एनसीडब्ल्यू हेल्पलाइन',
        availability_hi: '24/7',
    },
    {
        id: 'help-4',
        name: 'Ambulance',
        number: '108',
        description: 'Medical emergency services',
        availability: '24/7',
        category: 'medical',
        name_hi: 'एम्बुलेंस',
        description_hi: 'चिकित्सा आपातकालीन सेवाएं',
        availability_hi: '24/7',
    },
    {
        id: 'help-5',
        name: 'Indore Police Control Room',
        number: '0731-2451100',
        description: 'Indore city police control room',
        availability: '24/7',
        category: 'police',
        name_hi: 'इंदौर पुलिस कंट्रोल रूम',
        description_hi: 'इंदौर शहर पुलिस नियंत्रण कक्ष',
        availability_hi: '24/7',
    },
    {
        id: 'help-6',
        name: 'National Legal Services Authority',
        number: '15100',
        description: 'Free legal assistance and counseling',
        availability: 'Mon-Fri 9AM-5PM',
        category: 'legal',
        name_hi: 'राष्ट्रीय कानूनी सेवा प्राधिकरण',
        description_hi: 'मुफ्त कानूनी सहायता और परामर्श',
        availability_hi: 'सोम-शुक्र सुबह 9 बजे से शाम 5 बजे तक',
    },
    {
        id: 'help-7',
        name: 'Cyber Crime Helpline',
        number: '1930',
        description: 'Report cyber crimes and online harassment',
        availability: '24/7',
        category: 'other',
        name_hi: 'साइबर अपराध हेल्पलाइन',
        description_hi: 'साइबर अपराधों और ऑनलाइन उत्पीड़न की रिपोर्ट करें',
        availability_hi: '24/7',
    },
];
