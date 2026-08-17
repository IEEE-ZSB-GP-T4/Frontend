import { useState, useEffect } from "react";
import API from './axios';

type ScheduleItem = {
  time: string;
  type: string;
  title?: string;
  description: string;
};

export default function AIStudyPlanSection() {
  const [targetHours, setTargetHours] = useState(4);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([
    "Data Structures (CS101)",
    "Calculus II (MAT202)",
  ]);
  const [optimizationFocus, setOptimizationFocus] = useState("Balanced Concept Review");
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      time: "9:00 AM — FOCUS BLOCK",
      type: "focus",
      title: "Data Structures: Review Algorithms",
      description: "Focus on sorting algorithms (Merge Sort, Quick Sort). Practice implementing them in Python."
    },
    {
      time: "11:00 AM — REST",
      type: "rest",
      description: "Take a 30-minute restorative break. Step away from the screen."
    },
    {
      time: "11:30 AM — DEEP WORK",
      type: "focus",
      title: "Calculus II: Linear Algebra Set",
      description: "Complete problems 1-15 from Chapter 4. Review matrix multiplication rules if stuck."
    },
    {
      time: "1:30 PM — LUNCH",
      type: "lunch",
      description: ""
    },
    {
      time: "2:30 PM — REVIEW",
      type: "focus",
      title: "Spaced Repetition: Flashcards",
      description: "Quick 30-minute review of active flashcards across all priority subjects."
    }
  ]);
  const [loading, setLoading] = useState(false);

  //Backend 
  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        const response = await API.get('/study-plan');
        if (response.data && response.data.schedule) {
          setScheduleItems(response.data.schedule);
        }
      } catch (error) {
        console.error("Failed to fetch study plan", error);
      }
    };
    fetchStudyPlan();
  }, []);

  const toggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  // Generated AI
  const handleGenerateSchedule = async () => {
    setLoading(true);
    try {
      const response = await API.post('/study-plan', {
        target_hours: targetHours,
        priority_courses: selectedCourses,
        optimization_focus: optimizationFocus,
      });

      if (response.data && response.data.schedule) {
        setScheduleItems(response.data.schedule);
      }
      alert("AI Schedule generated successfully!");
    } catch (error) {
      console.error("Error generating schedule:", error);
      alert("Failed to generate AI schedule.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToCalendar = async () => {
    try {
  
      alert("Study plan saved to calendar successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col items-start overflow-auto p-6 md:p-16 bg-[#f8f9ff]">
      <div className="flex w-full max-w-screen-xl flex-col items-start gap-10">
        
        {/* Title & Description */}
        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="m-0 font-['Geist-Bold',Helvetica] text-4xl font-bold leading-[48px] tracking-[-0.96px] text-[#0b1c30] md:text-5xl md:leading-[56px]">
            AI Study Plan Generator
          </h1>
          <p className="m-0 font-['Inter-Regular',Helvetica] text-base font-normal leading-6 text-[#434655]">
            Optimize your academic schedule with intelligent, adaptive planning powered by AI.
          </p>
        </div>

        {/* Grid Layout: Parameters & Today's Optimized Plan */}
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Parameters Sidebar */}
          <div className="flex flex-col items-start gap-6 rounded-xl border border-[#c3c6d7] bg-white p-6 lg:col-span-1 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d3e4fe] text-[#004ac6]">
                <img src="/parameter.svg" className="w-5 h-5" alt="" />
              </span>
              <h2 className="m-0 font-['Geist-SemiBold',Helvetica] text-xl font-semibold text-[#0b1c30]">
                Parameters
              </h2>
            </div>

            {/* Target Daily Study Hours */}
            <div className="flex w-full flex-col items-start gap-3">
              <div className="flex w-full justify-between font-['Geist-Medium',Helvetica] text-sm text-[#0b1c30]">
                <span>Target Daily Study Hours</span>
                <span className="font-bold text-[#004ac6]">{targetHours}h</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={targetHours}
                onChange={(e) => setTargetHours(Number(e.target.value))}
                className="w-full accent-[#004ac6]"
              />
              <div className="flex w-full justify-between font-['Inter-Regular',Helvetica] text-xs text-[#434655]">
                <span>1h</span>
                <span>12h</span>
              </div>
            </div>

            {/* Priority Courses */}
            <div className="flex w-full flex-col items-start gap-3">
              <span className="font-['Geist-Medium',Helvetica] text-sm text-[#0b1c30]">
                Priority Courses (Select up to 3)
              </span>
              <div className="flex w-full flex-col gap-2">
                {[
                  "Data Structures (CS101)",
                  "Calculus II (MAT202)",
                  "Physics 1 (PHY101)",
                  "Modern History (HIS300)",
                ].map((course) => {
                  const isSelected = selectedCourses.includes(course);
                  return (
                    <button
                      key={course}
                      type="button"
                      onClick={() => toggleCourse(course)}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left font-['Inter-Medium',Helvetica] text-sm transition-colors ${
                        isSelected
                          ? "border-[#004ac6] bg-[#e5eeff] text-[#004ac6]"
                          : "border-[#c3c6d7] bg-[#f8f9ff] text-[#434655]"
                      }`}
                    >
                      <span>{course}</span>
                      <span className={`flex h-4 w-4 items-center justify-center rounded border ${isSelected ? "border-[#004ac6] bg-[#004ac6] text-white" : "border-[#c3c6d7]"}`}>
                        {isSelected && "✓"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optimization Focus */}
            <div className="flex w-full flex-col items-start gap-2">
              <span className="font-['Geist-Medium',Helvetica] text-sm text-[#0b1c30]">
                Optimization Focus
              </span>
              <select 
                value={optimizationFocus}
                onChange={(e) => setOptimizationFocus(e.target.value)}
                className="w-full rounded-lg border border-[#c3c6d7] bg-[#f8f9ff] px-3 py-2.5 font-['Inter-Regular',Helvetica] text-sm text-[#0b1c30] focus:border-[#004ac6] focus:outline-none"
              >
                <option>Balanced Concept Review</option>
                <option>Exam Cram & Practice</option>
                <option>Deep Technical Focus</option>
              </select>
            </div>

            {/* Generate Button */}
            <button
              type="button"
              onClick={handleGenerateSchedule}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A369D] px-4 py-3 font-['Geist-Medium',Helvetica] text-sm font-medium text-white transition-colors hover:bg-[#004ac6] focus:outline-none focus:ring-2 focus:ring-[#0053db] focus:ring-offset-2 disabled:opacity-50"
            > 
              <img src="/generateAi.svg" className="h-5 w-5 brightness-0 invert" alt="" />
              <span>{loading ? "Generating..." : "Generate AI Schedule"}</span>
            </button>
          </div>

          {/* Today's Optimized Plan Section */}
          <div className="flex flex-col items-start gap-6 rounded-xl border border-[#c3c6d7] bg-white p-6 lg:col-span-2 shadow-sm">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d3e4fe] text-[#004ac6]">
                  <img src="/date.svg" className="w-5 h-5" style={{ filter: "brightness(0) saturate(100%) invert(20%) sepia(85%) saturate(2400%) hue-rotate(210deg)" }} alt="" />
                </span>
                <h2 className="m-0 font-['Geist-SemiBold',Helvetica] text-xl font-semibold text-[#0b1c30]">
                  Today&apos;s Optimized Plan
                </h2>
              </div>
              <button
                type="button"
                onClick={handleSaveToCalendar}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#c3c6d7] bg-[#f8f9ff] px-3.5 py-2 font-['Geist-Medium',Helvetica] text-xs font-medium text-[#0b1c30] transition-colors hover:bg-[#e5eeff] focus:outline-none"
              >
                <span><img src="/calender.svg" className="w-4 h-4" alt="" /></span>
                <span>Save to Calendar</span>
              </button>
            </div>

            {/* Schedule Timeline */}
            <div className="flex w-full flex-col gap-6 border-l-2 border-[#d3e4fe] pl-4 ml-2">
              {scheduleItems.map((item, index) => (
                <div key={index} className="flex flex-col items-start gap-2 relative">
                  <span className={`absolute -left-[23px] top-1 h-3 w-3 rounded-full ${item.type === 'rest' ? 'bg-[#626567]' : item.type === 'lunch' ? 'bg-[#e4a11b]' : 'bg-[#004ac6]'}`} />
                  <span className={`font-['Geist-Medium',Helvetica] text-xs font-semibold ${item.type === 'rest' ? 'text-[#626567]' : item.type === 'lunch' ? 'text-[#e4a11b]' : 'text-[#004ac6]'}`}>
                    {item.time}
                  </span>
                  {item.description && (
                    <div className="w-full rounded-xl border border-[#c3c6d7] bg-[#f8f9ff] p-4">
                      {item.title && (
                        <h3 className="m-0 mb-1 font-['Inter-SemiBold',Helvetica] text-base font-semibold text-[#0b1c30]">
                          {item.title}
                        </h3>
                      )}
                      <p className="m-0 font-['Inter-Regular',Helvetica] text-sm text-[#434655]">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}