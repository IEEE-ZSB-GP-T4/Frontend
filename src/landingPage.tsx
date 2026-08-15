interface LandingPageProps {
  onNavigateToLogin: () => void;
  onGetStarted?: () => void; 
}

export default function LandingPage({ onNavigateToLogin, onGetStarted }: LandingPageProps){
  return (
    <div className="min-h-screen bg-[#EFF4FF] text-slate-100 flex flex-col justify-between select-none">
      {/* Navbar */}
    <nav className="h-[60px] bg-[#EFF4FF] backdrop-blur-md border-b border-[#C3C6D7] flex items-center justify-between px-6 shrink-0 z-10 relative">
  <div className="relative w-[100px] h-[45px] flex-shrink-0 group cursor-pointer z-20 flex items-center gap-2">
    <div className="w-[42px] h-[42px] rounded-xl bg-[#0A369D] flex items-center justify-center shadow-sm flex-shrink-0 transition-all duration-300 group-hover:scale-105">
    <img
      src="/planora.svg"
      alt="Planora"
      className="w-[22px] h-[22px] object-contain"
    />
    </div>
    <span className="font-inter font-bold text-xs text-[#0A369D] tracking-[1px] transition-colors duration-300 group-hover:text-[#5E7CE2]">
      PLANORA
    </span>
  </div>

  <div className="hidden md:flex items-center gap-8 bg-gradient-to-r from-[#4472CA] to-[#0A369D] px-8 py-2.5 rounded-full shadow-inner">
    <a href="#features" className="text-white text-sm font-medium hover:text-slate-200 transition-colors cursor-pointer">
      Features
    </a>
    <a href="#how-it-works" className="text-white text-sm font-medium hover:text-slate-200 transition-colors cursor-pointer">
      How It Works
    </a>
    <a href="#pricing" className="text-white text-sm font-medium hover:text-slate-200 transition-colors cursor-pointer">
      Pricing
    </a>
  </div>

  <div className="flex items-center gap-3">
    <button
  onClick={onNavigateToLogin}
  className="px-4 py-2 border border-[#0A369D] text-[#0A369D] hover:bg-blue-50 font-semibold text-sm rounded-xl transition-all cursor-pointer"
  >
  Login
    </button>
    <button
      onClick={onGetStarted}
      className="px-5 py-2.5 rounded-xl bg-[#0A369D] hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer"
    >
      Get Started
    </button>
  </div>
</nav>

      {/* Hero Section */}
      <main className="bg-slate-50 py-20 md:py-32 px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-slate-950">
            <div className="inline-flex gap-2 px-4 py-1.5 mb-6 rounded-full border border-[#92B4F4]/30 bg-[#92B4F4] text-[#0A369D] text-xs font-medium uppercase tracking-widest">
                <img src="/generateAi.svg" alt="AI"
                      className="w-4 h-4"/>
                <span>AI-Powered Study Planner</span>
            </div>

      <h1 className="text-5xl md:text-6xl text-[#0B1C30] font-extrabold">
        Master Your <br />
        Academic Life with <br />
        AI-Powered Study <br />
        Plans
      </h1>
      <p className="text-[#434655] text-lg md:text-xl max-w-xl leading-relaxed">
        Planora automatically analyzes your syllabus, understands your learning pace, and creates optimized daily schedules so you can focus on studying, not planning.
      </p>
      <div className="flex flex-wrap gap-4 pt-4">
        <button className="flex items-center px-8 py-3.5 gap-2 bg-[#0A369D] text-white font-semibold rounded-xl hover:bg-blue-900 transition duration-300 shadow-md">
         <span>Start Planning Now</span>
         <img src="/arrow.svg" className="w-3 h-3" /> 
        </button>
        <button className="px-8 py-3.5 bg-white text-[#0B1C30] font-semibold rounded-xl border border-[#0A369D] hover:bg-slate-100 transition duration-300 shadow-sm">
          See How it Works
        </button>
      </div>
    </div>

    <div className="relative flex items-center justify-center md:justify-end">
      <img src="/hero.png" alt="planora" className="rounded-xl shadow-md"/>
        
    </div>

   </div> 
  </main>

  <section className="bg-slate-50 py-20 px-4 md:px-10">
  <div className="max-w-7xl mx-auto bg-[#EFF4FF] rounded-3xl p-8 md:p-16 border border-[#06B6D4]/10 shadow-sm">
    
    <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0B1C30]">
        Intelligent organization for serious learners
      </h2>
      <p className="text-[#434655] text-base md:text-lg">
        Our core features are designed to minimize friction and maximize your focused study time.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
  
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ">
    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 text-[#0066FF]">
      <img src="/smartAi.svg" alt="AI Scheduling" className="w-6 h-6 object-contain" />
    </div>
    <h3 className="text-xl font-bold text-[#0B1C30] mb-3">Smart AI Scheduling</h3>
    <p className="text-[#434655] text-sm leading-relaxed">
      Upload your syllabus and let our AI generate a dynamic calendar that adapts to your learning speed and upcoming exams.
    </p>
  </div>

  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ">
    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 text-[#0066FF]">
      <img src="/traking.svg" alt="Course Tracking" className="w-6 h-6 object-contain" />
    </div>
    <h3 className="text-xl font-bold text-[#0B1C30] mb-3">Course Tracking</h3>
    <p className="text-[#434655] text-sm leading-relaxed">
      Visualize your progress across all modules. See exactly where you stand and what needs your attention next to master the material.
    </p>
  </div>

  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ">
    <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center mb-6 text-pink-600">
      <img src="/deadline.svg" alt="Deadline Alerts" className="w-6 h-6 object-contain" />
    </div>
    <h3 className="text-xl font-bold text-[#0B1C30] mb-3">Deadline Alerts</h3>
    <p className="text-[#434655] text-sm leading-relaxed">
      Never miss a due date again. Get intelligent nudges before major assignments and tests so you can prepare without panic.
    </p>
  </div>

</div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-[#EFF4FF] py-10 px-4 md:px-10 border-t border-[#C3C6D7]">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#434655]">
    
    <div className="flex flex-col md:flex-row items-center gap-4">
      <span className="font-bold text-[#0A369D] tracking-[1px]">Planora</span>
      <span className="text-xs">© 2024 Planora AI. All rights reserved.</span>
    </div>

    <div className="flex items-center gap-6 font-medium text-slate-600 text-xs">
      <a href="#privacy" className="hover:text-[#0066FF] transition-colors">Privacy Policy</a>
      <a href="#terms" className="hover:text-[#0066FF] transition-colors">Terms of Service</a>
      <a href="#contact" className="hover:text-[#0066FF] transition-colors">Contact Support</a>
    </div>

  </div>
</footer>
    </div>
  );
}