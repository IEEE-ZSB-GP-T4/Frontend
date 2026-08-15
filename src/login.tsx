import { type FormEvent, useState } from "react";


interface LogInProps {
  onBackToLanding: () => void;
}

interface LogInProps {
  onBackToLanding: () => void;
  onLoginSuccess: () => void; 
}

export default function LogIn({ onBackToLanding, onLoginSuccess }: LogInProps){
  const [rememberMe, setRememberMe] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionStatus("Login form submitted successfully.");
    onLoginSuccess(); 
  };

  return (
    <main className="bg-[#f8f9ff] w-full min-w-[1280px] min-h-[743px] flex flex-col">
      <header 
        onClick={onBackToLanding}
        className="inline-flex ml-[114px] w-[119px] h-10 relative mt-[41px] items-center gap-[15px] cursor-pointer"
      >
        <div
          className="relative w-10 h-10 bg-[#0a369d] rounded-xl shadow-[0px_0px_0px_transparent,0px_0px_0px_transparent,0px_10px_15px_-3px_#6366f133,0px_4px_6px_-4px_#6366f133]"
          aria-hidden="true"
        >
          <div className="relative top-2 left-2 w-6 h-6">
            <img
              src="/planora.svg"
              alt="Planora"
              className="w-[22px] h-[22px] object-contain"
            />
          </div>
        </div>
        <span className="relative w-fit [font-family:'Inter-Bold',Helvetica] font-bold text-[#0a369d] text-[17px] tracking-[0] leading-[normal]">
          Planora
        </span>
      </header>

      <section
        className="ml-[221px] w-[448px] h-[68px] mt-[41px] flex flex-col gap-2"
        aria-labelledby="login-heading"
      >
        <h1
          id="login-heading"
          className="w-[212px] h-9 [font-family:'Plus_Jakarta_Sans-ExtraBold',Helvetica] font-extrabold text-[#0b1c30] text-3xl tracking-[-0.75px] leading-9 whitespace-nowrap"
        >
          Welcome back
        </h1>
        <p className="w-[315px] h-6 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-[#434655ad] text-base tracking-[0] leading-6 whitespace-nowrap">
          Enter your details to access your courses.
        </p>
      </section>

      <form
        className="flex ml-[445px] w-[470px] h-[260px] relative mt-9 flex-col items-start gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required={true}
            placeholder="Email Address"
            className="self-stretch w-full h-[50px] rounded-lg relative border border-solid border-[#cfdee7] px-4 [font-family:'Geist-Regular',Helvetica] font-normal text-sm tracking-[0.14px] leading-5 text-[#434655] placeholder:text-[#434655ad] focus:border-[#0a369d]"
          />
        </div>
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required={true}
            placeholder="Password"
            className="self-stretch w-full h-[50px] rounded-lg relative border border-solid border-[#cfdee7] px-4 [font-family:'Geist-Regular',Helvetica] font-normal text-sm tracking-[0.14px] leading-5 text-[#434655] placeholder:text-[#434655ad] focus:border-[#0a369d]"
          />
        </div>
        <div className="flex flex-col items-start pt-2 pb-4 px-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
            <label className="inline-flex items-center gap-2 relative flex-[0_0_auto] cursor-pointer">
              <span className="relative w-4 h-4">
                <input
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="w-4 h-4 bg-white rounded relative border border-solid border-[#cfdee7] checked:bg-[#0a369d] checked:border-[#0a369d] focus:ring-2 focus:ring-[#0a369d]/30"
                />
                {rememberMe && (
                  <span
                    className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] leading-none text-white"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}
              </span>
              <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <span className="text-[#434655] relative flex items-center w-fit mt-[-1.00px] [font-family:'Geist-Regular',Helvetica] font-normal text-sm tracking-[0.14px] leading-5 whitespace-nowrap">
                  Remember me
                </span>
              </span>
            </label>
            <a
              href="#forgot-password"
              className="inline-flex flex-col items-start relative flex-[0_0_auto] focus:outline-none focus:underline"
            >
              <span className="text-[#0a369d] relative flex items-center w-fit mt-[-1.00px] [font-family:'Geist-Regular',Helvetica] font-normal text-sm tracking-[0.14px] leading-5 whitespace-nowrap">
                Forgot password?
              </span>
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="all-unset box-border flex items-center justify-center gap-2 px-0 py-3 relative self-stretch w-full flex-[0_0_auto] bg-[#0a369d] rounded-lg shadow-[0px_4px_12px_#0f172a0d] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0a369d]/30 focus:ring-offset-2"
        >
          <span className="justify-center text-white text-center relative flex items-center w-fit mt-[-1.00px] [font-family:'Geist-Regular',Helvetica] font-normal text-sm tracking-[0.14px] leading-5 whitespace-nowrap">
            Login
          </span>
          <span className="inline-flex flex-col items-center relative flex-[0_0_auto]">
            <img className="relative w-3 h-3" src="/arrow.svg" />
          </span>
        </button>
        <p className="sr-only" role="status" aria-live="polite">
          {submissionStatus}
        </p>
      </form>

      <footer className="ml-[453px] w-[448px] h-6 mt-[190px] flex">
        <div className="mt-0.5 w-[208.22px] ml-[119.9px] flex gap-[2.2px]">
          <span className="mt-px w-[155.85px] h-[18px] [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-[#434655ad] text-sm text-center tracking-[0] leading-5 whitespace-nowrap">
            Don&apos;t have an account?
          </span>
          <a
            href="#sign-up"
            className="mt-px w-[51px] h-5 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#0a369dad] text-sm text-center tracking-[0] leading-5 whitespace-nowrap focus:outline-none focus:underline"
          >
            Sign up
          </a>
        </div>
      </footer>
    </main>
  );
};