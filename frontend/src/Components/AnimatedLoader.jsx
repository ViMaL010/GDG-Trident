import { motion, useAnimate } from 'framer-motion';
import { useEffect } from "react";

export default function FundEdAnimation() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateLoader = async () => {
      // Animate the "F" letter
      animate(
        [
          [".f1", { pathLength: 0.5, pathOffset: 0 }],
          [".f1", { pathLength: 0.005, pathOffset: 0 }],
          [".f2", { pathLength: 0.5, pathOffset: 0.5 }, { at: "<" }]
        ],
        { duration: 2, ease: "linear", repeat: Infinity }
      );
      
      // Animate the "u" letter
      animate(
        [
          [".u1", { pathLength: 0.5, pathOffset: 0 }],
          [".u1", { pathLength: 0.005, pathOffset: 0 }],
          [".u2", { pathLength: 0.5, pathOffset: 0.5 }, { at: "<" }]
        ],
        { duration: 2, ease: "linear", repeat: Infinity, delay: 0.2 }
      );
      
      // Animate the "n" letter
      animate(
        [
          [".n1", { pathLength: 0.5, pathOffset: 0 }],
          [".n1", { pathLength: 0.005, pathOffset: 0 }],
          [".n2", { pathLength: 0.5, pathOffset: 0.5 }, { at: "<" }]
        ],
        { duration: 2, ease: "linear", repeat: Infinity, delay: 0.4 }
      );
      
      // Animate the "d" letter
      animate(
        [
          [".d1", { pathLength: 0.5, pathOffset: 0 }],
          [".d1", { pathLength: 0.005, pathOffset: 0 }],
          [".d2", { pathLength: 0.5, pathOffset: 0.5 }, { at: "<" }]
        ],
        { duration: 2, ease: "linear", repeat: Infinity, delay: 0.6 }
      );
      
      // Animate the "E" letter
      animate(
        [
          [".e1", { pathLength: 0.5, pathOffset: 0 }],
          [".e1", { pathLength: 0.005, pathOffset: 0 }],
          [".e2", { pathLength: 0.5, pathOffset: 0.5 }, { at: "<" }]
        ],
        { duration: 2, ease: "linear", repeat: Infinity, delay: 0.8 }
      );
      
      // Animate the "D" letter
      animate(
        [
          [".d3", { pathLength: 0.5, pathOffset: 0 }],
          [".d3", { pathLength: 0.005, pathOffset: 0 }],
          [".d4", { pathLength: 0.5, pathOffset: 0.5 }, { at: "<" }]
        ],
        { duration: 2, ease: "linear", repeat: Infinity, delay: 1 }
      );
      
      // Animate the coin circle
      animate(
        [
          [".coin-outer", { pathLength: 1.1, pathOffset: 0 }],
          [".coin-outer", { pathLength: 0, pathOffset: 0 }]
        ],
        { duration: 2, repeat: Infinity, repeatDelay: 0.6 }
      );
      
      // Animate the dollar sign
      animate(
        [
          [".dollar", { pathLength: 1.1, pathOffset: 0 }],
          [".dollar", { pathLength: 0, pathOffset: 0 }]
        ],
        { duration: 1.8, repeat: Infinity, repeatDelay: 0.6, delay: 0.2 }
      );
    };
    
    animateLoader();
  }, [animate]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <svg
        ref={scope}
        width="300"
        height="100"
        viewBox="0 0 300 100"
        className="text-[#2D2A2E]" // Updated to dark gray color like in the logo
      >
        {/* F - Modern sans-serif style */}
        <motion.path
          className="f1"
          initial={{ pathLength: 0.5, pathOffset: 0.5 }}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 20,25 L 20,80 M 20,25 L 45,25 M 20,50 L 40,50"
        />
        <motion.path
          className="f2"
          initial={{ pathLength: 0, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 20,25 L 20,80 M 20,25 L 45,25 M 20,50 L 40,50"
        />

        {/* u - Modern sans-serif style */}
        <motion.path
          className="u1"
          initial={{ pathLength: 0.5, pathOffset: 0.5 }}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 55,40 L 55,75 C 55,80 75,80 75,75 L 75,40"
        />
        <motion.path
          className="u2"
          initial={{ pathLength: 0, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 55,40 L 55,75 C 55,80 75,80 75,75 L 75,40"
        />

        {/* n - Modern sans-serif style */}
        <motion.path
          className="n1"
          initial={{ pathLength: 0.5, pathOffset: 0.5 }}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 85,80 L 85,40 C 85,35 105,35 105,40 L 105,80"
        />
        <motion.path
          className="n2"
          initial={{ pathLength: 0, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 85,80 L 85,40 C 85,35 105,35 105,40 L 105,80"
        />

        {/* d - Modern sans-serif style */}
        <motion.path
          className="d1"
          initial={{ pathLength: 0.5, pathOffset: 0.5 }}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 135,25 L 135,80 M 115,60 C 115,40 135,40 135,55"
        />
        <motion.path
          className="d2"
          initial={{ pathLength: 0, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 135,25 L 135,80 M 115,60 C 115,40 135,40 135,55"
        />

        {/* E - Bold sans-serif style as in logo */}
        <motion.path
          className="e1"
          initial={{ pathLength: 0.5, pathOffset: 0.5 }}
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 155,25 L 155,80 M 155,25 L 185,25 M 155,52.5 L 180,52.5 M 155,80 L 185,80"
        />
        <motion.path
          className="e2"
          initial={{ pathLength: 0, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 155,25 L 155,80 M 155,25 L 185,25 M 155,52.5 L 180,52.5 M 155,80 L 185,80"
        />

        {/* D - Bold uppercase D as in logo */}
        <motion.path
          className="d3"
          initial={{ pathLength: 0.5, pathOffset: 0.5 }}
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 195,25 L 195,80 M 195,25 C 230,25 230,80 195,80"
        />
        <motion.path
          className="d4"
          initial={{ pathLength: 0, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
          d="M 195,25 L 195,80 M 195,25 C 230,25 230,80 195,80"
        />

        {/* Optional coin circle */}
        <motion.circle
          className="coin-outer"
          cx="260"
          cy="40"
          r="15"
          initial={{ pathLength: 1.1, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Dollar sign */}
        <motion.path
          className="dollar"
          initial={{ pathLength: 1.1, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          d="M 260,30 L 260,50 M 255,35 C 255,32 265,32 265,35 C 265,38 255,42 255,45 C 255,48 265,48 265,45"
        />
      </svg>
    </div>
  );
}