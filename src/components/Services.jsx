import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

function Card({
  children,
  className,
  patternClassName,
  gradientClassName,
}) {
  return (
    <motion.div
      className={cn(
        "w-full rounded-md overflow-hidden",
        "border-transparent",
        "p-3",
        "relative group z-10",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-sm
            shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]
        transition-all
        dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)] border-4 border-white/40"
      />
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full rounded-md overflow-hidden"
      />
      <div
        className={cn(
          "absolute inset-0 z-5 w-full h-full bg-repeat",
          "bg-[length:30px_30px]",
          "bg-lines-pattern-light dark:bg-lines-pattern",
          patternClassName
        )}
      >
        <div
          className={cn(
            "w-full h-full bg-gradient-to-tr",
            "from-white/5 via-white/0 to-white/0",
            "dark:from-black/10 dark:via-black/0 dark:to-black/0",
            gradientClassName
          )}
        />
      </div>
      <div className="absolute inset-0 z-10 bg-black/5 rounded-md backdrop-blur-[0px]"></div>
      <div className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
}

function CardBody({ className, ...props }) {
  return <div className={cn("text-left p-4 md:p-6", className)} {...props} />;
}

const Services = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Load GSAP and ScrollTrigger from CDN
    const loadGSAP = async () => {
      if (window.gsap && window.ScrollTrigger) {
        initAnimations();
        return;
      }

      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      document.head.appendChild(gsapScript);

      gsapScript.onload = () => {
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        document.head.appendChild(scrollTriggerScript);

        scrollTriggerScript.onload = () => {
          window.gsap.registerPlugin(window.ScrollTrigger);
          initAnimations();
        };
      };
    };

    const initAnimations = () => {
      const { gsap } = window;
      const { ScrollTrigger } = window;

      // Split text into words for "Our Services"
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 50,
            rotationX: -90,
            transformOrigin: "50% 50%"
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
              // Make it repeatable
              once: false
            }
          }
        );
      }

      // Animate subtitle with a glowing effect
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            scale: 0.8,
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
              once: false
            }
          }
        );
      }
    };

    loadGSAP();

    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .hover-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .hover-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.6s ease;
        }

        .hover-card:hover::before {
          left: 100%;
        }

        .hover-card:hover {
          transform: translateY(-8px) rotateY(3deg) rotateX(3deg);
        }

        .hover-card-1:hover {
          box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.4),
            inset 0 0 60px rgba(255, 255, 255, 0.2),
            inset 0 0 90px rgba(255, 255, 255, 0.1);
        }

        .hover-card-2:hover {
          box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.4),
            inset 0 0 60px rgba(255, 255, 255, 0.2),
            inset 0 0 90px rgba(255, 255, 255, 0.1);
        }

        .hover-card-3:hover {
          box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.4),
            inset 0 0 60px rgba(255, 255, 255, 0.2),
            inset 0 0 90px rgba(255, 255, 255, 0.1);
        }

        .hover-gradient {
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .hover-gradient::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .hover-gradient:hover::after {
          opacity: 1;
        }

        .hover-icon {
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .hover-card:hover .hover-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .hover-text {
          transition: all 0.3s ease;
        }

        .hover-card:hover .hover-text {
          transform: translateX(5px);
        }

        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }

        .floating-animation:nth-child(2) {
          animation-delay: -2s;
        }

        .floating-animation:nth-child(3) {
          animation-delay: -4s;
        }

        .special-font ss {
          font-family: "silkserif";
        }

        .special-font cc {
          font-family: "circular";
        }
        
        .special-font sss {
          font-family: "silkserif";
          color: limegreen;
        }

        .word {
          display: inline-block;
          margin: 0 8px;
          perspective: 1000px;
        }

        .title-container {
          perspective: 1000px;
        }
      `}</style>
      <div className="absolute h-screen w-full max-w-[96vw] rr bc inset-x-0 mx-auto flex flex-col justify-center items-center overflow-hidden overflow-x-hidden">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
          {/* Services Title - Compact */}
          <div className="text-center mb-3 sm:mb-4 md:mb-5">
            <h2 
              ref={titleRef}
              className="text-3xl special-font sm:text-2xl md:text-3xl lg:text-6xl font-bold text-gray-100 mb-1 sm:mb-1.5 px-1 title-container"
            >
              <cc>
                <span className="word">Our</span>
                <ss><span className="word">Services</span></ss>
              </cc>
            </h2>
            <p 
              ref={subtitleRef}
              className="text-gray-300 special-font text-md sm:text-sm md:text-xl max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-1 leading-relaxed"
            >
              To Be Your Best Version <br /> Make your life <sss>Colorful</sss>
            </p>
          </div>

          {/* Service Cards Grid - Compact */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 max-w-full">
            {/* Service Card 1 - Compact */}
            <Card className="hover-card hover-card-1 floating-animation w-full h-auto min-h-[130px] sm:min-h-[130px] md:h-40 lg:h-44 group">
              <CardBody className="hover-gradient p-2 sm:p-2.5 md:p-3 h-full flex flex-col relative">
                <div className="flex items-start mb-1.5 sm:mb-1.5 relative z-10">
                  <div className="hover-icon w-1 sm:w-1 h-4 sm:h-4 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-2 flex-shrink-0 mt-1"></div>
                  <h3 className="hover-text text-sm sm:text-base md:text-lg font-bold text-gray-100 leading-tight flex-1 group-hover:text-blue-300 transition-colors duration-300">
                    Interactive Learning Formats
                  </h3>
                </div>
                <p className="hover-text text-gray-300 text-sm sm:text-xs md:text-sm leading-relaxed flex-1 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                  Learn the way that suits you best, whether it's through
                  immersive videos, insightful audio sessions, or structured
                  documents. Our multi-format approach ensures you stay engaged
                  and retain more.
                </p>
              </CardBody>
            </Card>

            {/* Service Card 2 - Compact */}
            <Card className="hover-card hover-card-2 floating-animation w-full h-auto min-h-[130px] sm:min-h-[130px] md:h-40 lg:h-44 group">
              <CardBody className="hover-gradient p-2 sm:p-2.5 md:p-3 h-full flex flex-col relative">
                <div className="flex items-start mb-1.5 sm:mb-1.5 relative z-10">
                  <div className="hover-icon w-1 sm:w-1 h-4 sm:h-4 bg-gradient-to-b from-green-400 to-teal-500 rounded-full mr-2 flex-shrink-0 mt-1"></div>
                  <h3 className="hover-text text-sm sm:text-base md:text-lg font-bold text-gray-100 leading-tight flex-1 group-hover:text-green-300 transition-colors duration-300">
                    Guided Meditation
                  </h3>
                </div>
                <p className="hover-text text-gray-300 text-xs sm:text-xs md:text-sm leading-relaxed flex-1 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                  Find peace in the chaos with our guided meditation sessions.
                  Designed to reduce stress and improve focus, these sessions
                  help you reconnect with your inner calm one breath at a time.
                </p>
              </CardBody>
            </Card>

            {/* Service Card 3 - Compact */}
            <Card className="hover-card hover-card-3 floating-animation w-full h-auto min-h-[130px] sm:min-h-[130px] md:h-40 lg:h-44 group md:col-span-2 lg:col-span-1">
              <CardBody className="hover-gradient p-2 sm:p-2.5 md:p-3 h-full flex flex-col relative">
                <div className="flex items-start mb-1.5 sm:mb-1.5 relative z-10">
                  <div className="hover-icon w-1 sm:w-1 h-4 sm:h-4 bg-gradient-to-b from-orange-400 to-red-500 rounded-full mr-2 flex-shrink-0 mt-1"></div>
                  <h3 className="hover-text text-sm sm:text-base md:text-lg font-bold text-gray-100 leading-tight flex-1 group-hover:text-orange-300 transition-colors duration-300">
                    AI-Powered Chatbot Support
                  </h3>
                </div>
                <p className="hover-text text-gray-300 text-xs sm:text-xs md:text-sm leading-relaxed flex-1 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                  Get instant answers and round-the-clock assistance with our
                  AI-powered support system. Designed to handle queries
                  efficiently and guide you without delays.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;