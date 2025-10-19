import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from 'lenis'

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
import CrisisSupport from "./components/CrisisSupport";
// import White from "./components/White";

// ====================================================================
// 2. LAZY LOADED COMPONENTS WITH PRELOAD HINTS
// Optimized lazy loading with webpackPreload for better performance
// ====================================================================
const LazyServices = lazy(() => 
  import(/* webpackPrefetch: true */ "./components/Services")
);
const LazyMoodTracker = lazy(() => 
  import(/* webpackPrefetch: true */ "./components/MoodTracker")
);
const LazyMentalHealthTest = lazy(() =>
  import(/* webpackPrefetch: true */ "./components/MentalHealthTest")
);
const LazyPrice = lazy(() => 
  import(/* webpackPrefetch: true */ "./components/Price")
);
const LazyDoctor = lazy(() => 
  import(/* webpackPrefetch: true */ "./components/Doctor")
);
const LazyFeatures = lazy(() => 
  import(/* webpackPrefetch: true */ "./components/Features")
);
const LazyTestimonial = lazy(() => 
  import(/* webpackPrefetch: true */ "./components/Testimonial")
);
const LazyFAQ = lazy(() => 
  import(/* webpackPrefetch: true */ "./components/FAQ")
);
const LazyAbout = lazy(() => 
  import(/* webpackPrefetch: true */ "./components/About")
);
const LazyFooter = lazy(() => 
  import(/* webpackPrefetch: true */ "./components/Footer")
);

// const LazyWhite = lazy(() => 
// import(/* webpackPrefetch: true */ "./components/White")
// );

// Optimized Loader Component
const Loader = () => {

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true,
    });

    // Listen for the scroll event and log the event data
    lenis.on('scroll', (e) => {
      console.log(e);
    });
  })

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

// Loading Screen Component
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

// Minimal fallback for lazy sections
const SectionFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="text-gray-400 text-sm">Loading...</div>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Optimized loading duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Preload components after initial render for instant transitions
  useEffect(() => {
    if (!isLoading) {
      // Small delay to ensure Hero is fully rendered first
      const preloadTimer = setTimeout(() => {
        // Trigger preload of first few sections
        LazyServices.preload?.();
        LazyMoodTracker.preload?.();
        LazyMentalHealthTest.preload?.();
      }, 100);

      return () => clearTimeout(preloadTimer);
    }
  }, [isLoading]);

  // Intersection Observer for progressive loading
  useEffect(() => {
    if (!isLoading && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.id;
              // Preload next sections as user scrolls
              if (sectionId === 'services') {
                LazyPrice.preload?.();
                LazyDoctor.preload?.();
              } else if (sectionId === 'price') {
                LazyFeatures.preload?.();
                LazyTestimonial.preload?.();
              } else if (sectionId === 'features') {
                LazyFAQ.preload?.();
                LazyAbout.preload?.();
              } else if (sectionId === 'faq') {
                LazyFooter.preload?.();
              }
            }
          });
        },
        { rootMargin: '200px' } // Start loading 200px before section is visible
      );

      // Observe all sections
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }
  }, [isLoading]);

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

                {/* CRITICAL SECTION: Hero loads immediately */}
                <section id="home">
                  <Hero />
                </section>

                {/* Individual Suspense boundaries for better UX */}
                <Suspense fallback={<SectionFallback />}>
                  <section id="services">
                    <LazyServices />
                  </section>
                </Suspense>

                <Suspense fallback={<SectionFallback />}>
                  <section id="moodtracker">
                    <LazyMoodTracker />
                  </section>
                </Suspense>

                <Suspense fallback={<SectionFallback />}>
                  <section id="mentalhealthtest">
                    <LazyMentalHealthTest />
                  </section>
                </Suspense>

                <Suspense fallback={<SectionFallback />}>
                  <section id="price">
                    <LazyPrice />
                  </section>
                </Suspense>

                <Suspense fallback={<SectionFallback />}>
                  <section id="doctor">
                    <LazyDoctor />
                  </section>
                </Suspense>

                <Suspense fallback={<SectionFallback />}>
                  <section id="features">
                    <LazyFeatures />
                  </section>
                </Suspense>

                <Suspense fallback={<SectionFallback />}>
                  <section id="testimonial">
                    <LazyTestimonial />
                  </section>
                </Suspense>

                <Suspense fallback={<SectionFallback />}>
                  <section id="faq">
                    <LazyFAQ />
                  </section>
                </Suspense>

                <section id="crisissupport">
                  <CrisisSupport />
                </section>

                <Suspense fallback={<SectionFallback />}>
                  <section id="about">
                    <LazyAbout />
                  </section>
                </Suspense>

                {/* <Suspense fallback={<SectionFallback />}>
                  <section id="white">
                    <LazyWhite />
                  </section>
                </Suspense> */}

                <Suspense fallback={<SectionFallback />}>
                  <section id="footer">
                    <LazyFooter />
                  </section>
                </Suspense>

              </>
            }
          />
        </Routes>

        {/* Chatbot is global â€" always available */}
        <Chatbot />
      </div>
    </Router>

            

  );
};

export default App;