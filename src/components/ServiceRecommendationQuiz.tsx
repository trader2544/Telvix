import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCurrency } from '@/hooks/useCurrency';

const ServiceRecommendationQuiz = ({
  onServiceSelect
}: {
  onServiceSelect: (service: string) => void;
}) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const { user } = useAuth();
  const { formatPrice } = useCurrency();

  const questions = [{
    question: "What's your main business goal? 🎯",
    options: [
      { text: "Establish online presence", icon: "🌐" },
      { text: "Sell products/services online", icon: "🛒" },
      { text: "Automate business processes", icon: "🤖" },
      { text: "Create a software product", icon: "💻" },
    ]
  }, {
    question: "What's your current situation? 📊",
    options: [
      { text: "Starting from scratch", icon: "🚀" },
      { text: "Have existing website/app", icon: "🔧" },
      { text: "Need to modernize", icon: "⚡" },
      { text: "Looking to scale", icon: "📈" },
    ]
  }, {
    question: "What's your budget range? 💰",
    options: [
      { text: `Under ${formatPrice(20000)}`, value: "low", icon: "💵" },
      { text: `${formatPrice(20000)} - ${formatPrice(50000)}`, value: "medium", icon: "💸" },
      { text: `${formatPrice(50000)} - ${formatPrice(100000)}`, value: "high", icon: "💰" },
      { text: `${formatPrice(100000)}+`, value: "enterprise", icon: "💎" },
    ]
  }, {
    question: "How technical is your team? 🔧",
    options: [
      { text: "Non-technical", icon: "👥" },
      { text: "Some technical knowledge", icon: "🎓" },
      { text: "Technical team", icon: "👨‍💻" },
      { text: "Very technical", icon: "🚀" },
    ]
  }];

  const handleAnswer = (answer: string, value?: string) => {
    const newAnswers = [...answers, value || answer];
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculateRecommendation(newAnswers);
      setRecommendation(result);
    }
  };

  const calculateRecommendation = (userAnswers: string[]) => {
    const [goal, , budget] = userAnswers;
    if (goal === "Establish online presence") {
      return "Web Design & Development";
    }
    if (goal === "Sell products/services online") {
      return "E-commerce Solutions";
    }
    if (goal === "Automate business processes") {
      return "AI & Automation Solutions";
    }
    if (goal === "Create a software product") {
      if (budget === "enterprise") return "SaaS Development";
      return "Custom Software Development";
    }
    return "Web Design & Development";
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setRecommendation(null);
  };

  const handleGetQuote = () => {
    if (recommendation) {
      navigate(`/quote?service=${encodeURIComponent(recommendation)}`);
    }
  };

  if (!user) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Find Your Perfect Service
          </CardTitle>
          <p className="text-purple-100 text-sm">Answer 4 quick questions to get personalized recommendations</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-inner">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Login Required 🔐</h3>
            <p className="text-gray-600 mb-6">
              Please sign in to take our service recommendation quiz and get personalized suggestions for your business needs.
            </p>
            <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6">
              Sign In to Take Quiz 🧭
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendation) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">Perfect Match Found!</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-inner">
            <div className="mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-2">{recommendation}</h3>
              <p className="text-green-600 text-sm mb-4">
                Based on your answers, this service perfectly aligns with your needs and budget.
              </p>
            </div>
            <div className="space-y-3">
              <Button onClick={handleGetQuote} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3">
                Get Quote for {recommendation} 💰
              </Button>
              <Button variant="outline" onClick={resetQuiz} className="w-full border-green-500 text-green-600 hover:bg-green-50">
                Take Quiz Again 🔄
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          Find Your Perfect Service
        </CardTitle>
        <p className="text-purple-100 text-sm">Answer 4 quick questions to get personalized recommendations</p>
        <div className="w-full bg-purple-300/30 rounded-full h-3 mt-3">
          <div
            className="bg-gradient-to-r from-white to-pink-200 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          >
            <span className="text-xs font-bold text-purple-600">{currentQuestion + 1}/{questions.length}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="bg-white rounded-xl p-6 shadow-inner">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-6 text-center">
            {questions[currentQuestion].question}
          </h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-between hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300 p-4 h-auto"
                onClick={() => handleAnswer(option.text, (option as any).value)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{option.icon}</span>
                  <span className="font-medium">{option.text}</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceRecommendationQuiz;
