import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Navbar() {
  const navigate = useNavigate();

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    hover: { 
      scale: 1.05,
      color: "#333",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, rotate: -10 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.1,
      transition: { 
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="h-16 w-full fixed top-0 z-50"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex-col w-full justify-start items-start flex">
        <motion.div 
          className="w-screen h-16 px-4 md:px-16 bg-white  flex-col justify-center items-center flex shadow-md"
          whileHover={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="self-stretch justify-between items-center inline-flex">
            <motion.div 
              data-svg-wrapper
              variants={logoVariants}
              whileHover="hover"
            >
              <img src="/Logo.png" className="h-8" alt="Logo" />
            </motion.div>
            
            <div className="justify-center items-center gap-4 md:gap-8 flex">
              <motion.div 
                className="hidden md:flex justify-end items-center gap-4 md:gap-8"
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="justify-center items-center gap-1 flex"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className="text-black text-base font-normal font-['Roboto'] leading-normal cursor-pointer border-b-2 border-transparent hover:border-black"
                    onClick={() => navigate('/home')}
                  >
                    Home
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="justify-center items-center gap-1 flex"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className="text-black text-base font-normal font-['Roboto'] leading-normal cursor-pointer border-b-2 border-transparent hover:border-black"
                  >
                    About Us
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="justify-center items-center gap-1 flex"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className="text-black text-base font-normal font-['Roboto'] leading-normal cursor-pointer border-b-2 border-transparent hover:border-black"
                  >
                    Browse Students
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="justify-center items-center gap-1 flex"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className="text-black text-base font-normal font-['Roboto'] leading-normal cursor-pointer border-b-2 border-transparent hover:border-black"
                    onClick={() => {
                      const token = sessionStorage.getItem('token');
                      console.log(token);
                      if (token == null) {
                        navigate('/signup');
                      } else {
                        navigate('/dashboard');
                      }
                    }}
                  >
                    Start a Campaign
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <div className="justify-center items-center gap-2 md:gap-4 flex">
                <motion.div 
                  className="px-3 py-1 md:px-5 md:py-2 border border-black justify-center items-center gap-2 flex cursor-pointer rounded-md"
                  onClick={() => navigate('/signup')}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.6 } }}
                >
                  <div className="text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal">
                    Register
                  </div>
                </motion.div>
                
                <motion.div 
                  className="px-3 py-1 md:px-5 md:py-2 bg-black border border-black justify-center items-center gap-2 flex cursor-pointer rounded-md"
                  onClick={() => navigate('/login')}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.7 } }}
                >
                  <button className="text-white text-sm md:text-base font-normal font-['Roboto'] leading-normal">
                    Login
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}