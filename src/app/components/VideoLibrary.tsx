import { useState } from 'react';
import { useOutletContext, Link } from 'react-router';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Search, Filter, Play, Clock, TrendingUp } from 'lucide-react';
import { mockVideos, mockLearningPaths } from '../data/mockData';

interface ContextType {
  language: 'en' | 'hi';
}

export function VideoLibrary() {
  const { language } = useOutletContext<ContextType>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = ['All', 'Programming', 'Web Development', 'Database', 'AI & ML', 'Tools'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = (language === 'en' ? video.title : video.titleHi)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || video.level === selectedLevel.toLowerCase();
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'en' ? 'Video Library' : 'वीडियो लाइब्रेरी'}
        </h1>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Explore our curated collection of learning videos'
            : 'सीखने के वीडियो के हमारे क्यूरेटेड संग्रह का अन्वेषण करें'}
        </p>
      </div>

      {/* Learning Paths */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'Learning Paths' : 'लर्निंग पाथ'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockLearningPaths.map((path) => (
            <Card key={path.id} className="p-6 border-none shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {language === 'en' ? path.name : path.nameHi}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {language === 'en' ? path.description : path.descriptionHi}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {path.videos.length} {language === 'en' ? 'videos' : 'वीडियो'}
                  </span>
                </div>
                <div className="text-sm font-semibold text-blue-600">
                  {path.progress}% {language === 'en' ? 'complete' : 'पूर्ण'}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder={language === 'en' ? 'Search videos...' : 'वीडियो खोजें...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48 h-12">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat.toLowerCase() === 'all' ? 'all' : cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-full md:w-48 h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level} value={level.toLowerCase()}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {language === 'en' 
            ? `Showing ${filteredVideos.length} videos`
            : `${filteredVideos.length} वीडियो दिखा रहे हैं`}
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={language === 'en' ? video.title : video.titleHi}
                className="w-full h-44 object-cover"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to={`/video/${video.id}`}>
                  <Button size="lg" className="rounded-full shadow-lg">
                    <Play className="w-5 h-5 mr-2" />
                    {language === 'en' ? 'Play' : 'चलाएं'}
                  </Button>
                </Link>
              </div>

              {/* Duration badge */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center space-x-1">
                <Clock className="w-3 h-3 text-white" />
                <span className="text-white text-xs">{video.duration}</span>
              </div>

              {/* Level badge */}
              <div className="absolute top-3 left-3">
                <Badge className={`${
                  video.level === 'beginner' ? 'bg-green-500' :
                  video.level === 'intermediate' ? 'bg-yellow-500' :
                  'bg-red-500'
                } text-white border-none`}>
                  {video.level}
                </Badge>
              </div>

              {/* Completed badge */}
              {video.completed && (
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-blue-500 text-white border-none">
                    ✓ {language === 'en' ? 'Completed' : 'पूर्ण'}
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                {language === 'en' ? video.title : video.titleHi}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {language === 'en' ? video.description : video.descriptionHi}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded-full">{video.category}</span>
                <span>{video.views.toLocaleString()} {language === 'en' ? 'views' : 'व्यूज'}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {language === 'en' ? 'No videos found' : 'कोई वीडियो नहीं मिला'}
          </h3>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Try adjusting your search or filters'
              : 'अपनी खोज या फ़िल्टर को समायोजित करने का प्रयास करें'}
          </p>
        </div>
      )}
    </div>
  );
}
