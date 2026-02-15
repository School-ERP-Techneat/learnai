import { useOutletContext, Link } from 'react-router';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { BookOpen, Trophy, Target, TrendingUp, Play, Sparkles, Clock, Flame } from 'lucide-react';
import { mockVideos, mockLearningPaths, mockUserProgress } from '../data/mockData';

interface ContextType {
  language: 'en' | 'hi';
}

export function Dashboard() {
  const { language } = useOutletContext<ContextType>();

  const continueWatchingVideos = mockVideos.filter(v => !v.completed).slice(0, 3);
  const recommendedPath = mockLearningPaths[0];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'en' ? 'Welcome back, Learner!' : 'वापस स्वागत है, शिक्षार्थी!'}
            </h1>
            <p className="text-blue-100">
              {language === 'en' 
                ? 'Continue your learning journey today'
                : 'आज अपनी सीखने की यात्रा जारी रखें'}
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
            <Flame className="w-6 h-6 text-orange-300" />
            <div>
              <div className="text-2xl font-bold">{mockUserProgress.streakDays}</div>
              <div className="text-sm text-blue-100">
                {language === 'en' ? 'Day Streak' : 'दिन की लकीर'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white border-none shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">
                {language === 'en' ? 'Completed Lessons' : 'पूर्ण पाठ'}
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {mockUserProgress.completedVideos}/{mockUserProgress.totalVideos}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-none shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">
                {language === 'en' ? 'Average Score' : 'औसत स्कोर'}
              </p>
              <p className="text-3xl font-bold text-green-600">
                {mockUserProgress.averageScore}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-none shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">
                {language === 'en' ? 'Quizzes Taken' : 'लिए गए क्विज़'}
              </p>
              <p className="text-3xl font-bold text-purple-600">
                {mockUserProgress.totalQuizzes}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-none shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">
                {language === 'en' ? 'Learning Paths' : 'लर्निंग पाथ'}
              </p>
              <p className="text-3xl font-bold text-orange-600">
                {mockLearningPaths.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Continue Learning Path */}
      <Card className="p-6 bg-white border-none shadow-md">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            {language === 'en' ? 'Your Learning Path' : 'आपका लर्निंग पाथ'}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'en' ? recommendedPath.name : recommendedPath.nameHi}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en' ? recommendedPath.description : recommendedPath.descriptionHi}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{recommendedPath.progress}%</div>
              <div className="text-sm text-gray-600">
                {language === 'en' ? 'Complete' : 'पूर्ण'}
              </div>
            </div>
          </div>
          
          <Progress value={recommendedPath.progress} className="mb-4 h-2" />
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {language === 'en' 
                ? `${recommendedPath.videos.length} videos in this path`
                : `इस पाथ में ${recommendedPath.videos.length} वीडियो`}
            </div>
            <Link to="/library">
              <Button className="bg-purple-600 hover:bg-purple-700">
                {language === 'en' ? 'Continue Learning' : 'सीखना जारी रखें'}
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Continue Watching */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {language === 'en' ? 'Continue Watching' : 'देखना जारी रखें'}
          </h2>
          <Link to="/library">
            <Button variant="ghost">
              {language === 'en' ? 'View All' : 'सभी देखें'} →
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {continueWatchingVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={language === 'en' ? video.title : video.titleHi}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Link to={`/video/${video.id}`}>
                    <Button size="lg" className="rounded-full">
                      <Play className="w-5 h-5 mr-2" />
                      {language === 'en' ? 'Watch Now' : 'अभी देखें'}
                    </Button>
                  </Link>
                </div>
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-white" />
                  <span className="text-white text-sm">{video.duration}</span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    video.level === 'beginner' ? 'bg-green-500' :
                    video.level === 'intermediate' ? 'bg-yellow-500' :
                    'bg-red-500'
                  } text-white`}>
                    {video.level.charAt(0).toUpperCase() + video.level.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {language === 'en' ? video.title : video.titleHi}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {language === 'en' ? video.description : video.descriptionHi}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">{video.category}</span>
                  <span>{video.views.toLocaleString()} {language === 'en' ? 'views' : 'व्यूज'}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Tutor Quick Access */}
      <Card className="p-6 bg-gradient-to-r from-indigo-500 to-blue-500 border-none shadow-md text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {language === 'en' ? 'Need Help? Ask AI Tutor!' : 'मदद चाहिए? AI ट्यूटर से पूछें!'}
              </h3>
              <p className="text-blue-100">
                {language === 'en' 
                  ? 'Get instant answers to your questions, explanations, and personalized learning tips'
                  : 'अपने सवालों के तुरंत जवाब पाएं, व्याख्या और व्यक्तिगत सीखने के टिप्स'}
              </p>
            </div>
          </div>
          <Link to="/tutor">
            <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
              {language === 'en' ? 'Start Chat' : 'चैट शुरू करें'}
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}