// export default function Terms() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
//       <div className="max-w-3xl bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-10 border border-white/20 space-y-6">
//         {/* Product Name */}
//         <div className="text-center">
//           <span className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
//             ChatterlyAI
//           </span>
//         </div>

//         <h1 className="text-4xl font-bold text-purple-700 text-center">
//           Terms of Use
//         </h1>

//         {/* Separator */}
//         <hr className="border-gray-300 my-4" />

//         <section className="hover:bg-white/30 transition-colors rounded-lg p-2">
//           <h2 className="text-2xl font-semibold text-purple-600 mb-2">
//             General Use
//           </h2>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             <strong>ChatterlyAI</strong> is provided solely for demonstration and educational purposes. Users are expected to use the platform responsibly and within the scope of its intended demo functionality.
//           </p>
//         </section>

//         <section className="hover:bg-white/30 transition-colors rounded-lg p-2">
//           <h2 className="text-2xl font-semibold text-purple-600 mb-2">
//             Data & Privacy
//           </h2>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             No payments, sensitive information, or personal data is collected, stored, or transmitted by <strong>ChatterlyAI</strong>. All data entered remains local and is used only for demo purposes.
//           </p>
//         </section>

//         <section className="hover:bg-white/30 transition-colors rounded-lg p-2">
//           <h2 className="text-2xl font-semibold text-purple-600 mb-2">
//             Security Disclaimer
//           </h2>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             While standard precautions are taken, <strong>ChatterlyAI</strong> is a demo project and may not provide full production-level security. Users should not rely on it for sensitive or critical operations.
//           </p>
//         </section>

//         <section className="hover:bg-white/30 transition-colors rounded-lg p-2">
//           <h2 className="text-2xl font-semibold text-purple-600 mb-2">
//             Contact
//           </h2>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             For any questions regarding these terms of use, please contact the project creator through the platform's available contact options.
//           </p>
//         </section>
//       </div>
//     </div>
//   );
// }

export default function Terms() {
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
                <img src="/chatterly_logo.png" alt="ChatterlyAI" className="w-full h-full object-cover" />
              </div>
              <span className="serif text-base text-[#7A7568]">ChatterlyAI</span>
            </div>
            <h1 className="serif text-[2.6rem] leading-tight tracking-tight text-[#1C1F1A] mb-3">Terms of Use</h1>
            <p className="text-sm text-[#A09B92]">Last updated — 2026</p>
          </div>

          {/* Sections */}
          <div className="space-y-10">

            <section>
              <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-3">01 — General Use</h2>
              <p className="text-[0.95rem] text-[#4A4540] leading-[1.8]">
                <strong className="text-[#1C1F1A] font-medium">ChatterlyAI</strong> is provided solely for demonstration and educational purposes. Users are expected to use the platform responsibly and within the scope of its intended demo functionality.
              </p>
            </section>

            <div className="h-px bg-[#D6CFBF]" />

            <section>
              <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-3">02 — Data &amp; Privacy</h2>
              <p className="text-[0.95rem] text-[#4A4540] leading-[1.8]">
                No payments, sensitive information, or personal data is collected, stored, or transmitted by <strong className="text-[#1C1F1A] font-medium">ChatterlyAI</strong>. All data entered remains local and is used only for demo purposes.
              </p>
            </section>

            <div className="h-px bg-[#D6CFBF]" />

            <section>
              <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-3">03 — Security Disclaimer</h2>
              <p className="text-[0.95rem] text-[#4A4540] leading-[1.8]">
                While standard precautions are taken, <strong className="text-[#1C1F1A] font-medium">ChatterlyAI</strong> is a demo project and may not provide full production-level security. Users should not rely on it for sensitive or critical operations.
              </p>
            </section>

            <div className="h-px bg-[#D6CFBF]" />

            <section>
              <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#A09B92] mb-3">04 — Contact</h2>
              <p className="text-[0.95rem] text-[#4A4540] leading-[1.8]">
                For any questions regarding these terms of use, please contact the project creator through the platform's available contact options.
              </p>
            </section>

          </div>

          {/* Footer strip */}
          <div className="mt-14 pt-6 border-t border-[#D6CFBF] flex flex-wrap gap-4 items-center justify-between">
            <p className="text-xs text-[#A09B92]">© 2026 ChatterlyAI. Student project.</p>
            <div className="flex gap-4">
              <a href="/privacy-policy" className="text-xs text-[#7A7568] hover:text-[#1C1F1A] no-underline transition-colors">Privacy Policy</a>
              <a href="/about"          className="text-xs text-[#7A7568] hover:text-[#1C1F1A] no-underline transition-colors">About</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}