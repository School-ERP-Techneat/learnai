import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import {
  Home,
  BookOpen,
  MessageSquare,
  BarChart3,
  User,
  Menu,
  X,
  Globe,
  LogOut
} from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard', labelHi: 'डैशबोर्ड' },
    { path: '/library', icon: BookOpen, label: 'Video Library', labelHi: 'वीडियो लाइब्रेरी' },
    { path: '/tutor', icon: MessageSquare, label: 'AI Tutor', labelHi: 'AI ट्यूटर' },
    { path: '/live-chat', icon: MessageSquare, label: 'Live Chat', labelHi: 'लाइव चैट' },
    { path: '/progress', icon: BarChart3, label: 'Progress', labelHi: 'प्रगति' },
    { path: '/profile', icon: User, label: 'Profile', labelHi: 'प्रोफ़ाइल' }
  ];

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between overflow-hidden">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xl font-bold text-gray-900">LearnAI</span>
                <span className="text-xs text-gray-500">
                  {language === 'en'
                    ? 'Smart Learning Platform'
                    : 'स्मार्ट लर्निंग प्लेटफॉर्म'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{language === 'en' ? item.label : item.labelHi}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? 'EN' : 'हिं'}
              </Button>

              {/* Desktop Logout */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 whitespace-nowrap"
              >
                <LogOut className="w-4 h-4" />
                {language === 'en' ? 'Logout' : 'लॉगआउट'}
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(prev => !prev)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {language === 'en' ? item.label : item.labelHi}
                  </Link>
                );
              })}

              {/* Mobile Logout */}
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 justify-start px-4 py-3 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                {language === 'en' ? 'Logout' : 'लॉगआउट'}
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet context={{ language }} />
      </main>
    </div>
  );
}
