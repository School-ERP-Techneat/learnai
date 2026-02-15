import { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Sparkles, Send, Bot, User, Lightbulb, BookOpen, Code } from 'lucide-react';
import type { Message } from '../data/mockData';

interface ContextType {
  language: 'en' | 'hi';
}

export function AITutor() {
  const { language } = useOutletContext<ContextType>();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: language === 'en' 
        ? "Hello! I'm your AI learning assistant. I can help you understand topics, solve doubts, explain concepts in simple terms, and guide your learning journey. What would you like to learn about today?"
        : "नमस्ते! मैं आपका AI लर्निंग असिस्टेंट हूं। मैं आपको विषयों को समझने, संदेहों को हल करने, अवधारणाओं को सरल शब्दों में समझाने और आपकी सीखने की यात्रा का मार्गदर्शन करने में मदद कर सकता हूं। आज आप क्या सीखना चाहेंगे?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = language === 'en' ? [
    "Explain Python basics in simple terms",
    "What is the difference between HTML and CSS?",
    "How do I start learning web development?",
    "What are data structures?",
    "Explain object-oriented programming"
  ] : [
    "पायथन बेसिक्स को सरल शब्दों में समझाएं",
    "HTML और CSS में क्या अंतर है?",
    "मैं वेब डेवलपमेंट सीखना कैसे शुरू करूं?",
    "डेटा स्ट्रक्चर क्या हैं?",
    "ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग को समझाएं"
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple mock AI responses based on keywords
    if (lowerMessage.includes('python') || lowerMessage.includes('पायथन')) {
      return language === 'en'
        ? "Python is a beginner-friendly programming language known for its simple syntax. Think of it like writing instructions in plain English! It's used for web development, data science, AI, and automation. Start with basic concepts like variables (boxes that store data), loops (repeating tasks), and functions (reusable code blocks). Would you like me to explain any specific Python concept?"
        : "पायथन एक शुरुआती-अनुकूल प्रोग्रामिंग भाषा है जो अपनी सरल सिंटैक्स के लिए जानी जाती है। इसे सादे अंग्रेजी में निर्देश लिखने की तरह सोचें! इसका उपयोग वेब डेवलपमेंट, डेटा साइंस, AI और ऑटोमेशन के लिए किया जाता है। वेरिएबल्स (डेटा स्टोर करने वाले बॉक्स), लूप्स (दोहराने वाले कार्य), और फ़ंक्शन्स (पुन: प्रयोज्य कोड ब्लॉक) जैसी बुनियादी अवधारणाओं से शुरुआत करें।";
    }
    
    if (lowerMessage.includes('html') || lowerMessage.includes('css')) {
      return language === 'en'
        ? "Great question! HTML (HyperText Markup Language) is like the skeleton of a webpage - it defines the structure and content (headings, paragraphs, images). CSS (Cascading Style Sheets) is like the clothing and makeup - it makes things look beautiful with colors, fonts, layouts, and animations. Think of building a house: HTML is the walls and rooms, CSS is the paint and decorations!"
        : "बढ़िया सवाल! HTML (हाइपरटेक्स्ट मार्कअप लैंग्वेज) एक वेबपेज के कंकाल की तरह है - यह संरचना और सामग्री (हेडिंग, पैराग्राफ, इमेज) को परिभाषित करता है। CSS (कैस्केडिंग स्टाइल शीट्स) कपड़े और मेकअप की तरह है - यह रंग, फ़ॉन्ट, लेआउट और एनिमेशन के साथ चीजों को सुंदर बनाता है।";
    }
    
    if (lowerMessage.includes('web development') || lowerMessage.includes('वेब डेवलपमेंट')) {
      return language === 'en'
        ? "Excellent! Here's your roadmap: 1) Start with HTML & CSS (structure and design) - 2-3 weeks. 2) Learn JavaScript (make pages interactive) - 1 month. 3) Pick a framework like React - 1 month. 4) Learn about databases and APIs. Practice by building small projects: a portfolio, to-do app, or blog. Code every day, even if just 30 minutes. Would you like specific resources or project ideas?"
        : "उत्कृष्ट! यहां आपका रोडमैप है: 1) HTML और CSS से शुरू करें (संरचना और डिज़ाइन) - 2-3 सप्ताह। 2) JavaScript सीखें (पेज इंटरएक्टिव बनाएं) - 1 महीना। 3) React जैसा फ्रेमवर्क चुनें - 1 महीना। 4) डेटाबेस और API के बारे में सीखें। छोटे प्रोजेक्ट बनाकर अभ्यास करें।";
    }
    
    if (lowerMessage.includes('data structure') || lowerMessage.includes('डेटा स्ट्रक्चर')) {
      return language === 'en'
        ? "Data structures are ways to organize and store data efficiently! Think of them as different types of containers: Arrays are like a row of lockers (numbered storage), Lists are like a shopping list (ordered items), Stacks are like a pile of plates (last in, first out), Queues are like a line at a ticket counter (first in, first out). Each has special uses - choose based on what you need to do with your data!"
        : "डेटा स्ट्रक्चर डेटा को कुशलतापूर्वक व्यवस्थित और स्टोर करने के तरीके हैं! उन्हें विभिन्न प्रकार के कंटेनर के रूप में सोचें: एरेज़ लॉकर की एक पंक्ति की तरह हैं, लिस्ट एक शॉपिंग लिस्ट की तरह हैं, स्टैक प्लेटों के ढेर की तरह हैं, क्यू टिकट काउंटर पर लाइन की तरह हैं।";
    }
    
    if (lowerMessage.includes('oop') || lowerMessage.includes('object') || lowerMessage.includes('ऑब्जेक्ट')) {
      return language === 'en'
        ? "Object-Oriented Programming (OOP) is like creating a blueprint for real-world things! A 'Class' is like a blueprint for a car - it defines what properties (color, model) and actions (drive, brake) a car has. An 'Object' is an actual car made from that blueprint. Key concepts: Encapsulation (keeping data safe inside), Inheritance (child inherits parent's traits), Polymorphism (same action, different forms). It helps organize code better!"
        : "ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग (OOP) वास्तविक दुनिया की चीजों के लिए ब्लूप्रिंट बनाने जैसा है! एक 'क्लास' एक कार के लिए ब्लूप्रिंट की तरह है - यह परिभाषित करता है कि कार में क्या गुण (रंग, मॉडल) और क्रियाएं (ड्राइव, ब्रेक) हैं।";
    }
    
    // Default response
    return language === 'en'
      ? "That's an interesting question! While I don't have a specific answer for that right now, I'd recommend: 1) Breaking down the topic into smaller parts, 2) Looking at examples in our video library, 3) Practicing with hands-on exercises. Could you be more specific about what aspect you'd like to understand better? I'm here to help explain things in simple terms!"
      : "यह एक दिलचस्प सवाल है! जबकि मेरे पास अभी इसके लिए कोई विशिष्ट उत्तर नहीं है, मैं सुझाव दूंगा: 1) विषय को छोटे भागों में विभाजित करें, 2) हमारी वीडियो लाइब्रेरी में उदाहरण देखें, 3) व्यावहारिक अभ्यास के साथ अभ्यास करें। क्या आप अधिक विशिष्ट हो सकते हैं कि आप किस पहलू को बेहतर ढंग से समझना चाहेंगे?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'en' ? 'AI Tutor' : 'AI ट्यूटर'}
            </h1>
            <p className="text-blue-100">
              {language === 'en' 
                ? 'Your personal learning assistant, available 24/7'
                : 'आपका व्यक्तिगत लर्निंग असिस्टेंट, 24/7 उपलब्ध'}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <Lightbulb className="w-5 h-5" />
            <span className="text-sm">
              {language === 'en' ? 'Simple Explanations' : 'सरल व्याख्या'}
            </span>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm">
              {language === 'en' ? 'Adaptive Learning' : 'अनुकूलन सीखना'}
            </span>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <Code className="w-5 h-5" />
            <span className="text-sm">
              {language === 'en' ? 'Code Examples' : 'कोड उदाहरण'}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="border-none shadow-lg">
        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'assistant'
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                  : 'bg-gradient-to-br from-gray-600 to-gray-700'
              }`}>
                {message.role === 'assistant' ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message */}
              <div className={`flex-1 max-w-[80%] ${
                message.role === 'user' ? 'flex justify-end' : ''
              }`}>
                <div className={`rounded-2xl p-4 ${
                  message.role === 'assistant'
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 mt-4">
              {language === 'en' ? 'Suggested questions:' : 'सुझाए गए प्रश्न:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors py-2 px-3"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={language === 'en' 
                ? 'Ask me anything about your learning...'
                : 'मुझसे अपनी सीखने के बारे में कुछ भी पूछें...'}
              className="flex-1 min-h-[60px] resize-none"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              size="lg"
              className="h-[60px] px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {language === 'en' 
              ? 'Press Enter to send, Shift+Enter for new line'
              : 'भेजने के लिए Enter दबाएं, नई लाइन के लिए Shift+Enter'}
          </p>
        </div>
      </Card>
    </div>
  );
}
