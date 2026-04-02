import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, Contact, Incident, Activity, Location, AppState } from '../types';
import { mockContacts, mockIncidents, mockActivities } from '../data/mockData';

interface AppContextType extends AppState {
    setUser: (user: User | null) => void;
    addContact: (contact: Contact) => void;
    updateContact: (id: string, contact: Partial<Contact>) => void;
    removeContact: (id: string) => void;
    addIncident: (incident: Incident) => void;
    addActivity: (activity: Activity) => void;
    updateLocation: (location: Location) => void;
    toggleLocationSharing: () => void;
    completeOnboarding: (user: User) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    // Initialize state - in production, this would come from backend/database
    // TODO: Replace with actual API calls when backend is ready
    const [user, setUser] = useState<User | null>(null);
    const [contacts, setContacts] = useState<Contact[]>(mockContacts);
    const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
    const [activities, setActivities] = useState<Activity[]>(mockActivities);
    const [currentLocation, setCurrentLocation] = useState<Location | null>({
        latitude: 22.7196,
        longitude: 75.8577,
        timestamp: new Date(),
        accuracy: 10,
    });
    const [isLocationSharing, setIsLocationSharing] = useState(false);
    const [theme] = useState<'light' | 'dark'>('light');

    const addContact = (contact: Contact) => {
        setContacts((prev) => [...prev, contact]);
        addActivity({
            id: Date.now().toString(),
            type: 'contact_added',
            title: 'New Contact Added',
            description: `${contact.name} added as trusted contact`,
            timestamp: new Date(),
        });
        // TODO: Backend integration - POST /api/contacts
    };

    const updateContact = (id: string, updates: Partial<Contact>) => {
        setContacts((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
        );
        // TODO: Backend integration - PUT /api/contacts/:id
    };

    const removeContact = (id: string) => {
        setContacts((prev) => prev.filter((c) => c.id !== id));
        // TODO: Backend integration - DELETE /api/contacts/:id
    };

    const addIncident = (incident: Incident) => {
        setIncidents((prev) => [incident, ...prev]);
        addActivity({
            id: Date.now().toString(),
            type: 'incident_reported',
            title: 'Incident Reported',
            description: incident.title,
            timestamp: new Date(),
        });
        // TODO: Backend integration - POST /api/incidents
    };

    const addActivity = (activity: Activity) => {
        setActivities((prev) => [activity, ...prev].slice(0, 50)); // Keep last 50 activities
        // TODO: Backend integration - POST /api/activities
    };

    const updateLocation = (location: Location) => {
        setCurrentLocation(location);
        // TODO: Backend integration - POST /api/location
        // This would send location updates to server for real-time tracking
    };

    const toggleLocationSharing = () => {
        setIsLocationSharing((prev) => !prev);
        if (!isLocationSharing) {
            addActivity({
                id: Date.now().toString(),
                type: 'location_shared',
                title: 'Location Sharing Started',
                description: 'Live location sharing activated',
                timestamp: new Date(),
            });
            // TODO: Backend integration - Start location sharing session
            // Would initiate websocket connection for real-time location updates
        } else {
            // TODO: Backend integration - Stop location sharing session
            // Would close websocket connection
        }
    };

    const completeOnboarding = (userData: User) => {
        setUser({ ...userData, hasCompletedOnboarding: true });
        // TODO: Backend integration - POST /api/users/onboarding
    };

    const value: AppContextType = {
        user,
        contacts,
        incidents,
        activities,
        currentLocation,
        isLocationSharing,
        theme,

        setUser,
        addContact,
        updateContact,
        removeContact,
        addIncident,
        addActivity,
        updateLocation,
        toggleLocationSharing,
        completeOnboarding,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
}
