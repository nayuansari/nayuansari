// src/components/New_portfolio.tsx
import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion'; // For animations
import { Moon, Sun } from 'lucide-react';

const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const original = (e.currentTarget as HTMLImageElement).dataset?.src || (e.currentTarget as HTMLImageElement).src;
  console.error('Image failed to load:', original);
  // fallback image inside public/images/fallback.png (create it if needed)
  (e.currentTarget as HTMLImageElement).src = `${process.env.PUBLIC_URL}/images/fallback.png`;
};

const New_portfolio = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: light)').matches)) {
      return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true // Allows for transparent background
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create floating geometric elements
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.ConeGeometry(0.6, 1.5, 8),
      new THREE.TorusGeometry(0.8, 0.3, 16, 32)
    ];

    const materials = [
      new THREE.MeshStandardMaterial({ color: 0xff6b6b, metalness: 0.7, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x4ecdc4, metalness: 0.7, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x45b7d1, metalness: 0.7, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x96ceb4, metalness: 0.7, roughness: 0.2 })
    ];

    const meshes: THREE.Mesh[] = [];
    geometries.forEach((geometry, index) => {
      const mesh = new THREE.Mesh(geometry, materials[index]);
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(mesh);
      meshes.push(mesh);
    });

    camera.position.z = 10;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 * (index + 1); // Slower rotation
        mesh.rotation.y += 0.008 * (index + 1); // Slower rotation
        mesh.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.01; // Slower floating
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  // Portfolio content
  const portfolioData = {
    home: {
      title: "Home",
      Name: "Md Nayab Ansari",
      profileImage: `${process.env.PUBLIC_URL}/images/nayab_about.png`,
      hero: {
        subtitle: "Hello, I'm",
        title: "Data & Machine Learning Engineer",
        lines: ['Engineer', 'ML Enthusiast', 'Data Enthusiast'],
      },
      experienceSummary: "As a Machine Learning Intern at Codsoft (Feb-Mar 2024), I developed and deployed machine learning models with 91% accuracy for various applications, including movie genre classification, credit card fraud detection, and customer churn prediction. I achieved an 18% increase in productivity by applying advanced techniques like TF-IDF, word embeddings, and classifiers such as Naive Bayes, SVM, Decision Trees, and Gradient Boosting. My work involved comprehensive data preprocessing and feature engineering, boosting model performance by 20%, and utilizing under-sampling and ensemble methods to mitigate class imbalance issues, leading to a 15% enhancement in model performance. I also gained hands-on experience with techniques and tools to handle class imbalance, preprocess data, and engineer features, significantly improving model accuracy and efficiency.",
      keyInformation: [
        { label: "Profile", value: "Data Science, Analytics, Machine Learning & Software Engineer Enthusiast" },
        { label: "Education", value: "Bachelor of Engineering with Specialization in AI ML" },
        { label: "Programming Language", value: "Python, SQL, Excel, Streamlit" },
        { label: "Frameworks", value: "Pandas, NumPy, PySpark, TensorFlow, Matplotlib, Scikit-Learn" },
        { label: "Tools", value: "Power BI, MySQL, Git, Anaconda Prompt, Latex, MS Office" },
        { label: "Platforms", value: "PyCharm, VS Code, Google Colab, Jupyter Notebook" },
        { label: "Soft Skills", value: "People Management, Excellent Communication, Rapport Building, Creativity" },
        { label: "Language", value: "English, Hindi, Bengali, Nepali" },
        { label: "Interest", value: "Traveling, Photography, Basketball, Management" },
      ],
    },
    about: {
      title: "About",
      content: `I am MD. Nayab Ansari and a passionate AI & Machine Learning professional with a strong background in data science, Machine Learning and software development 2.0. With a B.Tech. in CSE with Specialization in (AI ML) from UEM Jaipur, I specialize in using tools like Python, PY libraries, SQL, and Generative AI to develop innovative solutions. During my time as a Machine Learning Intern, I built predictive models that drove significant business outcomes, and I’m always eager to apply my skills in real-world scenarios. I’ve also worked on impactful academic projects, including predictive healthcare models and employee attrition analysis. I thrive in collaborative environments and enjoy taking on leadership roles, whether as a team leader or problem solver. As a certified IBM Data Scientist, I am dedicated to staying at the forefront of emerging technologies and using them to create data-driven solutions.`,
      skills: {
        title: "Skills",
        items: [
          { name: "ADV EXCEL", level: 90 },
          { name: "SQL", level: 85 },
          { name: "PYTHON", level: 75 },
          { name: "PY LIBRARIES", level: 80 },
          { name: "POWER BI", level: 90 },
          { name: "Analysis", level: 70 },
          { name: "Machine Learning", level: 85 },
        ]
      }
    },

    projects: {
      title: "Projects",
      content: "Below are some of my key projects.",
      items: [
        {
          title: "Digital Music Store Data Analysis using SQL",
          description: "Analyzed music store data using advanced SQL queries to identify gaps and increase business growth.",
          year: "2024",
          link: "https://github.com/nayuansari/nayuansari-SQL_Music_Store_Analysis/blob/main/Music_Store_Query.sql",
          image: `${process.env.PUBLIC_URL}/images/proj_1.jpg`
        },
        {
          title: "NaVa Healthcare System using Python and ML",
          description: "Deployed predictive machine learning models and a personalized medicine recommendation system, improving diagnostic accuracy and patient care.",
          year: "2024",
          link: "https://github.com/nayuansari/NaVa-Healthcare-System/tree/main/Code",
          image: `${process.env.PUBLIC_URL}/images/proj_2.png`
        },
        {
          title: "Employee Attrition Prediction Python and ML",
          description: "Developed a machine learning model with 95% accuracy for forecasting employee details, enhancing model interpretation accuracy by 20% through comprehensive data preprocessing and analysis.",
          year: "2023",
          link: "https://github.com/nayuansari/Employee-Attrition-Prediction/blob/main/Attrition_Prediction_nayab.py",
          image: `${process.env.PUBLIC_URL}/images/proj_3.jpg`
        },
        {
          title: "Desktop-Assistant using Python",
          description: "A Desktop-Assistant where users can call commands listed in the code.",
          year: "2023",
          link: "https://github.com/nayuansari/Desktop-Assistant/tree/main/EDDY",
          image: `${process.env.PUBLIC_URL}/images/proj_4.jpg`
        },
        {
          title: "Chat room using Python",
          description: "A chat room where users cannot use informal language.",
          year: "2023",
          link: "https://github.com/nayuansari/chat-room/tree/main",
          image: `${process.env.PUBLIC_URL}/images/proj_5.png`
        }
      ]
    },

    resume: {
      title: "Resume",
      summary: `I am a Computer Science graduate with a specialization in AI and ML from UEM Jaipur, with hands-on experience in developing and deploying machine learning models that achieve high accuracy and efficiency. My internship at Codsoft honed my skills in data preprocessing and feature engineering, resulting in significant performance improvements. I have led diverse projects, including predictive healthcare systems and business growth analysis through data insights. Proficient in Python, SQL, and various ML frameworks, I bring a blend of technical expertise and strong communication skills to drive impactful results.`,
      experience: [
        {
          title: "MACHINE LEARNING INTERN",
          company: "CODSOFT",
          date: "February 24 - March 24",
          description: [
            "Created and deployed machine learning models with 91% accuracy for various applications, including movie genre classification, credit card fraud detection, and customer churn prediction.",
            "Achieved an 18% increase in productivity by applying advanced techniques like TF-IDF, word embeddings, and classifiers such as Naive Bayes, SVM, Decision Trees, and Gradient Boosting.",
            "Conducted comprehensive data preprocessing and feature engineering, resulting in a 20% boost in model performance and overall efficiency.",
            "Utilized under-sampling and ensemble methods to mitigate class imbalance issues, leading to a 15% enhancement in model performance.",
            "Gained hands-on experience with techniques and tools to handle class imbalance, preprocess data, and engineer features, significantly improving model accuracy and efficiency."
          ]
        }
      ],
      education: [
        {
          degree: "B.Tech. - Computer Science and Engineering, Specialization in AIML",
          institution: "University of Engineering and Management (UEM)",
          date: "JULY 2020 - JUNE 2024",
          grade: "First class distinction."
        },
        {
          degree: "Higher Secondary School",
          institution: "CAESAR SCHOOL (CBSE)",
          date: "2019 - 2020",
          grade: "First class distinction."
        }
      ],
      downloadLink: "https://drive.google.com/file/d/1pQO5xd5XBIoO_xSlbrEaSPDSNdqCoM69/view?usp=drive_link"
    },
    
    contact: {
      title: "Contact",
      content: "Let's create something amazing together! Feel free to reach out.",
      details: {
        email: "nayuansari12@gmail.com",
        phone: "8918025573",
        address: "Siliguri, West Bengal, India",
      },
      socialLinks: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/md-nayab-ansari-39b851246/" },
        { name: "GitHub", url: "https://github.com/nayuansari" },
        { name: "Instagram", url: "https://www.instagram.com/nayuansari/" },
      ],
      resumeLink: "https://drive.google.com/file/d/1pQO5xd5XBIoO_xSlbrEaSPDSNdqCoM69/view?usp=drive_link",
      questionFormLink: "https://forms.gle/ovS7M8LC8KsmeHJ89"
    }
  };

  // Framer Motion variants for animations
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // Typing Animation Component for Hero Lines
  const TypingAnimation = ({ lines }: { lines: string[] }) => {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      const currentLine = lines[currentLineIndex];
      const shouldDelete = isDeleting;

      if (shouldDelete) {
        if (displayText.length > 0) {
          const timer = setTimeout(() => {
            setDisplayText(displayText.slice(0, -1));
          }, 50);
          return () => clearTimeout(timer);
        } else {
          setIsDeleting(false);
          setCurrentLineIndex((prev) => (prev + 1) % lines.length);
        }
      } else {
        if (displayText.length < currentLine.length) {
          const timer = setTimeout(() => {
            setDisplayText(currentLine.slice(0, displayText.length + 1));
          }, 100);
          return () => clearTimeout(timer);
        } else {
          const timer = setTimeout(() => {
            setIsDeleting(true);
          }, 3000); // Wait 3 seconds before starting to delete
          return () => clearTimeout(timer);
        }
      }
    }, [displayText, isDeleting, currentLineIndex, lines]);

    return (
      <motion.div
        key={currentLineIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-2 text-lg text-blue-600 dark:text-blue-400 font-semibold min-h-[1.5rem] flex items-center justify-center"
      >
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="ml-1 text-blue-600 dark:text-blue-400"
        >
          |
        </motion.span>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground font-sans">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full opacity-15" // Slightly reduced opacity
        style={{ zIndex: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <motion.img
            src={`${process.env.PUBLIC_URL}/images/new_logo.png`}
            alt="Md Nayab Ansari Logo"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="h-12 sm:h-16 rounded-full"
            onError={handleImgError}
          />

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle navigation menu"
            >
              <div className={`w-6 h-0.5 bg-foreground mb-1.5 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-foreground mb-1.5 ${menuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-6 h-6 text-foreground" /> : <Moon className="w-6 h-6 text-foreground" />}
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-6 lg:space-x-8">
              {Object.keys(portfolioData).map((section) => (
                <motion.button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-5 py-2 rounded-full text-lg font-medium transition-all duration-300 ease-in-out
                    ${activeSection === section
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {portfolioData[section as keyof typeof portfolioData].title}
                </motion.button>
              ))}
            </nav>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-6 h-6 text-foreground" /> : <Moon className="w-6 h-6 text-foreground" />}
            </motion.button>
          </div>
        </header>

        {/* Mobile Navigation */}
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden grid grid-cols-2 gap-4 mb-8 bg-background/90 p-4 rounded-lg shadow-lg"
          >
            {Object.keys(portfolioData).map((section) => (
              <motion.button
                key={section}
                onClick={() => {
                  setActiveSection(section);
                  setMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300
                  ${activeSection === section
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {portfolioData[section as keyof typeof portfolioData].title}
              </motion.button>
            ))}
          </motion.nav>
        )}

        {/* Main Content */}
        <main className={`${activeSection === 'contact' ? 'bg-background/50' : 'bg-background/85'} backdrop-blur-lg rounded-3xl p-6 sm:p-8 lg:p-10 border border-border shadow-2xl`}>
          {/* Home Section */}
          {activeSection === 'home' && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-primary mb-6 border-b-2 border-primary/50 pb-2">
                {portfolioData.home.title}
              </motion.h2>

              <div className="flex flex-col items-center gap-8">
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="text-center space-y-4 mb-10">
                  <p className="text-lg text-primary">{portfolioData.home.hero.subtitle}</p>
                  <motion.div
                    variants={itemVariants}
                    className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-primary shadow-lg mx-auto"
                  >
                    <img
                      src={portfolioData.home.profileImage}
                      alt="Md Nayab Ansari"
                      className="w-full h-full object-cover"
                      onError={handleImgError}
                    />
                  </motion.div>
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground">
                    {portfolioData.home.Name}
                  </h2>
                  <h3 className="text-2xl sm:text-2xl text-muted-foreground">
                    {portfolioData.home.hero.title}
                  </h3>

                  {/* Typing Animation for Rotating Lines */}
                  <TypingAnimation lines={portfolioData.home.hero.lines} />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants} className="bg-secondary rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-primary">Experience Summary</h3>
                    <p className="text-foreground">
                      {portfolioData.home.experienceSummary}
                    </p>
                  </motion.div>
                  <motion.div variants={itemVariants} className="bg-secondary rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-primary">Key Information</h3>
                    <ul className="text-foreground space-y-2">
                      {portfolioData.home.keyInformation.map((item, idx) => (
                        <li key={idx}>
                          <span className="font-medium text-primary-light">{item.label}:</span> {item.value}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* About Section */}
          {activeSection === 'about' && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-primary mb-6 border-b-2 border-primary/50 pb-2">
                {portfolioData.about.title}
              </motion.h2>

              <motion.p variants={itemVariants} className="text-lg text-foreground leading-relaxed">
                {portfolioData.about.content}
              </motion.p>
{/*
              {/* Skills Section within About */}
              <motion.div variants={itemVariants} className="mt-8">
                <h3 className="text-2xl font-semibold mb-4 text-primary">{portfolioData.about.skills.title}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioData.about.skills.items.map((skill, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-secondary rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-foreground text-lg">{skill.name}</span>
                        <span className="text-primary font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 * index }}
                          className="bg-primary h-3 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Resume Section */}
          {activeSection === 'resume' && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-primary mb-8 border-b-2 border-primary/50 pb-2">
                {portfolioData.resume.title}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-foreground leading-relaxed mb-6">
                {portfolioData.resume.summary}
              </motion.p>

              <div className="space-y-8">
                <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-primary">Experience</motion.h3>
                {portfolioData.resume.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-secondary rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h4 className="text-xl font-semibold text-foreground">{exp.title}</h4>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-muted-foreground text-sm mb-4">{exp.date}</p>
                    <ul className="list-disc list-inside text-foreground space-y-1">
                      {exp.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-8 mt-8">
                <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-primary">Education</motion.h3>
                {portfolioData.resume.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-secondary rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h4 className="text-xl font-semibold text-foreground">{edu.degree}</h4>
                    <p className="text-primary font-medium">{edu.institution}</p>
                    <p className="text-muted-foreground text-sm mb-2">{edu.date}</p>
                    <p className="text-foreground">{edu.grade}</p>
                  </motion.div>
                ))}
              </div>

              {portfolioData.resume.downloadLink && (
                <motion.div variants={itemVariants} className="text-center mt-10">
                  <a
                    href={portfolioData.resume.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-300 text-lg font-medium shadow-lg"
                  >
                    Download Resume
                  </a>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Projects Section */}
          {activeSection === 'projects' && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-primary mb-8 border-b-2 border-primary/50 pb-2">
                {portfolioData.projects.title}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8">
                {portfolioData.projects.content}
              </motion.p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioData.projects.items.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-secondary rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    whileHover={{ scale: 1.03 }}
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={handleImgError}
                          />
                        ) : (
                          <div className="text-4xl text-primary font-bold">P{index + 1}</div>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-3 text-sm">{project.description}</p>
                      <span className="text-sm text-primary font-medium">{project.year}</span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}



          {/* Contact Section */}
          {activeSection === 'contact' && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8 relative"
            >
              {/* Layer Image */}
              <img
                src={`${process.env.PUBLIC_URL}/images/bg_1.jpg`}
                alt="Contact Background Layer"
                className={`absolute top-0 left-0 w-full h-full object-cover z-0 ${theme === 'light' ? 'opacity-80' : 'opacity-60'}`}
                onError={handleImgError}
              />
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-primary mb-8 border-b-2 border-primary/50 pb-2 relative z-10">
                {portfolioData.contact.title}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-foreground mb-8 relative z-10">
                {portfolioData.contact.content}
              </motion.p>
              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                <motion.div variants={itemVariants} className="space-y-4 bg-secondary rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-primary">Get in Touch</h3>
                  <div className="space-y-3">
                    <p className="text-foreground flex items-center gap-2">
                      <span className="text-primary">📧</span> <a href={`mailto:${portfolioData.contact.details.email}`} className="hover:underline text-primary-light">{portfolioData.contact.details.email}</a>
                    </p>
                    <p className="text-foreground flex items-center gap-2">
                      <span className="text-primary">📱</span> <a href={`tel:${portfolioData.contact.details.phone}`} className="hover:underline text-primary-light">{portfolioData.contact.details.phone}</a>
                    </p>
                    <p className="text-foreground flex items-center gap-2">
                      <span className="text-primary">📍</span> {portfolioData.contact.details.address}
                    </p>
                    {portfolioData.contact.resumeLink && (
                      <p className="text-foreground flex items-center gap-2">
                        <span className="text-primary">📄</span> <a href={portfolioData.contact.resumeLink} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary-light">Download Resume</a>
                      </p>
                    )}
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-4 bg-secondary rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-primary">Connect</h3>
                  <div className="flex flex-wrap gap-4">
                    {portfolioData.contact.socialLinks.map((social, idx) => (
                      <motion.a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 shadow-md"
                        whileHover={{ scale: 1.1, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.name}
                      </motion.a>
                    ))}
                    {portfolioData.contact.questionFormLink && (
                      <motion.a
                        href={portfolioData.contact.questionFormLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-300 shadow-md"
                        whileHover={{ scale: 1.1, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Have a Question?
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Built by Md Nayab Ansari. Using React, Three.js, and passion.</p>
        </footer>
      </div>
    </div>
  );
};

export default New_portfolio;

// // src/components/New_portfolio.tsx

