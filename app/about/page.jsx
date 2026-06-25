import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const authors = [
  {
    name: "Swayam Gupta",
    role: "Builder & Designer",
    img: "./swayam.jpg",
    github:   "https://github.com/SwayamGupta12345",
    linkedin: "https://www.linkedin.com/in/swayamgupta12",
    email:    "swayamsam2005@gmail.com",
  },
  // {
  //   name: "Rishu",
  //   role: "Builder & Developer",
  //   img: "./rishu.jpg",
  //   github:   "https://github.com/rishugoyal805",
  //   linkedin: "https://www.linkedin.com/in/rishu0405",
  //   email:    "rishugoyal6800@gmail.com",
  // },
];

const stack = [
  "Next.js", "React", "Node.js", "Socket.io",
  "MongoDB", "Tailwind CSS", "Google OAuth", "AI Agents",
];

export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        body { font-family: 'DM Sans', sans-serif; background: #F3EDE1; }
        .serif { font-family: 'Fraunces', serif; }
        .author-card:hover { border-color: #7A8F6F; background: #EDE7DA; }
        .soc:hover { color: #1C1F1A; }
      `}</style>

      <div className="min-h-screen bg-[#F3EDE1] px-5 py-14">
        <div className="max-w-2xl mx-auto">

          {/* Back */}
          <a href="/" className="inline-flex items-center gap-1.5 text-sm text-[#7A7568] hover:text-[#1C1F1A] transition-colors no-underline mb-10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M5 12l7-7M5 12l7 7"/></svg>
            Back to home
          </a>

          {/* Header */}
          <div className="mb-10 pb-8 border-b border-[#D6CFBF]">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-md overflow-hidden border border-[#D6CFBF]">
                <img src="/Mirai_logo.png" alt="Mirai" className="w-full h-full object-cover" />
              </div>
              <span className="serif text-base text-[#7A7568]">Mirai</span>
            </div>
            <h1 className="serif text-[2.6rem] leading-tight tracking-tight text-[#1C1F1A] mb-3">
              About this project
            </h1>
            <p className="text-[0.95rem] text-[#7A7568] leading-relaxed max-w-lg">
              A student-built platform combining real-time messaging and AI assistance — built to learn, explore, and share.
            </p>
          </div>

          {/* Overview */}
          <div className="space-y-10 mb-12">
            <section>
              <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-3">01 — Overview</h2>
              <p className="text-[0.95rem] text-[#4A4540] leading-[1.8]">
                <strong className="text-[#1C1F1A] font-medium">Mirai</strong> is an AI chat project created by students for learning and educational demonstration purposes. It is not intended as a commercial product.
              </p>
            </section>

            <div className="h-px bg-[#D6CFBF]" />

            <section>
              <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-3">02 — Purpose</h2>
              <p className="text-[0.95rem] text-[#4A4540] leading-[1.8]">
                This project lets users explore AI-powered chat in a safe demo environment — showcasing real-time collaboration, image generation, code assistance, and more. Built entirely as a learning exercise.
              </p>
            </section>

            <div className="h-px bg-[#D6CFBF]" />

            {/* Tech stack */}
            <section>
              <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-4">03 — Built with</h2>
              <div className="flex flex-wrap gap-2">
                {stack.map(s => (
                  <span key={s} className="text-xs text-[#5C6B5C] bg-[#5C6B5C]/10 border border-[#5C6B5C]/20 px-3 py-1.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <div className="h-px bg-[#D6CFBF]" />

            {/* Team */}
            <section>
              <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-5">04 — The team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {authors.map((a) => (
                  <div key={a.name} className="author-card bg-[#FDFAF5] border border-[#D6CFBF] rounded-xl p-5 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={a.img}
                        alt={a.name}
                        className="w-11 h-11 rounded-full border border-[#D6CFBF] object-cover flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm font-medium text-[#1C1F1A]">{a.name}</p>
                        <p className="text-xs text-[#A09B92]">{a.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-3 border-t border-[#D6CFBF]">
                      <a href={a.github} target="_blank" rel="noopener noreferrer"
                        className="soc flex items-center gap-1.5 text-xs text-[#7A7568] no-underline transition-colors">
                        <FiGithub size={12} /> GitHub
                      </a>
                      <a href={a.linkedin} target="_blank" rel="noopener noreferrer"
                        className="soc flex items-center gap-1.5 text-xs text-[#7A7568] no-underline transition-colors">
                        <FiLinkedin size={12} /> LinkedIn
                      </a>
                      <a href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${a.email}`} target="_blank"
                        className="soc flex items-center gap-1.5 text-xs text-[#7A7568] no-underline transition-colors">
                        <FiMail size={12} /> Email
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer strip */}
          <div className="pt-6 border-t border-[#D6CFBF] flex flex-wrap gap-4 items-center justify-between">
            <p className="text-xs text-[#A09B92]">© {new Date().getFullYear()} Mirai. Student project.</p>
            <div className="flex gap-4">
              <a href="/privacy-policy" className="text-xs text-[#7A7568] hover:text-[#1C1F1A] no-underline transition-colors">Privacy Policy</a>
              <a href="/terms"          className="text-xs text-[#7A7568] hover:text-[#1C1F1A] no-underline transition-colors">Terms of Use</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}