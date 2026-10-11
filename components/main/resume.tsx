"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  LanguageIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";
import { RxLinkedinLogo, RxInstagramLogo, RxGithubLogo } from "react-icons/rx";
import { slideInFromTop, slideInFromLeft, slideInFromRight } from "@/lib/motion";

export const Resume = () => {
  const [activeTab, setActiveTab] = useState<"all" | "projects" | "education" | "skills">("all");

  const technicalCore = [
    { name: "AI Prompt Engineering", level: "Advanced", pct: 92 },
    { name: "AI Automation Workflows", level: "Advanced", pct: 90 },
    { name: "Logical Problem Solving", level: "Expert", pct: 95 },
    { name: "Mobile App Architecture", level: "Proficient", pct: 85 },
    { name: "Flutter Framework", level: "Intermediate", pct: 78 },
    { name: "Dart Programming Language", level: "Intermediate", pct: 75 },
    { name: "Software Fundamentals", level: "Core", pct: 82 },
  ];

  const toolsAndFrameworks = [
    "VS Code",
    "Antigravity Tools",
    "Computer Fundamentals",
    "Internet Tech",
    "Collaboration Tools",
    "Basic UI Dev",
    "Technical Research",
    "Git / Version Control",
  ];

  const coreCompetencies = [
    "Analytical Reasoning & Architecture",
    "Structured Team Collaboration",
    "Rapid Self-Driven Knowledge Acquisition",
    "Adaptive Working Principles",
    "Time Optimization & Prioritization",
    "Latent Leadership & Delegation",
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="resume"
      className="flex flex-col items-center justify-center relative z-[20] px-6 md:px-20 py-16 w-full max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromTop}
        className="flex flex-col items-center justify-center mb-10 text-center"
      >
        <div className="Welcome-box py-[8px] px-[15px] border border-[#7042f88b] opacity-[0.9] flex items-center mb-4">
          <DocumentTextIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <span className="Welcome-text text-[14px]">Curriculum Vitae</span>
        </div>
        <h2 className="text-[36px] md:text-[50px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-500 mb-3">
          Resume & Credentials
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl">
          Computer Science Engineering student specializing in AI automation workflows, robust prompt engineering architecture, and cross-platform mobile development.
        </p>

        {/* Quick Contact & Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300 bg-white/5 border border-white/10 px-3.5 py-2 rounded-full">
            <PhoneIcon className="h-4 w-4 text-cyan-400" />
            <span>+91 9174608543</span>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300 bg-white/5 border border-white/10 px-3.5 py-2 rounded-full">
            <MapPinIcon className="h-4 w-4 text-purple-400" />
            <span>Morena, Madhya Pradesh, India</span>
          </div>
          <a
            href="https://github.com/ns5253961-tech"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 text-xs md:text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-full transition duration-200"
          >
            <RxGithubLogo className="h-4 w-4 text-white" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/aman-mahour-60a454248/"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 text-xs md:text-sm text-white bg-[#0077b5]/30 hover:bg-[#0077b5]/50 border border-[#0077b5]/60 px-4 py-2 rounded-full transition duration-200"
          >
            <RxLinkedinLogo className="h-4 w-4 text-[#0077b5]" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/itznitin_in_?dlrf=MTU4NXE1ZzVtZmFsZg=="
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 text-xs md:text-sm text-white bg-[#e1306c]/20 hover:bg-[#e1306c]/40 border border-[#e1306c]/50 px-4 py-2 rounded-full transition duration-200"
          >
            <RxInstagramLogo className="h-4 w-4 text-[#e1306c]" />
            <span>Instagram</span>
          </a>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 text-xs md:text-sm text-white button-primary px-4 py-2 rounded-full transition duration-200 hover:scale-[1.03]"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 bg-[rgba(3,0,20,0.6)] p-1.5 rounded-full border border-white/10">
        {[
          { id: "all", label: "Full Resume" },
          { id: "projects", label: "Key Projects" },
          { id: "education", label: "Education" },
          { id: "skills", label: "Technical Core" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition duration-200 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary & Projects (or full width when filtered) */}
        <div className={`flex flex-col gap-8 ${activeTab === "education" ? "hidden" : activeTab === "skills" ? "hidden" : "lg:col-span-2"}`}>
          {/* Professional Summary & Career Objective */}
          {(activeTab === "all" || activeTab === "projects") && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromLeft(0.2)}
              className="p-6 md:p-8 rounded-2xl bg-[rgba(3,0,20,0.65)] border border-[rgba(112,66,248,0.38)] backdrop-blur-md shadow-lg shadow-[#2A0E61]/30 flex flex-col gap-6"
            >
              <div>
                <div className="flex items-center gap-2 text-purple-300 font-semibold text-lg mb-3">
                  <SparklesIcon className="h-5 w-5 text-cyan-400" />
                  <span>Professional Summary</span>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Highly motivated and detail-oriented Computer Science Engineering student currently pursuing B.Tech (4th Year) with a foundational Diploma in Engineering. Proficient in AI automation workflows, robust prompt engineering architecture, and cross-platform mobile application development leveraging Flutter and Dart. Possesses a strong foundation in logical software synthesis and structural problem-solving. Actively seeking a placement or engineering internship opportunity within a progressive technical ecosystem to build scalable digital solutions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[rgba(112,66,248,0.12)] border border-[rgba(112,66,248,0.4)]">
                <span className="font-bold text-cyan-300 block mb-1 text-sm">Career Objective:</span>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  To establish a hard-working software engineering role in an ambitious IT entity where I can deploy AI systems framework orchestration, core programming paradigms, and algorithmic intelligence metrics to solve critical production milestones.
                </p>
              </div>
            </motion.div>
          )}

          {/* Key Projects */}
          {(activeTab === "all" || activeTab === "projects") && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromLeft(0.3)}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 text-2xl font-bold text-white">
                <BriefcaseIcon className="h-6 w-6 text-purple-400" />
                <span>Key Projects</span>
              </div>

              {/* Project 1: Flutter Mobile App */}
              <div className="p-6 md:p-8 rounded-2xl bg-[rgba(3,0,20,0.65)] border border-[rgba(112,66,248,0.38)] backdrop-blur-md shadow-lg shadow-[#2A0E61]/30 flex flex-col gap-4 transition duration-200 hover:border-purple-400/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      Flutter Mobile Application Development
                    </h3>
                    <p className="text-cyan-400 text-xs md:text-sm font-medium">
                      Cross-Platform Application Software
                    </p>
                  </div>
                  <span className="self-start md:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    Academic
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-gray-300 list-disc list-inside">
                  <li>
                    Architected and developed high-performance, responsive mobile user interfaces across distinct device form-factors utilising Flutter framework and Dart language structures.
                  </li>
                  <li>
                    Built reusable, clean UI components and optimized screen layouts for multi-threaded systems, with continuous focus on asset initialization and application profiling.
                  </li>
                  <li>
                    Maintained rigid code cleanliness principles alongside system modularity to guarantee rapid iterative usability enhancements and high application reliability.
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Flutter", "Dart", "Mobile Architecture", "Clean Code", "UI Profiling"].map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-md text-[11px] bg-white/5 border border-white/10 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project 2: AI Automation & Prompt Systems */}
              <div className="p-6 md:p-8 rounded-2xl bg-[rgba(3,0,20,0.65)] border border-[rgba(112,66,248,0.38)] backdrop-blur-md shadow-lg shadow-[#2A0E61]/30 flex flex-col gap-4 transition duration-200 hover:border-cyan-400/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      AI Automation Workflows & Prompt Systems
                    </h3>
                    <p className="text-purple-400 text-xs md:text-sm font-medium">
                      Artificial Intelligence Solutions
                    </p>
                  </div>
                  <span className="self-start md:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    Independent
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-gray-300 list-disc list-inside">
                  <li>
                    Engineered advanced, programmatically secure prompt structures and automated logic sequences to maximize processing accuracy across various industrial use cases.
                  </li>
                  <li>
                    Constructed robust multi-tiered automation workflows leveraging modern context-aware tools to drastically reduce process redundancies and augment data operational speed.
                  </li>
                  <li>
                    Executed detailed algorithmic research onto generative transformers and modern workflow mechanics to consistently build high-yield production utilities.
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Prompt Engineering", "AI Workflows", "Generative AI", "Automation", "Transformers"].map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-md text-[11px] bg-white/5 border border-white/10 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Education, Skills, Tools */}
        <div className={`flex flex-col gap-8 ${activeTab === "projects" ? "hidden" : "lg:col-span-1"}`}>
          {/* Education Card */}
          {(activeTab === "all" || activeTab === "education") && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromRight(0.2)}
              className="p-6 md:p-8 rounded-2xl bg-[rgba(3,0,20,0.65)] border border-[rgba(112,66,248,0.38)] backdrop-blur-md shadow-lg shadow-[#2A0E61]/30 flex flex-col gap-6"
            >
              <div className="flex items-center gap-2 text-xl font-bold text-white border-b border-white/10 pb-3">
                <AcademicCapIcon className="h-6 w-6 text-cyan-400" />
                <span>Education</span>
              </div>

              <div className="flex flex-col gap-5">
                {/* Degree 1 */}
                <div className="relative pl-5 border-l-2 border-cyan-400 flex flex-col gap-1">
                  <div className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">
                    2023 — 2027
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Bachelor of Technology (B.Tech)
                  </h4>
                  <p className="text-xs text-gray-300">
                    Computer Science Engineering
                  </p>
                  <p className="text-xs text-purple-300">
                    Vikrant University, Gwalior
                  </p>
                  <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 w-max border border-cyan-500/20">
                    Final Year / 4th Year Student
                  </span>
                </div>

                {/* Degree 2 */}
                <div className="relative pl-5 border-l-2 border-purple-400 flex flex-col gap-1">
                  <div className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
                    Completed
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Diploma in Engineering
                  </h4>
                  <p className="text-xs text-gray-300">
                    Government Polytechnic College Morena
                  </p>
                </div>

                {/* Schooling */}
                <div className="relative pl-5 border-l-2 border-indigo-400 flex flex-col gap-1">
                  <div className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">
                    Completed
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Higher Secondary School (Class 12th)
                  </h4>
                  <p className="text-xs text-gray-400">
                    MP Board — Aggregate Score: 55.0%
                  </p>
                </div>

                <div className="relative pl-5 border-l-2 border-gray-500 flex flex-col gap-1">
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Completed
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    High School (Class 10th)
                  </h4>
                  <p className="text-xs text-gray-400">
                    MP Board — Aggregate Score: 65.5%
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Technical Core Card */}
          {(activeTab === "all" || activeTab === "skills") && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromRight(0.3)}
              className="p-6 md:p-8 rounded-2xl bg-[rgba(3,0,20,0.65)] border border-[rgba(112,66,248,0.38)] backdrop-blur-md shadow-lg shadow-[#2A0E61]/30 flex flex-col gap-5"
            >
              <div className="flex items-center gap-2 text-xl font-bold text-white border-b border-white/10 pb-3">
                <WrenchScrewdriverIcon className="h-6 w-6 text-purple-400" />
                <span>Technical Core</span>
              </div>

              <div className="flex flex-col gap-4">
                {technicalCore.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-gray-200">{skill.name}</span>
                      <span className="text-cyan-400">{skill.level}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                        style={{ width: `${skill.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tools & Frameworks */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-xs font-semibold text-gray-300 block mb-2.5">
                  Tools & Frameworks
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {toolsAndFrameworks.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md text-[11px] bg-white/5 border border-white/10 text-gray-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Competencies */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-xs font-semibold text-gray-300 block mb-2.5">
                  Core Competencies
                </span>
                <ul className="flex flex-col gap-1.5 text-xs text-gray-400">
                  {coreCompetencies.map((comp) => (
                    <li key={comp} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                      {comp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                  <LanguageIcon className="h-4 w-4 text-purple-400" />
                  <span>Languages</span>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    Hindi (Native)
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    English (Professional)
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
