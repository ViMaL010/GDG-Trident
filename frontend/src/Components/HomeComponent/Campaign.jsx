import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function Campaign() {
  const navigate = useNavigate();

  const checkTokenAndNavigate = () => {
    const token = sessionStorage.getItem('token');
    console.log(token);
    
    if (token == null) {
      navigate('/signup');
    } else {
      navigate('/dashboard');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const textVariants = {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="mt-10 -mb-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="h-auto md:h-[804px] flex justify-start items-start">
        <div className="w-full flex justify-start items-start">
          <div className="w-full h-auto md:h-[700px] px-4 md:px-16 py-12 md:py-28 bg-white flex flex-col md:flex-row justify-start items-center gap-8 md:gap-20 overflow-hidden">
            <motion.div 
              className="w-full md:grow md:shrink md:basis-0 flex flex-col justify-start items-start gap-6 md:gap-8"
            >
              <div className="w-full flex flex-col justify-start items-start gap-4 md:gap-6">
                <motion.h1 
                  className="text-black text-3xl md:text-[56px] font-bold font-['Roboto'] leading-tight md:leading-[67.20px]"
                  variants={textVariants}
                >
                  Connecting Students with Donors to Fund Education.
                </motion.h1>
                <motion.p 
                  className="text-black text-base md:text-lg font-normal font-['Roboto'] leading-relaxed md:leading-[27px]"
                  variants={textVariants}
                >
                  Students showcase their background and needs, while donors discover and support them directly—ensuring transparency and impact.
                </motion.p>
              </div>
              <div className="flex flex-col md:flex-row justify-start items-start gap-4">
                <motion.button 
                  className="w-full md:w-auto px-6 py-3 bg-black border border-black text-white text-base font-normal font-['Roboto'] leading-normal cursor-pointer rounded-md"
                  onClick={checkTokenAndNavigate}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Start Your Campaign
                </motion.button>
                <motion.button 
                  className="w-full md:w-auto px-6 py-3 border border-black text-black text-base font-normal font-['Roboto'] leading-normal cursor-pointer rounded-md"
                  onClick={checkTokenAndNavigate}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Support a Student
                </motion.button>
              </div>
            </motion.div>
            <motion.div 
              className="w-full md:grow md:shrink md:basis-0 flex justify-center items-center"
              variants={imageVariants}
              whileHover="hover"
            >
              <motion.img
                className="w-full h-auto md:h-[640px] object-cover rounded-lg "
                src="https://cdn.prod.website-files.com/64c73d04a946980a4476537e/64cd4b9bf0da0e3228caa6d0_growth.png"
                alt="Campaign"
                initial={{ filter: "blur(5px)" }}
                animate={{ 
                  filter: "blur(0px)",
                  transition: { duration: 1.2 }
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}