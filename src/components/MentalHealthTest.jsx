import React, { useState, useEffect, useRef } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Info,
  Target,
  ArrowLeft,
  ArrowRight,
  Play,
} from "lucide-react";

const MentalHealthTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [responses, setResponses] = useState({});
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [titleText, setTitleText] = useState("Mental Health Assessment");
  const originalTitle = "Mental Health Assessment";

  useEffect(() => {
    // Load GSAP and ScrollTrigger from CDN
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    gsapScript.async = true;
    
    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
    scrollTriggerScript.async = true;

    document.body.appendChild(gsapScript);
    
    gsapScript.onload = () => {
      document.body.appendChild(scrollTriggerScript);
      
      scrollTriggerScript.onload = () => {
        const { gsap } = window;
        const { ScrollTrigger } = window;
        gsap.registerPlugin(ScrollTrigger);

        // Scramble text animation for title
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let scrambleInterval;
        
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 20%",
          onEnter: () => {
            let iteration = 0;
            const maxIterations = 20;
            
            scrambleInterval = setInterval(() => {
              setTitleText(
                originalTitle
                  .split("")
                  .map((char, index) => {
                    if (char === " ") return " ";
                    if (index < iteration) return originalTitle[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                  })
                  .join("")
              );
              
              iteration += 1 / 3;
              
              if (iteration >= originalTitle.length) {
                clearInterval(scrambleInterval);
                setTitleText(originalTitle);
              }
            }, 50);
          },
          onLeaveBack: () => {
            if (scrambleInterval) clearInterval(scrambleInterval);
            setTitleText(originalTitle);
          }
        });

        // Fade and slide animation for subtitle
        gsap.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            }
          }
        );
      };
    };

    return () => {
      if (document.body.contains(gsapScript)) {
        document.body.removeChild(gsapScript);
      }
      if (document.body.contains(scrollTriggerScript)) {
        document.body.removeChild(scrollTriggerScript);
      }
    };
  }, []);

  const handleStartTest = () => {
    setTestStarted(true);
    setCurrentQuestionIndex(0);
  };

  const validatedQuestions = [
    {
      id: "phq9_1",
      text: "Little interest or pleasure in doing things",
      category: "depression",
      scale: "PHQ-9",
      weight: 1.0,
      clinicalSignificance: "Core depression symptom",
    },
    {
      id: "phq9_2",
      text: "Feeling down, depressed, or hopeless",
      category: "depression",
      scale: "PHQ-9",
      weight: 1.0,
      clinicalSignificance: "Core depression symptom",
    },
    {
      id: "gad7_1",
      text: "Feeling nervous, anxious, or on edge",
      category: "anxiety",
      scale: "GAD-7",
      weight: 1.0,
      clinicalSignificance: "Core anxiety symptom",
    },
    {
      id: "gad7_2",
      text: "Not being able to stop or control worrying",
      category: "anxiety",
      scale: "GAD-7",
      weight: 1.0,
      clinicalSignificance: "Core anxiety symptom",
    },
    {
      id: "phq9_3",
      text: "Trouble falling or staying asleep, or sleeping too much",
      category: "depression",
      scale: "PHQ-9",
      weight: 0.8,
      clinicalSignificance: "Sleep disturbance",
    },
  ];

  const disorderInfo = {
    depression: {
      name: "Major Depressive Disorder",
      description:
        "Persistent feelings of sadness and loss of interest in activities",
      cutoffScores: { mild: 2, moderate: 5, severe: 8 },
      prevalence: "8.4% of US adults",
      evidenceBase: "PHQ-9: 88% sensitivity, 88% specificity",
    },
    anxiety: {
      name: "Generalized Anxiety Disorder",
      description: "Excessive worry and anxiety about various life events",
      cutoffScores: { mild: 2, moderate: 4, severe: 6 },
      prevalence: "3.1% of US adults",
      evidenceBase: "GAD-7: AUC = 0.84 for GAD detection",
    },
  };

  const scaleOptions = [
    { value: 0, label: "Not at all", description: "Never experienced this" },
    {
      value: 1,
      label: "Several days",
      description: "1-6 days in past 2 weeks",
    },
    {
      value: 2,
      label: "More than half the days",
      description: "7+ days in past 2 weeks",
    },
    {
      value: 3,
      label: "Nearly every day",
      description: "12+ days in past 2 weeks",
    },
  ];

  const currentQuestion = validatedQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === validatedQuestions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const hasAnsweredCurrent = responses[currentQuestion?.id] !== undefined;

  const handleResponse = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const analyzeDisorders = () => {
    const disorderScores = {};
    const categories = ["depression", "anxiety"];

    categories.forEach((category) => {
      disorderScores[category] = {
        score: 0,
        maxScore: 0,
        questionsAnswered: 0,
      };
    });

    validatedQuestions.forEach((question) => {
      const response = responses[question.id];
      const category = question.category;

      if (response !== undefined && response !== -1) {
        disorderScores[category].score += response;
        disorderScores[category].maxScore += 3;
        disorderScores[category].questionsAnswered += 1;
      }
    });

    const assessmentResults = [];

    Object.keys(disorderScores).forEach((disorder) => {
      const data = disorderScores[disorder];

      if (data.questionsAnswered > 0) {
        const info = disorderInfo[disorder];
        let severity = "minimal";
        let riskLevel = "low";
        let likelihood = "Low";

        if (data.score >= info.cutoffScores.severe) {
          severity = "severe";
          riskLevel = "high";
          likelihood = "High";
        } else if (data.score >= info.cutoffScores.moderate) {
          severity = "moderate";
          riskLevel = "medium";
          likelihood = "Moderate";
        } else if (data.score >= info.cutoffScores.mild) {
          severity = "mild";
          riskLevel = "medium";
          likelihood = "Mild";
        }

        if (severity !== "minimal") {
          assessmentResults.push({
            disorder,
            info,
            score: data.score,
            maxScore: data.maxScore,
            questionsAnswered: data.questionsAnswered,
            severity,
            riskLevel,
            likelihood,
            evidenceBase: info.evidenceBase,
            prevalence: info.prevalence,
          });
        }
      }
    });

    return assessmentResults;
  };

  const calculateResults = () => {
    setIsLoading(true);

    setTimeout(() => {
      const disorders = analyzeDisorders();
      const hasHighRisk = disorders.some((d) => d.riskLevel === "high");

      setResults({
        disorders,
        hasHighRisk,
        totalResponses: Object.keys(responses).length,
        timestamp: new Date().toLocaleString(),
        overallRecommendation: generateOverallRecommendation(disorders),
      });
      setIsLoading(false);
    }, 1500);
  };

  const generateOverallRecommendation = (disorders) => {
    if (disorders.length === 0) {
      return "Your responses suggest minimal mental health concerns. Continue maintaining good mental health practices.";
    }

    const highRiskDisorders = disorders.filter((d) => d.riskLevel === "high");
    const mediumRiskDisorders = disorders.filter(
      (d) => d.riskLevel === "medium"
    );

    if (highRiskDisorders.length > 0) {
      return `Your responses suggest significant symptoms. We recommend consulting with a mental health professional.`;
    } else if (mediumRiskDisorders.length > 0) {
      return `Your responses suggest some symptoms that may benefit from professional consultation.`;
    }

    return "Consider speaking with a healthcare provider about your mental health.";
  };

  const resetTest = () => {
    setTestStarted(false);
    setCurrentQuestionIndex(-1);
    setResponses({});
    setResults(null);
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / validatedQuestions.length) * 100;
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative text-white overflow-hidden p-2">
      <div className="absolute h-full w-[96vw] rr tt10 rrCenter flex flex-col justify-center items-center overflow-hidden">
        <div className="w-full max-w-2xl mx-auto p-2 h-full flex flex-col justify-center overflow-y-auto">
          {/* Section Header with Animations */}
          <div className="text-center mb-3">
            <h2 
              ref={titleRef}
              className="text-4xl font-bold text-white mb-1 tracking-wide"
              style={{ fontFamily: 'monospace' }}
            >
              {titleText}
            </h2>
            <p 
              ref={subtitleRef}
              className="text-lg text-white max-w-xl mx-auto"
            >
              Take our scientifically-validated mental health screening to
              better understand your wellbeing
            </p>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-xl shadow-lg p-3 lg:p-4 overflow-hidden">
            {/* Initial State */}
            {!testStarted && !results && (
              <div>
                <div className="grid lg:grid-cols-2 gap-3 mb-3">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <div className="bg-blue-100 p-1.5 rounded-lg">
                        <Target className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                          Evidence-Based Assessment
                        </h3>
                        <p className="text-sm text-gray-600">
                          Uses validated clinical screening tools (PHQ-9, GAD-7)
                          with proven accuracy.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="bg-green-100 p-1.5 rounded-lg">
                        <Clock className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                          Quick & Confidential
                        </h3>
                        <p className="text-sm text-gray-600">
                          Takes just 3-5 minutes to complete. Completely private
                          and secure.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="bg-purple-100 p-1.5 rounded-lg">
                        <Info className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                          Professional Insights
                        </h3>
                        <p className="text-sm text-gray-600">
                          Get detailed results with recommendations for your
                          mental health journey.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Ready to Begin?
                    </h3>
                    <p className="text-gray-700 mb-3 text-sm">
                      This assessment will help you understand your current
                      mental health status.
                    </p>
                    <button
                      onClick={handleStartTest}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-base font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-md flex items-center justify-center space-x-2"
                    >
                      <Play className="h-4 w-4" />
                      <span>Start Assessment</span>
                    </button>
                    <p className="text-center text-gray-500 text-xs mt-2">
                      5 questions • 3-5 minutes
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-base font-semibold text-yellow-800 mb-0.5">
                        Important Notice
                      </h4>
                      <p className="text-yellow-700 text-xs leading-relaxed">
                        This screening tool is for educational purposes and is
                        not a substitute for professional medical advice. If
                        you're experiencing a mental health crisis, please
                        contact emergency services immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-6">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3 animate-spin" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Analyzing Your Responses
                </h3>
                <p className="text-gray-600 mb-3 text-sm">
                  Using validated clinical assessment tools...
                </p>
                <div className="w-full max-w-sm mx-auto bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            )}

            {/* Question State */}
            {testStarted && !isLoading && !results && currentQuestion && (
              <div>
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-base font-semibold text-gray-700">
                      Question {currentQuestionIndex + 1} of{" "}
                      {validatedQuestions.length}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      {Math.round(getProgressPercentage())}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="bg-blue-50 p-2 sm:p-3 rounded-lg mb-1">
                    <p className="text-xs text-blue-600 font-medium mb-0.5">
                      {currentQuestion.scale} •{" "}
                      {currentQuestion.clinicalSignificance}
                    </p>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-0.5">
                      Over the last 2 weeks, how often have you been bothered
                      by:
                    </h3>
                  </div>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-2 sm:p-3 rounded-lg mb-2">
                    <p className="text-base text-gray-800 leading-relaxed font-medium">
                      {currentQuestion.text}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  {scaleOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center p-2 border-2 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                        responses[currentQuestion.id] === option.value
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option.value}
                        checked={responses[currentQuestion.id] === option.value}
                        onChange={() =>
                          handleResponse(currentQuestion.id, option.value)
                        }
                        className="mr-2 h-3.5 w-3.5 text-blue-600"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base mb-0">
                          {option.label}
                        </div>
                        <div className="text-gray-600 text-xs sm:text-sm">
                          {option.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={previousQuestion}
                    disabled={isFirstQuestion}
                    className={`flex items-center px-3 py-1.5 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                      isFirstQuestion
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1.5" />
                    Previous
                  </button>

                  <button
                    onClick={nextQuestion}
                    disabled={!hasAnsweredCurrent}
                    className={`flex items-center px-3 py-1.5 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                      !hasAnsweredCurrent
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : isLastQuestion
                        ? "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:shadow-md transform hover:scale-105"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-md transform hover:scale-105"
                    }`}
                  >
                    {isLastQuestion ? "Get Results" : "Next Question"}
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Results State */}
            {results && (
              <div>
                <div className="text-center mb-3">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    Your Assessment Results
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Based on validated clinical screening instruments
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-blue-800 mb-1">
                        Assessment Summary
                      </h4>
                      <p className="text-blue-700 text-base leading-relaxed">
                        {results.overallRecommendation}
                      </p>
                    </div>
                  </div>
                </div>

                {results.disorders.length > 0 ? (
                  <div className="space-y-3 mb-3">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Detailed Results
                    </h4>
                    {results.disorders.map((disorder, index) => (
                      <div
                        key={disorder.disorder}
                        className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex-1">
                            <h5 className="text-lg font-semibold text-gray-900 mb-0.5">
                              {disorder.info.name}
                            </h5>
                            <p className="text-gray-600 mb-1 text-sm">
                              {disorder.info.description}
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                              <span>{disorder.evidenceBase}</span>
                              <span>Prevalence: {disorder.prevalence}</span>
                            </div>
                          </div>
                          <div className="text-right ml-2">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                disorder.riskLevel === "high"
                                  ? "bg-red-100 text-red-800"
                                  : disorder.riskLevel === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {disorder.likelihood} Risk
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-green-50 p-3 rounded-lg mb-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg font-semibold text-green-800 mb-0.5">
                          Positive Results
                        </h4>
                        <p className="text-green-700 text-sm">
                          Your responses indicate minimal mental health
                          concerns. Continue maintaining your mental wellness.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={resetTest}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-base font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                  >
                    Take Assessment Again
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg text-base font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Print Results
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthTest;