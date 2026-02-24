export const availableSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "Java",
  "HTML/CSS",
  "Vue.js",
  "Angular",
  "MongoDB",
  "SQL",
  "GraphQL",
];

export const difficultyLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

export const questionTypes = [
  "multiple-choice",
  "short-answer",
  "coding",
  "essay",
];

export const assessments = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description:
      "Basic JavaScript concepts including variables, functions, and control flow",
    status: "active",
    createdAt: "2 days ago",
    skills: ["JavaScript"],
    difficulty: "Beginner",
    questionTypes: ["multiple-choice", "short-answer"],
    questions: 5,
    duration: 30,
    candidates: 45,
    avgScore: 78,
    rating: 4.5,
    bookmarked: true,
  },
  {
    id: 2,
    title: "React Advanced Patterns",
    description:
      "Advanced React concepts including hooks, context, and performance optimization",
    status: "active",
    createdAt: "5 days ago",
    skills: ["React"],
    difficulty: "Advanced",
    questionTypes: ["multiple-choice", "coding"],
    questions: 8,
    duration: 60,
    candidates: 23,
    avgScore: 72,
    rating: 4.8,
    bookmarked: false,
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    description: "Server-side JavaScript with Express and database integration",
    status: "draft",
    createdAt: "1 week ago",
    skills: ["Node.js"],
    difficulty: "Intermediate",
    questionTypes: ["short-answer", "coding"],
    questions: 6,
    duration: 45,
    candidates: 12,
    avgScore: 81,
    rating: 4.2,
    bookmarked: true,
  },
  {
    id: 4,
    title: "Full Stack Development",
    description: "Complete web application development with React and Node.js",
    status: "active",
    createdAt: "3 days ago",
    skills: ["JavaScript", "React", "Node.js"],
    difficulty: "Expert",
    questionTypes: ["multiple-choice", "short-answer", "coding"],
    questions: 10,
    duration: 90,
    candidates: 8,
    avgScore: 68,
    rating: 4.0,
    bookmarked: false,
  },
  {
    id: 5,
    title: "TypeScript Mastery",
    description: "Type-safe JavaScript with advanced TypeScript features",
    status: "archived",
    createdAt: "2 weeks ago",
    skills: ["TypeScript"],
    difficulty: "Advanced",
    questionTypes: ["multiple-choice", "short-answer"],
    questions: 7,
    duration: 50,
    candidates: 31,
    avgScore: 85,
    rating: 4.9,
    bookmarked: false,
  },
];

// Generated questions data from the API
export const generatedQuestions = [
  {
    id: 1,
    skill: "JavaScript",
    type: "multiple-choice",
    question:
      "As of the 2026 ECMAScript standards, which method is the recommended way to handle date-time operations to avoid the legacy pitfalls of the Date object?",
    options: [
      "Temporal.now.zonedDateTimeISO()",
      "Intl.DateTimeFormat.now()",
      "Date.toPreciseISO()",
      "Moment.current()",
    ],
    correctAnswer: "Temporal.now.zonedDateTimeISO()",
    difficulty: "medium",
    explanation:
      "The Temporal API, standardized in recent years, provides a modern, immutable, and time-zone aware replacement for the legacy Date object.",
    source: "Gemini AI",
    year: "2026",
  },
  {
    id: 2,
    skill: "React",
    type: "multiple-choice",
    question:
      "With the React Compiler (React Forget) being a standard part of the build pipeline in 2026, what is the primary impact on component development?",
    options: [
      "Developers must manually wrap all components in React.memo()",
      "Manual memoization hooks like useMemo and useCallback are largely unnecessary",
      "The Virtual DOM is replaced by a direct-to-DOM compilation step",
      "State must be managed exclusively through external signals",
    ],
    correctAnswer:
      "Manual memoization hooks like useMemo and useCallback are largely unnecessary",
    difficulty: "medium",
    explanation:
      "The React Compiler automatically optimizes re-renders by memoizing values and functions at build time, reducing the need for manual optimization hooks.",
    source: "Gemini AI",
    year: "2026",
  },
  {
    id: 3,
    skill: "Node.js",
    type: "short-answer",
    question:
      "In Node.js versions released around 2026, which command-line flag is used to enable the built-in Permission Model to restrict file system read access to a specific directory?",
    options: [],
    correctAnswer: "--allow-fs-read",
    difficulty: "medium",
    explanation:
      "Node.js introduced a native Permission Model (experimental in v20) that uses flags like --allow-fs-read and --allow-net to enhance security.",
    source: "Gemini AI",
    year: "2026",
  },
  {
    id: 4,
    skill: "React",
    type: "short-answer",
    question:
      "What is the name of the React hook used to read the value of a resource, such as a Promise or Context, directly within the render phase while supporting Suspense?",
    options: [],
    correctAnswer: "use",
    difficulty: "medium",
    explanation:
      "The 'use' hook allows developers to consume resources like Promises or Context conditionally and within the render cycle, integrating seamlessly with Suspense.",
    source: "Gemini AI",
    year: "2026",
  },
  {
    id: 5,
    skill: "JavaScript",
    type: "multiple-choice",
    question:
      "In the context of the 2026 ECMAScript proposal for Pattern Matching, which keyword is typically used to handle the default case in a match expression?",
    options: ["default", "else", "when", "_"],
    correctAnswer: "when",
    difficulty: "medium",
    explanation:
      "Pattern matching syntax (proposal) uses 'match' expressions where 'when' clauses define patterns, and 'when' without a specific condition (or a wildcard) acts as the catch-all.",
    source: "Gemini AI",
    year: "2026",
  },
];
