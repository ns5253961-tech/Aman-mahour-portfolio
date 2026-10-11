"use client";

import { motion } from "framer-motion";
import { SparklesIcon, RocketLaunchIcon, HeartIcon } from "@heroicons/react/24/solid";
import { RxLinkedinLogo, RxInstagramLogo, RxGithubLogo } from "react-icons/rx";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";

export const About = () => {
  return (
    <section
      id="about-me"
      className="flex flex-col items-center justify-center relative z-[20] px-6 md:px-20 py-10"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromTop}
        className="flex flex-col items-center justify-center mb-8"
      >
        <div className="Welcome-box py-[8px] px-[15px] border border-[#7042f88b] opacity-[0.9] flex items-center mb-4">
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <span className="Welcome-text text-[14px]">Get to know me</span>
        </div>
        <h2 className="text-[36px] md:text-[48px] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-500">
          About Me
        </h2>
      </motion.div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Bio Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInFromLeft(0.3)}
          className="md:col-span-2 p-6 md:p-8 rounded-2xl bg-[rgba(3,0,20,0.65)] border border-[rgba(112,66,248,0.38)] backdrop-blur-md shadow-lg shadow-[#2A0E61]/30 flex flex-col justify-between gap-5"
        >
          <div className="flex flex-col gap-4 text-gray-300 text-base md:text-lg leading-relaxed">
            <p>
              Hi, I&apos;m{" "}
              <span className="font-semibold text-white text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Aman Mahour
              </span>
              , a passionate and ambitious individual who loves learning new skills, exploring technology, and turning creative ideas into reality.
            </p>
            <p className="text-gray-400">
              I believe in continuous learning, personal growth, and building meaningful projects that make a difference. I enjoy exploring new opportunities, improving my abilities, and challenging myself to achieve bigger goals.
            </p>
            <p className="text-gray-400">
              My goal is to build a strong professional identity, develop innovative solutions, and create work that reflects my creativity, dedication, and passion.
            </p>
          </div>

          {/* Mission Box */}
          <div className="p-4 rounded-xl bg-[rgba(112,66,248,0.12)] border border-[rgba(112,66,248,0.4)] flex items-start gap-3">
            <RocketLaunchIcon className="h-6 w-6 text-cyan-400 shrink-0 mt-1" />
            <div>
              <span className="font-bold text-cyan-300 mr-2">My Mission:</span>
              <span className="text-gray-200">
                To keep learning, keep growing, and turn my vision into reality.
              </span>
            </div>
          </div>
        </motion.div>

        {/* Connect & Highlights Sidebar Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInFromRight(0.4)}
          className="p-6 md:p-8 rounded-2xl bg-[rgba(3,0,20,0.65)] border border-[rgba(112,66,248,0.38)] backdrop-blur-md shadow-lg shadow-[#2A0E61]/30 flex flex-col justify-between gap-6"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-purple-300 font-semibold text-lg">
              <HeartIcon className="h-5 w-5 text-purple-400" />
              <span>Core Values</span>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                Continuous Learning & Curiosity
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                Dedication & Creative Thinking
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                Building Meaningful Solutions
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                Ambition & Relentless Growth
              </li>
            </ul>
          </div>

          {/* CTA Box */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#7042f833] to-[#00f2fe22] border border-[#7042f866] text-center flex flex-col gap-2.5">
            <p className="font-semibold text-white text-sm">
              Let&apos;s connect and create something amazing together!
            </p>
            <a
              href="https://github.com/ns5253961-tech"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <RxGithubLogo className="w-4 h-4 text-white" />
              View GitHub Profile
            </a>
            <a
              href="https://www.linkedin.com/in/aman-mahour-60a454248/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg button-primary text-white text-sm font-medium transition duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <RxLinkedinLogo className="w-4 h-4 text-white" />
              Connect on LinkedIn
            </a>
            <a
              href="https://www.instagram.com/itznitin_in_?dlrf=MTU4NXE1ZzVtZmFsZg=="
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-[#e1306c]/20 hover:bg-[#e1306c]/40 border border-[#e1306c]/50 text-white text-xs font-medium transition duration-200 cursor-pointer"
            >
              <RxInstagramLogo className="w-3.5 h-3.5 text-[#e1306c]" />
              Follow on Instagram
            </a>
            <a
              href="mailto:contact@example.com"
              className="inline-block w-full py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-medium transition duration-200 cursor-pointer"
            >
              Send an Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
