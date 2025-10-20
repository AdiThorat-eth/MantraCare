import React, { useState, useMemo, useEffect, useRef } from "react";
import { Card, CardBody } from "./Card";
import {
  Search,
  Phone,
  MapPin,
  Star,
  Filter,
  Heart,
  Brain,
  Users,
} from "lucide-react";

// The array of words to cycle through for the title animation
const ROTATING_WORDS = [
  "Professional",
  "Specialist",
  "Expert",
  "Consultant",
  "Therapist",
];

const Doctor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  // State for the rotating word animation
  const [rotatingWordIndex, setRotatingWordIndex] = useState(0);
  // Ref for the sticky header to dynamically calculate heights
  const headerRef = useRef(null);
  // State for calculated scrollable area height
  const [scrollableHeight, setScrollableHeight] = useState("0px");

  // Effect to handle the word rotation animation
  useEffect(() => {
    // Set an interval to change the word every 2.5 seconds (2500ms)
    const intervalId = setInterval(() => {
      setRotatingWordIndex(
        (prevIndex) => (prevIndex + 1) % ROTATING_WORDS.length
      );
    }, 2500); // Change word every 2.5 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Effect to calculate the height of the scrollable content area
  useEffect(() => {
    const calculateHeight = () => {
      if (headerRef.current) {
        // Get the height of the entire fixed header block
        const headerHeight = headerRef.current.offsetHeight;
        
        // Calculate the remaining height for the scrollable results area.
        // The parent container is h-full, which is 100vh of the screen in this setup.
        // We subtract the header height and a small margin/padding (e.g., 20px)
        const newHeight = `calc(100vh - ${headerHeight}px - 10px)`;
        setScrollableHeight(newHeight);
      }
    };

    // Calculate height on mount and window resize
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    
    // Recalculate after a slight delay to ensure card content renders
    const timer = setTimeout(calculateHeight, 100);

    return () => {
      window.removeEventListener("resize", calculateHeight);
      clearTimeout(timer);
    };
  }, [searchTerm, selectedSpecialty, sortBy]); // Recalculate if filters change

  // Mock data for doctors - replacement data for demonstration
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Clinical Psychologist",
      hospital: "Mind Wellness Center",
      phone: "+1 (555) 123-4567",
      address: "123 Therapy Lane, Mental Health District, City 12345",
      photo:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      experience: "12 years",
      patients: 450,
      specialties: ["Anxiety", "Depression", "PTSD"],
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Psychiatrist",
      hospital: "Serenity Medical Institute",
      phone: "+1 (555) 234-5678",
      address: "456 Healing Road, Wellness Quarter, City 12346",
      photo:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      rating: 4.8,
      experience: "15 years",
      patients: 680,
      specialties: [
        "Bipolar Disorder",
        "Schizophrenia",
        "Medication Management",
      ],
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Therapist",
      hospital: "Hope & Healing Clinic",
      phone: "+1 (555) 345-6789",
      address: "789 Recovery Street, Mental Health Hub, City 12347",
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.7,
      experience: "8 years",
      patients: 320,
      specialties: ["Couples Therapy", "Family Counseling", "Trauma"],
    },
    {
      id: 4,
      name: "Dr. Ananya Singh",
      specialty: "Neuropsychologist",
      hospital: "Neuro Care India",
      phone: "+91 98200 12345",
      address: "B-2, Apollo Road, Bandra West, Mumbai, Maharashtra 400050",
      photo:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      experience: "20 years",
      patients: 520,
      specialties: ["Memory Disorders", "Cognitive Assessment", "Brain Injury"],
    },
    {
      id: 5,
      name: "Dr. Aditya Sharma",
      specialty: "Child Psychologist",
      hospital: "Mindful Kids Clinic",
      phone: "+91 98200 54321",
      address: "10, HSR Layout, Sector 6, Bangalore, Karnataka 560102",
      photo:
        "https://plus.unsplash.com/premium-photo-1691030256091-8d3733f8b6d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
      experience: "10 years",
      patients: 380,
      specialties: ["ADHD", "Autism Spectrum", "Behavioral Issues"],
    },
    {
      id: 6,
      name: "Dr. Priya Desai",
      specialty: "Addiction Counselor",
      hospital: "Hope & Wellness Institute",
      phone: "+91 98200 98765",
      address: "5, Green Park, Parel, Mumbai, Maharashtra 400012",
      photo:
        "https://images.unsplash.com/photo-1646979201277-aca83fa543c3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.6,
      experience: "14 years",
      patients: 290,
      specialties: ["Substance Abuse", "Behavioral Addiction", "Group Therapy"],
    },
    {
      id: 7,
      name: "Dr. Kevin Li",
      specialty: "Psychiatrist",
      hospital: "Sanity Clinic",
      phone: "+1 (555) 777-8888",
      address: "99 Calm Street, City 12348",
      photo:
        "https://images.unsplash.com/photo-1603415526960-c3d0b2e8f17f?w=400&h=400&fit=crop&crop=face",
      rating: 4.5,
      experience: "7 years",
      patients: 250,
      specialties: ["Anxiety", "Sleep Disorders"],
    },
    {
      id: 8,
      name: "Dr. Lisa White",
      specialty: "Clinical Psychologist",
      hospital: "Inner Peace Center",
      phone: "+1 (555) 999-0000",
      address: "50 Tranquil Ave, City 12349",
      photo:
        "https://images.unsplash.com/photo-1594918737225-b467b7e8d08f?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      experience: "18 years",
      patients: 700,
      specialties: ["Grief Counseling", "OCD"],
    },
    {
      id: 9,
      name: "Dr. Ben Carter",
      specialty: "Therapist",
      hospital: "Counselling Hub",
      phone: "+1 (555) 111-2222",
      address: "88 Compassion Blvd, City 12350",
      photo:
        "https://images.unsplash.com/photo-1552058544-f2b7a9de58b1?w=400&h=400&fit=crop&crop=face",
      rating: 4.6,
      experience: "6 years",
      patients: 180,
      specialties: ["Stress Management", "Career Coaching"],
    },
  ];

  const specialties = [
    "all",
    "Clinical Psychologist",
    "Psychiatrist",
    "Therapist",
    "Neuropsychologist",
    "Child Psychologist",
    "Addiction Counselor",
  ];

  const filteredDoctors = useMemo(() => {
    let filtered = doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedSpecialty, sortBy]);

  const getSpecialtyIcon = (specialty) => {
    switch (specialty) {
      case "Clinical Psychologist":
      case "Therapist":
        return <Heart className="w-4 h-4 text-pink-500" />;
      case "Psychiatrist":
      case "Neuropsychologist":
        return <Brain className="w-4 h-4 text-purple-500" />;
      case "Child Psychologist":
        return <Users className="w-4 h-4 text-blue-500" />;
      default:
        return <Heart className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="absolute h-full w-full max-w-[96vw] rr tt11 inset-x-0 mx-auto flex flex-col justify-start items-center overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto px-1 flex flex-col h-full">
          
          <div ref={headerRef} className="pt-1 pb-0.5">
            
            <div className="text-center mb-1.5">
              <h1 className="text-4xl pt-3 md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1.5">
                Find Your Mental Health{" "}
                <span key={rotatingWordIndex} className="animate-fade-scale-in animated-gradient-text">
                  {ROTATING_WORDS[rotatingWordIndex]}
                </span>
              </h1>
              <p className="text-lg text-black max-w-2xl mx-auto">
                Connect with experienced doctors and therapists who care about
                your mental well-being
              </p>
            </div>

            <Card className="mb-0.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardBody className="p-1.5">
                <div className="flex flex-col lg:flex-row gap-1.5 items-center">
                  <div className="relative flex-1 w-full lg:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search doctors, hospitals, or specialties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 w-full lg:w-auto">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="px-2 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white min-w-[200px]"
                    >
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                          {specialty === "all" ? "All Specialties" : specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-2 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white min-w-[150px]"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="experience">Sort by Experience</option>
                  </select>
                </div>
              </CardBody>
            </Card>

            <div className="text-center text-black font-semibold mb-0.5">
              Found {filteredDoctors.length} mental health professional
              {filteredDoctors.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div
            className="flex-grow overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2"
            style={{ maxHeight: scrollableHeight }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <Card
                    key={doctor.id}
                    className="hover:scale-105 transition-all duration-300 cursor-pointer bg-white/90 dark:bg-gray-800/90 border border-white/20 shadow-lg hover:shadow-2xl"
                  >
                    <CardBody className="p-1.5">
                      <div className="flex items-start space-x-1.5 mb-2">
                        <div className="relative">
                          <img
                            src={doctor.photo}
                            alt={doctor.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-lg"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                doctor.name
                              )}&size=64&background=6366f1&color=ffffff`;
                            }}
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                            {doctor.name}
                          </h3>
                          <div className="flex items-center space-x-1 mb-0.5">
                            {getSpecialtyIcon(doctor.specialty)}
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                              {doctor.specialty}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium text-gray-900 dark:text-white">
                              {doctor.rating}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({doctor.patients} patients)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                          {doctor.hospital}
                        </h4>
                        <div className="flex items-start space-x-1 text-xs text-gray-600 dark:text-gray-300">
                          <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span className="leading-tight">{doctor.address}</span>
                        </div>
                      </div>

                      <div className="mb-0.5">
                        <div className="flex flex-wrap gap-2">
                          {doctor.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-0.5 border-t border-gray-200 dark:border-gray-600">
                        <div className="text-xs">
                          <span className="text-gray-500 dark:text-gray-400">
                            Experience:{" "}
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {doctor.experience}
                          </span>
                        </div>
                        <a
                          href={`tel:${doctor.phone}`}
                          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg transition-colors duration-200 text-xs font-medium"
                        >
                          <Phone className="w-3 h-3" />
                          <span className="hidden sm:inline">Call Now</span>
                        </a>
                      </div>

                      <div className="mt-0.5 text-center">
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {doctor.phone}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 md:col-span-2 xl:col-span-3">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    No doctors found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;