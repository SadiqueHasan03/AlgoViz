# AlgoViz Academy: Interactive Algorithm Learning Platform

AlgoViz Academy is an interactive learning platform designed to help users master algorithms and data structures through visual learning, practical coding, interactive quizzes, and guided lessons.

## Features

-   **Interactive Visualizations**: Watch algorithms like Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort in action with step-by-step animations. (Searching visualizations coming soon!)
-   **Comprehensive Lessons**: Learn theory and practical applications through structured Markdown-based lessons covering fundamental concepts, Big O notation, and specific algorithms.
-   **Engaging Quizzes**: Test your understanding with quizzes covering various topics and difficulty levels, complete with progress tracking.
-   **Authentication**: Secure user accounts and progress tracking powered by Clerk.
-   **Responsive Design**: Learn on any device with a layout powered by Tailwind CSS and shadcn/ui.
-   **(Planned)** **Code Playground**: Write and test your algorithm implementations in an integrated code editor.
-   **(Planned)** **Algorithm Challenges**: Test your skills with progressively difficult coding exercises.

## Technology Stack

This project is built with modern web technologies:

-   **Vite**: Fast build tool and development server.
-   **React**: Frontend library for building user interfaces.
-   **TypeScript**: Strong typing for enhanced code quality and developer experience.
-   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
-   **shadcn/ui**: Accessible and reusable UI components built with Radix UI and Tailwind CSS.
-   **React Router DOM**: Client-side routing for seamless navigation.
-   **Clerk**: User authentication and management.
-   **TanStack Query (React Query)**: Efficient data fetching, caching, and state synchronization (primarily for potential future backend integration).
-   **React Markdown**: Rendering lesson content from Markdown files with syntax highlighting.
-   **Recharts**: Used internally by some shadcn/ui components for charting.

## Getting Started

### Prerequisites

-   Node.js (v16 or higher recommended)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sadiquehasan03/algoviz.git
    cd sadiquehasan03-algoviz
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Clerk requires a Publishable Key. Create a `.env` file in the project root:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY
    ```
    Replace `pk_test_YOUR_CLERK_PUBLISHABLE_KEY` with your actual Clerk Publishable Key (you have it hardcoded in `src/main.tsx`, but using `.env` is best practice). You can get this from your Clerk dashboard.

4.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  Open your browser and navigate to `http://localhost:8080` (as configured in `vite.config.ts`).

## Project Structure

```
sadiquehasan03-algoviz/
├── lessons/
│   └── data/             # Markdown content for lessons (.md files)
├── public/               # Static assets (e.g., robots.txt)
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   └── visualizers/  # Algorithm visualization components & logic
│   │       ├── algorithms/ # Sorting algorithm implementations
│   │       ├── types/      # TS types for visualizers
│   │       └── utils/      # Utilities for visualizers (e.g., array generation)
│   ├── data/             # Static data arrays (lessons.ts, quizzes.ts)
│   ├── hooks/            # Custom React hooks (use-mobile, use-toast)
│   ├── lib/              # Shared utility functions (cn)
│   ├── pages/            # Page components for different routes
│   ├── types/            # Global TypeScript type definitions (quiz.ts)
│   ├── utils/            # Application-level utilities (quizProgress, simulateBackend)
│   ├── App.css           # Additional global styles for App
│   ├── App.tsx           # Main application component with routing setup
│   ├── index.css         # Tailwind directives and base styles
│   └── main.tsx          # Application entry point, Clerk setup
├── .env                  # Environment variables (needs to be created)
├── .eslintrc.cjs         # ESLint configuration
├── index.html            # HTML entry point
├── package.json          # Project dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript root configuration
├── tsconfig.app.json     # TypeScript configuration for the app
├── tsconfig.node.json    # TypeScript configuration for Node scripts (like vite.config)
└── vite.config.ts        # Vite configuration
```

## Available Scripts

-   `npm run dev`: Start the development server on `http://localhost:8080`.
-   `npm run build`: Build the application for production.
-   `npm run lint`: Run ESLint to check for code quality issues.
-   `npm run preview`: Preview the production build locally.

## Key Functionality Areas

-   **Lessons:** Content is stored in `lessons/data/*.md` and structured in `src/data/lessons.ts`. Rendered using `ReactMarkdown` on the `LessonDetails` page.
-   **Visualizers:** Sorting visualizations are implemented in `src/components/visualizers/`. The core logic resides in `SortingVisualizer.tsx` and the corresponding algorithm files.
-   **Quizzes:** Quiz data is defined in `src/data/quizzes.ts`. The `QuizDetails` page handles quiz logic, and progress is managed via `src/utils/quizProgress.ts` (using localStorage and simulating backend calls).
-   **Authentication:** Handled by Clerk, configured in `src/main.tsx` and utilized across protected routes in `src/App.tsx`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/your-amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/your-amazing-feature`).
5.  Open a Pull Request.

## License

This project is likely under the MIT License (confirm by adding a `LICENSE` file).

## Acknowledgments

-   Inspired by various algorithm visualization tools online.
-   Built with the help of amazing open-source libraries like React, Vite, Tailwind CSS, shadcn/ui, Clerk, and others.
