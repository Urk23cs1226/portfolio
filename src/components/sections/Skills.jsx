import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaJava, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaGithub 
} from 'react-icons/fa';
import { 
  SiPython, SiReact, SiNodedotjs, SiExpress, SiMongodb, 
  SiArduino, SiOpencv 
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

const SKILLS_DATA = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Java', icon: FaJava, color: '#F89820' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
      { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
    ]
  },
  {
    category: 'Frontend Development',
    skills: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' }
    ]
  },
  {
    category: 'Backend & APIs',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#FFFFFF' },
      { name: 'REST APIs', icon: TbApi, color: '#00E5FF' }
    ]
  },
  {
    category: 'Database Systems',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' }
    ]
  },
  {
    category: 'Tools & Hardware',
    skills: [
      { name: 'Git', icon: FaGitAlt, color: '#F05032' },
      { name: 'GitHub', icon: FaGithub, color: '#FFFFFF' },
      { name: 'Arduino (IoT)', icon: SiArduino, color: '#00979D' },
      { name: 'OpenCV (Vision)', icon: SiOpencv, color: '#5C3EE8' },
    ]
  }
];

function SkillCategoryCard({ category, skills, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Limit tilt angle
    const rotX = (y / (rect.height / 2)) * -12;
    const rotY = (x / (rect.width / 2)) * 12;

    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `0 15px 35px rgba(0, 229, 255, 0.12)`;
    card.style.borderColor = `rgba(0, 229, 255, 0.25)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = `0 8px 32px 0 rgba(0, 0, 0, 0.37)`;
    card.style.borderColor = `rgba(255, 255, 255, 0.08)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="h-full"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        className="h-full"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="glass-card rounded-2xl p-6 h-full flex flex-col justify-between border border-white/8 backdrop-blur-xl transition-all duration-150 select-none interactive-3d"
        >
          <div>
            <h3 className="font-heading text-lg font-bold text-white mb-6 tracking-wide">
              {category}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <IconComponent style={{ color: skill.color }} className="text-xl flex-shrink-0" />
                    <span className="text-xs font-body text-text-light/95">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Cybernetic bottom bar */}
          <div className="w-full h-[1px] bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 mt-6" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section 
      id="skills" 
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 py-16"
    >
      <div className="space-y-2 mb-12 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
          My <span className="text-accent-purple text-glow-purple">Skills</span>
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-accent-purple to-accent-blue mx-auto md:mx-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILLS_DATA.map((group, index) => (
          <SkillCategoryCard
            key={group.category}
            category={group.category}
            skills={group.skills}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
