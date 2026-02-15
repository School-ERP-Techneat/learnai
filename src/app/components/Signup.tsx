import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { GraduationCap, Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const content = {
    en: {
      title: 'Create Account',
      subtitle: 'Start your AI-powered learning journey today',
      name: 'Full Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signupButton: 'Create Account',
      signingUp: 'Creating account...',
      haveAccount: 'Already have an account?',
      login: 'Login',
      namePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Create a password',
      confirmPasswordPlaceholder: 'Confirm your password',
      platformName: 'AI Learning Platform',
      tagline: 'Learn smarter with AI-powered education',
      features: {
        title: 'What you get:',
        ai: 'AI Tutor for personalized learning',
        videos: 'Access to curated video lessons',
        progress: 'Track your learning progress',
        premium: 'Premium plan: ₹299/month',
      },
      passwordMismatch: 'Passwords do not match',
      passwordMinLength: 'Password must be at least 6 characters',
    },
    hi: {
      title: 'खाता बनाएं',
      subtitle: 'आज ही अपनी एआई-संचालित सीखने की यात्रा शुरू करें',
      name: 'पूरा नाम',
      email: 'ईमेल',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      signupButton: 'खाता बनाएं',
      signingUp: 'खाता बनाया जा रहा है...',
      haveAccount: 'पहले से खाता है?',
      login: 'लॉगिन करें',
      namePlaceholder: 'अपना पूरा नाम दर्ज करें',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      passwordPlaceholder: 'पासवर्ड बनाएं',
      confirmPasswordPlaceholder: 'अपने पासवर्ड की पुष्टि करें',
      platformName: 'एआई लर्निंग प्लेटफॉर्म',
      tagline: 'एआई-संचालित शिक्षा के साथ स्मार्ट सीखें',
      features: {
        title: 'आपको क्या मिलता है:',
        ai: 'व्यक्तिगत सीखने के लिए एआई ट्यूटर',
        videos: 'क्यूरेटेड वीडियो पाठों तक पहुंच',
        progress: 'अपनी सीखने की प्रगति ट्रैक करें',
        premium: 'प्रीमियम प्लान: ₹299/महीना',
      },
      passwordMismatch: 'पासवर्ड मेल नहीं खाते',
      passwordMinLength: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
    },
  };

  const t = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    if (password.length < 6) {
      setError(t.passwordMinLength);
      return;
    }

    setIsLoading(true);

    try {
      await signup(name, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-5xl flex gap-8">
        {/* Left Side - Features */}
        <div className="hidden lg:flex flex-col justify-center flex-1">
          <div className="inline-flex items-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <GraduationCap className="w-8 h-8 text-white mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.platformName}</h1>
          <p className="text-xl text-gray-600 mb-8">{t.tagline}</p>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">{t.features.title}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{t.features.ai}</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{t.features.videos}</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{t.features.progress}</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <p className="text-white font-semibold">{t.features.premium}</p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-96 flex flex-col">
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

          {/* Mobile Logo */}
          <div className="text-center mb-6 lg:hidden">
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
                  <Label htmlFor="name">{t.name}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder={t.confirmPasswordPlaceholder}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? t.signingUp : t.signupButton}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <div className="text-sm text-center text-gray-600">
                {t.haveAccount}{' '}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  {t.login}
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
