import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const { login } = useAuth();
  const navigate = useNavigate();

  const content = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Login to continue your learning journey',
      email: 'Email',
      password: 'Password',
      loginButton: 'Login',
      loggingIn: 'Logging in...',
      noAccount: "Don't have an account?",
      signup: 'Sign up',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      platformName: 'AI Learning Platform',
      tagline: 'Learn smarter with AI-powered education',
    },
    hi: {
      title: 'वापसी पर स्वागत है',
      subtitle: 'अपनी सीखने की यात्रा जारी रखने के लिए लॉगिन करें',
      email: 'ईमेल',
      password: 'पासवर्ड',
      loginButton: 'लॉगिन करें',
      loggingIn: 'लॉगिन हो रहा है...',
      noAccount: 'खाता नहीं है?',
      signup: 'साइन अप करें',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      platformName: 'एआई लर्निंग प्लेटफॉर्म',
      tagline: 'एआई-संचालित शिक्षा के साथ स्मार्ट सीखें',
    },
  };

  const t = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-lg border bg-white p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                language === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                language === 'hi'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.platformName}</h1>
          <p className="text-gray-600">{t.tagline}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
            <CardDescription>{t.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t.loggingIn : t.loginButton}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="text-sm text-center text-gray-600">
              {t.noAccount}{' '}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                {t.signup}
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Demo Credentials Info */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 text-center">
            {language === 'en' 
              ? '💡 Demo: Create an account to start learning' 
              : '💡 डेमो: सीखना शुरू करने के लिए एक खाता बनाएं'}
          </p>
        </div>
      </div>
    </div>
  );
}
