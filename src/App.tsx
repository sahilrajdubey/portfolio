'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Skill {
  name: string;
  level: string;
  progress: number;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
  githubUrl: string;
  liveUrl?: string;
}

interface TimelineItem {
  date: string;
  title: string;
  company: string;
  description: string;
}

// ============================================================================
// SIMPLE ANIMATION VARIANTS (Performance Optimized)
// ============================================================================

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

// ============================================================================
// ANIMATED 3D TECH BACKGROUND (Moving 3D elements)
// ============================================================================

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark background with subtle grain */}
      <div className="absolute inset-0 bg-gray-950" />
      
      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 1: Deep background orbs */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          filter: 'blur(80px)',
          opacity: 0.3,
        }}
      >
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%)',
          }}
          animate={{
            x: ['-20%', '120%', '-20%'],
            y: ['0%', '80%', '0%'],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
          }}
          animate={{
            x: ['100%', '-20%', '100%'],
            y: ['80%', '10%', '80%'],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 23,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Layer 2: Mid-depth flowing gradients */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          filter: 'blur(60px)',
          opacity: 0.25,
        }}
      >
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 60%)',
          }}
          animate={{
            x: ['50%', '-10%', '50%'],
            y: ['-10%', '60%', '-10%'],
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 60%)',
          }}
          animate={{
            x: ['10%', '70%', '10%'],
            y: ['70%', '0%', '70%'],
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 65%)',
          }}
          animate={{
            x: ['80%', '20%', '80%'],
            y: ['20%', '70%', '20%'],
            scale: [1.1, 1.35, 1.1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Layer 3: Foreground accent orbs with 3D perspective */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          filter: 'blur(40px)',
          opacity: 0.2,
        }}
      >
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(129, 140, 248, 0.7) 0%, rgba(99, 102, 241, 0.3) 40%, transparent 70%)',
          }}
          animate={{
            x: ['10%', '85%', '10%'],
            y: ['10%', '85%', '10%'],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 60% 40%, rgba(196, 181, 253, 0.6) 0%, rgba(139, 92, 246, 0.3) 40%, transparent 70%)',
          }}
          animate={{
            x: ['75%', '5%', '75%'],
            y: ['75%', '15%', '75%'],
            scale: [1.4, 1, 1.4],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Layer 4: Floating particles/stars effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Layer 5: Animated mesh gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
          opacity: 0.5,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Layer 6: Dynamic light sweep effect */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
        }}
        animate={{
          x: ['-100%', '200%'],
          y: ['-100%', '200%'],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Layer 7: Subtle vignette for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
};

      {/* Moving 3D Tech Elements */}
      {/* Floating Cubes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`cube-${i}`}
          className="absolute"
          style={{
            width: `${40 + i * 10}px`,
            height: `${40 + i * 10}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 180],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-full h-full border border-indigo-500/20 bg-indigo-950/10 backdrop-blur-sm"
            style={{
              transform: 'perspective(1000px) rotateX(45deg) rotateY(45deg)',
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.2)',
            }}
          />
        </motion.div>
      ))}

      {/* Floating Circuit Patterns */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`circuit-${i}`}
          className="absolute w-1 bg-gradient-to-b from-indigo-500/30 to-transparent"
          style={{
            height: `${50 + Math.random() * 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Rotating Hexagons */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`hex-${i}`}
          className="absolute"
          style={{
            width: `${60 + i * 15}px`,
            height: `${60 + i * 15}px`,
            left: `${10 + i * 15}%`,
            top: `${10 + i * 10}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50 1 95 25 95 75 50 99 5 75 5 25"
              fill="none"
              stroke="rgba(99, 102, 241, 0.2)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      ))}

      {/* Floating Code Brackets */}
      {['<', '>', '{', '}', '[', ']'].map((symbol, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-4xl font-bold text-indigo-500/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Moving Grid Lines */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Binary Code */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`binary-${i}`}
          className="absolute text-xs text-indigo-500/20 font-mono"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -200, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          {Math.random() > 0.5 ? '1010' : '0101'}
        </motion.div>
      ))}

      {/* Orbiting Dots (representing data points) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-2 h-2 bg-indigo-500/30 rounded-full"
            style={{
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
            }}
            animate={{
              x: Math.cos((i / 20) * Math.PI * 2) * 300,
              y: Math.sin((i / 20) * Math.PI * 2) * 300,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PortfolioApp() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [emailCopied, setEmailCopied] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // ============================================================================
  // DATA
  // ============================================================================

  const skills: Record<string, Skill[]> = {
    languages: [
      { name: 'JavaScript', level: 'Advanced', progress: 90 },
      { name: 'Python', level: 'Advanced', progress: 85 },
      { name: 'TypeScript', level: 'Advanced', progress: 88 },
      { name: 'SQL', level: 'Intermediate', progress: 75 },
    ],
    frameworks: [
      { name: 'React', level: 'Advanced', progress: 88 },
      { name: 'Next.js', level: 'Advanced', progress: 85 },
      { name: 'FastAPI', level: 'Intermediate', progress: 80 },
      { name: 'Node.js', level: 'Intermediate', progress: 78 },
    ],
    tools: [
      { name: 'MongoDB', level: 'Intermediate', progress: 70 },
      { name: 'Git', level: 'Advanced', progress: 85 },
      { name: 'Docker', level: 'Intermediate', progress: 72 },
      { name: 'AWS', level: 'Beginner', progress: 60 },
    ],
  };

  const projects: Project[] = [
    {
      title: 'Mental Health ChatBot',
      description: 'AI-powered chatbot for mental health support with ML models for natural conversations.',
      tags: ['React', 'Python', 'NLP', 'FastAPI', 'ML'],
      category: 'web',
      githubUrl: 'https://github.com/sahilrajdubey/MentalHealthChatBot',
      liveUrl: '#',
    },
    {
      title: 'Skill Progress Dashboard',
      description: 'Comprehensive dashboard for tracking learning progress with interactive charts and analytics.',
      tags: ['React', 'TypeScript', 'Chart.js', 'MongoDB'],
      category: 'web',
      githubUrl: 'https://github.com/sahilrajdubey/skillprogressdashboard',
      liveUrl: '#',
    },
    {
      title: 'Technovate Platform',
      description: 'Platform connecting tech enthusiasts with project collaboration and skill sharing tools.',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
      category: 'opensource',
      githubUrl: 'https://github.com/gitcomit8/technovate-new',
      liveUrl: '#',
    },
    {
      title: 'Data Analytics Suite',
      description: 'Data analysis toolkit with automated reporting and ML model integration.',
      tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
      category: 'data',
      githubUrl: '#',
    },
  ];

  const timeline: TimelineItem[] = [
    {
      date: '2024 - Present',
      title: 'Software Developer Journey',
      company: 'Independent Learning & Projects',
      description: 'Embarked on an intensive self learning journey, mastering modern web technologies, data science tools, and contributing to open-source projects.',
    },
    {
      date: '2024 - 2025',
      title: 'Open Source Contributor',
      company: 'Various Projects',
      description: 'Started contributing to open-source projects, focusing on web development tools and educational resources.',
    },
  ];

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('sahilrajdubey@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('Thank you for your message! I\'ll get back to you soon.');
    (e.target as HTMLFormElement).reset();
    setFormSubmitting(false);
  };

  const handleDownloadResume = () => {
    const resumeUrl = 'https://drive.google.com/file/d/1G5nDPkH32y1XLnIRjQhQcmJ_ipBUUDDb/view?usp=sharing';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Sahil_Raj_Dubey_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Simple Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, sans-serif;
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }

        .glass {
          background: rgba(17, 24, 39, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(99, 102, 241, 0.1);
        }
      `}</style>

      <AnimatedBackground />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-indigo-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#hero" className="text-xl font-bold text-indigo-400">
              {'Portfolio'}
            </a>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-8">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`text-sm transition-colors ${
                      activeSection === item.toLowerCase()
                        ? 'text-indigo-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-400 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
            
            {/* Photo - SHIFTED RIGHT with justify-end */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center md:justify-end order-1 md:order-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-2xl opacity-20" />
                <img
                  src="https://avatars.githubusercontent.com/sahilrajdubey"
                  alt="Sahil Raj Dubey"
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-indigo-500/30 shadow-lg shadow-indigo-500/20 transition-all duration-500 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-6 order-2 md:order-1"
            >
              <motion.div variants={fadeIn} className="space-y-2">
                <p className="text-indigo-400 text-sm font-medium">Hi there , I'm</p>
                <h1 className="text-5xl md:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
                    Aastha Ojha
                  </span>
                  <br />
                  
                </h1>
              </motion.div>

              <motion.p variants={fadeIn} className="text-lg text-gray-400">
                Software Developer | Data • Web • Open Source
              </motion.p>

              <motion.p variants={fadeIn} className="text-gray-500">
                Passionate about creating innovative solutions through code. I specialize in data science,
                web development, and contributing to open-source projects.
              </motion.p>

              <motion.div variants={fadeIn} className="flex gap-4 pt-4">
                <a
                  href="#projects"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors"
                >
                  View Projects
                </a>
                <button
                  onClick={handleDownloadResume}
                  className="px-6 py-3 glass rounded-lg text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </button>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeIn} className="flex gap-3 pt-2">
                {[
                  { href: "https://github.com/sahilrajdubey", icon: <FaGithub size={20} /> },
                  { href: "https://www.linkedin.com/in/sahil-raj-dubey", icon: <FaLinkedin size={20} /> },
                  { href: "https://www.instagram.com/sahilrajdubey_/", icon: <FaInstagram size={20} /> },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center 
                               text-gray-400 hover:text-white hover:bg-white/10 
                               transition-all duration-300 hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-12"
          >
            <motion.div variants={fadeIn} className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">
                About <span className="text-indigo-400">Me</span>
              </h2>
              <p className="text-gray-400">Crafting digital experiences with code</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'My Journey',
                  icon: '',
                  text: 'As a self-taught developer, I\'ve cultivated a deep passion for technology through hands-on learning and real-world problem solving.'
                },
                {
                  title: 'My Philosophy',
                  icon: '',
                  text: 'I believe in continuous learning and community collaboration. Every project is an opportunity to grow and contribute meaningfully.'
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  className="glass rounded-xl p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-indigo-400">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Specializations */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: '', title: 'Data Science', desc: 'Python • ML • Analytics' },
                { icon: '', title: 'Web Dev', desc: 'React • Next.js • TypeScript' },
                { icon: '', title: 'Open Source', desc: 'GitHub • Collaboration' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  className="glass rounded-lg p-5 text-center hover:bg-white/5 transition-colors"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center space-y-2 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Skills & <span className="text-indigo-400">Tech Stack</span>
              </h2>
              <p className="text-gray-400">Technologies I work with</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <motion.div
                  key={category}
                  variants={fadeIn}
                  className="glass rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold mb-4 text-indigo-400 uppercase text-sm">
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {skillList.map((skill) => (
                      <SkillBar key={skill.name} skill={skill} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center space-y-2 mb-10">
              <h2 className="text-3xl md:text-4xl font-bold">
                Featured <span className="text-indigo-400">Projects</span>
              </h2>
              <p className="text-gray-400">A selection of my recent work</p>
            </motion.div>

            {/* Filters */}
            <motion.div variants={fadeIn} className="flex justify-center gap-3 mb-10 flex-wrap">
              {['all', 'web', 'data', 'opensource'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-indigo-600 text-white'
                      : 'glass text-gray-400 hover:bg-white/5'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </motion.div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center space-y-2 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                My <span className="text-indigo-400">Journey</span>
              </h2>
              <p className="text-gray-400">Professional milestones</p>
            </motion.div>

            <div className="space-y-6">
              {timeline.map((item, idx) => (
                <TimelineCard key={idx} item={item} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center space-y-2 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Let's <span className="text-indigo-400">Connect</span>
              </h2>
              <p className="text-gray-400">Have a project in mind? Let's talk!</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div variants={fadeIn} className="space-y-4">
                <div className="glass rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Get In Touch</h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-950/50 flex items-center justify-center text-lg">
                        📧
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">Email</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">sahilrajdubey@gmail.com</span>
                          <button
                            onClick={handleCopyEmail}
                            className="text-indigo-400 hover:text-indigo-300 text-xs"
                          >
                            {emailCopied ? '✓' : '📋'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-950/50 flex items-center justify-center text-lg">
                        📍
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Location</div>
                        <div className="text-sm">Available for remote work</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <h4 className="font-semibold mb-3 text-sm">Social Links</h4>
                    <div className="flex gap-3">
                      {[
                        { href: 'https://github.com/sahilrajdubey', label: 'GitHub' },
                        { href: 'https://www.linkedin.com/in/sahil-raj-dubey', label: 'LinkedIn' },
                        { href: 'https://www.instagram.com/sahilrajdubey_/', label: 'Instagram' },
                      ].map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 glass rounded-lg text-xs hover:bg-white/5 transition-colors"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={fadeIn}>
                <form onSubmit={handleContactSubmit} className="glass rounded-xl p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-sm"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors resize-none text-sm"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
                  >
                    {formSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center space-y-3">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()}  Built with passion & coffee.
          </p>
          <p className="text-gray-600 text-xs">
          ~ Sahil Raj Dubey
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// SKILL BAR COMPONENT
// ============================================================================

const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-1.5 text-xs">
        <span className="font-medium">{skill.name}</span>
        <span className="text-gray-500">{skill.progress}%</span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${skill.progress}%` : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// ============================================================================
// PROJECT CARD COMPONENT
// ============================================================================

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-xl p-6 hover:bg-white/5 transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold">{project.title}</h3>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white text-xs"
        >
          G
        </a>
      </div>

      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs bg-indigo-950/50 rounded-md text-indigo-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        {project.liveUrl && project.liveUrl !== '#' && (
          <a
            href={project.liveUrl}
            className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-center text-xs font-medium transition-colors"
          >
            Live Demo
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 glass rounded-lg text-center text-xs font-medium hover:bg-white/5 transition-colors"
        >
          View Code
        </a>
      </div>
    </motion.div>
  );
};

// ============================================================================
// TIMELINE CARD COMPONENT
// ============================================================================

const TimelineCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass rounded-xl p-6 relative"
    >
      <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-indigo-500" />
      
      <div className="space-y-2">
        <div className="inline-block px-3 py-1 bg-indigo-950/50 rounded-full text-xs text-indigo-400 font-medium">
          {item.date}
        </div>
        <h3 className="text-xl font-bold">{item.title}</h3>
        <p className="text-purple-400 text-sm font-medium">{item.company}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
};