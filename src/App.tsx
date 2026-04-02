import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import ContactsPage from './pages/ContactsPage';
import LocationPage from './pages/LocationPage';
import IncidentsPage from './pages/IncidentsPage';
import ResourcesPage from './pages/ResourcesPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import IncomingCallPage from './pages/IncomingCallPage';
import OngoingCallPage from './pages/OngoingCallPage';

function AppContent() {
  const { user } = useApp();

  // Check if user has completed onboarding
  const hasCompletedOnboarding = user?.hasCompletedOnboarding;

  if (!hasCompletedOnboarding) {
    return <OnboardingPage />;
  }

  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/incidents" element={<IncidentsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/fake-call-incoming" element={<IncomingCallPage />} />
        <Route path="/fake-call-ongoing" element={<OngoingCallPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AppProvider>
            <AppContent />
          </AppProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
