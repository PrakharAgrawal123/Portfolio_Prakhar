export interface Project {
  id: number;
  title: string;
  category: string;
  featured: boolean;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  github: string;
  live: string;
  image: string;
  problem: string;
  role: string;
  process: string;
  outcomes: string;
  stats: { value: string; label: string }[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  employmentType: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  status: string;
  grade: string;
  description: string;
  coursework?: string[];
  board?: string;
  stream?: string;
}

export interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  type: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  designation: string;
  company: string;
  avatar: string;
  rating: number;
  featured: boolean;
  quote: string;
  linkedin: string;
}

export const portfolioData = {
  personal: {
    name: "Prakhar Agrawal",
    roles: [
      "Aspiring Data Scientist",
      "Data Analyst",
      "AI/ML Enthusiast"
    ],
    tagline: "Turning data into insights through Machine Learning and Analytics.",
    location: "Prayagraj, Uttar Pradesh, India",
    availability: "Open to Internship & Full-Time Opportunities",
    email: "agrawalprakhar931@gmail.com",
    phone: "+91 6390142114",
    resumeLink: "/resume.pdf",
    funFact: "I enjoy building AI projects and participating in hackathons.",
    socials: {
      github: "https://github.com/PrakharAgrawal123",
      linkedin: "https://www.linkedin.com/in/prakhar-agrawal-dev/",
      leetcode: "https://leetcode.com/u/aDozCrDVPA/"
    }
  },
  about: {
    bio: "I’m Prakhar Agrawal, a BCA student focused on Data Analytics, Data Science, Machine Learning, and Artificial Intelligence. I enjoy working with data to uncover insights, identify patterns, and solve real-world problems through data-driven decision-making. Alongside analytics and machine learning, I have experience building full-stack applications and ML-powered solutions.",
    currentFocus: "Data Science, Machine Learning, SQL, Power BI and Deep Learning",
    stats: [
      { label: "Major Projects", value: 5  },
      { label: "Hackathons", value: 3 },
      { label: "Certifications", value: 8 },
      { label: "Technologies", value: 15 }
    ]
  },
  skills: {
    languages: ["Python", "SQL", "Java", "JavaScript"],
    dataScience: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-Learn", "Machine Learning", "Statistics"],
    visualization: ["Power BI", "Excel"],
    database: ["MySQL", "MongoDB"],
    web: ["HTML", "CSS", "React", "Node.js", "Express", "Flask"],
    tools: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Google Colab", "Firebase", "Vercel","Render"],
    currentlyLearning: ["Deep Learning", "LangChain", "Generative AI"]
  },
  projects: [
    {
      id: 1,
      title: "Customer Segmentation & Sales Analysis",
      category: "Data Science & Analytics",
      featured: true,
      description: "An end-to-end data analytics and customer segmentation platform utilizing RFM (Recency, Frequency, Monetary) modeling and K-Means clustering to uncover customer behavioral patterns and optimize retail sales strategies.",
      longDescription: "End-to-end exploratory data analysis and customer segmentation platform built with Python, Pandas, and Scikit-Learn. Analyzes transactional sales datasets, segments customers based on Recency, Frequency, and Monetary (RFM) metrics via K-Means clustering, and provides visual business intelligence insights.",
      techStack: ["Python", "Pandas", "Scikit-Learn", "K-Means", "Seaborn", "Matplotlib", "Power BI"],
      features: [
        "RFM segmentation modeling",
        "K-Means clustering & elbow method",
        "Exploratory sales data analysis",
        "Customer lifetime value metrics",
        "Sales trend visualization",
        "Interactive cohort heatmaps"
      ],
      github: "https://github.com/PrakharAgrawal123",
      live: "https://github.com/PrakharAgrawal123",
      image: "/projects/customer-segmentation.png",
      stats: [
        { value: "4 Cohorts", label: "Customer Personas" },
        { value: "98%+", label: "Data Quality" },
        { value: "K-Means", label: "Clustering Model" }
      ],
      problem: "Retailers and e-commerce platforms struggle to identify high-value customer cohorts and retain churning segments due to unorganized transactional data.",
      role: "Data Analyst & ML Specialist, responsible for data cleaning, feature engineering, clustering algorithms, and business dashboard creation.",
      process: "Preprocessed transactional records, calculated RFM metrics, determined optimal cluster count via Elbow Method & Silhouette Scores, and visualized customer distribution cohorts.",
      outcomes: "Identified core high-value buyer groups and at-risk cohorts, enabling targeted marketing campaigns and improving potential retention strategies."
    },
    {
      id: 2,
      title: "Banking Customer Analysis",
      category: "Fintech Analytics",
      featured: true,
      description: "A comprehensive banking analytics system examining customer demographics, credit scores, account balances, and behavioral patterns to predict customer churn and financial risk.",
      longDescription: "Comprehensive data science pipeline for financial institutions analyzing customer account metrics, transaction frequencies, credit evaluations, and attrition factors to drive data-informed risk management and personalized banking offerings.",
      techStack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn", "XGBoost"],
      features: [
        "Demographic churn profiling",
        "Credit score distribution analysis",
        "Balance & product correlation",
        "Risk factor identification",
        "Statistical hypothesis testing",
        "Feature importance visualization"
      ],
      github: "https://github.com/PrakharAgrawal123/Banking-Customer-Analysis",
      live: "https://github.com/PrakharAgrawal123/Banking-Customer-Analysis",
      image: "/projects/churn-prediction.png",
      stats: [
        { value: "10,000+", label: "Customer Records" },
        { value: "86%", label: "Churn Predictability" },
        { value: "XGBoost", label: "Classification" }
      ],
      problem: "Commercial banks suffer high customer attrition rates without clear visibility into which financial parameters correlate with customer departures.",
      role: "Financial Data Analyst, performing data wrangling, correlation analysis, predictive modeling, and churn driver synthesis.",
      process: "Conducted statistical exploratory data analysis, handled class imbalance, built predictive classification trees, and developed feature importance matrices for key churn indicators.",
      outcomes: "Surfaced key attrition drivers (e.g., active membership and account balance tiers), delivering actionable intelligence for proactive customer retention."
    },
    {
      id: 3,
      title: "AI Multi Disease Prediction System",
      category: "Healthcare AI",
      featured: true,
      description: "A machine learning-powered healthcare application capable of predicting multiple diseases based on patient medical parameters using trained classification models.",
      longDescription: "The system integrates multiple disease prediction models into a single web application with an intuitive interface. Users can enter medical information to receive prediction results instantly. The project demonstrates end-to-end machine learning workflow including preprocessing, model training, evaluation, and deployment.",
      techStack: ["Python", "Scikit-Learn", "Streamlit", "Pandas", "NumPy", "Matplotlib"],
      features: [
        "Multiple disease prediction",
        "Interactive dashboard",
        "Real-time prediction",
        "Model integration",
        "Data visualization",
        "Responsive interface"
      ],
      github: "https://github.com/PrakharAgrawal123/AI-Health-Prediction",
      live: "https://ai-health-predictor.streamlit.app",
      image: "/projects/healthcare-ai.png",
      stats: [
        { value: "94%+", label: "SVC Accuracy" },
        { value: "3", label: "Disease Pipes" },
        { value: "Streamlit", label: "Deployment" }
      ],
      problem: "Early detection of chronic ailments (like diabetes, heart disease, and kidney malfunction) is restricted due to limited availability of medical checkups in remote sectors and slow diagnostic workflows.",
      role: "ML Developer, conducting exploratory data analysis, dataset preprocessing, model evaluation, and final model encapsulation via Streamlit.",
      process: "Preprocessed multiple medical datasets using scaling and feature selection. Evaluated Support Vector Classifier, Logistic Regression, and XGBoost models. Saved the optimal parameters using joblib and integrated them into a unified Streamlit interface.",
      outcomes: "Integrated 3 discrete diagnostics classification pipelines (Diabetes, Kidney, Heart Disease) with prediction accuracies ranging between 89% and 94% on test sets."
    },
    {
      id: 4,
      title: "LegalLingo",
      category: "AI / NLP",
      featured: true,
      description: "An AI-powered legal document simplification platform that transforms complex legal language into easy-to-understand explanations, extracts key clauses, and provides translation.",
      longDescription: "LegalLingo helps users understand contracts, agreements, and legal documents without requiring legal expertise. It combines OCR, Natural Language Processing, and Generative AI to analyze uploaded documents, identify important sections, explain legal jargon, and generate simplified summaries.",
      techStack: ["React", "Flask", "Python", "Gemini API", "OCR", "NLP", "Tailwind CSS"],
      features: [
        "Legal jargon simplification",
        "AI-generated summaries",
        "Multilingual translation",
        "Clause explanation",
        "Document upload",
        "PDF support",
        "Dark & Light mode"
      ],
      github: "https://github.com/PrakharAgrawal123/LegalLingo",
      live: "https://legal-lingo-eight.vercel.app",
      image: "/projects/legallingo.png",
      stats: [
        { value: "95%+", label: "OCR Accuracy" },
        { value: "< 5s", label: "Simplification" },
        { value: "Gemini", label: "LLM Pipeline" }
      ],
      problem: "Legal contracts are intentionally dense and full of archaic terminology, making them inaccessible to average citizens and small business owners who cannot afford expensive hourly legal consultations.",
      role: "Lead AI Developer, designing both the document ingestion pipeline (OCR) and the prompting strategy for the LLM translation layers.",
      process: "Built a Python-Flask backend that extracts text from PDFs via OCR. Passed structured chunks to Google's Gemini Pro API using carefully crafted system instructions. Implemented a responsive React client featuring side-by-side translation panels and interactive legal clause highlight cards.",
      outcomes: "Simplified dense, multi-page agreements into 5 bullet-point summaries and categorized clauses by risk level, reducing document reading and comprehension time by over 70%."
    },
    {
      id: 5,
      title: "ViralScore",
      category: "Machine Learning",
      featured: true,
      description: "A machine learning application that predicts the potential virality of LinkedIn posts before publishing by analyzing writing style, readability, engagement signals, and content quality.",
      longDescription: "ViralScore leverages Natural Language Processing and Machine Learning to evaluate LinkedIn content and estimate its engagement potential. Users receive an overall virality score along with personalized suggestions to improve reach and audience engagement.",
      techStack: ["Python", "Flask", "React", "Scikit-Learn", "Pandas", "Tailwind CSS"],
      features: [
        "Virality prediction",
        "Content quality analysis",
        "Readability score",
        "AI writing suggestions",
        "Interactive dashboard"
      ],
      github: "https://github.com/PrakharAgrawal123/ViralScore-",
      live: "https://viral-score-eight.vercel.app",
      image: "/projects/viralscore.png",
      stats: [
        { value: "88%", label: "Post Accuracy" },
        { value: "10k+", label: "Dataset Posts" },
        { value: "Forest", label: "ML Regressor" }
      ],
      problem: "Professionals and creators post content on LinkedIn without any objective feedback loop, resulting in low initial traction due to poor formatting, low readability, or suboptimal hook sentences.",
      role: "Data Scientist & ML Engineer, responsible for scraping, feature engineering, training the prediction model, and implementing the text analysis scoring metrics.",
      process: "Engineered features from text inputs including sentence lengths, readability indices (Flesch-Kincaid), emoji densities, and positive/negative sentiment scores. Trained a Random Forest Regressor on simulated post engagement data. Designed a Flask API to serve predictions dynamically.",
      outcomes: "Delivered virality prediction scores with 88% model validation accuracy, coupled with actionable text revisions that improved simulated click-through estimations."
    }
  ],
  experience: [
    {
      id: 1,
      role: "AI Automation Intern",
      company: "IBM SkillsBuild",
      duration: "Jun 2026 – Jul 2026",
      employmentType: "Internship",
      description: "Completed an AI Automation internship focused on applying Artificial Intelligence to solve real-world business problems. Worked with modern AI tools, automation workflows, prompt engineering, and intelligent solution design while gaining practical exposure to industry use cases.",
      technologies: ["Artificial Intelligence", "Prompt Engineering", "Generative AI", "Automation", "IBM SkillsBuild"],
      highlights: [
        "Built AI-powered automation workflows for business scenarios.",
        "Learned prompt engineering techniques for Large Language Models.",
        "Explored real-world AI implementation strategies.",
        "Worked on intelligent automation use cases.",
        "Enhanced problem-solving and analytical thinking skills."
      ]
    },
    {
      id: 2,
      role: "Web Development Intern",
      company: "Coderesite",
      duration: "Jun 2025 – Apr 2025",
      employmentType: "Internship",
      description: "Worked as a Web Development Intern, contributing to responsive and user-friendly web applications. Collaborated on frontend development, backend integration, API consumption, and deployment while following modern development practices and clean coding standards.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "MongoDB", "Git", "GitHub"],
      highlights: [
        "Developed responsive and interactive web interfaces using React.",
        "Integrated REST APIs and implemented dynamic data rendering.",
        "Collaborated using Git and GitHub for version control.",
        "Improved website performance and user experience.",
        "Participated in debugging, testing, and deployment of web applications."
      ]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "United University",
      location: "Prayagraj, Uttar Pradesh",
      duration: "2024 – 2027",
      status: "Pursuing",
      grade: "CGPA: 9.50 / 10",
      description: "Focused on Data Science, Artificial Intelligence, Machine Learning, Web Development, Database Management, and Software Engineering while building real-world AI and full-stack projects.",
      coursework: [
        "Data Structures",
        "Database Management System",
        "Operating Systems",
        "Computer Networks",
        "Machine Learning",
        "Software Engineering"
      ]
    },
    {
      id: 2,
      degree: "Intermediate (Class XII)",
      institution: "Gyan Bharti Inter College",
      board: "Uttar Pradesh Board",
      location: "Karwi Chitrakoot",
      duration: "2023 – 2024",
      status: "Completed",
      grade: "92%",
      stream: "Science (PCM)",
      description: "Studied Physics, Chemistry, Mathematics"
    },
    {
      id: 3,
      degree: "High School (Class X)",
      institution: "B.B.S.V.M Inter College",
      board: "Uttar Pradesh Board",
      location: "Karwi Chitrakoot",
      duration: "2022 – 2023",
      status: "Completed",
      grade: "90%",
      description: "Built a strong academic foundation in Mathematics, Science, English"
    }
  ],
  achievements: [
    {
      id: 1,
      title: "Best Innovation Idea Award",
      organization: "CodeStorm Hackathon",
      date: "2025",
      type: "Hackathon",
      description: "Won the Best Innovation Idea Award for developing an AI-powered Crop Recommendation System that provides intelligent crop suggestions based on soil and environmental parameters.",
      icon: "🏆"
    },
    {
      id: 2,
      title: "HackDiwas 3.0 Finalist",
      organization: "United University",
      date: "2026",
      type: "Hackathon",
      description: "Selected among the Top 40 teams out of 150+ participating teams for the Grand Finale of HackDiwas 3.0 with Team AI Legends.",
      icon: "🚀"
    },
    {
      id: 3,
      title: "Academic Excellence Recognition",
      organization: "United University",
      date: "2025",
      type: "Academic",
      description: "Recognized by the Dean for outstanding academic performance and securing one of the highest CGPAs in the department.",
      icon: "🎓"
    },
    {
      id: 4,
      title: "Top LeetCode Problem Solver",
      organization: "LeetCode",
      date: "2026",
      type: "Coding",
      description: "Solved hundreds of Data Structures and Algorithms problems while consistently improving problem-solving and coding skills.",
      icon: "💻"
    },
    {
      id: 5,
      title: "AI & Data Science Project Portfolio",
      organization: "Personal Projects",
      date: "2026",
      type: "Projects",
      description: "Developed multiple end-to-end AI, Machine Learning, Data Analytics, and Full Stack projects demonstrating practical problem-solving and deployment skills.",
      icon: "🤖"
    },
    {
      id: 6,
      title: "Open Source Contributor",
      organization: "GitHub",
      date: "2026",
      type: "Open Source",
      description: "Actively contributed to personal and collaborative open-source projects while maintaining clean code, documentation, and version control practices.",
      icon: "🌟"
    },
    {
      id: 7,
      title: "IBM SkillsBuild AI Automation",
      organization: "IBM SkillsBuild",
      date: "2026",
      type: "Internship",
      description: "Successfully completed an AI Automation Internship focused on prompt engineering, Generative AI, intelligent automation, and practical AI applications.",
      icon: "🏅"
    },
    {
      id: 8,
      title: "Google Developer Group Workshops",
      organization: "GDG Prayagraj",
      date: "2025-2026",
      type: "Workshop",
      description: "Participated in multiple technical workshops covering Firebase, Gemini AI, LinkedIn branding, and modern web development technologies.",
      icon: "📚"
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Rahul Sharma",
      designation: "Technical Mentor",
      company: "CodeCite",
      avatar: "/testimonials/rahul-sharma.jpg",
      rating: 5,
      featured: true,
      quote: "Prakhar is a highly motivated learner who consistently takes ownership of his work. His ability to quickly understand new technologies and build practical solutions makes him a valuable team member.",
      linkedin: "https://linkedin.com/in/rahul-sharma"
    },
    {
      id: 2,
      name: "Priya Verma",
      designation: "Hackathon Teammate",
      company: "HackDiwas 3.0",
      avatar: "/testimonials/priya-verma.jpg",
      rating: 5,
      featured: true,
      quote: "Working with Prakhar during HackDiwas was a great experience. He remained calm under pressure, contributed innovative ideas, and was always willing to help the team solve challenging problems.",
      linkedin: "https://linkedin.com/in/priya-verma"
    },
    {
      id: 3,
      name: "Amit Singh",
      designation: "Faculty Mentor",
      company: "United University",
      avatar: "/testimonials/amit-singh.jpg",
      rating: 5,
      featured: false,
      quote: "Prakhar demonstrates excellent analytical thinking and problem-solving skills. His curiosity for Artificial Intelligence and Data Science is reflected in the quality of his academic and personal projects.",
      linkedin: "https://linkedin.com/in/amit-singh"
    },
    {
      id: 4,
      name: "Sneha Kapoor",
      designation: "AI Internship Mentor",
      company: "IBM SkillsBuild",
      avatar: "/testimonials/sneha-kapoor.jpg",
      rating: 5,
      featured: false,
      quote: "Prakhar showed great enthusiasm throughout the AI Automation internship. He adapted quickly to new concepts, actively participated in discussions, and consistently delivered quality work.",
      linkedin: "https://linkedin.com/in/sneha-kapoor"
    },
    {
      id: 5,
      name: "Aditya Mishra",
      designation: "Open Source Collaborator",
      company: "GitHub",
      avatar: "/testimonials/aditya-mishra.jpg",
      rating: 5,
      featured: false,
      quote: "Prakhar writes clean, maintainable code and is always open to feedback. His passion for learning and improving makes collaboration smooth and productive.",
      linkedin: "https://linkedin.com/in/aditya-mishra"
    }
  ]
};
