# Planora - Frontend

## Technologies Used:
- Library: React with TypeScript
- styling: Tailwind CSS
- Build Tool: Vite
- Icons: Custom SVG assets from Figma

## project files structure:
```
Frontend/
├── public/                  # Icons and image
├── src/
│   ├── AIPlan.tsx             # AI Study Plan generator 
│   ├── AnalyticsDashboard.tsx # Data Science analytics 
│   ├── App.tsx                # Main routing & app state controller
│   ├── axios.ts               # Centralized Axios API configuration
│   ├── Courses.tsx            # Academic courses management section
│   ├── Dashboard.tsx          # Main user dashboard interface
│   ├── index.css              # Global Tailwind CSS styles
│   ├── landingPage.tsx        # Public landing page
│   ├── login.tsx              
│   ├── main.tsx               # React application entry point
│   ├── Register.tsx           
│   ├── Sidebar.tsx            # Navigation sidebar component
│   └── Tasks.tsx              # Task management module
├── .env                       # Environment variables
├── .gitignore                 # Git ignored files
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML root template
├── package.json               # Dependencies & scripts
└── README.md                  # Project documentation
```

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

 ```bash
 git clone [https://github.com/IEEE-ZSB-GP-T4/Frontend.git](https://github.com/IEEE-ZSB-GP-T4/Frontend.git)
cd Frontend 
```


2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
   npm run dev
```