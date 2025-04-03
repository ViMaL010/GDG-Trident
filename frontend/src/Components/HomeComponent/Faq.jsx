import { motion } from "framer-motion";
import { FAQAccordion } from "./FAQAccordion";

export function Faq() {
  // Animation variants for the section
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Special animation for the title with slight rotation
  const titleVariants = {
    hidden: { opacity: 0, y: -30, rotateX: 45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div>
      <motion.div
        data-layer="FAQ / 2 /"
        data-breakpoint="Desktop"
        className="Faq2 w-full min-h-[400px] px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-28 bg-white flex flex-col items-center justify-center overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <motion.div
          data-layer="Section Title"
          className="SectionTitle flex flex-col items-center justify-start gap-4 sm:gap-6 w-full max-w-4xl"
          variants={sectionVariants}
        >
          <motion.div
            data-layer="FAQs"
            className="Faqs text-center text-black text-3xl sm:text-4xl md:text-5xl font-bold font-['Roboto'] leading-tight md:leading-[57.60px]"
            variants={titleVariants}
          >
            FAQs
          </motion.div>
          
          <motion.div
            data-layer="Text"
            className="Text text-center text-black text-base sm:text-lg font-normal font-['Roboto'] leading-normal sm:leading-[27px] mb-4 sm:mb-8 px-4"
            variants={textVariants}
          >
            Find answers to common questions about our platform, student funding, and donor contributions.
            If you need further assistance, feel free to contact us.
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.4
                }
              }
            }}
            className="w-full"
          >
            <FAQAccordion />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}