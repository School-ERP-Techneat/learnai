export interface Video {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  duration: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  videoUrl: string;
  completed: boolean;
  views: number;
}

export interface LearningPath {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  videos: string[];
  progress: number;
}

export interface UserProgress {
  totalVideos: number;
  completedVideos: number;
  totalQuizzes: number;
  averageScore: number;
  streakDays: number;
  weakAreas: string[];
  strengths: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Quiz {
  id: string;
  question: string;
  questionHi: string;
  options: string[];
  optionsHi: string[];
  correctAnswer: number;
  explanation: string;
  explanationHi: string;
}

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Introduction to Python Programming',
    titleHi: 'पायथन प्रोग्रामिंग का परिचय',
    description: 'Learn the basics of Python programming language from scratch',
    descriptionHi: 'शुरुआत से पायथन प्रोग्रामिंग भाषा की मूल बातें सीखें',
    duration: '12:34',
    category: 'Programming',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
    videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
    completed: true,
    views: 1523
  },
  {
    id: '2',
    title: 'Data Structures: Arrays and Lists',
    titleHi: 'डेटा स्ट्रक्चर: एरेज़ और लिस्ट',
    description: 'Understanding arrays, lists and their operations',
    descriptionHi: 'एरेज़, लिस्ट और उनके ऑपरेशन्स को समझना',
    duration: '15:20',
    category: 'Programming',
    level: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
    videoUrl: 'https://www.youtube.com/embed/92S4zgXN17o',
    completed: true,
    views: 987
  },
  {
    id: '3',
    title: 'Web Development Basics: HTML & CSS',
    titleHi: 'वेब डेवलपमेंट बेसिक्स: HTML और CSS',
    description: 'Create your first webpage with HTML and CSS',
    descriptionHi: 'HTML और CSS के साथ अपना पहला वेबपेज बनाएं',
    duration: '18:45',
    category: 'Web Development',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE',
    completed: false,
    views: 2156
  },
  {
    id: '4',
    title: 'JavaScript Fundamentals',
    titleHi: 'जावास्क्रिप्ट फंडामेंटल्स',
    description: 'Master the fundamentals of JavaScript programming',
    descriptionHi: 'जावास्क्रिप्ट प्रोग्रामिंग के फंडामेंटल्स में महारत हासिल करें',
    duration: '22:10',
    category: 'Web Development',
    level: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
    videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
    completed: false,
    views: 1834
  },
  {
    id: '5',
    title: 'Database Design Principles',
    titleHi: 'डेटाबेस डिज़ाइन सिद्धांत',
    description: 'Learn how to design efficient and scalable databases',
    descriptionHi: 'कुशल और स्केलेबल डेटाबेस डिज़ाइन करना सीखें',
    duration: '16:30',
    category: 'Database',
    level: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
    videoUrl: 'https://www.youtube.com/embed/ztHopE5Wnpc',
    completed: false,
    views: 745
  },
  {
    id: '6',
    title: 'React.js for Beginners',
    titleHi: 'शुरुआती के लिए React.js',
    description: 'Build modern web applications with React',
    descriptionHi: 'React के साथ आधुनिक वेब एप्लिकेशन बनाएं',
    duration: '25:15',
    category: 'Web Development',
    level: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk',
    completed: false,
    views: 3421
  },
  {
    id: '7',
    title: 'Machine Learning Basics',
    titleHi: 'मशीन लर्निंग बेसिक्स',
    description: 'Introduction to machine learning concepts and algorithms',
    descriptionHi: 'मशीन लर्निंग अवधारणाओं और एल्गोरिदम का परिचय',
    duration: '20:40',
    category: 'AI & ML',
    level: 'advanced',
    thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400',
    videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU',
    completed: false,
    views: 1267
  },
  {
    id: '8',
    title: 'Git & GitHub Tutorial',
    titleHi: 'Git और GitHub ट्यूटोरियल',
    description: 'Version control basics for developers',
    descriptionHi: 'डेवलपर्स के लिए वर्जन कंट्रोल बेसिक्स',
    duration: '14:22',
    category: 'Tools',
    level: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400',
    videoUrl: 'https://www.youtube.com/embed/RGOj5yH7evk',
    completed: false,
    views: 2890
  }
];

export const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    name: 'Web Development Fundamentals',
    nameHi: 'वेब डेवलपमेंट फंडामेंटल्स',
    description: 'Complete path to become a web developer',
    descriptionHi: 'वेब डेवलपर बनने का संपूर्ण मार्ग',
    videos: ['3', '4', '6'],
    progress: 33
  },
  {
    id: '2',
    name: 'Python Programming',
    nameHi: 'पायथन प्रोग्रामिंग',
    description: 'Master Python from basics to advanced',
    descriptionHi: 'बेसिक्स से एडवांस्ड तक पायथन में महारत हासिल करें',
    videos: ['1', '2', '7'],
    progress: 67
  },
  {
    id: '3',
    name: 'Full Stack Developer',
    nameHi: 'फुल स्टैक डेवलपर',
    description: 'Frontend, backend, and database skills',
    descriptionHi: 'फ्रंटएंड, बैकएंड और डेटाबेस स्किल्स',
    videos: ['3', '4', '5', '6', '8'],
    progress: 20
  }
];

export const mockUserProgress: UserProgress = {
  totalVideos: 8,
  completedVideos: 2,
  totalQuizzes: 6,
  averageScore: 78,
  streakDays: 5,
  weakAreas: ['Advanced Algorithms', 'Database Optimization', 'System Design'],
  strengths: ['HTML/CSS', 'Python Basics', 'Git Commands']
};

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    question: 'What is Python primarily used for?',
    questionHi: 'पायथन का मुख्य रूप से किस लिए उपयोग किया जाता है?',
    options: [
      'Web Development',
      'Data Science and AI',
      'Mobile App Development',
      'All of the above'
    ],
    optionsHi: [
      'वेब डेवलपमेंट',
      'डेटा साइंस और AI',
      'मोबाइल ऐप डेवलपमेंट',
      'उपरोक्त सभी'
    ],
    correctAnswer: 3,
    explanation: 'Python is a versatile language used across web development, data science, AI, automation, and even mobile development.',
    explanationHi: 'पायथन एक बहुमुखी भाषा है जिसका उपयोग वेब डेवलपमेंट, डेटा साइंस, AI, ऑटोमेशन और यहां तक कि मोबाइल डेवलपमेंट में किया जाता है।'
  },
  {
    id: '2',
    question: 'Which data structure uses FIFO principle?',
    questionHi: 'कौन सा डेटा स्ट्रक्चर FIFO सिद्धांत का उपयोग करता है?',
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    optionsHi: ['स्टैक', 'क्यू', 'ट्री', 'ग्राफ'],
    correctAnswer: 1,
    explanation: 'Queue follows First In First Out (FIFO) principle where the first element added is the first one to be removed.',
    explanationHi: 'क्यू फर्स्ट इन फर्स्ट आउट (FIFO) सिद्धांत का पालन करता है जहां पहले जोड़ा गया तत्व सबसे पहले हटाया जाता है।'
  },
  {
    id: '3',
    question: 'What does HTML stand for?',
    questionHi: 'HTML का क्या मतलब है?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyperlinks and Text Markup Language'
    ],
    optionsHi: [
      'हाइपर टेक्स्ट मार्कअप लैंग्वेज',
      'हाई टेक मॉडर्न लैंग्वेज',
      'होम टूल मार्कअप लैंग्वेज',
      'हाइपरलिंक्स एंड टेक्स्ट मार्कअप लैंग्वेज'
    ],
    correctAnswer: 0,
    explanation: 'HTML stands for Hyper Text Markup Language, the standard markup language for creating web pages.',
    explanationHi: 'HTML का मतलब है हाइपर टेक्स्ट मार्कअप लैंग्वेज, वेब पेज बनाने के लिए मानक मार्कअप भाषा।'
  }
];
