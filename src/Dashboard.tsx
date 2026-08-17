import { useState, useEffect } from "react";
import API from './axios';

export default function AcademicDashboardSection() {
  const [studyPlanGenerated, setStudyPlanGenerated] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //Backend
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await API.get('/dashboard');
        setDashboardData(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching dashboard:", err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  
  if (loading) return <div className="flex h-screen items-center justify-center font-['Geist-Medium',Helvetica] text-lg">Loading...</div>;
  
  if (error) return <div className="flex h-screen items-center justify-center font-['Geist-Medium',Helvetica] text-lg text-red-500">{error}</div>;

  const summaryCards = [
    {
      label: "Total Courses",
      value: dashboardData?.total_courses || "6",
      icon: (
        <img 
          className="w-5 h-5" 
          style={{ filter: "brightness(0) saturate(100%) invert(20%) sepia(85%) saturate(2400%) hue-rotate(210deg)" }} 
          src="/courses.svg" 
          alt="Courses" 
        />
      ),
    },
    {
      label: "Pending Tasks",
      value: dashboardData?.pending_tasks || "12",
      icon: (
        <img 
          className="w-5 h-5" 
          style={{ filter: "brightness(0) saturate(100%) invert(20%) sepia(85%) saturate(2400%) hue-rotate(210deg)" }} 
          src="/tasks.svg" 
          alt="Tasks" 
        />
      ),
    },
    {
      label: "Study Hours",
      value: dashboardData?.study_hours || "24.5",
      detail: "This week",
      icon: (
        <img 
          className="w-5 h-5" 
          style={{ filter: "brightness(0) saturate(100%) invert(20%) sepia(85%) saturate(2400%) hue-rotate(210deg)" }} 
          src="/hours.svg" 
          alt="Study Hours" 
        />
      ),
    },
  ];

  const deadlines = [
    {
      title: "Intro to Psychology - Quiz",
      due: "Due: Oct 12",
      status: "Urgent",
      icon: <img src="/urgent.svg" className="w-5 h-5" alt="Urgent" />,
      iconClassName: "w-[18px] h-5",
      iconBackground: "bg-[#ffdad6]",
      statusBackground: "bg-[#ffdad6]",
      statusColor: "text-[#ba1a1a]",
    },
    {
      title: "Advanced Calculus - Problem Set",
      due: "Due: Oct 15",
      status: "Pending",
      icon: <img src="/problem.svg" className="w-5 h-5" alt="Pending" />,
      iconClassName: "w-[18px] h-5",
      iconBackground: "bg-[#d3e4fe]",
      statusBackground: "bg-[#e0e3e5]",
      statusColor: "text-[#626567]",
    },
    {
      title: "Modern History - Essay",
      due: "Due: Oct 18",
      status: "Pending",
      icon: <img src="/essay.svg" className="w-5 h-5" alt="Pending" />,
      iconClassName: "w-[19px] h-5",
      iconBackground: "bg-[#d3e4fe]",
      statusBackground: "bg-[#e0e3e5]",
      statusColor: "text-[#626567]",
    },
  ];

  const handleGenerateStudyPlan = () => {
    setStudyPlanGenerated(true);
  };

  const handleViewAll = () => {
    const deadlineSection = document.getElementById("upcoming-deadlines");
    deadlineSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col items-start self-stretch bg-[#f8f9ff]">
      <header className="relative z-[1] flex h-16 w-full shrink-0 items-center justify-end border-b border-[#c3c6d7] bg-[#f8f9ff] px-6 py-0 md:px-16">
        <div className="inline-flex items-center gap-4 md:gap-6">
          <button
            className="inline-flex items-center justify-center rounded-lg bg-[#0A369D] px-4 py-2 font-['Geist-Medium',Helvetica] text-sm font-medium leading-5 tracking-[0.14px] text-white transition-colors hover:bg-[#4472CA]"
            type="button"
            onClick={handleGenerateStudyPlan}
          >
            <span className="hidden sm:inline">
              {studyPlanGenerated
                ? "Study Plan Generated"
                : "Generate AI Study Plan"}
            </span>
            <span className="sm:hidden">Generate Plan</span>
          </button>
          <button
            className="inline-flex flex-col items-center justify-center"
            type="button"
            aria-label="Notifications"
          >
            <img className="h-5 w-4" src="/notification.svg" alt="Notification" />
          </button>
        </div>
      </header>
      <section className="flex w-full flex-1 flex-col items-start overflow-auto p-6 md:p-16">
        <div className="flex w-full max-w-screen-xl flex-col items-start gap-10">
          <section
            aria-labelledby="dashboard-title"
            className="flex w-full flex-col items-start gap-2"
          >
            <h1
              id="dashboard-title"
              className="m-0 flex items-center font-['Geist-Bold',Helvetica] text-4xl font-bold leading-[48px] tracking-[-0.96px] text-[#0b1c30] md:text-5xl md:leading-[56px]"
            >
              Welcome Back, {dashboardData?.user_name || 'Alex'}!
            </h1>
            <p className="m-0 flex items-center font-['Inter-Regular',Helvetica] text-lg font-normal leading-7 tracking-[0] text-[#434655]">
              Here&apos;s your academic overview for today.
            </p>
          </section>
          
          <section
            aria-label="Academic summary"
            className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {summaryCards.map((card) => (
              <article
                key={card.label}
                className="relative flex min-w-0 flex-col items-start overflow-hidden rounded-xl border border-[#c3c6d7] bg-white px-6 pb-6 pt-6 sm:min-h-[133px] sm:pb-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="pointer-events-none absolute left-px top-px h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] bg-[linear-gradient(159deg,rgba(239,244,255,1)_0%,rgba(239,244,255,0)_100%)] opacity-50" />
                <div className="relative flex w-full items-start justify-between pb-4">
                  <span className="font-['Geist-Medium',Helvetica] text-sm font-medium leading-5 tracking-[0.14px] text-[#434655]">
                    {card.label}
                  </span>
                  <span className="inline-flex flex-col items-start rounded-full bg-[#e5eeff] p-2">
                    {card.icon}
                  </span>
                </div>
                <strong className="relative flex items-center font-['Geist-Bold',Helvetica] text-5xl font-bold leading-[56px] tracking-[-0.96px] text-[#0b1c30]">
                  {card.value}
                </strong>
                {card.detail && (
                  <span className="relative pt-2 font-['Geist-SemiBold',Helvetica] text-xs font-semibold leading-4 tracking-[0.6px] text-[#434655]">
                    {card.detail}
                  </span>
                )}
              </article>
            ))}
          </section>

          <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-3">
            <section
              id="upcoming-deadlines"
              aria-labelledby="deadlines-title"
              className="flex min-w-0 flex-col items-start gap-6 lg:col-span-2"
            >
              <div className="flex w-full items-center justify-between">
                <h2
                  id="deadlines-title"
                  className="m-0 font-['Geist-SemiBold',Helvetica] text-2xl font-semibold leading-8 tracking-[0] text-[#0b1c30]"
                >
                  Upcoming Deadlines
                </h2>
                <button
                  className="font-['Geist-Medium',Helvetica] text-sm font-medium leading-5 tracking-[0.14px] text-[#004ac6] transition-colors hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  type="button"
                  onClick={handleViewAll}
                >
                  View All
                </button>
              </div>
              <div className="w-full overflow-hidden rounded-xl border border-[#c3c6d7] bg-white">
                {deadlines.map((deadline, index) => (
                  <article
                    key={deadline.title}
                    className={`flex w-full items-center justify-between gap-4 p-4 sm:p-6 ${
                      index > 0 ? "border-t border-[#c3c6d7]" : ""
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-4 sm:gap-6">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${deadline.iconBackground}`}
                      >
                        {deadline.icon}
                      </div>
                      <div className="flex min-w-0 flex-col items-start gap-1">
                        <h3 className="m-0 truncate font-['Inter-SemiBold',Helvetica] text-base font-semibold leading-6 tracking-[0] text-[#0b1c30]">
                          {deadline.title}
                        </h3>
                        <p className="m-0 font-['Geist-SemiBold',Helvetica] text-xs font-semibold leading-4 tracking-[0.6px] text-[#434655]">
                          {deadline.due}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 font-['Inter-Medium',Helvetica] text-xs font-medium leading-4 tracking-[0] ${deadline.statusBackground} ${deadline.statusColor}`}
                    >
                      {deadline.status}
                    </span>
                  </article>
                ))}
              </div>
            </section>
            
            <aside
              aria-labelledby="insights-title"
              className="relative flex min-h-[344px] flex-col justify-between overflow-hidden rounded-xl border border-blue-600 bg-white p-8 shadow-[0px_12px_32px_#2563eb0d] sm:p-10"
            >
              <div className="pointer-events-none absolute left-px top-px h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] bg-[linear-gradient(121deg,rgba(229,238,255,1)_0%,rgba(229,238,255,0)_100%)] opacity-40" />
              <div className="relative flex flex-col items-start gap-6 pb-10">
                <div className="flex items-center gap-4">
                  <img className="h-5 w-[19.01px]" src="/aiPlan.svg" alt="AI Plan" />
                  <h2
                    id="insights-title"
                    className="m-0 font-['Geist-SemiBold',Helvetica] text-2xl font-semibold leading-8 tracking-[0] text-[#0b1c30]"
                  >
                    AI Insights
                  </h2>
                </div>
                <p className="m-0 font-['Inter-Regular',Helvetica] text-base font-normal leading-6 tracking-[0] text-[#434655]">
                  Your study patterns indicate a heavy load next week. Let
                  Planly generate an optimized study schedule to ensure
                  you&apos;re prepared for all upcoming deadlines.
                </p>
              </div>
              <button
                className="relative flex w-full items-center justify-center gap-4 rounded-xl bg-[#5E7CE2] px-6 py-6 font-['Geist-Medium',Helvetica] text-sm font-medium leading-5 tracking-[0.14px] text-white shadow-[0px_4px_12px_#2563eb33] transition-colors hover:bg-[#4472CA]"
                type="button"
                onClick={handleGenerateStudyPlan}
              >
                <img className="h-[22px] w-[22px]" src="/generateAi.svg" alt="Generate AI" />
                <span>
                  {studyPlanGenerated
                    ? "Study Plan Generated"
                    : "Generate AI Study Plan"}
                </span>
              </button>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}