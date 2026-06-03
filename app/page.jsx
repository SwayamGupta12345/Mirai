// "use client";

// import { useState, useEffect } from "react";
// import {
//   ChevronRight,
//   Lightbulb,
//   Users,
//   MessageCircleMore,
//   Star,
//   Menu,
//   X,
//   Mail,
//   PanelLeftOpen,
//   PanelLeftClose,
//   ChevronLeft,
// } from "lucide-react";
// import { RxCode } from "react-icons/rx";
// import { IoShieldCheckmarkOutline } from "react-icons/io5";

// import { FiGithub, FiLinkedin } from "react-icons/fi";
// import { RiImageAiFill } from "react-icons/ri";
// import Link from "next/link";

// export default function LandingPage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);

//   // const features = [
//   //   {
//   //     icon: Lightbulb,
//   //     title: "Better Responses",
//   //     description: "Uses AI Agents for refining and giving better results",
//   //   },
//   //   {
//   //     icon: Users,
//   //     title: "Collaborative sessions",
//   //     description:
//   //       "Many People can work on same chat when shared by admin like Google Docs",
//   //   },
//   //   {
//   //     icon: MessageCircleMore,
//   //     title: "Chat System",
//   //     description: "Chat with your friends within this webapp",
//   //   },
//   //   {
//   //     icon: RiImageAiFill,
//   //     title: "Image Generation",
//   //     description: "Generate images using AI within this webapp",
//   //   },
//   //   {
//   //     icon: RxCode,
//   //     title: "Code Assistance",
//   //     description:
//   //       "Get help with coding, debugging, and algorithm explanations using AI.",
//   //   },
//   //   {
//   //     icon: IoShieldCheckmarkOutline,
//   //     title: "Privacy & Security",
//   //     description:
//   //       "All user data stays private with end-to-end encrypted sessions and local storage.",
//   //   },
//   // ];
//   const features = [
//     {
//       icon: Lightbulb,
//       title: "Better Responses",
//       description: "Uses AI Agents for refining and giving better results",
//       gradient: "from-cyan-400 to-blue-500",
//       bgGradient: "from-cyan-500/20 to-blue-500/20",
//     },
//     {
//       icon: Users,
//       title: "Collaborative Sessions",
//       description:
//         "Many People can work on same chat when shared by admin like Google Docs",
//       gradient: "from-pink-400 to-rose-500",
//       bgGradient: "from-pink-500/20 to-rose-500/20",
//     },
//     {
//       icon: MessageCircleMore,
//       title: "Chat System",
//       description: "Chat with your friends within this webapp",
//       gradient: "from-purple-400 to-violet-500",
//       bgGradient: "from-purple-500/20 to-violet-500/20",
//     },
//     {
//       icon: RiImageAiFill,
//       title: "Image Generation",
//       description: "Generate images using AI within this webapp",
//       gradient: "from-orange-400 to-amber-500",
//       bgGradient: "from-orange-500/20 to-amber-500/20",
//     },
//     {
//       icon: RxCode,
//       title: "Code Assistance",
//       description:
//         "Get help with coding, debugging, and algorithm explanations using AI.",
//       gradient: "from-green-400 to-emerald-500",
//       bgGradient: "from-green-500/20 to-emerald-500/20",
//     },
//     {
//       icon: IoShieldCheckmarkOutline,
//       title: "Privacy & Security",
//       description:
//         "All user data stays private with end-to-end encrypted sessions and local storage.",
//       gradient: "from-indigo-400 to-blue-600",
//       bgGradient: "from-indigo-500/20 to-blue-600/20",
//     },
//   ];

//   useEffect(() => {
//     const urls = [
//       `${process.env.NEXT_PUBLIC_CHAT_SOCKET_BACKEND_URL}/health`,
//       `${process.env.NEXT_PUBLIC_AGENTIC_BACKEND_URL}/ping`,
//       `${process.env.NEXT_PUBLIC_AI_SOCKET_BACKEND_URL}/health`,
//     ];

//     urls.forEach((u) => {
//       try {
//         navigator.sendBeacon(u);
//       } catch {
//         // fallback (still async, no blocking)
//         fetch(u, { method: "POST", keepalive: true }).catch(() => {});
//       }
//     });
//   }, []);
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 rounded-lg overflow-hidden">
//                 <img
//                   src="/chatterly_logo.png"
//                   alt="logo"
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 ChatterlyAI
//               </span>
//             </div>

//             <div className="hidden xs:flex items-center space-x-8">
//               <Link
//                 href="/login"
//                 className="text-purple-600 hover:text-purple-700 transition-colors"
//               >
//                 Login
//               </Link>
//               <Link
//                 href="/signup"
//                 className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
//               >
//                 Sign Up
//               </Link>

//               <button
//                 className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-purple-100 transition-all duration-200 group"
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 title={isSidebarOpen ? "Hide features" : "Show features"}
//               >
//                 {isSidebarOpen ? (
//                   <PanelLeftClose className="w-5 h-5 text-purple-600 group-hover:text-purple-700" />
//                 ) : (
//                   <PanelLeftOpen className="w-5 h-5 text-purple-600 group-hover:text-purple-700" />
//                 )}
//               </button>
//             </div>

//             <button
//               className="xs:hidden flex"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-white/20">
//             <div className="px-4 py-4 space-y-4">
//               <Link
//                 href="/login"
//                 className="flex justify-center text-purple-600"
//               >
//                 Login
//               </Link>
//               <Link
//                 href="/signup"
//                 className="block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-center"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>
//       <div className="flex-1 flex pt-16">
//         {/* SIDEBAR – visible only on lg+ */}
//         {isSidebarOpen && (
//           <div
//             className="hidden md:flex w-[30%] min-w-[260px] max-w-[320px]
//         border-r border-white/20 bg-gradient-to-b
//         from-white/40 via-white/30 to-white/20
//         backdrop-blur-xl"
//           >
//             {/* INNER SCROLL CONTAINER */}
//             <div className="h-[calc(100vh-4rem)] overflow-y-auto w-full p-6 space-y-6">
//               <div>
//                 <div className="flex items-center gap-2 mb-6">
//                   <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
//                   <p className="text-xs font-bold text-purple-700 uppercase tracking-widest">
//                     Features
//                   </p>
//                 </div>

//                 {/* Feature Cards */}
//                 <div className="space-y-5">
//                   {features.map((feature, index) => (
//                     <div
//                       key={index}
//                       className={`group bg-gradient-to-br ${feature.bgGradient}
//                   rounded-2xl p-3 sm:p-4 cursor-pointer transition-all duration-300
//                   hover:shadow-lg lg:hover:scale-105
//                   border border-white/20 hover:border-white/40`}
//                     >
//                       <div className="flex gap-2 sm:gap-3 items-start">
//                         <div
//                           className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${feature.gradient}
//                       rounded-xl flex items-center justify-center flex-shrink-0
//                       shadow-lg group-hover:shadow-xl transition-all`}
//                         >
//                           <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                         </div>

//                         <div className="flex-1 min-w-0">
//                           <h3
//                             className="font-bold text-sm sm:text-md text-slate-900
//                         group-hover:text-transparent group-hover:bg-clip-text
//                         group-hover:bg-gradient-to-r group-hover:from-purple-600
//                         group-hover:to-blue-600 transition-all"
//                           >
//                             {feature.title}
//                           </h3>

//                           <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
//                             {feature.description}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* MAIN CONTENT */}
//         <div
//           className={`flex-1 flex flex-coltransition-all duration-300

//     ${isSidebarOpen ? `lg:ml-[7%] lg:mr-[5%]` : "lg:ml-0"} ease-in-out`}
//         >
//           <div
//             className={`flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-3 pb-10
//             ${isSidebarOpen ? "lg:w-[77%]" : "w-full mt-20"} ease-in-out`}
//           >
//             <div className="text-center space-y-10 animate-fade-in-up">
//               <div className="animate-fade-in-up">
//                 <h1
//                   className="

//                   text-6xl     /* medium screens */
//     lg:text-7xl     /* large screens */
//     font-bold md:font-bold  /* retain weight on small screens */
//     pb-2 pt-6
//     bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600
//     bg-clip-text text-transparent
//     leading-snug sm:leading-normal md:leading-tight
//     break-words
//   "
//                 >
//                   Lets chat with friends
//                   <br />
//                   and AI altogether
//                 </h1>

//                 <p
//                   className="
//     text-lg md:text-xl lg:text-2xl
//     font-medium sm:font-medium md:font-normal
//     text-gray-600
//     mb-6
//     max-w-3xl mx-auto
//     leading-snug sm:leading-relaxed
//   "
//                 >
//                   This is a student-built AI Project. No personal information is
//                   stored or shared.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//                   <Link
//                     href="/signup"
//                     className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white
//                   px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all
//                   duration-300 transform hover:scale-105 flex items-center"
//                   >
//                     Register
//                     <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </Link>

//                   {/* Show Explore Features only below lg */}
//                   <Link
//                     href="#features"
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                     className="text-purple-600 px-8 py-4 md:hidden rounded-full text-lg
//                   font-semibold border-2 border-purple-200 hover:border-purple-400
//                   hover:bg-purple-50 transition-all duration-300"
//                   >
//                     Explore Features
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       {(!isSidebarOpen || isMobile) && (
//         <section id="features" className="py-20  px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl md:text-5xl font-bold mb-4 pb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 Why Choose ChatterlyAI?
//               </h2>
//               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//                 Discover the features that make learning engaging,
//                 collaborative, and effective.
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8">
//               {features.map((feature, index) => (
//                 <div
//                   key={index}
//                   className="group bg-purple-200/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-200 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:bg-white/80"
//                 >
//                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                     <feature.icon className="w-8 h-8 text-purple-600" />
//                   </div>
//                   <h3 className="text-2xl font-bold mb-4 text-gray-800">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       <footer className="bg-gradient-to-r from-purple-900 to-purple-800 text-white py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="md:col-span-2">
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
//                   <img
//                     src="/chatterly_logo.png"
//                     alt="logo"
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </div>
//                 <span className="text-xl font-bold">ChatterlyAI</span>
//               </div>
//               <p className="text-gray-300 mb-6 max-w-md">
//                 Empowering people worldwide with collaborative AI assistance and
//                 chat system with friends for better and more effective
//                 collaboration.
//               </p>
//               <div className="text-sm text-gray-400 space-y-1">
//                 <p className="text-white font-semibold mb-2">Made by:</p>

//                 <div className="flex items-center space-x-4 mb-4">
//                   <img
//                     src="./swayam.jpg"
//                     alt="Swayam Gupta"
//                     className="w-12 h-12 rounded-full border-2 border-purple-500"
//                   />
//                   <div>
//                     <p className="text-white font-medium">Swayam Gupta</p>
//                     <div className="flex space-x-3 mt-1 text-gray-300">
//                       <a
//                         href="https://github.com/SwayamGupta12345"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center hover:text-white transition-colors"
//                       >
//                         <FiGithub className="w-4 h-4 mr-1" />
//                         GitHub
//                       </a>
//                       <a
//                         href="https://www.linkedin.com/in/swayamgupta12"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center hover:text-white transition-colors"
//                       >
//                         <FiLinkedin className="w-4 h-4 mr-1" />
//                         LinkedIn
//                       </a>
//                       <a
//                         href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=swayamsam2005@gmail.com"
//                         target="_blank"
//                         className="flex items-center hover:text-white transition-colors"
//                       >
//                         <Mail className="w-4 h-4 mr-1" />
//                         Email
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-4 mb-4">
//                   <img
//                     src="./rishu.jpg"
//                     alt="Rishu"
//                     className="w-12 h-12 rounded-full border-2 border-purple-500"
//                   />
//                   <div>
//                     <p className="text-white font-medium">Rishu</p>
//                     <div className="flex space-x-3 mt-1 text-gray-300">
//                       <a
//                         href="https://github.com/rishugoyal805"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center hover:text-white transition-colors"
//                       >
//                         <FiGithub className="w-4 h-4 mr-1" />
//                         GitHub
//                       </a>
//                       <a
//                         href="https://www.linkedin.com/in/rishu0405"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center hover:text-white transition-colors"
//                       >
//                         <FiLinkedin className="w-4 h-4 mr-1" />
//                         LinkedIn
//                       </a>
//                       <a
//                         href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=rishugoyal6800@gmail.com"
//                         target="_blank"
//                         className="flex items-center hover:text-white transition-colors"
//                       >
//                         <Mail className="w-4 h-4 mr-1" />
//                         Email
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="/about"
//                     className="text-gray-300 hover:text-white transition-colors"
//                   >
//                     About
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#features"
//                     className="text-gray-300 hover:text-white transition-colors"
//                   >
//                     Features
//                   </a>
//                 </li>
//                 {/* <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li> */}
//                 {/* <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li> */}
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Support</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="/privacy-policy"
//                     className="text-gray-300 hover:text-white transition-colors"
//                   >
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/terms"
//                     className="text-gray-300 hover:text-white transition-colors"
//                   >
//                     Terms of Use
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-300">
//             <p>&copy; 2025 ChatterlyAI. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  Lightbulb,
  Users,
  MessageCircleMore,
  Menu,
  X,
  Mail,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { RxCode } from "react-icons/rx";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { RiImageAiFill } from "react-icons/ri";
import Link from "next/link";

const features = [
  {
    icon: Lightbulb,
    title: "Better Responses",
    description: "Uses AI Agents for refining and giving better results",
    tag: "AI",
  },
  {
    icon: Users,
    title: "Collaborative Sessions",
    description:
      "Many people can work on the same chat when shared by admin — like Google Docs",
    tag: "Live",
  },
  {
    icon: MessageCircleMore,
    title: "Chat System",
    description: "Chat with your friends within this webapp",
    tag: "Social",
  },
  {
    icon: RiImageAiFill,
    title: "Image Generation",
    description: "Generate images using AI within this webapp",
    tag: "Create",
  },
  {
    icon: RxCode,
    title: "Code Assistance",
    description:
      "Get help with coding, debugging, and algorithm explanations using AI.",
    tag: "Dev",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Privacy & Security",
    description:
      "All user data stays private with end-to-end encrypted sessions and local storage.",
    tag: "Safe",
  },
];

const authors = [
  {
    name: "Swayam Gupta",
    img: "./swayam.jpg",
    github: "https://github.com/SwayamGupta12345",
    linkedin: "https://www.linkedin.com/in/swayamgupta12",
    email: "swayamsam2005@gmail.com",
  },
  {
    name: "Rishu",
    img: "./rishu.jpg",
    github: "https://github.com/rishugoyal805",
    linkedin: "https://www.linkedin.com/in/rishu0405",
    email: "rishugoyal6800@gmail.com",
  },
];

const pills = [
  "AI-powered chat",
  "Collaborative rooms",
  "Image generation",
  "Code help",
  "End-to-end encrypted",
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const urls = [
      `${process.env.NEXT_PUBLIC_CHAT_SOCKET_BACKEND_URL}/health`,
      `${process.env.NEXT_PUBLIC_AGENTIC_BACKEND_URL}/ping`,
      `${process.env.NEXT_PUBLIC_AI_SOCKET_BACKEND_URL}/health`,
    ];
    urls.forEach((u) => {
      try {
        navigator.sendBeacon(u);
      } catch {
        fetch(u, { method: "POST", keepalive: true }).catch(() => {});
      }
    });
  }, []);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const showFeatures = !isSidebarOpen || isMobile;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        body { font-family: 'DM Sans', sans-serif; background: #F3EDE1; }

        .serif { font-family: 'Fraunces', serif; }

        .nav-blur {
          background: rgba(243,237,225,0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #C8C0B0; border-radius: 4px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fadeUp 0.5s ease both; }
        .anim-2 { animation: fadeUp 0.5s 0.1s ease both; }
        .anim-3 { animation: fadeUp 0.5s 0.2s ease both; }

        .hero-italic { font-style: italic; color: #4A6741; }

        .pill-item:hover { background: #E0D9CC; }

        .fc:hover { border-color: #7A8F6F; background: #EDE7DA; }
        .sb-item:hover { background: #EDE7DA; }
        .nav-link-item:hover { background: #EDE7DA; color: #1C1F1A; }
        .btn-solid:hover { background: #3A4A3A; }
        .btn-outline-hero:hover { border-color: #7A8F6F; color: #1C1F1A; }
        .icon-btn:hover { background: #EDE7DA; color: #1C1F1A; }
        .f-link-item:hover { color: rgba(255,255,255,0.85); }
        .s-link:hover { color: rgba(255,255,255,0.7); }
        .footer-link-item:hover { color: white; }
      `}</style>

      {/* ─── NAV ─── */}
      <nav className="nav-blur fixed top-0 w-full z-50 border-b border-[#D6CFBF]">
        <div className="max-w-[1400px] mx-auto px-5 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-7 h-7 rounded-md overflow-hidden border border-[#D6CFBF] flex-shrink-0">
              <img
                src="/chatterly_logo.png"
                alt="ChatterlyAI"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="serif text-[1.15rem] text-[#1C1F1A] tracking-tight">
              ChatterlyAI
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="nav-link-item text-sm text-[#7A7568] px-3 py-2 rounded-md transition-colors no-underline"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="btn-solid bg-[#1C1F1A] text-[#F3EDE1] text-sm px-4 py-2 rounded-md transition-colors no-underline flex items-center gap-1.5"
            >
              Sign up <ChevronRight size={13} />
            </Link>
            <button
              className="icon-btn hidden lg:flex w-8 h-8 items-center justify-center border border-[#D6CFBF] rounded-md text-[#7A7568] transition-colors bg-transparent cursor-pointer"
              onClick={() => setIsSidebarOpen((p) => !p)}
            >
              {isSidebarOpen ? (
                <PanelLeftClose size={14} />
              ) : (
                <PanelLeftOpen size={14} />
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center text-[#7A7568] bg-transparent border-none cursor-pointer"
            onClick={() => setIsMenuOpen((p) => !p)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#FDFAF5] border-t border-[#D6CFBF] px-5 py-3 flex flex-col gap-2">
            <Link
              href="/login"
              className="text-sm text-[#7A7568] py-2 text-center no-underline"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="btn-solid bg-[#1C1F1A] text-[#F3EDE1] text-sm py-2.5 rounded-md text-center no-underline"
            >
              Sign up
            </Link>
          </div>
        )}
      </nav>

      {/* ─── PAGE ─── */}
      <div className="flex pt-14 min-h-screen">
        {/* ─── SIDEBAR ─── */}
        {isSidebarOpen && !isMobile && (
          <aside className="sidebar-scroll hidden lg:block w-64 flex-shrink-0 bg-[#FDFAF5] border-r border-[#D6CFBF] sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-5">
            <p className="text-[0.65rem] font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-4">
              Features
            </p>
            <div className="flex flex-col gap-0.5">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="sb-item flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 flex-shrink-0 bg-[#EDE7DA] rounded-md flex items-center justify-center text-[#5C6B5C]">
                    <f.icon size={14} />
                  </div>
                  <div>
                    <p className="text-[0.82rem] font-medium text-[#1C1F1A] leading-snug mb-0.5">
                      {f.title}
                    </p>
                    <p className="text-[0.72rem] text-[#7A7568] leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* ─── MAIN ─── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* ─── HERO ─── */}
          <section className="flex items-center justify-center px-6 md:px-12 py-16 md:py-24 flex-1">
            <div className="max-w-2xl w-full">
              {/* Eyebrow */}
              <div className="anim-1 flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5C6B5C] flex-shrink-0" />
                <span className="text-xs tracking-[0.1em] uppercase text-[#A09B92]">
                  Student project{" "}
                </span>
              </div>

              {/* Headline */}
              <h1 className="anim-2 serif text-[2.8rem] md:text-[3.8rem] lg:text-[4.4rem] leading-[1.08] tracking-[-0.025em] text-[#1C1F1A] mb-6">
                Chat with friends
                <br />
                and <em className="hero-italic">AI,</em> together.
              </h1>

              {/* Sub */}
              <p className="anim-3 text-base md:text-lg text-[#7A7568] leading-relaxed mb-10 max-w-md">
                A student-built platform combining real-time messaging and AI
                assistance. Collaborative, private, and free.
              </p>

              {/* CTAs */}
              <div className="anim-3 flex flex-wrap gap-3 mb-12">
                <Link
                  href="/signup"
                  className="btn-solid bg-[#1C1F1A] text-[#F3EDE1] text-sm font-medium px-6 py-3 rounded-lg transition-colors no-underline flex items-center gap-2"
                >
                  Get started <ChevronRight size={14} />
                </Link>
                {isMobile && (
                  <a
                    href="#features"
                    className="btn-outline-hero text-sm text-[#7A7568] px-6 py-3 rounded-lg border border-[#D6CFBF] transition-colors no-underline"
                    onClick={() => setIsSidebarOpen((p) => !p)}
                  >
                    See features
                  </a>
                )}
              </div>

              {/* Pills */}
              <div className="border-t border-[#D6CFBF] pt-8">
                <div className="flex flex-wrap gap-2">
                  {pills.map((s, i) => (
                    <span
                      key={i}
                      className="pill-item text-xs text-[#7A7568] bg-[#EDE7DA] rounded-full px-3 py-1.5 transition-colors cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─── FEATURES SECTION ─── */}
          {showFeatures && (
            <section
              id="features"
              className="bg-[#FDFAF5] border-t border-[#D6CFBF] px-6 md:px-12 py-16 md:py-24"
            >
              <div className="max-w-5xl mx-auto">
                <p className="text-[0.65rem] font-medium tracking-[0.13em] uppercase text-[#A09B92] mb-2">
                  What's inside
                </p>
                <h2 className="serif text-[2rem] md:text-[2.8rem] text-[#1C1F1A] tracking-tight mb-12">
                  Why ChatterlyAI?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {features.map((f, i) => (
                    <div
                      key={i}
                      className="fc bg-[#F3EDE1] border border-[#D6CFBF] rounded-xl p-5 transition-all cursor-default"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-9 h-9 bg-[#FDFAF5] border border-[#D6CFBF] rounded-lg flex items-center justify-center text-[#5C6B5C]">
                          <f.icon size={16} />
                        </div>
                        <span className="text-[0.62rem] font-medium tracking-[0.1em] uppercase text-[#5C6B5C] bg-[#5C6B5C]/10 px-2.5 py-0.5 rounded">
                          {f.tag}
                        </span>
                      </div>
                      <p className="text-[0.95rem] font-medium text-[#1C1F1A] mb-2">
                        {f.title}
                      </p>
                      <p className="text-sm text-[#7A7568] leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ─── FOOTER ─── */}
          <footer className="bg-[#191C18] text-white px-6 md:px-12 py-14 md:py-16">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12">
                {/* Brand + authors */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src="/chatterly_logo.png"
                      alt="ChatterlyAI"
                      className="w-6 h-6 rounded object-cover border border-white/10"
                    />
                    <span className="serif text-base text-white/80">
                      ChatterlyAI
                    </span>
                  </div>
                  <p className="text-sm text-white/38 leading-relaxed max-w-sm mb-8">
                    Empowering people with collaborative AI assistance and
                    real-time chat built for genuine connection.
                  </p>

                  <p className="text-[0.62rem] font-medium tracking-[0.13em] uppercase text-white/25 mb-4">
                    Made by
                  </p>
                  <div className="flex flex-col gap-5">
                    {authors.map((a, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img
                          src={a.img}
                          alt={a.name}
                          className="w-9 h-9 rounded-full border border-white/10 object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm text-white/70 mb-1">{a.name}</p>
                          <div className="flex gap-4">
                            <a
                              href={a.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="s-link flex items-center gap-1 text-xs text-white/30 no-underline transition-colors"
                            >
                              <FiGithub size={11} /> GitHub
                            </a>
                            <a
                              href={a.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="s-link flex items-center gap-1 text-xs text-white/30 no-underline transition-colors"
                            >
                              <FiLinkedin size={11} /> LinkedIn
                            </a>
                            <a
                              href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${a.email}`}
                              target="_blank"
                              className="s-link flex items-center gap-1 text-xs text-white/30 no-underline transition-colors"
                            >
                              <Mail size={11} /> Email
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-row md:flex-col gap-12 md:gap-0">
                  <div className="md:mb-8">
                    <p className="text-[0.62rem] font-medium tracking-[0.13em] uppercase text-white/25 mb-3">
                      Navigate
                    </p>
                    <a
                      href="/about"
                      className="footer-link-item block text-sm text-white/40 no-underline mb-2 transition-colors"
                    >
                      About
                    </a>
                    <a
                      href="#features"
                      className="footer-link-item block text-sm text-white/40 no-underline mb-2 transition-colors"
                    >
                      Features
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.62rem] font-medium tracking-[0.13em] uppercase text-white/25 mb-3">
                      Legal
                    </p>
                    <a
                      href="/privacy-policy"
                      className="footer-link-item block text-sm text-white/40 no-underline mb-2 transition-colors"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="/terms"
                      className="footer-link-item block text-sm text-white/40 no-underline mb-2 transition-colors"
                    >
                      Terms of Use
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/8 pt-5 flex flex-col sm:flex-row justify-between gap-2">
                <p className="text-xs text-white/22">
                  © 2026 ChatterlyAI. All rights reserved.
                </p>
                <p className="text-xs text-white/22">
                  Built by students, for everyone.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
