export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        body { font-family: 'DM Sans', sans-serif; background: #F3EDE1; }
        .serif { font-family: 'Fraunces', serif; }
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
            <h1 className="serif text-[2.6rem] leading-tight tracking-tight text-[#1C1F1A] mb-3">Privacy Policy</h1>
            <p className="text-sm text-[#A09B92]">Last updated — 2026</p>
          </div>

          {/* Intro callout */}
          <div className="bg-[#FDFAF5] border border-[#D6CFBF] rounded-xl px-5 py-4 mb-10">
            <p className="text-sm text-[#4A4540] leading-relaxed">
              <strong className="text-[#1C1F1A] font-medium">Short version:</strong> Mirai is a student demo. We don't store your real data, sell anything, or share anything. Please don't enter real credentials.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10">

            <section>
              <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-3">01 — Data Collection</h2>
              <p className="text-[0.95rem] text-[#4A4540] leading-[1.8]">
                <strong className="text-[#1C1F1A] font-medium">Mirai</strong> is a student-built demo project. Email or login information is used only for demonstration purposes and should not be real or sensitive data.
              </p>
            </section>

            <div className="h-px bg-[#D6CFBF]" />

            <section>
              <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-3">02 — Usage Purpose</h2>
              <p className="text-[0.95rem] text-[#4A4540] leading-[1.8]">
                This project is a student initiative built solely for educational purposes. No login credentials or sensitive information are stored or transmitted outside the demo environment.
              </p>
            </section>

            <div className="h-px bg-[#D6CFBF]" />

            <section>
              <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-3">03 — Security</h2>
              <p className="text-[0.95rem] text-[#4A4540] leading-[1.8]">
                While this is a demo project, standard precautions are taken to ensure that any temporary data handled during usage is not inadvertently exposed or shared.
              </p>
            </section>

            <div className="h-px bg-[#D6CFBF]" />

            <section>
              <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-3">04 — Contact</h2>
              <p className="text-[0.95rem] text-[#4A4540] leading-[1.8]">
                For questions regarding this privacy policy, please contact the project creator directly via the platform's contact options.
              </p>
            </section>

          </div>

          {/* Footer strip */}
          <div className="mt-14 pt-6 border-t border-[#D6CFBF] flex flex-wrap gap-4 items-center justify-between">
            <p className="text-xs text-[#A09B92]">© 2026 Mirai. Student project.</p>
            <div className="flex gap-4">
              <a href="/terms" className="text-xs text-[#7A7568] hover:text-[#1C1F1A] no-underline transition-colors">Terms of Use</a>
              <a href="/about" className="text-xs text-[#7A7568] hover:text-[#1C1F1A] no-underline transition-colors">About</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}