import { useState, useEffect } from "react";
import API from './axios';

type Session = {
  time?: string;
  type?: string;
  title?: string;
  task_title?: string;
  description?: string;
  duration?: number | string;
  hours?: number | string;
};

type DayPlan = {
  date?: string;
  sessions: Session[];
};

type ChecklistTask = {
  id: string | number;
  title: string;
  deadline?: string;
  priority?: string;
  status?: string;
};

type ChecklistCourse = {
  id: string | number;
  name: string;
  code: string;
  tasks: ChecklistTask[];
};

export default function AIStudyPlanSection() {

  const [availableHours, setAvailableHours] = useState<number>(4);

  // Courses + their incomplete tasks, fetched from /study-plan/tasks
  const [courses, setCourses] = useState<ChecklistCourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(true);
  const [selectedTaskIds, setSelectedTaskIds] = useState<(string | number)[]>([]);

  const [studyPlanDays, setStudyPlanDays] = useState<DayPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await API.get('/study-plan/tasks');
        setCourses(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch study plan checklist", error);
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchChecklist();
  }, []);

  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        const response = await API.get('/study-plan');
        if (response.data && response.data.data && response.data.data.generated_plan) {
          setStudyPlanDays(response.data.data.generated_plan.days || []);
        }
      } catch (error) {
        console.error("Failed to fetch study plan", error);
      }
    };
    fetchStudyPlan();
  }, []);

  const toggleTask = (taskId: string | number) => {
    setSelectedTaskIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleGenerateSchedule = async () => {
    if (selectedTaskIds.length === 0) {
      alert("Please select at least one task.");
      return;
    }

    setLoading(true);
    try {
      // StoreStudyPlanRequest only validates available_hours + task_ids.
      const response = await API.post('/study-plan', {
        available_hours: Number(availableHours),
        task_ids: selectedTaskIds,
      });

      if (response.data && response.data.data && response.data.data.generated_plan) {
        setStudyPlanDays(response.data.data.generated_plan.days || []);
      }
      alert("AI Schedule generated successfully!");
    } catch (error: any) {
      console.error("Error generating schedule:", error);
      const validationErrors = error?.response?.data?.data;
      if (validationErrors) {
        console.error("Validation errors:", validationErrors);
      }
      alert("Failed to generate AI schedule. Check console for details.");
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

  // Format "2026-08-20" -> "Thursday, Aug 20" (same treatment as Tasks.tsx)
  const formatDayLabel = (dateStr?: string) => {
    if (!dateStr) return null;
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) return dateStr;
    return parsed.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDeadline = (dateStr?: string) => {
    if (!dateStr) return null;
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) return null;
    return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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

            {/* Target Daily Study Hours (available_hours) */}
            <div className="flex w-full flex-col items-start gap-3">
              <div className="flex w-full justify-between font-['Geist-Medium',Helvetica] text-sm text-[#0b1c30]">
                <span>Target Daily Study Hours</span>
                <span className="font-bold text-[#004ac6]">{availableHours}h</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={availableHours}
                onChange={(e) => setAvailableHours(Number(e.target.value))}
                className="w-full accent-[#004ac6]"
              />
              <div className="flex w-full justify-between font-['Inter-Regular',Helvetica] text-xs text-[#434655]">
                <span>1h</span>
                <span>12h</span>
              </div>
            </div>

            {/* Tasks checklist, grouped by course - from /study-plan/tasks */}
            <div className="flex w-full flex-col items-start gap-3">
              <span className="font-['Geist-Medium',Helvetica] text-sm text-[#0b1c30]">
                Select Tasks to Plan For
              </span>

              {coursesLoading ? (
                <div className="text-sm text-gray-500 py-2">Loading your tasks...</div>
              ) : courses.length === 0 ? (
                <div className="text-sm text-gray-500 py-2">No courses found yet.</div>
              ) : (
                <div className="flex w-full flex-col gap-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex w-full flex-col gap-2">
                      <span className="font-['Geist-Medium',Helvetica] text-xs font-semibold uppercase tracking-wide text-[#434655]">
                        {course.name} ({course.code})
                      </span>

                      {course.tasks.length === 0 ? (
                        <span className="text-xs text-gray-400 pl-1">No pending tasks</span>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {course.tasks.map((task) => {
                            const isSelected = selectedTaskIds.includes(task.id);
                            const deadlineLabel = formatDeadline(task.deadline);
                            return (
                              <button
                                key={task.id}
                                type="button"
                                onClick={() => toggleTask(task.id)}
                                className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left font-['Inter-Medium',Helvetica] text-sm transition-colors ${
                                  isSelected
                                    ? "border-[#004ac6] bg-[#e5eeff] text-[#004ac6]"
                                    : "border-[#c3c6d7] bg-[#f8f9ff] text-[#434655]"
                                }`}
                              >
                                <span className="flex flex-col items-start">
                                  <span>{task.title}</span>
                                  {deadlineLabel && (
                                    <span className="text-xs opacity-70">Due {deadlineLabel}</span>
                                  )}
                                </span>
                                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${isSelected ? "border-[#004ac6] bg-[#004ac6] text-white" : "border-[#c3c6d7]"}`}>
                                  {isSelected && "✓"}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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

          {/* Today's Optimized Plan Section (Rebuilt around days[].sessions[]) */}
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

            {/* Schedule Timeline based on days and sessions */}
            <div className="flex w-full flex-col gap-6">
              {studyPlanDays.length === 0 ? (
                <div className="p-6 text-center text-gray-500 text-sm w-full">No study plan generated yet. Select tasks and click generate above.</div>
              ) : (
                studyPlanDays.map((dayItem, dIndex) => (
                  <div key={dIndex} className="flex flex-col gap-4 w-full border-b pb-4 last:border-b-0">
                    <h3 className="font-['Geist-SemiBold',Helvetica] text-lg font-bold text-[#004ac6]">
                      {formatDayLabel(dayItem.date) || `Day ${dIndex + 1}`}
                    </h3>
                    <div className="flex w-full flex-col gap-4 border-l-2 border-[#d3e4fe] pl-4 ml-2">
                      {dayItem.sessions && dayItem.sessions.map((session, sIndex) => (
                        <div key={sIndex} className="flex flex-col items-start gap-2 relative">
                          <span className="absolute -left-[23px] top-1 h-3 w-3 rounded-full bg-[#004ac6]" />
                          <span className="font-['Geist-Medium',Helvetica] text-xs font-semibold text-[#004ac6]">
                            {session.time || `${session.hours || session.duration || 1} hrs`}
                          </span>
                          <div className="w-full rounded-xl border border-[#c3c6d7] bg-[#f8f9ff] p-4">
                            <h4 className="m-0 mb-1 font-['Inter-SemiBold',Helvetica] text-base font-semibold text-[#0b1c30]">
                              {session.title || session.task_title || "Study Session"}
                            </h4>
                            {session.description && (
                              <p className="m-0 font-['Inter-Regular',Helvetica] text-sm text-[#434655]">
                                {session.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}