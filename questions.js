/**
 * Question Bank with Exactly 5 Questions per Category & Difficulty
 */
const QUESTION_BANK = {
  webdev: {
    title: "Web Development",
    icon: "fa-code",
    easy: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Text Machine Language",
          "Hyper Tool Markup Language",
          "Home Tool Markup Language",
        ],
        answer: 0,
        explanation:
          "HTML stands for Hyper Text Markup Language. It is the standard markup language for web pages.",
      },
      {
        question: "Which CSS property is used to change the background color?",
        options: ["color", "background-color", "bgColor", "canvas-color"],
        answer: 1,
        explanation:
          "The 'background-color' property sets the background color of an element.",
      },
      {
        question: "Which HTML tag is used to embed JavaScript?",
        options: ["<css>", "<js>", "<script>", "<javascript>"],
        answer: 2,
        explanation:
          "The <script> tag is used to embed client-side JavaScript code.",
      },
      {
        question: "How do you select an element with id 'main' in CSS?",
        options: [".main", "#main", "*main", "main"],
        answer: 1,
        explanation: "In CSS, '#' is used to target elements by their ID.",
      },
      {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        answer: 0,
        explanation: "The <a> (anchor) tag defines a hyperlink in HTML.",
      },
    ],
    medium: [
      {
        question:
          "Which array method creates a new array by executing a function on every element?",
        options: ["forEach()", "filter()", "map()", "reduce()"],
        answer: 2,
        explanation:
          "The map() method creates a new array with the results of calling a provided function on every element.",
      },
      {
        question:
          "In CSS Flexbox, which property aligns items along the main axis?",
        options: [
          "align-items",
          "justify-content",
          "align-content",
          "flex-direction",
        ],
        answer: 1,
        explanation:
          "justify-content aligns items along the main axis of a flex container.",
      },
      {
        question:
          "Which JS keyword declares a block-scoped variable that can be reassigned?",
        options: ["var", "const", "let", "static"],
        answer: 2,
        explanation:
          "let declares a block-scoped local variable that can optionally be reassigned.",
      },
      {
        question: "What does CSS stand for?",
        options: [
          "Creative Style Sheets",
          "Cascading Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets",
        ],
        answer: 1,
        explanation: "CSS stands for Cascading Style Sheets.",
      },
      {
        question: "Which HTTP status code means 'Not Found'?",
        options: ["200", "401", "404", "500"],
        answer: 2,
        explanation:
          "HTTP status code 404 indicates that the server cannot find the requested resource.",
      },
    ],
    hard: [
      {
        question:
          "What is the primary difference between Event Bubbling and Capturing?",
        options: [
          "Bubbling goes top-down; Capturing goes bottom-up.",
          "Bubbling goes bottom-up (target to root); Capturing goes top-down (root to target).",
          "Bubbling only works on input fields.",
          "Bubbling prevents default browser behavior automatically.",
        ],
        answer: 1,
        explanation:
          "Bubbling propagates upwards from the target element, whereas capturing propagates downwards from the root.",
      },
      {
        question: "What is a Closure in JavaScript?",
        options: [
          "A method to close browser tabs.",
          "A function bundled with references to its surrounding state (lexical environment).",
          "A way to prevent memory leaks.",
          "An alternative to promises.",
        ],
        answer: 1,
        explanation:
          "A closure gives a function access to its outer scope even after the outer function has returned.",
      },
      {
        question:
          "Which CSS property is used for GPU-accelerated smooth animations?",
        options: ["margin-left", "transform", "left", "width"],
        answer: 1,
        explanation:
          "Properties like 'transform' and 'opacity' trigger composite layers handled directly by the GPU.",
      },
      {
        question: "What does the 'defer' attribute on a <script> tag do?",
        options: [
          "Executes the script immediately.",
          "Executes the script after the document has been parsed.",
          "Stops HTML parsing completely.",
          "Loads script asynchronously without order guarantee.",
        ],
        answer: 1,
        explanation:
          "The 'defer' attribute delays script execution until after the HTML document has been fully parsed.",
      },
      {
        question:
          "Which JS feature provides native asynchronous control flow syntax?",
        options: ["Callbacks", "async/await", "Generators", "Executors"],
        answer: 1,
        explanation:
          "async/await acts as syntactic sugar over Promises for cleaner asynchronous code.",
      },
    ],
  },
  tech: {
    title: "Tech Trivia",
    icon: "fa-microchip",
    easy: [
      {
        question: "Who is the primary creator of Python?",
        options: [
          "Bill Gates",
          "Guido van Rossum",
          "Steve Jobs",
          "Mark Zuckerberg",
        ],
        answer: 1,
        explanation: "Guido van Rossum created Python and released it in 1991.",
      },
      {
        question: "What does 'CPU' stand for?",
        options: [
          "Central Processing Unit",
          "Computer Power Unit",
          "Central Process Program",
          "Core Control Unit",
        ],
        answer: 0,
        explanation: "CPU stands for Central Processing Unit.",
      },
      {
        question: "What does RAM stand for?",
        options: [
          "Read Access Memory",
          "Random Access Memory",
          "Run Allied Memory",
          "Real Action Mode",
        ],
        answer: 1,
        explanation: "RAM stands for Random Access Memory.",
      },
      {
        question:
          "Which device is primarily used to connect local networks to the Internet?",
        options: ["Monitor", "Router", "GPU", "Keyboard"],
        answer: 1,
        explanation:
          "A router routes data packets across network connections to access the internet.",
      },
      {
        question:
          "Which operating system is developed by Apple for laptops and desktops?",
        options: ["Windows", "macOS", "Linux", "Android"],
        answer: 1,
        explanation: "macOS is Apple's desktop operating system.",
      },
    ],
    medium: [
      {
        question: "What type of database is MongoDB?",
        options: [
          "Relational (SQL)",
          "Document-oriented (NoSQL)",
          "Graph Database",
          "In-memory Key-Value",
        ],
        answer: 1,
        explanation: "MongoDB is a document-oriented NoSQL database.",
      },
      {
        question: "Which company originally developed JavaScript?",
        options: ["Microsoft", "Netscape", "Sun Microsystems", "Oracle"],
        answer: 1,
        explanation: "Brendan Eich created JavaScript at Netscape in 1995.",
      },
      {
        question: "What port number is standard for HTTPS?",
        options: ["80", "8080", "443", "21"],
        answer: 2,
        explanation:
          "Port 443 is the standard port for secure HTTPS web traffic.",
      },
      {
        question: "What does GPU stand for?",
        options: [
          "General Processing Unit",
          "Graphics Processing Unit",
          "Graphical Power Utility",
          "Grid Process Unit",
        ],
        answer: 1,
        explanation: "GPU stands for Graphics Processing Unit.",
      },
      {
        question: "Which version control system was created by Linus Torvalds?",
        options: ["SVN", "Mercurial", "Git", "CVS"],
        answer: 2,
        explanation:
          "Linus Torvalds created Git in 2005 to manage Linux kernel development.",
      },
    ],
    hard: [
      {
        question: "What time complexity does quicksort achieve on average?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        answer: 1,
        explanation:
          "Quicksort has an average-case time complexity of O(n log n).",
      },
      {
        question: "What is the size of an IPv6 address?",
        options: ["32 bits", "64 bits", "128 bits", "256 bits"],
        answer: 2,
        explanation: "IPv6 addresses are 128 bits long.",
      },
      {
        question:
          "Which scheduling algorithm assigns fixed time slots to processes in cycle?",
        options: [
          "FIFO",
          "Round Robin",
          "Shortest Job First",
          "Priority Scheduling",
        ],
        answer: 1,
        explanation:
          "Round Robin allocates equal time slices to each process in turn.",
      },
      {
        question: "In cryptography, what is RSA?",
        options: [
          "Symmetric key algorithm",
          "Asymmetric public-key algorithm",
          "Hashing function",
          "Compression algorithm",
        ],
        answer: 1,
        explanation:
          "RSA is an asymmetric cryptographic algorithm based on factoring large integers.",
      },
      {
        question: "Which memory region handles dynamic allocation in C?",
        options: ["Stack", "Heap", "Text segment", "BSS segment"],
        answer: 1,
        explanation:
          "The heap memory region is used for dynamic memory allocation via malloc/free.",
      },
    ],
  },
  science: {
    title: "Science & Nature",
    icon: "fa-flask",
    easy: [
      {
        question: "What is the chemical symbol for Gold?",
        options: ["Ag", "Au", "Fe", "Gd"],
        answer: 1,
        explanation: "Au comes from the Latin word for gold, 'Aurum'.",
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        answer: 2,
        explanation: "Mars appears red because of iron oxide on its surface.",
      },
      {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Quartz"],
        answer: 2,
        explanation: "Diamond is the hardest known natural material.",
      },
      {
        question: "How many planets are in our solar system?",
        options: ["7", "8", "9", "10"],
        answer: 1,
        explanation: "There are 8 recognized planets in our solar system.",
      },
      {
        question:
          "What gas do plants absorb from the atmosphere for photosynthesis?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: 1,
        explanation:
          "Plants absorb Carbon Dioxide (CO2) during photosynthesis.",
      },
    ],
    medium: [
      {
        question: "What is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
        answer: 1,
        explanation: "Nitrogen makes up roughly 78% of Earth's atmosphere.",
      },
      {
        question: "What is the powerhouse of the cell?",
        options: [
          "Nucleus",
          "Ribosome",
          "Mitochondria",
          "Endoplasmic Reticulum",
        ],
        answer: 2,
        explanation: "Mitochondria produce cellular energy (ATP).",
      },
      {
        question: "What speed does light travel in a vacuum?",
        options: [
          "300,000 km/s",
          "150,000 km/s",
          "1,000,000 km/s",
          "30,000 km/s",
        ],
        answer: 0,
        explanation:
          "Light travels at approximately 300,000 kilometers per second in a vacuum.",
      },
      {
        question: "What pH value represents pure water?",
        options: ["5", "7", "9", "14"],
        answer: 1,
        explanation: "A pH value of 7 is considered neutral.",
      },
      {
        question:
          "Which organ in the human body filters blood to create urine?",
        options: ["Liver", "Kidneys", "Pancreas", "Heart"],
        answer: 1,
        explanation: "The kidneys filter blood to remove waste products.",
      },
    ],
    hard: [
      {
        question: "What particles make up a proton?",
        options: [
          "2 Up, 1 Down Quark",
          "1 Up, 2 Down Quarks",
          "3 Up Quarks",
          "2 Leptons, 1 Quark",
        ],
        answer: 0,
        explanation:
          "A proton consists of 2 Up Quarks (+2/3) and 1 Down Quark (-1/3).",
      },
      {
        question: "What is absolute zero in Celsius?",
        options: ["-100°C", "-273.15°C", "-459.67°C", "0°C"],
        answer: 1,
        explanation: "Absolute zero is -273.15°C (0 Kelvin).",
      },
      {
        question:
          "Which law states that energy cannot be created or destroyed?",
        options: [
          "First Law of Thermodynamics",
          "Second Law of Thermodynamics",
          "Newton's Third Law",
          "Boyle's Law",
        ],
        answer: 0,
        explanation:
          "The First Law of Thermodynamics is the Law of Conservation of Energy.",
      },
      {
        question:
          "What is the heaviest naturally occurring element by atomic mass?",
        options: ["Plutonium", "Uranium", "Lead", "Thorium"],
        answer: 1,
        explanation:
          "Uranium (atomic number 92) is the heaviest naturally occurring element.",
      },
      {
        question: "What is the half-life of Carbon-14 approximately?",
        options: ["1,200 years", "5,730 years", "10,000 years", "50,000 years"],
        answer: 1,
        explanation: "Carbon-14 has a half-life of approximately 5,730 years.",
      },
    ],
  },
};
