import { useOutletContext } from 'react-router';
import { Card } from './ui/card';
import { Progress as ProgressBar } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Award,
  CheckCircle2,
  BookOpen,
  Brain,
  Zap
} from 'lucide-react';
import { mockUserProgress, mockVideos } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ContextType {
  language: 'en' | 'hi';
}

export function ProgressPage() {
  const { language } = useOutletContext<ContextType>();

  // Weekly progress data
  const weeklyData = [
    { day: 'Mon', videos: 2, quizzes: 1, score: 85 },
    { day: 'Tue', videos: 3, quizzes: 2, score: 78 },
    { day: 'Wed', videos: 1, quizzes: 1, score: 92 },
    { day: 'Thu', videos: 4, quizzes: 3, score: 88 },
    { day: 'Fri', videos: 2, quizzes: 2, score: 75 },
    { day: 'Sat', videos: 3, quizzes: 2, score: 82 },
    { day: 'Sun', videos: 2, quizzes: 1, score: 90 }
  ];

  // Skills radar data
  const skillsData = [
    { skill: language === 'en' ? 'Programming' : 'प्रोग्रामिंग', value: 85 },
    { skill: language === 'en' ? 'Web Dev' : 'वेब डेव', value: 70 },
    { skill: language === 'en' ? 'Database' : 'डेटाबेस', value: 60 },
    { skill: language === 'en' ? 'Algorithms' : 'एल्गोरिदम', value: 55 },
    { skill: language === 'en' ? 'Tools' : 'टूल्स', value: 75 }
  ];

  const completionRate = Math.round((mockUserProgress.completedVideos / mockUserProgress.totalVideos) * 100);
  const recentVideos = mockVideos.filter(v => v.completed).slice(0, 5);

  const achievements = [
    {
      icon: Trophy,
      title: language === 'en' ? 'First Steps' : 'पहले कदम',
      description: language === 'en' ? 'Completed first 5 videos' : 'पहले 5 वीडियो पूर्ण किए',
      earned: true,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Target,
      title: language === 'en' ? 'Quiz Master' : 'क्विज मास्टर',
      description: language === 'en' ? 'Scored 80%+ in 5 quizzes' : '5 क्विज़ में 80%+ स्कोर किया',
      earned: true,
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Calendar,
      title: language === 'en' ? 'Consistent Learner' : 'निरंतर शिक्षार्थी',
      description: language === 'en' ? '7 day learning streak' : '7 दिन की सीखने की लकीर',
      earned: true,
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Brain,
      title: language === 'en' ? 'Knowledge Seeker' : 'ज्ञान खोजी',
      description: language === 'en' ? 'Complete 20 videos' : '20 वीडियो पूर्ण करें',
      earned: false,
      color: 'from-purple-400 to-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'en' ? 'Your Progress' : 'आपकी प्रगति'}
        </h1>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Track your learning journey and celebrate achievements'
            : 'अपनी सीखने की यात्रा को ट्रैक करें और उपलब्धियों का जश्न मनाएं'}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-blue-500 text-white">
              {completionRate}%
            </Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {mockUserProgress.completedVideos}/{mockUserProgress.totalVideos}
          </h3>
          <p className="text-sm text-gray-600">
            {language === 'en' ? 'Videos Completed' : 'वीडियो पूर्ण'}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-none shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {mockUserProgress.averageScore}%
          </h3>
          <p className="text-sm text-gray-600">
            {language === 'en' ? 'Average Quiz Score' : 'औसत क्विज स्कोर'}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-none shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-orange-500 text-white">
              🔥 {mockUserProgress.streakDays}
            </Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {mockUserProgress.streakDays} {language === 'en' ? 'Days' : 'दिन'}
          </h3>
          <p className="text-sm text-gray-600">
            {language === 'en' ? 'Current Streak' : 'वर्तमान लकीर'}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-none shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-orange-500 text-white">
              {achievements.filter(a => a.earned).length}/{achievements.length}
            </Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {achievements.filter(a => a.earned).length}
          </h3>
          <p className="text-sm text-gray-600">
            {language === 'en' ? 'Achievements' : 'उपलब्धियां'}
          </p>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card className="p-6 border-none shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Weekly Activity' : 'साप्ताहिक गतिविधि'}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="videos" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="quizzes" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Quiz Performance */}
        <Card className="p-6 border-none shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Quiz Performance Trend' : 'क्विज प्रदर्शन ट्रेंड'}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Skills Radar & Strengths/Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Radar */}
        <Card className="p-6 border-none shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Skills Assessment' : 'कौशल मूल्यांकन'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
              <Radar 
                name="Skills" 
                dataKey="value" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.6} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Strengths & Weaknesses */}
        <Card className="p-6 border-none shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'en' ? 'Learning Insights' : 'सीखने की अंतर्दृष्टि'}
          </h3>
          
          <div className="space-y-4">
            {/* Strengths */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">
                  {language === 'en' ? 'Strengths' : 'मजबूती'}
                </h4>
              </div>
              <div className="space-y-2">
                {mockUserProgress.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-green-50 rounded-lg p-3">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <TrendingDown className="w-5 h-5 text-orange-600" />
                <h4 className="font-semibold text-gray-900">
                  {language === 'en' ? 'Areas for Improvement' : 'सुधार के क्षेत्र'}
                </h4>
              </div>
              <div className="space-y-2">
                {mockUserProgress.weakAreas.map((area, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-orange-50 rounded-lg p-3">
                    <Target className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="p-6 border-none shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'Achievements' : 'उपलब्धियां'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  achievement.earned
                    ? 'border-transparent bg-gradient-to-br ' + achievement.color + ' text-white'
                    : 'border-gray-200 bg-gray-50 text-gray-400'
                }`}
              >
                {achievement.earned && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                  achievement.earned ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  <Icon className={`w-6 h-6 ${achievement.earned ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <h4 className={`font-semibold mb-1 ${achievement.earned ? 'text-white' : 'text-gray-600'}`}>
                  {achievement.title}
                </h4>
                <p className={`text-xs ${achievement.earned ? 'text-white/80' : 'text-gray-500'}`}>
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 border-none shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'Recently Completed' : 'हाल ही में पूर्ण'}
        </h3>
        <div className="space-y-3">
          {recentVideos.map((video) => (
            <div key={video.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <img 
                  src={video.thumbnail} 
                  alt={language === 'en' ? video.title : video.titleHi}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {language === 'en' ? video.title : video.titleHi}
                  </h4>
                  <p className="text-sm text-gray-600">{video.category} • {video.duration}</p>
                </div>
              </div>
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}