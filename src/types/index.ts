// Type definitions for the Women Safety App

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    emergencyMessage?: string;
    hasCompletedOnboarding: boolean;
}

export interface Contact {
    id: string;
    name: string;
    phone: string;
    email?: string;
    relationship: string;
    avatar?: string;
    isPrimary?: boolean;
    name_hi?: string;
}

export interface Location {
    latitude: number;
    longitude: number;
    timestamp: Date;
    accuracy?: number;
}

export interface SafeZone {
    id: string;
    name: string;
    type: 'safe' | 'unsafe';
    center: {
        lat: number;
        lng: number;
    };
    radius: number; // in meters
    description?: string;
    description_hi?: string;
}

export interface SafePlace {
    id: string;
    name: string;
    type: 'police' | 'hospital' | 'shelter' | 'other';
    location: {
        lat: number;
        lng: number;
    };
    address: string;
    phone?: string;
    distance?: number; // calculated distance from user in km
    isOpen24Hours?: boolean;
    name_hi?: string;
    address_hi?: string;
}

export interface VideoResource {
    id: string;
    title: string;
    title_hi?: string;
    videoId: string;
    description: string;
    description_hi?: string;
}

export interface Incident {
    id: string;
    title: string;
    title_hi?: string;
    description: string;
    description_hi?: string;
    type: 'harassment' | 'suspicious_activity' | 'assault' | 'other';
    location: {
        lat: number;
        lng: number;
        address?: string;
        address_hi?: string;
    };
    timestamp: Date;
    severity: 'low' | 'medium' | 'high';
    status: 'reported' | 'investigating' | 'resolved';
    reportedBy?: string;
    isAnonymous: boolean;
}

export interface Activity {
    id: string;
    type: 'sos' | 'alert_sent' | 'contact_added' | 'location_shared' | 'incident_reported';
    title: string;
    title_hi?: string;
    description: string;
    description_hi?: string;
    timestamp: Date;
    icon?: string;
    translationKey?: string;
    translationParams?: Record<string, string>;
}

export interface QuickAlert {
    id: string;
    message: string;
    icon: string;
}

export interface Comment {
    id: string;
    author: string;
    content: string;
    timestamp: Date;
}

export interface CommunityPost {
    id: string;
    author: string;
    authorAvatar?: string;
    title: string;
    title_hi?: string;
    content: string;
    content_hi?: string;
    timestamp: Date;
    location?: string;
    location_hi?: string;
    tags: string[];
    likes: number;
    comments: number;
    commentsList?: Comment[];
}

export interface SafetyResource {
    id: string;
    title: string;
    category: 'self_defense' | 'legal_rights' | 'helpline' | 'safety_tips';
    content: string;
    icon?: string;
    externalLink?: string;
    title_hi?: string;
    content_hi?: string;
}

export interface Helpline {
    id: string;
    name: string;
    number: string;
    description: string;
    availability: string;
    category: 'police' | 'women_helpline' | 'medical' | 'legal' | 'other';
    name_hi?: string;
    description_hi?: string;
    availability_hi?: string;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'hi'; // English, Hindi

export interface AppState {
    user: User | null;
    contacts: Contact[];
    incidents: Incident[];
    activities: Activity[];
    currentLocation: Location | null;
    isLocationSharing: boolean;
    theme: Theme;
}
