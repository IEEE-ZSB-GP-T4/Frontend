import { useState, useEffect } from "react";
import API from './axios'; 

const fetchUpcomingTasks = async () => {
  try {
    const response = await API.get("/tasks/upcoming-deadlines");
    console.log("Upcoming tasks:", response.data);
    alert(`You have ${response.data.data.length} tasks due soon!`); 
  } catch (error) {
    console.error("Failed to fetch upcoming deadlines", error);
  }
};

type Task = {
  id: string | number;
  title: string;
  course: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  priorityBg?: string;
  priorityColor?: string;
  borderColor?: string;
  completed: boolean;
};

export default function ActiveTasksSection() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [studyPlanGenerated, setStudyPlanGenerated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("Medium");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await API.get("/tasks");
        setTasks(response.data.data);
      } catch (error) {
        console.error("Failed to fetch tasks, using local mock data", error);
      }
    };

    fetchTasks();
  }, []);

  const handleGenerateStudyPlan = () => {
    setStudyPlanGenerated(true);
  };

  const handleSaveNewTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const response = await API.post("/tasks", {
        title: newTitle,
        course: newCourse || "General Course",
        due_date: newDueDate || "2026-11-01",
        priority: newPriority,
      });

      setTasks((prevTasks) => [response.data.data, ...prevTasks]);
      setNewTitle("");
      setNewCourse("");
      setNewDueDate("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add task", error);
      alert("Failed to add task. Check backend connection.");
    }
  };

  const handleToggleComplete = async (id: string | number) => {
    try {
      await API.patch(`/tasks/${id}/complete`);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  const handleDeleteTask = async (id: string | number) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
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
            onClick={fetchUpcomingTasks}
          >
            <img className="h-5 w-4" src="/notification.svg" alt="Notifications" />
          </button>
        </div>
      </header>

      <section className="flex w-full flex-1 flex-col items-start overflow-auto p-6 md:p-16">
        <div className="flex w-full max-w-screen-xl flex-col items-start gap-10">
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
              onClick={() => setIsModalOpen(true)}
            >
              <span>+ Add New Task</span>
            </button>
          </div>

          <div className="w-full overflow-hidden rounded-xl border border-[#c3c6d7] bg-white">
            <div className="grid grid-cols-4 border-b border-[#c3c6d7] bg-[#f0f4ff] px-6 py-3 font-['Geist-SemiBold',Helvetica] text-xs font-semibold tracking-[0.6px] text-[#434655]">
              <span>TASK & COURSE</span>
              <span>DUE DATE</span>
              <span>PRIORITY</span>
              <span className="text-right">ACTIONS</span>
            </div>

            {tasks.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">No tasks found or server is offline.</div>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`grid grid-cols-4 items-center px-6 py-4 ${
                    index > 0 ? "border-t border-[#c3c6d7]" : ""
                  }`}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className={`font-['Inter-SemiBold',Helvetica] text-base font-semibold text-[#0b1c30] ${task.completed ? "line-through text-gray-400" : ""}`}>
                      {task.title}
                    </span>
                    <span className="text-xs text-[#434655]">{task.course}</span>
                  </div>

                  <div className="text-sm text-[#434655]">
                    <span>{task.dueDate}</span>
                  </div>

                  <div>
                    <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700">
                      {task.priority || "Medium"}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-[#434655] hover:text-red-600 text-sm"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleComplete(task.id)}
                      className={`px-3 py-1 text-xs rounded border ${task.completed ? "bg-blue-100 text-blue-700 border-blue-300" : "bg-gray-50 border-gray-300"}`}
                    >
                      {task.completed ? "Completed" : "Complete"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleSaveNewTask} className="bg-white p-8 rounded-xl w-full max-w-sm flex flex-col gap-4 shadow-xl">
            <h2 className="text-xl font-bold mb-2 text-[#0b1c30]">Add New Task</h2>
            <input
              placeholder="Task Title"
              className="border p-2.5 rounded-lg text-sm"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <input
              placeholder="Course Name"
              className="border p-2.5 rounded-lg text-sm"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
            />
            <input
              type="date"
              className="border p-2.5 rounded-lg text-sm"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
            <select
              className="border p-2.5 rounded-lg text-sm bg-white"
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as "High" | "Medium" | "Low")}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <div className="flex gap-2 justify-end mt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0A369D] text-white rounded-lg text-sm font-medium"
              >
                Save Task
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}