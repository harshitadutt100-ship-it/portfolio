/**
 * Anti-Gravity Portfolio Configuration
 * Easily customize your details, links, projects, and content here.
 */

const PORTFOLIO_CONFIG = {
  profile: {
    name: "Harshita Dutt",
    headline: "BUILDING WHAT COMES NEXT.",
    roles: "Engineer. Creator. Explorer. Designing ideas that push beyond the limits of today.",
    tagline: "ANTI-GRAVITY RESEARCH & ADVANCED ENGINEERING // 2026",
    email: "harshitadutt100@gmail.com",
    github: "harshitadutt100-ship-it",
    linkedin: "https://linkedin.com/in/harshitadutt",
    twitter: "https://x.com",
    status: "MISSION: ACTIVE // ORBIT STABLE",
    avatarUrl: "https://avatars.githubusercontent.com/u/275903745?v=4",
  },

  about: {
    leadStatement: "“I’m interested in turning ambitious ideas into things people can actually experience.”",
    description: [
      "I operate at the intersection of intelligent computing, high-performance systems, and boundary-pushing design. My mission is to engineer software and digital architectures that feel almost physically impossible—fluid, weightless, and intuitively powerful.",
      "From scalable data platforms and algorithmic solutions to exploratory interfaces inspired by aerospace and spatial computing, I build technology with relentless precision and futuristic optimism."
    ],
    telemetry: [
      { label: "GRAVITATIONAL ANOMALY", value: "-0.04 G", status: "NOMINAL" },
      { label: "ACTIVE CORES", value: "64 THREADS", status: "ONLINE" },
      { label: "GITHUB REPOSITORIES", value: "SYNCED LIVE", status: "VERIFIED" },
      { label: "HORIZON PROJECTION", value: "2026+", status: "EXPANDING" }
    ]
  },

  flagshipProjects: [
    {
      id: "01",
      name: "PROJECT NOVA",
      tagline: "Intelligent Systems & Future Interfaces",
      description: "An experimental deep-tech platform exploring autonomous multi-agent cognition, neural synthesis, and weightless human-machine interfaces.",
      technologies: ["Artificial Intelligence", "Neural Networks", "WebGL", "TypeScript", "Python"],
      year: "2026",
      badge: "CLASSIFIED R&D",
      demoUrl: "#",
      repoUrl: "https://github.com/harshitadutt100-ship-it",
      accent: "#00f0ff"
    },
    {
      id: "02",
      name: "ORBIT",
      tagline: "Seamless Human-Computer Interaction",
      description: "A spatial computing operating environment designed for zero-latency fluid interactions across distributed edge nodes and holographic displays.",
      technologies: ["Spatial Computing", "WebXR", "Three.js", "Edge Compute", "Rust"],
      year: "2025",
      badge: "SYSTEM FLAGSHIP",
      demoUrl: "#",
      repoUrl: "https://github.com/harshitadutt100-ship-it",
      accent: "#7000ff"
    },
    {
      id: "03",
      name: "ZERO-G",
      tagline: "Anti-Gravity Physics & Computational Modeling",
      description: "Interactive aerodynamic and anti-gravity physics simulator modeling real-time tensor fields, particle propulsion, and non-Newtonian dynamics.",
      technologies: ["Physics Engine", "GPU Compute", "Canvas 2D/WebGL", "Mathematical Modeling"],
      year: "2025",
      badge: "RESEARCH EXP.",
      demoUrl: "#",
      repoUrl: "https://github.com/harshitadutt100-ship-it",
      accent: "#00ff88"
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Faculty of Engineering & Technology",
      period: "2022 — 2026",
      details: "Specialization in Artificial Intelligence, Distributed Systems, Advanced Database Architectures, and Autonomous Algorithms. Active researcher in computational physics and machine learning.",
      highlights: ["Dean's List / High Academic Standing", "Lead Architect — Autonomous Engineering Lab", "Capstone on Scalable Neural Systems"]
    },
    {
      degree: "Advanced Computing & Artificial Intelligence Specialization",
      institution: "Global AI & Systems Research Institute",
      period: "2024",
      details: "Intensive focus on Deep Neural Architectures, Vector Embeddings, Real-time Graph Databases, and High-Throughput Cloud Microservices.",
      highlights: ["Published experimental benchmark on distributed data streaming", "Awarded Innovation in Interface Design"]
    }
  ],

  capabilities: [
    { name: "Artificial Intelligence", category: "Core Intelligence", level: "Expert" },
    { name: "Neural Networks & LLMs", category: "Core Intelligence", level: "Advanced" },
    { name: "Software Development", category: "Engineering", level: "Expert" },
    { name: "Distributed Systems", category: "Engineering", level: "Advanced" },
    { name: "Database Architecture & SQL", category: "Data Systems", level: "Expert" },
    { name: "Python & Machine Learning", category: "Core Intelligence", level: "Expert" },
    { name: "Product & Systems Design", category: "Architecture", level: "Advanced" },
    { name: "3D & Creative Technology", category: "Experience", level: "Specialist" },
    { name: "UI/UX & Spatial Interfaces", category: "Experience", level: "Expert" },
    { name: "Scientific Research", category: "Investigation", level: "Advanced" },
    { name: "Problem Solving", category: "Foundational", level: "Native" },
    { name: "Cloud Infrastructure", category: "Engineering", level: "Proficient" }
  ],

  philosophy: {
    statement: "“THE FUTURE IS NOT SOMETHING WE WAIT FOR.\nIT IS SOMETHING WE BUILD.”",
    subtext: "Engineering at the event horizon of human ingenuity."
  },

  meta: {
    title: "Harshita Dutt | Anti-Gravity Portfolio & Future Systems",
    description: "Personal portfolio of Harshita Dutt — Engineer, Creator, Explorer. Minimalist, heroic, futuristic portfolio inspired by anti-gravity and AI.",
    copyrightYear: 2026
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_CONFIG;
}
