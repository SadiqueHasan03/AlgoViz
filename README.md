# Algo-Visual Academy

## Interactive Algorithm Learning Platform

Algo-Visual Academy is an interactive learning platform designed to help users master algorithms and data structures through visual learning, practical coding, and interactive challenges.

![Algo-Visual Academy](public/placeholder.svg)

## Features

- **Interactive Visualizations**: Watch algorithms in action with step-by-step animations that illustrate key concepts
- **Comprehensive Lessons**: Learn theory and practice through our structured curriculum covering essential topics
- **Code Playground**: Write and test your algorithm implementations in an integrated code editor
- **Algorithm Challenges**: Test your skills with progressively difficult challenges and coding exercises
- **Search & Sort Algorithms**: Master essential techniques from binary search to quicksort with visual aids
- **Progress Tracking**: Monitor your learning journey with detailed analytics and completion badges

## Technology Stack

This project is built with modern web technologies:

- **Vite**: Fast build tool and development server
- **React**: Frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **React Router**: For client-side routing
- **React Query**: For efficient data fetching and state management
- **React Markdown**: For rendering lesson content

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/algo-visual-academy.git
   cd algo-visual-academy
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # shadcn/ui components
│   │   └── visualizers/ # Algorithm visualization components
│   ├── data/            # Static data (lessons, quizzes)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   └── types/           # TypeScript type definitions
├── lessons/             # Markdown content for lessons
└── ...                  # Configuration files
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All the amazing open-source libraries that made this project possible
- The algorithm visualization community for inspiration