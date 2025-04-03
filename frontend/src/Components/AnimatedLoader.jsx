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
      
      // Animate the "d" letter
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
        className="text-black"
      >
        {/* F */}
        <motion.path
          className="f1"
          initial={{ pathLength: 0.5, pathOffset: 0.5 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 20,20 L 20,80 M 20,20 L 50,20 M 20,45 L 45,45"
        />
        <motion.path
          className="f2"
          initial={{ pathLength: 0, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 20,20 L 20,80 M 20,20 L 50,20 M 20,45 L 45,45"
        />

        {/* u */}
        <motion.path
          className="u1"
          initial={{ pathLength: 0.5, pathOffset: 0.5 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 60,35 L 60,80 M 60,80 C 60,60 90,60 90,80 M 90,35 L 90,80"
        />
        <motion.path
          className="u2"
          initial={{ pathLength: 0, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 60,35 L 60,80 M 60,80 C 60,60 90,60 90,80 M 90,35 L 90,80"
        />

        {/* n */}
        <motion.path
          className="n1"
          initial={{ pathLength: 0.5, pathOffset: 0.5 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 100,80 L 100,35 M 100,35 C 100,55 130,55 130,35 M 130,35 L 130,80"
        />
        <motion.path
          className="n2"
          initial={{ pathLength: 0, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 100,80 L 100,35 M 100,35 C 100,55 130,55 130,35 M 130,35 L 130,80"
        />

        {/* d */}
        <motion.path
          className="d1"
          initial={{ pathLength: 0.5, pathOffset: 0.5 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 170,20 L 170,80 M 140,80 C 140,60 170,60 170,80"
        />
        <motion.path
          className="d2"
          initial={{ pathLength: 0, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 170,20 L 170,80 M 140,80 C 140,60 170,60 170,80"
        />

        {/* E */}
        <motion.path
          className="e1"
          initial={{ pathLength: 0.5, pathOffset: 0.5 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 180,20 L 180,80 M 180,20 L 210,20 M 180,50 L 205,50 M 180,80 L 210,80"
        />
        <motion.path
          className="e2"
          initial={{ pathLength: 0, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 180,20 L 180,80 M 180,20 L 210,20 M 180,50 L 205,50 M 180,80 L 210,80"
        />

        {/* d */}
        <motion.path
          className="d3"
          initial={{ pathLength: 0.5, pathOffset: 0.5 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 250,20 L 250,80 M 220,80 C 220,60 250,60 250,80"
        />
        <motion.path
          className="d4"
          initial={{ pathLength: 0, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 250,20 L 250,80 M 220,80 C 220,60 250,60 250,80"
        />

        {/* Coin circle */}
        <motion.circle
          className="coin-outer"
          cx="275"
          cy="35"
          r="15"
          initial={{ pathLength: 1.1, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />

        {/* Dollar sign */}
        <motion.path
          className="dollar"
          initial={{ pathLength: 1.1, pathOffset: 1 }}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          d="M 275,25 L 275,45 M 270,30 C 270,27 280,27 280,30 C 280,33 270,37 270,40 C 270,43 280,43 280,40"
        />
      </svg>
    </div>
  );
}