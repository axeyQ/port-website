// src/components/sections/About.js
'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="max-w-3xl mx-auto text-gray-300 text-lg">
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
              Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec
              aliquam nisl nisl sit amet nisl.
            </p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
              Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec
              aliquam nisl nisl sit amet nisl.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}