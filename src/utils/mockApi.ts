// Mock API utilities to simulate backend calls
// TODO: Replace these with actual API calls when backend is implemented

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

// Simulate network delay
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock SOS/Emergency alert sending
export async function sendEmergencyAlert(
    contactIds: string[],
    message: string,
    location: { lat: number; lng: number }
): Promise<ApiResponse<{ alertId: string }>> {
    await delay(1000);

    // TODO: Backend integration
    // POST /api/alerts/emergency
    // Body: { contactIds, message, location, timestamp }
    // This would:
    // 1. Send SMS/push notifications to all emergency contacts
    // 2. Include clickable location link
    // 3. Initiate call to primary contacts
    // 4. Log the alert in database

    console.log('Emergency alert sent!', { contactIds, message, location });

    return {
        success: true,
        data: { alertId: `alert-${Date.now()}` },
    };
}

// Mock quick alert sending
export async function sendQuickAlert(
    contactIds: string[],
    message: string
): Promise<ApiResponse<{ sent: number }>> {
    await delay(800);

    // TODO: Backend integration
    // POST /api/alerts/quick
    // Body: { contactIds, message, timestamp }

    console.log('Quick alert sent!', { contactIds, message });

    return {
        success: true,
        data: { sent: contactIds.length },
    };
}

// Mock location sharing
export async function shareLocation(
    contactIds: string[],
    location: { lat: number; lng: number },
    duration: number // in minutes
): Promise<ApiResponse<{ sessionId: string }>> {
    await delay(500);

    // TODO: Backend integration
    // POST /api/location/share
    // Body: { contactIds, location, duration }
    // This would:
    // 1. Create a location sharing session
    // 2. Send initial location to contacts
    // 3. Set up periodic location updates via WebSocket
    // 4. Return session ID for tracking

    console.log('Location sharing started', { contactIds, location, duration });

    return {
        success: true,
        data: { sessionId: `session-${Date.now()}` },
    };
}

// Mock incident submission
export async function submitIncident(incident: {
    title: string;
    description: string;
    type: string;
    location: { lat: number; lng: number; address?: string };
    severity: string;
    isAnonymous: boolean;
}): Promise<ApiResponse<{ incidentId: string }>> {
    await delay(1000);

    // TODO: Backend integration
    // POST /api/incidents
    // Body: incident data
    // This would:
    // 1. Save incident to database
    // 2. Notify relevant authorities if high severity
    // 3. Update community feed if not anonymous
    // 4. Return incident ID

    console.log('Incident submitted', incident);

    return {
        success: true,
        data: { incidentId: `inc-${Date.now()}` },
    };
}

// Mock safe places fetching
export async function fetchNearbySafePlaces(
    location: { lat: number; lng: number },
    radius: number = 5000 // meters
): Promise<ApiResponse<any[]>> {
    await delay(600);

    // TODO: Backend integration
    // GET /api/places/nearby?lat={lat}&lng={lng}&radius={radius}
    // This would:
    // 1. Query Google Places API or similar
    // 2. Filter for police stations, hospitals, shelters
    // 3. Calculate distances
    // 4. Return sorted by distance

    console.log('Fetching nearby safe places', { location, radius });

    // Return mock data for now
    return {
        success: true,
        data: [],
    };
}

// Mock authentication
export async function authenticateUser(
    email: string,
    _password: string
): Promise<ApiResponse<{ user: any; token: string }>> {
    await delay(1000);

    // TODO: Backend integration
    // POST /api/auth/login
    // Body: { email, password }
    // This would:
    // 1. Validate credentials
    // 2. Create session/JWT token
    // 3. Return user data and token

    console.log('Authentication attempt', { email });

    return {
        success: true,
        data: {
            user: { id: '1', email, name: 'User' },
            token: 'mock-jwt-token',
        },
    };
}

// Mock user registration
export async function registerUser(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
}): Promise<ApiResponse<{ user: any; token: string }>> {
    await delay(1200);

    // TODO: Backend integration
    // POST /api/auth/register
    // Body: userData

    console.log('User registration', userData);

    return {
        success: true,
        data: {
            user: { id: '1', ...userData },
            token: 'mock-jwt-token',
        },
    };
}
