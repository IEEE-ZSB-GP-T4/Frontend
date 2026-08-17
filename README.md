# Planora - Frontend

## Technologies Used:
- Library: React with TypeScript
- styling: Tailwind CSS
- Build Tool: Vite
- Icons: Custom SVG assets from Figma

## project files structure:
```text
public/                  # Icons and image
src/
├── AIPlan.tsx           # AI-powered study schedule generator section
├── App.tsx              # Main routing and global state controller
├── Courses.tsx          # Course management and curriculum view
├── Dashboard.tsx        # Main student overview dashboard
├── index.css            # Global styles
├── landingPage.tsx      # Introductory landing page
├── login.tsx            # Authentication and login view
├── main.tsx             # Application entry point
├── Sidebar.tsx          # Navigation sidebar component
└── Tasks.tsx            # Task tracking and assignment management

## App Flow:
1- Landing & Authentication: This is the startup page(LandingPage.tsx); it provides a brief introduction to the application and includes a "Log In" button that leads to the authentication page(Login.tsx), as well as a "Get Started" button that takes the user directly to the dashboard page(Dashboard.tsx), the user must log in first to interact with the application.

2- Dashboard: When users log in, they are redirected directly to the dashboard page via the (App.tsx) file.

3- Sidebar Navigation: A persistent sidebar (Sidebar.tsx) allows users to seamlessly switch between different views:

- Dashboard: High-level academic overview (Dashboard.tsx).

- Courses: Manage enrolled courses, view instructors, and add new courses (Courses.tsx).

- Tasks: Track active and pending academic tasks (Tasks.tsx).

- AI Study Plan: Configure daily study hours and view generated optimized schedules (AIPlan.tsx).

## How to install:

1. Clone the repository:
git clone [https://github.com/IEEE-ZSB-GP-T4/Frontend.git](https://github.com/IEEE-ZSB-GP-T4/Frontend.git)
cd Frontend 

2. Install dependencies:
npm install

3. npm run dev