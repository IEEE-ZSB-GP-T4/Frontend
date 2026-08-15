import { useState } from "react";

type Task = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  priorityBg: string;
  priorityColor: string;
  borderColor: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Research Paper Draft",
    course: "History 101",
    dueDate: "Oct 20",
    priority: "High",
    priorityBg: "bg-[#ffdad6]",
    priorityColor: "text-[#EF4444]",
    borderColor: "border-l-4 border-l-[#EF4444]",
    completed: true,
  },
  {
    id: "task-2",
    title: "Problem Set 4",
    course: "Physics 202",
    dueDate: "Oct 24",
    priority: "Medium",
    priorityBg: "bg-[#d3e4fe]",
    priorityColor: "text-[#434655]",
    borderColor: "border-l-4 border-l-[#434655]",
    completed: false,
  },
  {
    id: "task-3",
    title: "Read Chapters 5-7",
    course: "Sociology 198",
    dueDate: "Oct 28",
    priority: "Low",
    priorityBg: "bg-[#e0e3e5]",
    priorityColor: "text-[#434655]",
    borderColor: "border-l-4 border-l-[#C3C6D7]",
    completed: false,
  },
];

export default function ActiveTasksSection() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [studyPlanGenerated, setStudyPlanGenerated] = useState(false);

  const handleGenerateStudyPlan = () => {
    setStudyPlanGenerated(true);
  };

  const handleAddTask = () => {
    const newTaskNumber = tasks.length + 1;
    const newTask: Task = {
      id: `task-${newTaskNumber}`,
      title: `New Assignment ${newTaskNumber}`,
      course: "General Course",
      dueDate: "Nov 01",
      priority: "Medium",
      priorityBg: "bg-[#d3e4fe]",
      priorityColor: "text-[#004ac6]",
      borderColor: "border-l-4 border-l-[#004ac6]",
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col items-start self-stretch bg-[#f8f9ff]">
      {/* Header */}
      <header className="relative z-[1] flex h-16 w-full shrink-0 items-center justify-end border-b border-[#c3c6d7] bg-[#f8f9ff] px-6 py-0 md:px-16">
        <div className="inline-flex items-center gap-4 md:gap-6">
          <button
            className="inline-flex items-center justify-center rounded-lg bg-[#0A369D] px-4 py-2 font-['Geist-Medium',Helvetica] text-sm font-medium leading-5 tracking-[0.14px] text-white transition-colors hover:bg-[#4472CA] "
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
            <img className="h-5 w-4" src="/notification.svg" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <section className="flex w-full flex-1 flex-col items-start overflow-auto p-6 md:p-16">
        <div className="flex w-full max-w-screen-xl flex-col items-start gap-10">
          
          {/* Title & Add Button Section */}
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col items-start gap-2">
              <h1 className="m-0 font-['Geist-Bold',Helvetica] text-4xl font-bold leading-[48px] tracking-[-0.96px] text-[#0b1c30] md:text-5xl md:leading-[56px]">
                Active Tasks
              </h1>
              <p className="m-0 font-['Inter-Regular',Helvetica] text-base font-normal leading-6 text-[#434655]">
                Manage and track your upcoming assignments.
              </p>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-[#16BA7E] px-6 py-3 font-['Geist-Medium',Helvetica] text-sm font-medium text-white transition-colors hover:bg-[#22FFAE]"
              type="button"
              onClick={handleAddTask}
            >
              <div className="flex items-center gap-1.5 font-['Inter-Regular',Helvetica] text-xs text-[#FFFFFF]"> 
                <img src="/tasks.svg" className="w-5 h-5"
                 style={{ filter: "brightness(0) invert(1)" }}/>
              <span>Add New Task</span>
              </div>
            </button>
          </div>

          {/* Tasks Table / List Section */}
          <div className="w-full overflow-hidden rounded-xl border border-[#c3c6d7] bg-white">
            {/* Table Header */}
            <div className="grid grid-cols-4 border-b border-[#c3c6d7] bg-[#f0f4ff] px-6 py-3 font-['Geist-SemiBold',Helvetica] text-xs font-semibold tracking-[0.6px] text-[#434655]">
              <span>TASK & COURSE</span>
              <span>DUE DATE</span>
              <span>PRIORITY</span>
              <span className="text-right">ACTIONS</span>
            </div>

            {/* Table Rows */}
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={`grid grid-cols-4 items-center px-6 py-4 ${
                  index > 0 ? "border-t border-[#c3c6d7]" : ""
                } ${task.borderColor}`}
              >
                {/* Task & Course */}
                <div className="flex flex-col items-start gap-1">
                  <span className="font-['Inter-SemiBold',Helvetica] text-base font-semibold text-[#0b1c30]">
                    {task.title}
                  </span>
                  <div className="flex items-center gap-1.5 font-['Inter-Regular',Helvetica] text-xs text-[#434655]">
                    <img className="h-3.5 w-3.5" src="/courses.svg" alt="Course icon" />
                    <span>{task.course}</span>
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-2 font-['Geist-Medium',Helvetica] text-sm text-[#434655]">
                  <img src="/date.svg" alt="" />
                  <span>{task.dueDate}</span>
                </div>

                {/* Priority */}
                <div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 font-['Inter-Medium',Helvetica] text-xs font-medium ${task.priorityBg} ${task.priorityColor}`}
                  >
                    {task.priority}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4">
                  <button
                    type="button"
                    aria-label="Edit task"
                    className="text-[#434655] hover:text-[#0053db]"
                  >
                    <img src="/edit.svg" alt="" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    aria-label="Delete task"
                    className="text-[#434655] hover:text-red-600"
                  >
                    <img src="/remove.svg" alt="" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleComplete(task.id)}
                    aria-label="Toggle completion"
                    className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                      task.completed
                        ? "border-[#0053db] bg-[#e5eeff] text-[#0053db]"
                        : "border-[#c3c6d7] bg-transparent"
                    }`}
                  >
                    {task.completed && "✓"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AI Suggestion Box */}
          <aside className="relative flex w-full flex-col gap-3 overflow-hidden rounded-xl border border-blue-600 bg-white p-6 shadow-[0px_8px_24px_#2563eb0d]">
            <div className="pointer-events-none absolute left-px top-px h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] bg-[linear-gradient(121deg,rgba(229,238,255,1)_0%,rgba(229,238,255,0)_100%)] opacity-40" />
            <div className="relative flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A369D] text-white">
                <img src="aiPlan.svg" className="w-5 h-5" 
                style={{ filter: "brightness(0) invert(1)" }} />
              </span>
              <h2 className="m-0 font-['Geist-SemiBold',Helvetica] text-xl font-semibold text-[#0b1c30]">
                AI Suggestion
              </h2>
            </div>
            <p className="relative m-0 font-['Inter-Regular',Helvetica] text-sm leading-6 text-[#434655]">
              Based on your syllabus for History 101, you should probably start outlining your Research Paper Draft today to ensure a steady pace before the Oct 20 deadline.
            </p>
          </aside>

        </div>
      </section>
    </main>
  );
}