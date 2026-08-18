import { useState, useEffect } from "react";
import API from './axios';

type Course = {
  id: string | number;
  title: string;
  instructor: string;
  credits: number;
  tasks_count?: number;
};

export default function CourseManagementSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [studyPlanGenerated, setStudyPlanGenerated] = useState(false);
  
  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newInstructor, setNewInstructor] = useState("");
  const [newCredits, setNewCredits] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get('/courses');
        setCourses(response.data.data);
      } catch {
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleGenerateStudyPlan = () => {
    setStudyPlanGenerated(true);
  };
//API
  const handleFetchUpcomingDeadlines = async () => {
    try {
      const response = await API.get("/tasks/upcoming-deadlines");
      alert(`You have ${response.data.data.length} tasks due soon!`);
    } catch (error) {
      console.error("Failed to fetch upcoming deadlines", error);
    }
  };

  const handleSaveNewCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/courses', {
        title: newTitle,
        instructor: newInstructor,
        credits: Number(newCredits),
      });
      
      const response = await API.get('/courses');
      setCourses(response.data.data);

      setIsAddModalOpen(false);
      setNewTitle("");
      setNewInstructor("");
      setNewCredits("");
    } catch {
      alert("Failed to add course.");
    }
  };

  const handleDeleteCourse = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await API.delete(`/courses/${id}`);
      setCourses(courses.filter(course => course.id !== id));
    } catch {
      alert("Failed to delete course.");
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
            onClick={handleFetchUpcomingDeadlines}
          >
            <img className="h-5 w-4" src="/notification.svg" alt="Notifications" />
          </button>
        </div>
      </header>

      <section className="flex w-full flex-1 flex-col items-start overflow-auto p-6 md:p-16">
        <div className="flex w-full max-w-screen-xl flex-col items-start gap-10">
          
          {/* Title & Add Button Section */}
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col items-start gap-2">
              <h1 className="m-0 font-['Geist-Bold',Helvetica] text-4xl font-bold leading-[48px] tracking-[-0.96px] text-[#0b1c30] md:text-5xl md:leading-[56px]">
                My Courses
              </h1>
              <p className="m-0 font-['Inter-Regular',Helvetica] text-base font-normal leading-6 text-[#434655]">
                Manage your academic curriculum and tasks.
              </p>
            </div>
            <button
              className="bg-[#0A369D] text-white px-6 py-3 rounded-lg hover:bg-[#004ac6] transition-colors shadow-sm text-sm font-medium"
              onClick={() => setIsAddModalOpen(true)}
            >
              + Add New Course
            </button>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-gray-500 py-10 w-full text-center">Loading courses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {courses.map((course) => (
                <article key={course.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold text-[#0b1c30]">{course.title}</h2>
                      <button 
                        onClick={() => handleDeleteCourse(course.id)} 
                        className="text-red-400 hover:text-red-600 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">Instructor: {course.instructor}</p>
                  </div>
                  <div className="flex gap-4 text-xs font-semibold text-[#0A369D] pt-4 border-t border-gray-100">
                    <span className="bg-[#e5eeff] px-2 py-1 rounded">{course.credits} Credits</span>
                    <span className="bg-[#dbe1ff] px-2 py-1 rounded">{course.tasks_count || 0} Active Tasks</span>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleSaveNewCourse} className="bg-white p-8 rounded-xl w-full max-w-sm flex flex-col gap-4 shadow-xl">
            <h2 className="text-xl font-bold mb-2 text-[#0b1c30]">Add New Course</h2>
            <input 
              placeholder="Course Title (e.g. CS101)" 
              className="border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A369D]" 
              value={newTitle} 
              onChange={e => setNewTitle(e.target.value)} 
              required 
            />
            <input 
              placeholder="Instructor Name" 
              className="border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A369D]" 
              value={newInstructor} 
              onChange={e => setNewInstructor(e.target.value)} 
              required 
            />
            <input 
              type="number" 
              placeholder="Credits" 
              className="border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A369D]" 
              value={newCredits} 
              onChange={e => setNewCredits(e.target.value)} 
              required 
            />
            <div className="flex gap-2 justify-end mt-4">
              <button 
                type="button" 
                onClick={() => setIsAddModalOpen(false)} 
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 text-sm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-[#0A369D] text-white rounded-lg hover:bg-[#004ac6] text-sm font-medium"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}