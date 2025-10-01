import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ====================================================================
// 1. CRITICAL COMPONENTS (Standard Import - Load immediately)
// These components are essential for the initial visible screen (above the fold)
// or are necessary for core functionality (like auth pages).
// ====================================================================
import Navbar from "./components/Navbar";
import MiniNavbar from "./components/MiniNavbar";
import Hero from "./components/Hero";
import Chatbot from "./components/Chatbot";
import LoginPage from "./components/Loginpage";
import RegisterPage from "./components/Register";
import CrisisSupport from "./components/CrisisSupport"; // Crisis Support is often critical

// ====================================================================
// 2. LAZY LOADED COMPONENTS (Dynamic Import - Load on demand/in background)
// These components form the bulk of your landing page sections.
// ====================================================================
const LazyServices = lazy(() => import("./components/Services"));
const LazyMoodTracker = lazy(() => import("./components/MoodTracker"));
const LazyMentalHealthTest = lazy(() =>
  import("./components/MentalHealthTest")
);
const LazyPrice = lazy(() => import("./components/Price"));
const LazyDoctor = lazy(() => import("./components/Doctor"));
const LazyFeatures = lazy(() => import("./components/Features"));
const LazyTestimonial = lazy(() => import("./components/Testimonial"));
const LazyFAQ = lazy(() => import("./components/FAQ"));
const LazyAbout = lazy(() => import("./components/About"));
const LazyFooter = lazy(() => import("./components/Footer"));

// Loader Component (Unchanged)
const Loader = () => {
  return (
    <div className="relative w-[65px] aspect-square">
      <span className="absolute rounded-[50px] animate-loaderAnim shadow-[inset_0_0_0_3px] shadow-white" />
      <span className="absolute rounded-[50px] animate-loaderAnim animation-delay shadow-[inset_0_0_0_3px] shadow-white" />
      <style jsx>{`
        @keyframes loaderAnim {
          0% {
            inset: 0 35px 35px 0;
          }
          12.5% {
            inset: 0 35px 0 0;
          }
          25% {
            inset: 35px 35px 0 0;
          }
          37.5% {
            inset: 35px 0 0 0;
          }
          50% {
            inset: 35px 0 0 35px;
          }
          62.5% {
            inset: 0 0 0 35px;
          }
          75% {
            inset: 0 0 35px 35px;
          }
          87.5% {
            inset: 0 0 35px 0;
          }
          100% {
            inset: 0 35px 35px 0;
          }
        }
        .animate-loaderAnim {
          animation: loaderAnim 2.5s infinite;
        }
        .animation-delay {
          animation-delay: -1.25s;
        }
      `}</style>
    </div>
  );
};

// Loading Screen Component (Unchanged)
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader />
        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // MINIMUM DURATION: Reduced to 500ms (0.5s) for a smooth, fast transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="relative w-screen min-h-screen overflow-x-hidden">
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Main Landing Page */}
          <Route
            path="/"
            element={
              <>
                <MiniNavbar />
                <Navbar />

                {/* CRITICAL SECTION: Hero is loaded immediately */}
                <section id="home">
                  <Hero />
                </section>

                {/* SUSPENSE BOUNDARY: Wraps all lazy-loaded sections. 
                    This ensures the main page renders quickly, and the content 
                    below the fold loads asynchronously. 
                */}
                <Suspense
                  fallback={
                    <div className="text-center p-16 text-gray-500">
                      Loading further sections...
                    </div>
                  }
                >
                  <section id="services">
                    <LazyServices />
                  </section>

                  <section id="moodtracker">
                    <LazyMoodTracker />
                  </section>

                  <section id="mentalhealthtest">
                    <LazyMentalHealthTest />
                  </section>

                  <section id="price">
                    <LazyPrice />
                  </section>

                  <section id="doctor">
                    <LazyDoctor />
                  </section>

                  <section id="features">
                    <LazyFeatures />
                  </section>

                  {/* <section id="Meditationhub">
                    <MeditationHub />
                  </section> */}

                  <section id="testimonial">
                    <LazyTestimonial />
                  </section>

                  <section id="faq">
                    <LazyFAQ />
                  </section>

                  <section id="crisissupport">
                    <CrisisSupport /> {/* Kept standard import for stability */}
                  </section>

                  <section id="about">
                    <LazyAbout />
                  </section>

                  <section id="footer">
                    <LazyFooter />
                  </section>
                </Suspense>
              </>
            }
          />
        </Routes>

        {/* Chatbot is global — always available */}
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
