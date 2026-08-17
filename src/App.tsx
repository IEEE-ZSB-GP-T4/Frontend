import { useState } from 'react';
import LandingPage from './landingPage';
import LogIn from './login';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar'; 
import Courses from './Courses'; 
import Tasks from './Tasks';
import AIPlan from './AIPlan';
import Register from './Register';

import './index.css';

export function App() {

  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'register' | 'dashboard'>(
    localStorage.getItem('token') ? 'dashboard' : 'landing'
  );
  
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Courses':
        return <Courses />; 
      case 'Tasks':
        return <Tasks />;
      case 'AI Study Plan':
        return <AIPlan />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      {currentView === 'landing' && (
        <LandingPage 
          onNavigateToLogin={() => setCurrentView('login')} 
          onGetStarted={() => {
            setCurrentView('dashboard');
            setActiveTab('Dashboard');
          }} 
        />
      )}

      {currentView === 'login' && (
        <LogIn 
          onBackToLanding={() => setCurrentView('landing')}
          onLoginSuccess={() => {
            setCurrentView('dashboard');
            setActiveTab('Dashboard'); 
          }}
          switchToRegister={() => setCurrentView('register')} 
        />
      )}

      {currentView === 'register' && (
        <Register 
          onRegisterSuccess={() => {
            setCurrentView('dashboard');
            setActiveTab('Dashboard');
          }}
          switchToLogin={() => setCurrentView('login')} 
        />
      )}

      {currentView === 'dashboard' && (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8f9ff]">
          <div className="w-64 flex-shrink-0">
          <Sidebar 
            currentView={activeTab} 
            onSelectView={(tabName) => setActiveTab(tabName)}
            onLogout={() => {
              localStorage.removeItem('token'); 
              setCurrentView('landing');
            }}
            isAIPlanView={activeTab === 'AI Study Plan'}
          />
          </div>

          <main className="flex-1 h-full overflow-auto flex flex-col">
            {renderDashboardContent()}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;