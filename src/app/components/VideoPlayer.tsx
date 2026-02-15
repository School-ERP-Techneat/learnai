import { useState } from 'react';
import { useParams, useOutletContext, Link } from 'react-router';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  FileText, 
  Brain, 
  ListChecks, 
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Eye
} from 'lucide-react';
import { mockVideos, mockQuizzes } from '../data/mockData';

interface ContextType {
  language: 'en' | 'hi';
}

export function VideoPlayer() {
  const { id } = useParams();
  const { language } = useOutletContext<ContextType>();
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const video = mockVideos.find(v => v.id === id);

  if (!video) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'en' ? 'Video not found' : 'वीडियो नहीं मिला'}
        </h2>
        <Link to="/library">
          <Button>{language === 'en' ? 'Back to Library' : 'लाइब्रेरी पर वापस जाएं'}</Button>
        </Link>
      </div>
    );
  }

  const handleQuizAnswer = (quizId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [quizId]: answerIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    mockQuizzes.forEach(quiz => {
      if (quizAnswers[quiz.id] === quiz.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / mockQuizzes.length) * 100);
  };

  // AI-generated summary (mock)
  const videoSummary = language === 'en'
    ? `This video covers the fundamentals of ${video.title}. Key topics include basic concepts, practical examples, and best practices. The instructor explains complex ideas in simple terms, making it perfect for ${video.level} learners. You'll learn step-by-step approaches and get hands-on experience with real-world scenarios.`
    : `यह वीडियो ${video.titleHi} के फंडामेंटल्स को कवर करता है। मुख्य विषयों में बुनियादी अवधारणाएं, व्यावहारिक उदाहरण और सर्वोत्तम प्रथाएं शामिल हैं। प्रशिक्षक जटिल विचारों को सरल शब्दों में समझाता है, जिससे यह ${video.level} शिक्षार्थियों के लिए एकदम सही है।`;

  // AI-generated notes (mock)
  const videoNotes = [
    {
      timestamp: '00:00',
      note: language === 'en' 
        ? 'Introduction to the topic and overview of what will be covered'
        : 'विषय का परिचय और क्या कवर किया जाएगा इसका अवलोकन'
    },
    {
      timestamp: '02:30',
      note: language === 'en'
        ? 'Core concepts and fundamental principles explained'
        : 'मूल अवधारणाएं और मौलिक सिद्धांतों की व्याख्या'
    },
    {
      timestamp: '08:15',
      note: language === 'en'
        ? 'Practical examples and real-world applications demonstrated'
        : 'व्यावहारिक उदाहरण और वास्तविक दुनिया के अनुप्रयोगों का प्रदर्शन'
    },
    {
      timestamp: '15:00',
      note: language === 'en'
        ? 'Common mistakes to avoid and best practices to follow'
        : 'बचने के लिए सामान्य गलतियाँ और अनुसरण करने के लिए सर्वोत्तम प्रथाएं'
    },
    {
      timestamp: '18:30',
      note: language === 'en'
        ? 'Summary and next steps in your learning journey'
        : 'सारांश और आपकी सीखने की यात्रा में अगले कदम'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/library">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Back to Library' : 'लाइब्रेरी पर वापस'}
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video */}
          <Card className="overflow-hidden border-none shadow-lg">
            <div className="aspect-video bg-black">
              <iframe
                src={video.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Card>

          {/* Video Info */}
          <Card className="p-6 border-none shadow-md">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === 'en' ? video.title : video.titleHi}
                </h1>
                <p className="text-gray-600">
                  {language === 'en' ? video.description : video.descriptionHi}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className={`${
                video.level === 'beginner' ? 'bg-green-500' :
                video.level === 'intermediate' ? 'bg-yellow-500' :
                'bg-red-500'
              } text-white`}>
                {video.level}
              </Badge>
              <Badge variant="secondary">{video.category}</Badge>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{video.duration}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Eye className="w-4 h-4" />
                <span>{video.views.toLocaleString()} {language === 'en' ? 'views' : 'व्यूज'}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex gap-3">
              <Button className="flex-1" disabled={video.completed}>
                {video.completed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Completed' : 'पूर्ण'}
                  </>
                ) : (
                  <>
                    {language === 'en' ? 'Mark as Complete' : 'पूर्ण के रूप में चिह्नित करें'}
                  </>
                )}
              </Button>
              <Link to="/tutor" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Ask AI Tutor' : 'AI ट्यूटर से पूछें'}
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* AI Assistant Panel */}
        <div className="lg:col-span-1">
          <Card className="border-none shadow-lg sticky top-24">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <h2 className="font-semibold">
                  {language === 'en' ? 'AI Video Assistant' : 'AI वीडियो असिस्टेंट'}
                </h2>
              </div>
            </div>

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="summary" className="text-xs">
                  <Brain className="w-4 h-4 mr-1" />
                  {language === 'en' ? 'Summary' : 'सारांश'}
                </TabsTrigger>
                <TabsTrigger value="notes" className="text-xs">
                  <FileText className="w-4 h-4 mr-1" />
                  {language === 'en' ? 'Notes' : 'नोट्स'}
                </TabsTrigger>
                <TabsTrigger value="quiz" className="text-xs">
                  <ListChecks className="w-4 h-4 mr-1" />
                  {language === 'en' ? 'Quiz' : 'क्विज'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="p-4 max-h-[600px] overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {language === 'en' ? 'AI-Generated Summary' : 'AI-जनरेटेड सारांश'}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {videoSummary}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {language === 'en' ? 'Key Takeaways:' : 'मुख्य बातें:'}
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          {language === 'en' 
                            ? 'Understanding core concepts and principles'
                            : 'मूल अवधारणाओं और सिद्धांतों को समझना'}
                        </span>
                      </li>
                      <li className="flex items-start space-x-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          {language === 'en'
                            ? 'Practical implementation techniques'
                            : 'व्यावहारिक कार्यान्वयन तकनीकें'}
                        </span>
                      </li>
                      <li className="flex items-start space-x-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          {language === 'en'
                            ? 'Best practices and common pitfalls'
                            : 'सर्वोत्तम प्रथाएं और सामान्य नुकसान'}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notes" className="p-4 max-h-[600px] overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">
                      {language === 'en' ? 'Timestamped Notes' : 'टाइमस्टैम्प्ड नोट्स'}
                    </h3>
                  </div>
                  {videoNotes.map((note, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start space-x-3">
                        <Badge variant="outline" className="flex-shrink-0">
                          {note.timestamp}
                        </Badge>
                        <p className="text-sm text-gray-700 flex-1">
                          {note.note}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    {language === 'en' ? 'Download Notes (PDF)' : 'नोट्स डाउनलोड करें (PDF)'}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="quiz" className="p-4 max-h-[600px] overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <ListChecks className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900">
                      {language === 'en' ? 'Test Your Knowledge' : 'अपने ज्ञान का परीक्षण करें'}
                    </h3>
                  </div>

                  {!showResults ? (
                    <>
                      {mockQuizzes.map((quiz) => (
                        <div key={quiz.id} className="bg-gray-50 rounded-lg p-4">
                          <p className="font-medium text-gray-900 mb-3">
                            {language === 'en' ? quiz.question : quiz.questionHi}
                          </p>
                          <div className="space-y-2">
                            {(language === 'en' ? quiz.options : quiz.optionsHi).map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuizAnswer(quiz.id, index)}
                                className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                                  quizAnswers[quiz.id] === index
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                                }`}
                              >
                                <span className="text-sm">{option}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      <Button 
                        className="w-full" 
                        onClick={() => setShowResults(true)}
                        disabled={Object.keys(quizAnswers).length < mockQuizzes.length}
                      >
                        {language === 'en' ? 'Submit Quiz' : 'क्विज जमा करें'}
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {calculateScore()}%
                        </div>
                        <p className="text-gray-700">
                          {language === 'en' ? 'Your Score' : 'आपका स्कोर'}
                        </p>
                      </div>

                      {mockQuizzes.map((quiz) => {
                        const isCorrect = quizAnswers[quiz.id] === quiz.correctAnswer;
                        return (
                          <div key={quiz.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start space-x-2 mb-2">
                              {isCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              )}
                              <p className="font-medium text-gray-900">
                                {language === 'en' ? quiz.question : quiz.questionHi}
                              </p>
                            </div>
                            <p className="text-sm text-gray-600 ml-7">
                              {language === 'en' ? quiz.explanation : quiz.explanationHi}
                            </p>
                          </div>
                        );
                      })}

                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => {
                          setShowResults(false);
                          setQuizAnswers({});
                        }}
                      >
                        {language === 'en' ? 'Retry Quiz' : 'फिर से प्रयास करें'}
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
