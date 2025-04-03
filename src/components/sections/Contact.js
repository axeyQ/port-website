'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollTrigger, ScrollTriggerGroup } from '@/components/ui/ScrollTrigger';
import { gsap } from 'gsap';
import Honeypot from '@/components/ui/Honeypot'; // Import the Honeypot component

export default function Contact() {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const cursorRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);

  // Replace YOUR_FORM_ID with your actual Formspree form ID
  const FORM_ENDPOINT = "https://formspree.io/f/mwplrvre";

  // Typing cursor animation
  useEffect(() => {
    if (formRef.current && cursorRef.current && isInView) {
      // Animate cursor to each input field
      const inputFields = formRef.current.querySelectorAll('input, textarea');
      const tl = gsap.timeline({ repeat: 0, repeatDelay: 1 });
      
      inputFields.forEach((field, index) => {
        if (index === 0) {
          // Move to first field
          tl.to(cursorRef.current, {
            duration: 0.8,
            x: field.getBoundingClientRect().left + 20,
            y: field.getBoundingClientRect().top + 20,
            ease: "power2.inOut"
          });
        } else {
          // Move to subsequent fields
          tl.to(cursorRef.current, {
            duration: 0.8,
            x: field.getBoundingClientRect().left + 20,
            y: field.getBoundingClientRect().top + 20,
            ease: "power2.inOut"
          }, "+=0.5");
        }
        
        // Type effect
        tl.to({}, {
          duration: 0.5,
          onStart: () => setActiveField(field.id),
          onComplete: () => setActiveField(null)
        }, "+=0.5");
      });
      
      // Move cursor out
      tl.to(cursorRef.current, {
        duration: 0.8,
        x: '100%',
        y: '100%',
        opacity: 0,
        ease: "power2.inOut"
      }, "+=0.5");
    }
  }, [isInView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message is too short";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Check for possible bot by examining if honeypot field exists in DOM and is filled
      const honeypotField = document.querySelector('input[name="website"]');
      if (honeypotField && honeypotField.value) {
        // Simulate success but don't actually send (it's a bot)
        console.log("Honeypot triggered - bot detected");
        setSubmitStatus({
          success: true,
          message: "Your message has been sent successfully! I'll get back to you soon."
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
        
        return; // Exit without sending
      }
      
      // Send data to Formspree
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }
      
      // Success response
      setSubmitStatus({
        success: true,
        message: "Your message has been sent successfully! I'll get back to you soon."
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({
        success: false,
        message: "Oops! Something went wrong. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[60%] bg-gradient-radial from-sky-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[50%] bg-gradient-radial from-sky-500/20 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-block mb-3 px-4 py-1 bg-sky-900/20 rounded-full text-sky-400 text-sm font-medium"
          >
            GET IN TOUCH
          </motion.div>
          <h2 className="text-4xl font-bold mb-6">
            Let&apos;s Talk <span className="text-sky-400">Together</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Have a project in mind or want to discuss potential opportunities?
            I&apos;d love to hear from you.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollTriggerGroup threshold={0.2} staggerDelay={0.1} className="space-y-8">
              <div className="p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-sky-600/20 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Phone</h4>
                      <p className="text-gray-400 mt-1">+91 6261302374</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-sky-600/20 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Email</h4>
                      <a href="mailto:thakur.raxit@gmail.com" className="text-gray-400 mt-1 hover:text-sky-400 transition-colors">thakur.raxit@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-sky-600/20 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Location</h4>
                      <p className="text-gray-400 mt-1">Bhopal, India</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://www.linkedin.com/in/rakshit-singh-thakur-b88a321b1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-sky-600 p-3 rounded-full transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ y: 0 }}
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://github.com/axeyQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-sky-600 p-3 rounded-full transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ y: 0 }}
                    aria-label="GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="mailto:thakur.raxit@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-sky-600 p-3 rounded-full transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ y: 0 }}
                    aria-label="Email"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </ScrollTriggerGroup>
            
            <div className="relative">
              <ScrollTrigger threshold={0.1} delay={0.3}>
                <div className="p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
                  <h3 className="text-2xl font-bold mb-6 text-white">Send Me a Message</h3>
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6 relative"
                  >
                    {/* Add Honeypot component inside the form */}
                    <Honeypot />
                    
                    {/* Animated typing cursor */}
                    <motion.div
                      ref={cursorRef}
                      className="absolute w-4 h-4 bg-sky-400 rounded-full opacity-80 pointer-events-none z-10"
                      initial={{ x: -100, y: -100, opacity: 0 }}
                      animate={{ opacity: isInView ? 0.8 : 0 }}
                    />
                    
                    {/* Status message */}
                    {submitStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg ${
                          submitStatus.success ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                        }`}
                      >
                        {submitStatus.message}
                      </motion.div>
                    )}
                    
                    {/* Form fields */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-800 border ${
                          errors.name ? 'border-red-500' : activeField === 'name' ? 'border-sky-400' : 'border-gray-700'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-800 border ${
                          errors.email ? 'border-red-500' : activeField === 'email' ? 'border-sky-400' : 'border-gray-700'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                        Subject (Optional)
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-800 border ${
                          activeField === 'subject' ? 'border-sky-400' : 'border-gray-700'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors`}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-800 border ${
                          errors.message ? 'border-red-500' : activeField === 'message' ? 'border-sky-400' : 'border-gray-700'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors`}
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div> 
                    
                    {/* Include Formspree's built-in honeypot field as well */}
                    <input type="text" name="_gotcha" style={{ display: 'none' }} />
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={`w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-4 rounded-lg transition-colors 
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </form>
                </div>
              </ScrollTrigger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}