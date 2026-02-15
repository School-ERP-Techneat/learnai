import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { User, Mail, Globe, BookOpen, Target, Award, Settings, Bell, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ContextType {
  language: 'en' | 'hi';
}

export function Profile() {
  const { language } = useOutletContext<ContextType>();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Rahul Kumar',
    email: user?.email || 'rahul@example.com',
    learningGoal: 'Full Stack Developer',
    skillLevel: 'intermediate',
    preferredLanguage: language,
    notifications: true
  });

  const learningGoals = [
    { value: 'web-dev', label: language === 'en' ? 'Web Developer' : 'वेब डेवलपर' },
    { value: 'fullstack', label: language === 'en' ? 'Full Stack Developer' : 'फुल स्टैक डेवलपर' },
    { value: 'data-science', label: language === 'en' ? 'Data Scientist' : 'डेटा साइंटिस्ट' },
    { value: 'ai-ml', label: language === 'en' ? 'AI/ML Engineer' : 'AI/ML इंजीनियर' },
    { value: 'mobile-dev', label: language === 'en' ? 'Mobile Developer' : 'मोबाइल डेवलपर' }
  ];

  const skillLevels = [
    { value: 'beginner', label: language === 'en' ? 'Beginner' : 'शुरुआती' },
    { value: 'intermediate', label: language === 'en' ? 'Intermediate' : 'मध्यवर्ती' },
    { value: 'advanced', label: language === 'en' ? 'Advanced' : 'उन्नत' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <User className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
            <p className="text-blue-100 mb-3">{profileData.email}</p>
            <div className="flex items-center space-x-2">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-none">
                <Target className="w-3 h-3 mr-1" />
                {profileData.learningGoal}
              </Badge>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-none">
                <BookOpen className="w-3 h-3 mr-1" />
                {profileData.skillLevel}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Settings */}
      <Card className="p-6 border-none shadow-md">
        <div className="flex items-center space-x-2 mb-6">
          <Settings className="w-5 h-5 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">
            {language === 'en' ? 'Profile Settings' : 'प्रोफ़ाइल सेटिंग्स'}
          </h2>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-gray-700 mb-2 block">
                {language === 'en' ? 'Full Name' : 'पूरा नाम'}
              </Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="h-11"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">
                {language === 'en' ? 'Email Address' : 'ईमेल पता'}
              </Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="h-11"
              />
            </div>
          </div>

          <Separator />

          {/* Learning Preferences */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {language === 'en' ? 'Learning Preferences' : 'सीखने की प्राथमिकताएं'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="goal" className="text-gray-700 mb-2 block">
                  {language === 'en' ? 'Learning Goal' : 'सीखने का लक्ष्य'}
                </Label>
                <Select value={profileData.learningGoal} onValueChange={(value) => setProfileData({ ...profileData, learningGoal: value })}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {learningGoals.map((goal) => (
                      <SelectItem key={goal.value} value={goal.value}>
                        {goal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="level" className="text-gray-700 mb-2 block">
                  {language === 'en' ? 'Current Skill Level' : 'वर्तमान कौशल स्तर'}
                </Label>
                <Select value={profileData.skillLevel} onValueChange={(value) => setProfileData({ ...profileData, skillLevel: value })}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Language & Region */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>{language === 'en' ? 'Language & Region' : 'भाषा और क्षेत्र'}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="lang" className="text-gray-700 mb-2 block">
                  {language === 'en' ? 'Preferred Language' : 'पसंदीदा भाषा'}
                </Label>
                <Select value={profileData.preferredLanguage} onValueChange={(value) => setProfileData({ ...profileData, preferredLanguage: value as 'en' | 'hi' })}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timezone" className="text-gray-700 mb-2 block">
                  {language === 'en' ? 'Timezone' : 'समय क्षेत्र'}
                </Label>
                <Select defaultValue="ist">
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notifications */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>{language === 'en' ? 'Notifications' : 'सूचनाएं'}</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'en' ? 'Daily Reminders' : 'दैनिक रिमाइंडर'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'en' 
                      ? 'Get reminded to complete your daily learning goal'
                      : 'अपने दैनिक सीखने के लक्ष्य को पूरा करने की याद दिलाएं'}
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={profileData.notifications}
                    onChange={(e) => setProfileData({ ...profileData, notifications: e.target.checked })}
                    className="peer sr-only"
                    id="notifications"
                  />
                  <label
                    htmlFor="notifications"
                    className="block cursor-pointer rounded-full bg-gray-300 peer-checked:bg-blue-600 transition-colors w-12 h-6"
                  >
                    <span className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${profileData.notifications ? 'translate-x-6' : ''}`}></span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'en' ? 'New Content Updates' : 'नई सामग्री अपडेट'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'en' 
                      ? 'Notify when new videos are added to your learning path'
                      : 'जब आपके लर्निंग पाथ में नए वीडियो जोड़े जाएं तो सूचित करें'}
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="peer sr-only"
                    id="content-updates"
                  />
                  <label
                    htmlFor="content-updates"
                    className="block cursor-pointer rounded-full bg-gray-300 peer-checked:bg-blue-600 transition-colors w-12 h-6"
                  >
                    <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-6"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline">
              {language === 'en' ? 'Cancel' : 'रद्द करें'}
            </Button>
            <Button>
              {language === 'en' ? 'Save Changes' : 'परिवर्तन सहेजें'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Account Security */}
      <Card className="p-6 border-none shadow-md">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="w-5 h-5 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">
            {language === 'en' ? 'Account Security' : 'खाता सुरक्षा'}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">
                {language === 'en' ? 'Change Password' : 'पासवर्ड बदलें'}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Last changed 2 months ago'
                  : '2 महीने पहले अंतिम बार बदला गया'}
              </p>
            </div>
            <Button variant="outline">
              {language === 'en' ? 'Update' : 'अपडेट करें'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">
                {language === 'en' ? 'Two-Factor Authentication' : 'दो-कारक प्रमाणीकरण'}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? 'Add an extra layer of security to your account'
                  : 'अपने खाते में सुरक्षा की एक अतिरिक्त परत जोड़ें'}
              </p>
            </div>
            <Button variant="outline">
              {language === 'en' ? 'Enable' : 'सक्षम करें'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Subscription */}
      <Card className="p-6 border-none shadow-md bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="flex items-center space-x-2 mb-6">
          <Award className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            {language === 'en' ? 'Subscription Plan' : 'सब्सक्रिप्शन प्लान'}
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                {language === 'en' ? 'FREE PLAN' : 'फ्री प्लान'}
              </Badge>
            </div>
            <p className="text-gray-600 mb-1">
              {language === 'en' 
                ? '5 videos per week, Basic AI chat'
                : 'प्रति सप्ताह 5 वीडियो, बेसिक AI चैट'}
            </p>
            <p className="text-sm text-gray-500">
              {language === 'en' 
                ? 'Upgrade to Premium for unlimited access'
                : 'असीमित एक्सेस के लिए प्रीमियम में अपग्रेड करें'}
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            {language === 'en' ? 'Upgrade to Premium' : 'प्रीमियम में अपग्रेड करें'}
            <span className="ml-2">₹299/mo</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}