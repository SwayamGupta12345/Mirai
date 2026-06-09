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
  // {
  //   name: "Rishu",
  //   img: "./rishu.jpg",
  //   github: "https://github.com/rishugoyal805",
  //   linkedin: "https://www.linkedin.com/in/rishu0405",
  //   email: "rishugoyal6800@gmail.com",
  // },
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
                src="/Mirai_logo.png"
                alt="Mirai"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="serif text-[1.15rem] text-[#1C1F1A] tracking-tight">
              Mirai
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
                  Why Mirai?
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
                      src="/Mirai_logo.png"
                      alt="Mirai"
                      className="w-6 h-6 rounded object-cover border border-white/10"
                    />
                    <span className="serif text-base text-white/80">
                      Mirai
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
                  © {new Date().getFullYear()} Mirai. All rights reserved.
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
