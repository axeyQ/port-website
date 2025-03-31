'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { PrimaryMagneticButton } from '@/components/ui/MagneticButton';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, -10, 0],
              transition: { 
                duration: 1.5,
                delay: 0.5
              }
            }}
            className="text-8xl font-bold mb-6 text-sky-500"
          >
            404
          </motion.div>
          
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-gray-400 mb-8">
            Oops! The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryMagneticButton
              as={Link}
              href="/"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Go Home
            </PrimaryMagneticButton>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/#contact"
                className="bg-transparent hover:bg-white/10 border border-white text-white font-semibold py-3 px-6 rounded-lg transition duration-300 inline-block"
              >
                Contact Me
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}