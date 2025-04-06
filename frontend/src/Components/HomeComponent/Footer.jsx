import React from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.05, color: "#a0a0ff" }
  };

  return (
    <div>
      <motion.hr 
        initial={{ scaleX: 0 }} 
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        data-layer="Footer / 7 /"
        className="w-full bg-black px-4 py-8 md:px-8 lg:px-16 md:py-10 flex flex-col justify-start items-center gap-8 md:gap-12 lg:gap-20 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          data-layer="Content" 
          className="w-full flex flex-col justify-start items-center gap-6 md:gap-8"
          variants={itemVariants}
        >
          <motion.div 
            data-layer="Logo" 
            className="flex flex-col justify-start items-start gap-4 md:gap-6 overflow-hidden"
            variants={itemVariants}
          >
            <motion.div
              data-layer="Company Logo"
              data-color="Dark"
              className="w-[84px] h-9 inline-flex justify-center items-center overflow-hidden"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img src="/Logo2.svg" alt="Company logo" />
            </motion.div>
          </motion.div>
          
          <motion.div 
            data-layer="Links" 
            className="w-full flex flex-wrap justify-center items-start gap-4 md:gap-8"
            variants={itemVariants}
          >
            {["Home", "About Us", "Browse Students", "Start a Campaign"].map((link, index) => (
              <motion.div
                key={index}
                data-layer={`Link ${index + 1}`}
                className="relative text-white text-sm font-semibold font-['Roboto'] leading-[21px] px-2 py-1 cursor-pointer"
                variants={linkVariants}
                whileHover="hover"
                transition={{ staggerChildren: 0.1, delayChildren: 0.05 * index }}
              >
                {link}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          data-layer="Credits" 
          className="w-full flex flex-col justify-start items-center gap-4 md:gap-8"
          variants={itemVariants}
        >
          <motion.div 
            data-layer="Row" 
            className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-0"
            variants={itemVariants}
          >
            <motion.div
              data-layer="© 2024 Relume. All rights reserved."
              className="relative text-white text-sm font-normal font-['Roboto'] leading-[21px] text-center md:text-left"
              variants={itemVariants}
            >
              © All rights reserved.
            </motion.div>
            
            <motion.div 
              data-layer="Footer Links" 
              className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6"
              variants={itemVariants}
            >
              {["Privacy Policy", "Terms of Service", "Cookies Settings"].map((link, index) => (
                <motion.div
                  key={index}
                  data-layer={link}
                  className="relative text-white text-sm font-normal font-['Roboto'] underline leading-[21px] px-1 cursor-pointer"
                  variants={linkVariants}
                  whileHover="hover"
                  transition={{ delay: 0.05 * index }}
                >
                  {link}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}