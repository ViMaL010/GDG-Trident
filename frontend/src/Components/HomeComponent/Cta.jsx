import { motion } from "framer-motion";

export function Cta() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div>
      <motion.div
        data-layer="CTA section"
        data-breakpoint="Desktop"
        className="CtaSection w-full h-auto md:h-[398px] px-4 md:px-16 py-12 md:py-28 bg-black/95 inline-flex flex-col justify-start items-start gap-10 md:gap-20 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div
          data-layer="Content"
          className="Content self-stretch flex-col md:flex-row justify-start items-start gap-10 md:gap-20 inline-flex"
        >
          {/* Left Column */}
          <motion.div
            data-layer="Column"
            className="Column grow shrink basis-0 inline-flex flex-col justify-start items-start gap-4"
            variants={itemVariants}
          >
            <motion.div
              data-layer="Short heading here"
              className="ShortHeadingHere relative justify-start text-white text-3xl md:text-[56px] font-bold font-['Roboto'] leading-[40px] md:leading-[67.20px]"
              variants={itemVariants}
            >
              Empower Education, Transform Future
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            data-layer="Column"
            className="Column grow shrink basis-0 inline-flex flex-col justify-start items-start gap-6 md:gap-8"
            variants={itemVariants}
          >
            <motion.div
              data-layer="Description"
              className="relative justify-start text-white text-base md:text-lg font-normal font-['Roboto'] leading-[24px] md:leading-[27px]"
              variants={itemVariants}
            >
              Students reach their potential. Donors create lasting impact. Together, we build brighter futures.
            </motion.div>
            
            <div
              data-layer="Actions"
              className="Actions flex-col md:flex-row justify-start items-start gap-4 inline-flex"
            >
              <motion.div
                data-layer="Button"
                data-alternate="True"
                data-icon-position="No icon"
                data-small="False"
                data-style="Primary"
                className="Button px-4 py-2 md:px-6 md:py-3 bg-white border border-white flex justify-center items-center gap-2 cursor-pointer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <div
                  className="Button relative justify-start text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal"
                >
                  Join as a student
                </div>
              </motion.div>
              
              <motion.div
                data-layer="Button"
                data-alternate="True"
                data-icon-position="No icon"
                data-small="False"
                data-style="Secondary"
                className="Button px-4 py-2 md:px-6 md:py-3 border border-white flex justify-center items-center gap-2 cursor-pointer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <div
                  className="Button relative justify-start text-white text-sm md:text-base font-normal font-['Roboto'] leading-normal"
                >
                  Support a student
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}