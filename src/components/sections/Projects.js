'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectModal from '@/components/ui/ProjectModal';
import { ScrollTrigger } from '@/components/ui/ScrollTrigger';
import { AnimatedText } from '@/components/ui/TextAnimation';
import { PrimaryMagneticButton } from '@/components/ui/MagneticButton';
import { ParallaxSection } from '@/components/ui/ParallaxEffect';

export default function Projects() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Updated with your actual projects from the resume
  const projects = [
    {
      id: 1,
      title: "Eazyposy Restaurant Management System",
      description: "A comprehensive management solution for restaurants with real-time business insights.",
      category: "work",
      tags: ["React.js", "Tailwind CSS", "REST API"],
      imageUrl: "/placeholder.jpg",
      fullDescription: "Led frontend development for a comprehensive restaurant management solution, serving 50+ restaurant clients. Initially developed with vanilla JavaScript, then migrated to ReactJS architecture for improved scalability. Integrated with Google Workplace tools and built custom dashboards that provided real-time business insights, helping clients increase operational efficiency by 28%.",
      achievements: [
        "Spearheaded frontend development utilizing ReactJS, HTML5, CSS3, and JavaScript",
        "Reduced application load time by 40% through performance optimization",
        "Managed deployment workflows and customer onboarding processes, reducing implementation time by 35%",
        "Built custom dashboards that provided real-time business insights"
      ],
      technologies: ["ReactJS", "HTML5", "CSS3", "JavaScript", "TailwindCSS", "Google Workplace tools"],
      demoLink: "https://eazyposy.io",
      codeLink: null, // Private company code
      client: "Eazyposy Infotech Private Limited",
      date: "June 2023 - Present"
    },
    {
      id: 2,
      title: "Eazyposy Corporate Website",
      description: "Responsive company website engineered with React and advanced animations.",
      category: "work",
      tags: ["React.js", "GSAP", "Framer Motion"],
      imageUrl: "/placeholder.jpg",
      fullDescription: "Engineered the company landing page utilizing ReactJS, HTML5, and CSS3 with advanced animation libraries including GSAP and Framer Motion. Designed intuitive and visually appealing UI components using Figma, improving user engagement metrics by 40%.",
      achievements: [
        "Increased user engagement by 35% through responsive design and engaging animations",
        "Improved organic search rankings by 45% within 3 months through SEO best practices",
        "Achieved Google PageSpeed score of 90+ on mobile and desktop",
        "Designed UI components using Figma, improving user engagement metrics by 40%"
      ],
      technologies: ["ReactJS", "HTML5", "CSS3", "GSAP", "Framer Motion", "Figma"],
      demoLink: "https://eazyposy.io",
      codeLink: null, // Private company code
      client: "Eazyposy Infotech Private Limited",
      date: "June 2023"
    },
    {
      id: 3,
      title: "Muzify: Song Lyrics Contribution App",
      description: "Full-stack Next.js application for sharing and discovering song lyrics.",
      category: "personal",
      tags: ["Next.js", "MongoDB", "NextAuth.js"],
      imageUrl: "/placeholder.jpg",
      fullDescription: "Developed a full-stack web application using NextJS and MongoDB that allows users to share and discover song lyrics. Applied secure authentication and authorization system using NextAuth.js and Google OAuth, handling 500+ user accounts.",
      achievements: [
        "Created RESTful API endpoints for all CRUD operations",
        "Implemented secure authentication with NextAuth.js and Google OAuth",
        "Utilized server-side rendering techniques to optimize SEO performance",
        "Designed responsive UI using TailwindCSS for cross-device compatibility"
      ],
      technologies: ["Next.js", "MongoDB", "NextAuth.js", "Google OAuth", "TailwindCSS", "RESTful API"],
      demoLink: null,
      codeLink: "#", // Add your GitHub link here
      client: "Personal Project",
      date: "2023"
    },
    {
      id: 4,
      title: "Industry Pro Product Finder",
      description: "NextJS marketplace platform for discovering products across various industries.",
      category: "personal",
      tags: ["Next.js", "OAuth", "Responsive Design"],
      imageUrl: "/placeholder.jpg",
      fullDescription: "Engineered a NextJS-based marketplace platform enabling users to add and discover products across various industries. Implemented role-based access control using NextAuth.js and Google OAuth for secure user management.",
      achievements: [
        "Created comprehensive database schemas and API endpoints",
        "Built advanced search functionality with filtering options",
        "Implemented role-based access control using NextAuth.js",
        "Deployed on Vercel with CI/CD pipeline for seamless updates"
      ],
      technologies: ["Next.js", "TailwindCSS", "NextAuth.js", "Google OAuth", "Vercel", "CI/CD"],
      demoLink: null,
      codeLink: "#", // Add your GitHub link here
      client: "Personal Project",
      date: "2023"
    },
    {
      id: 5,
      title: "Bike Booking Application",
      description: "Web application for booking bikes with inventory management.",
      category: "personal",
      tags: ["React.js", "Node.js", "MongoDB"],
      imageUrl: "/placeholder.jpg",
      fullDescription: "Created a bike booking web application with inventory tracking, user management, and booking features.",
      achievements: [
        "Implemented authentication and authorization for secure bookings",
        "Built responsive interface compatible with mobile and desktop devices",
        "Created admin dashboard for inventory management"
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "TailwindCSS"],
      demoLink: null,
      codeLink: "#", // Add your GitHub link here
      client: "Personal Project",
      date: "2022"
    },
    {
      id: 6,
      title: "NGO Survey Application",
      description: "Survey tool for NGOs to collect and analyze field data.",
      category: "personal",
      tags: ["React.js", "Firebase", "Data Visualization"],
      imageUrl: "/placeholder.jpg",
      fullDescription: "Developed a survey application for NGOs to collect, organize, and visualize field data from various locations.",
      achievements: [
        "Created offline-first functionality for field workers with poor connectivity",
        "Implemented data visualization tools for survey analysis",
        "Built user-friendly form builder for custom surveys"
      ],
      technologies: ["React.js", "Firebase", "Chart.js", "Material-UI"],
      demoLink: null,
      codeLink: "#", // Add your GitHub link here
      client: "Personal Project",
      date: "2022"
    },
  ];
  
  // Filter categories based on the projects
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'work', label: 'Work Projects' },
    { id: 'personal', label: 'Personal Projects' },
  ];
  
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);
    
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.165, 0.84, 0.44, 1],
      }
    },
  };

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 h-1/2 w-full bg-gradient-to-b from-sky-900/5 to-transparent pointer-events-none" />
      <ParallaxSection
        className="absolute -left-20 top-40 w-60 h-60 rounded-full bg-sky-600/10 filter blur-3xl pointer-events-none"
        direction="x"
        strength={0.15}
      />
      <ParallaxSection
        className="absolute -right-20 bottom-40 w-60 h-60 rounded-full bg-sky-600/10 filter blur-3xl pointer-events-none"
        direction="x"
        strength={-0.15}
      />

      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-block mb-3 px-4 py-1 bg-sky-900/20 rounded-full text-sky-400 text-sm font-medium"
          >
            MY WORK
          </motion.div>
          
          <AnimatedText
            text="Featured Projects"
            type="words"
            animation="fadeUp"
            staggerChildren={0.1}
            className="text-5xl font-bold mb-6"
            textClassName=""
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A showcase of my professional work and personal projects
          </motion.p>
        </div>
        
        {/* Filter Buttons */}
        <ScrollTrigger delay={0.2}>
          <motion.div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((filter) => (
              <PrimaryMagneticButton
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-800/70 hover:bg-gray-700 text-gray-300'
                }`}
                magneticStrength={0.3}
                scale={1.03}
              >
                {filter.label}
              </PrimaryMagneticButton>
            ))}
          </motion.div>
        </ScrollTrigger>

        {/* Projects Grid with Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="h-full"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard
                  project={project}
                  onViewDetails={handleViewDetails}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty state for when no projects match the filter */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found matching this filter.</p>
            <PrimaryMagneticButton
              onClick={() => setActiveFilter('all')}
              className="mt-4 px-6 py-2 bg-sky-600 text-white rounded-full"
            >
              Show all projects
            </PrimaryMagneticButton>
          </div>
        )}
      </div>
      
      {/* Project Detail Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
}