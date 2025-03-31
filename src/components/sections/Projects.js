// src/components/sections/Projects.js
'use client';

import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Project 1',
      description: 'Description for Project 1',
      image: '/placeholder.jpg',
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Description for Project 2',
      image: '/placeholder.jpg',
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'Description for Project 3',
      image: '/placeholder.jpg',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-dark to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                  <button className="mt-4 text-sky-400 hover:text-sky-300 font-medium">
                    View Project →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
