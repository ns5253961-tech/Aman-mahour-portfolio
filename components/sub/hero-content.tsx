"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { AtomOrbit } from "@/components/sub/atom-orbit";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-center px-6 md:px-20 mt-32 md:mt-40 w-full z-[20] gap-10"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start max-w-[600px]">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Fullstack  Developer  & prompt engineer Portfolio
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl text-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Providing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              the best
            </span>{" "}
            project experience.
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          I&apos;m Aman Mahour, a passionate and ambitious individual who loves
          learning new skills, exploring technology, and turning creative ideas
          into reality.
        </motion.p>

        <div className="flex flex-wrap gap-4 items-center">
          <motion.a
            href="#about-me"
            variants={slideInFromLeft(1)}
            className="py-2.5 px-6 button-primary text-center text-white cursor-pointer rounded-lg text-sm font-medium"
          >
            Learn more
          </motion.a>
          <motion.a
            href="#resume"
            variants={slideInFromLeft(1.1)}
            className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-purple-500/40 hover:border-purple-400 transition duration-200 cursor-pointer shadow-lg shadow-purple-500/10"
          >
            View Resume
          </motion.a>
        </div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center max-w-[650px]"
      >
        <AtomOrbit />
      </motion.div>
    </motion.div>
  );
};
