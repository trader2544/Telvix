
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';

const ServiceRecommendationQuiz = ({ onServiceSelect }: { onServiceSelect: (service: string) => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const questions = [
    {
      question: "What's your primary business goal?",
      options: [
        "Establish online presence",
        "Sell products/services online",
        "Automate business processes",
        "Create a software product"
      ]
    },
    {
      question: "What's your current situation?",
      options: [
        "Starting from scratch",
        "Have existing website/app",
        "Need to modernize",
        "Looking to scale"
      ]
    },
    {
      question: "What's your budget range?",
      options: [
        "Under $1,000",
        "$1,000 - $5,000",
        "$5,000 - $15,000",
        "$15,000+"
      ]
    },
    {
      question: "How technical is your team?",
      options: [
        "Non-technical",
        "Some technical knowledge",
        "Technical team",
        "Very technical"
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate recommendation based on answers
      const result = calculateRecommendation(newAnswers);
      setRecommendation(result);
    }
  };

  const calculateRecommendation = (userAnswers: string[]) => {
    const [goal, situation, budget, technical] = userAnswers;

    if (goal === "Establish online presence") {
      if (budget === "Under $1,000") return "Web Design & Development";
      return "Web Design & Development";
    }
    
    if (goal === "Sell products/services online") {
      return "E-commerce Solutions";
    }
    
    if (goal === "Automate business processes") {
      return "AI & Automation Solutions";
    }
    
    if (goal === "Create a software product") {
      if (budget === "$15,000+") return "SaaS Development";
      return "Custom Software Development";
    }

    return "Web Design & Development";
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setRecommendation(null);
  };

  if (recommendation) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Your Recommended Service
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <h3 className="text-xl font-bold text-green-800 mb-2">{recommendation}</h3>
            <p className="text-green-600 text-sm mb-4">
              Based on your answers, this service aligns best with your needs and goals.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => onServiceSelect(recommendation)}
                className="w-full bg-gradient-to-r from-primary to-accent"
              >
                Get Quote for {recommendation}
              </Button>
              <Button variant="outline" onClick={resetQuiz} className="w-full">
                Take Quiz Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <HelpCircle className="w-5 h-5" />
          Service Recommendation Quiz
        </CardTitle>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {questions[currentQuestion].question}
          </h3>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-between hover:bg-primary hover:text-white"
                onClick={() => handleAnswer(option)}
              >
                {option}
                <ArrowRight className="w-4 h-4" />
              </Button>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </CardContent>
    </Card>
  );
};

export default ServiceRecommendationQuiz;
