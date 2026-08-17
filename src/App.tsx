import { useState } from 'react';
import LandingPage from './landingPage';
import LogIn  from './login';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar'; 
import Courses from './Courses'; 
import Tasks from './Tasks';
import AIPlan from './AIPlan';

import './index.css';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  
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
        />
      )}

      {currentView === 'dashboard' && (
        <div className="w-full h-screen bg-[#f8f9ff] text-[#434655] flex overflow-hidden select-none relative">
          
          <Sidebar 
            currentView={activeTab} 
            onSelectView={(tabName) => setActiveTab(tabName)}
            onLogout={() => setCurrentView('landing')}
            isAIPlanView={activeTab === 'AI Study Plan'}
          />

          <main className="flex-1 h-full overflow-auto ml-64 flex flex-col">
            {renderDashboardContent()}
          </main>

        </div>
      )}
    </div>
  );
}

export default App;