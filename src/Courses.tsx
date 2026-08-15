import { useState } from "react";

type Course = {
  id: string;
  title: React.ReactNode;
  instructor: string;
  credits: string;
  tasks: string;
  instructorIcon: string;
  creditsIcon: string;
  tasksIcon: string;
  tasksClassName: string;
  tasksTextClassName: string;
};

const initialCourses: Course[] = [
  {
    id: "cs101",
    title: (
      <>
        CS101 - Intro to
        <br />
        Algorithms
      </>
    ),
    instructor: "Dr. Alan Turing",
    credits: "4 Credits",
    tasks: "3 Active Tasks",
    instructorIcon: "/person.svg",
    creditsIcon: "/credit.svg",
    tasksIcon: "/tasks.svg",
    tasksClassName: "bg-[#dbe1ff]",
    tasksTextClassName: "text-[#00174b]",
  },
  {
    id: "mat202",
    title: (
      <>
        MAT202 - Linear
        <br />
        Algebra
      </>
    ),
    instructor: "Prof. E. Noether",
    credits: "3 Credits",
    tasks: "1 Active Task",
    instructorIcon: "/person.svg",
    creditsIcon: "/credit.svg",
    tasksIcon: "/tasks.svg",
    tasksClassName: "bg-[#dbe1ff]",
    tasksTextClassName: "text-[#00174b]",
  },
  {
    id: "eng105",
    title: (
      <>
        ENG105 - Academic
        <br />
        Writing
      </>
    ),
    instructor: "Dr. S. Plath",
    credits: "3 Credits",
    tasks: "No Active Tasks",
    instructorIcon: "/person.svg",
    creditsIcon: "/credit.svg",
    tasksIcon: "/tasks.svg",
    tasksClassName: "bg-[#d3e4fe]",
    tasksTextClassName: "text-[#434655]",
  },
];

export default function CourseManagementSection() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [studyPlanGenerated, setStudyPlanGenerated] = useState(false);

  const handleGenerateStudyPlan = () => {
    setStudyPlanGenerated(true);
  };

  const handleAddCourse = () => {
    const courseNumber = courses.length + 1;
    const newCourse: Course = {
      id: `new-course-${courseNumber}`,
      title: (
        <>
          NEW{courseNumber} - New
          <br />
          Course
        </>
      ),
      instructor: "Course Instructor",
      credits: "3 Credits",
      tasks: "No Active Tasks",
      instructorIcon: "/person.svg",
      creditsIcon: "/credit.svg",
      tasksIcon: "/tasks.svg",
      tasksClassName: "bg-[#d3e4fe]",
      tasksTextClassName: "text-[#434655]",
    };

    setCourses((currentCourses) => [...currentCourses, newCourse]);
    setSelectedCourseId(newCourse.id);
  };

  const handleViewDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  return (
    <main className="relative flex min-h-0 flex-1 flex-col items-start self-stretch bg-[#f8f9ff] overflow-y-auto">
      
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-end border-b border-[#c3c6d7] bg-[#f8f9ff] px-6 py-0 md:px-16 shadow-sm">
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
            className="inline-flex flex-col items-center justify-center pb-1.5 focus:outline-none focus:ring-2 focus:ring-[#0A369D] focus:ring-offset-2"
            type="button"
            aria-label="Notifications"
          >
            <img className="h-5 w-4" src="/notification.svg" alt="Notifications" />
          </button>
        </div>
      </header>

      {/* Main Courses Content Section */}
      <section
        className="relative flex w-full max-w-screen-xl flex-1 grow flex-col items-start gap-10 px-8 pb-16 pt-24"
        aria-labelledby="courses-heading"
      >
        {/* Title & Add Course Button Bar */}
        <div className="relative flex w-full flex-[0_0_auto] items-center justify-between py-0 pl-0 pr-[1.14e-13px]">
          <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-2">
            <div className="relative flex w-full flex-[0_0_auto] flex-col items-start">
              <h1
                id="courses-heading"
                className="relative mt-[-1px] flex w-fit items-center whitespace-nowrap [font-family:'Geist-Bold',Helvetica] text-5xl font-bold leading-[56px] tracking-[-0.96px] text-[#0b1c30]"
              >
                My Courses
              </h1>
            </div>
            <div className="relative flex w-full flex-[0_0_auto] flex-col items-start">
              <p className="relative mt-[-1px] flex w-fit items-center whitespace-nowrap [font-family:'Inter-Regular',Helvetica] text-base font-normal leading-6 tracking-[0] text-[#434655]">
                Manage your academic curriculum and tasks.
              </p>
            </div>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-[#0A369D] px-6 py-3 shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#004ac6]"
            type="button"
            onClick={handleAddCourse}
          >
            <span className="relative mt-[-1px] flex w-fit items-center justify-center whitespace-nowrap [font-family:'Geist-Medium',Helvetica] text-center text-sm font-medium leading-5 tracking-[0.14px] text-white">
            + Add New Course
            </span>
          </button>
        </div>

        {/* Courses Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {courses.map((course: Course) => (
            <article
              key={course.id}
              className={`relative flex min-w-0 flex-1 grow flex-col items-start justify-between overflow-hidden rounded-xl  bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                selectedCourseId === course.id
                  ? "ring-2 ring-[#0053db] ring-offset-1"
                  : ""
              }`}
              aria-label={`${course.id} course`}
            >
              {/* Top Accent Line */}
              <div className="absolute left-px top-px h-1 w-[calc(100%_-_2px)] bg-[#0053db]" />
              
              {/* Course Title and Instructor */}
              <div className="relative flex w-full flex-[0_0_auto] flex-col items-start px-0 pb-4 pt-0">
                <div className="relative flex w-full flex-[0_0_auto] flex-col items-start gap-1">
                  <div className="relative flex w-full flex-[0_0_auto] flex-col items-start">
                    <h2 className="relative mt-[-1px] self-stretch [font-family:'Geist-SemiBold',Helvetica] text-2xl font-semibold leading-8 tracking-[0] text-[#0b1c30]">
                      {course.title}
                    </h2>
                  </div>
                  <div className="relative flex w-full flex-[0_0_auto] items-center gap-1">
                    <span className="relative inline-flex flex-[0_0_auto] flex-col items-start">
                      <img
                        className="relative h-[10.67px] w-[10.67px]"
                        alt="Instructor icon"
                        src={course.instructorIcon}
                      />
                    </span>
                    <span className="relative mt-[-1px] flex w-fit items-center whitespace-nowrap [font-family:'Inter-Regular',Helvetica] text-base font-normal leading-6 tracking-[0] text-[#434655]">
                      {course.instructor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Credits and Tasks Badges */}
              <div className="relative flex w-full flex-[0_0_auto] flex-col items-start px-0 pb-6 pt-0">
                <div className="relative flex w-full flex-[0_0_auto] items-start gap-2">
                  {/* Credits Badge */}
                  <span className="relative inline-flex flex-[0_0_auto] self-stretch items-center gap-1 rounded-md bg-[#e5eeff] px-2 py-1">
                    <span className="relative inline-flex flex-[0_0_auto] flex-col items-start">
                      <img
                        className="relative h-[9.33px] w-[11.38px]"
                        alt="Credits icon"
                        src={course.creditsIcon}
                      />
                    </span>
                    <span className="relative mt-[-1px] flex w-fit items-center whitespace-nowrap [font-family:'Geist-SemiBold',Helvetica] text-xs font-semibold leading-4 tracking-[0.6px] text-[#0b1c30]">
                      {course.credits}
                    </span>
                  </span>
                  
                  {/* Tasks Badge */}
                  <span
                    className={`relative inline-flex flex-[0_0_auto] self-stretch items-center gap-1 rounded-md px-2 py-1 ${course.tasksClassName}`}
                  >
                    <span className="relative inline-flex flex-[0_0_auto] flex-col items-start">
                      <img
                        className="relative h-[11.67px] w-[11.67px]"
                        alt="Tasks icon"
                        src={course.tasksIcon}
                      />
                    </span>
                    <span
                      className={`relative mt-[-1px] flex w-fit items-center whitespace-nowrap [font-family:'Geist-SemiBold',Helvetica] text-xs font-semibold leading-4 tracking-[0.6px] ${course.tasksTextClassName}`}
                    >
                      {course.tasks}
                    </span>
                  </span>
                </div>
              </div>

              {/* View Details Action Button */}
              <div className="relative flex w-full flex-[0_0_auto] items-center justify-between border-t border-[#e5eeff] px-0 pb-0 pt-4">
                <button
                  className="relative inline-flex flex-[0_0_auto] flex-col items-start rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0053db] focus:ring-offset-2"
                  type="button"
                  onClick={() => handleViewDetails(course.id)}
                  aria-pressed={selectedCourseId === course.id}
                >
                  <span className="relative mt-[-1px] flex w-fit items-center whitespace-nowrap [font-family:'Geist-Medium',Helvetica] text-sm font-medium leading-5 tracking-[0.14px] text-[#004ac6]">
                    View Details
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
       
        {/* Screen Reader Live Announcement for Accessibility */}
        <p className="sr-only" aria-live="polite">
          {selectedCourseId
            ? `Course ${selectedCourseId} selected.`
            : "No course selected."}
        </p>
      </section>
    </main>
  );
}