import { useState } from "react";
import dashboardIcon from "../public/dachboard.svg";
import coursesIcon from "../public/courses.svg";
import tasksIcon from "../public/tasks.svg";
import aiPlanIcon from "../public/aiPlan.svg";
import analyticsdIcon from "../public/analytics.svg"
import settingIcon from "../public/setting.svg";
import helpIcon from "../public/help.svg";

type NavigationItem = {
  label: string;
  icon: string;
  iconClassName: string;
};

const primaryNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    icon: dashboardIcon,
    iconClassName: "w-[18px] h-[18px]",
  },
  {
    label: "Courses",
    icon: coursesIcon,
    iconClassName: "w-[22px] h-4",
  },
  {
    label: "Tasks",
    icon: tasksIcon,
    iconClassName: "w-5 h-5",
  },
  {
    label: "AI Study Plan",
    icon: aiPlanIcon,
    iconClassName: "w-[19.01px] h-5",
  },
  {
    label: "Analytics", 
    icon: analyticsdIcon, 
    iconClassName: "w-[18px] h-[18px]",
  },
];

const secondaryNavigation: NavigationItem[] = [
  {
    label: "Settings",
    icon: settingIcon,
    iconClassName: "w-[20.1px] h-5",
  },
  {
    label: "Help",
    icon: helpIcon,
    iconClassName: "w-5 h-5",
  },
];

interface SidebarProps {
  currentView?: string;
  onSelectView?: (view: string) => void;
  onLogout?: () => void; 
  isAIPlanView?: boolean;
}

export const Sidebar = ({
  currentView,
  onSelectView,
  onLogout,
  isAIPlanView,
}: SidebarProps) => {
  const [projectMessage, setProjectMessage] = useState("");

  const handleNewProject = () => {
    setProjectMessage("New project action started");
    window.dispatchEvent(new CustomEvent("planora:new-project"));
  };

  const renderNavigationItem = (item: NavigationItem) => {
    const isActive = currentView === item.label;

    return (
      <button
        key={item.label}
        type="button"
        onClick={() => onSelectView?.(item.label)}
        aria-current={isActive ? "page" : undefined}
        className={`box-border flex items-center self-stretch w-full gap-4 p-4 rounded-lg relative flex-[0_0_auto] text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004ac6] ${
          isActive
            ? "bg-[#e5eeff] border-r-2 [border-right-style:solid] border-[#004ac6]"
            : "bg-transparent border-r-2 border-transparent hover:bg-[#eef2ff]"
        }`}
      >
        <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
          <img
            className={`relative ${item.iconClassName}`}
            alt=""
            aria-hidden="true"
            src={item.icon}
          />
        </span>
        <span
          className={`flex items-center [font-family:'Geist-Medium',Helvetica] font-medium text-sm tracking-[0.14px] leading-5 whitespace-nowrap relative w-fit mt-[-1.00px] ${
            isActive ? "text-[#004ac6]" : "text-[#434655]"
          }`}
        >
          {item.label}
        </span>
      </button>
    );
  };

  const showAIPlanSidebar = isAIPlanView || currentView === "AI Study Plan";

  return (
    <aside
      className="flex flex-col w-64 h-screen fixed top-0 left-0 bg-[#f8f9ff] border-r border-[#c3c6d7] px-4 py-6 z-30 justify-between"
      aria-label="Academic application navigation"
    >
      <div className="flex pt-0 pb-10 px-0 self-stretch w-full flex-col items-start relative flex-[0_0_auto]">
        <div className="flex items-center gap-4 px-4 py-0 self-stretch w-full relative flex-[0_0_auto]">
          <div className="w-[37.63px] h-10 flex flex-col items-start justify-center relative rounded-full overflow-hidden border border-solid border-[#c3c6d7]">
            <div className="relative flex-1 self-stretch w-full grow bg-[url(/user-profile-photo.png)] bg-cover bg-[50%_50%]" />
          </div>
          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <div className="flex self-stretch w-full flex-col items-start relative flex-[0_0_auto]">
              <div className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Geist-Bold',Helvetica] font-bold text-[#0A369D] text-2xl tracking-[0] leading-8 whitespace-nowrap">
                Planora
              </div>
            </div>
            <div className="flex flex-col items-start self-stretch w-full relative flex-[0_0_auto]">
              <div className="[font-family:'Geist-SemiBold',Helvetica] font-semibold text-[#434655] text-xs tracking-[0.60px] leading-4 relative w-fit mt-[-1.00px]">
                Academic
                <br />
                Management
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex pt-0 pb-10 px-0 self-stretch w-full flex-col items-start relative flex-[0_0_auto]">
        <button
          type="button"
          onClick={handleNewProject}
          className="box-border flex gap-[7.99px] px-6 py-4 self-stretch w-full bg-[#0A369D] rounded-lg items-center justify-center relative flex-[0_0_auto] transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004ac6]"
        >
          <span className="flex items-center justify-center [font-family:'Geist-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0.14px] leading-5 whitespace-nowrap relative w-fit mt-[-1.00px]">
            + New Project
          </span>
        </button>
        <span className="sr-only" aria-live="polite">
          {projectMessage}
        </span>
      </div>

      <nav
        className="gap-2 flex-1 grow flex flex-col items-start relative self-stretch w-full"
        aria-label="Main navigation"
      >
        {primaryNavigation.map(renderNavigationItem)}
      </nav>

      <nav
        className="gap-2 pt-6 pb-0 px-0 flex-[0_0_auto] border-t [border-top-style:solid] border-[#c3c6d7] flex flex-col items-start relative self-stretch w-full"
        aria-label="Support navigation"
      >
        {showAIPlanSidebar ? (
          <div className="flex flex-col w-full gap-2">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0053db] px-4 py-3 font-['Geist-Medium',Helvetica] text-sm font-medium text-white transition-colors hover:bg-[#004ac6]"
            >
              <span>Upgrade to Pro</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-['Inter-Medium',Helvetica] text-sm text-[#d93838] transition-colors hover:bg-red-50 text-left"
            >
              <img src="/logout.svg" className="w-4 h-4" alt="Logout" />
              <span>Log Out</span>
            </button>

            {secondaryNavigation
              .filter((item) => item.label === "Help")
              .map(renderNavigationItem)}
          </div>
        ) : (
          secondaryNavigation.map(renderNavigationItem)
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;