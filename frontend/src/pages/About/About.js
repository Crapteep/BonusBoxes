import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { DiReact, DiJavascript1, DiHtml5, DiCss3 } from 'react-icons/di';
import { SiMongodb, SiTypescript, SiGit, SiSass } from 'react-icons/si';
// import ProjectCard from '../../components/ProjectCard'
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';

const AboutMePage = () => {
  const [showDetails, setShowDetails] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // const handleHover = () => {
  //   setIsHovered(!isHovered);
  // };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const animateElement = (element, properties, delay = 0) => (
    <motion.div
      {...properties}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {element}
    </motion.div>
  );

  return (
    <div className="about-me-page">
      <motion.div
        className="background"
        initial={{ backgroundColor: '#EAEAEA' }}
        animate={{ backgroundColor: '#F5F5F5' }}
        transition={{ duration: 1 }}
      />
      <header>
        {animateElement(
          <motion.h1>About Me</motion.h1>,
          { opacity: 1, y: 0 },
        )}
      </header>
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-content">
          {animateElement(
            <motion.h2>Hi, I'm John Doe</motion.h2>,
            { opacity: 1, y: 0 },
            0.1,
          )}
          {animateElement(
            <motion.p>Welcome to my personal website!</motion.p>,
            { opacity: 1, y: 0 },
            0.2,
          )}
          {animateElement(
            <motion.button onClick={toggleDetails}>Show Details</motion.button>,
            { opacity: 1, y: 0 },
            0.3,
          )}
        </div>
      </motion.section>
      {showDetails && (
        <motion.section
          className="details-section"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="details-content">
            <h2>Background</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </motion.section>
      )}
      <motion.section
        className="skills-section"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="skills-content">
          {animateElement(
            <h2>Skills</h2>,
            { opacity: 1, y: 0 },
          )}
          <ul className="list-group">
            {animateElement(
              <motion.li
                className="list-group-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <DiReact className="icon" /> React
              </motion.li>,
              { opacity: 1, y: 0 },
              0.1,
            )}
            {animateElement(
              <motion.li
                className="list-group-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <DiJavascript1 className="icon" /> JavaScript
              </motion.li>,
              { opacity: 1, y: 0 },
              0.2,
            )}
            {animateElement(
              <motion.li
                className="list-group-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <DiHtml5 className="icon" /> HTML
              </motion.li>,
              { opacity: 1, y: 0 },
              0.3,
            )}
            {animateElement(
              <motion.li
                className="list-group-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <DiCss3 className="icon" /> CSS
              </motion.li>,
              { opacity: 1, y: 0 },
              0.4,
            )}
           
            {animateElement(
              <motion.li
                className="list-group-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SiMongodb className="icon" /> MongoDB
              </motion.li>,
              { opacity: 1, y: 0 },
              0.6,
            )}
            {animateElement(
              <motion.li
                className="list-group-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SiTypescript className="icon" /> TypeScript
              </motion.li>,
              { opacity: 1, y: 0 },
              0.7,
            )}
            {animateElement(
              <motion.li
                className="list-group-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SiGit className="icon" /> Git
              </motion.li>,
              { opacity: 1, y: 0 },
              0.8,
            )}
            {animateElement(
              <motion.li
                className="list-group-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SiSass className="icon" /> Sass
              </motion.li>,
              { opacity: 1, y: 0 },
              0.9,
            )}
          </ul>
        </div>
      </motion.section>
      <motion.section
        className="projects-section"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="projects-content">
          {animateElement(
            <h2>Projects</h2>,
            { opacity: 1, y: 0 },
          )}
          <div className="row">
            {/* <ProjectCard /> */}
            <motion.div
              className={`col-sm-6 ${isFlipped ? 'flipped' : ''}`}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
            >
              <motion.div
                className="card"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="card-body">
                  <h3 className="card-title">Project 1</h3>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  {isFlipped && (
                    <div className="card-link">
                      <a href="https://github.com/project1" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className={`col-sm-6 ${isFlipped ? 'flipped' : ''}`}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
            >
              <motion.div
                className="card"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="card-body">
                  <h3 className="card-title">Project 2</h3>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  {isFlipped && (
                    <div className="card-link">
                      <a href="https://github.com/project1" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
            
            Kolejne karty projektów
          </div>
        </div>
      </motion.section>
      <motion.section
        className="contact-section"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="contact-content">
          <h2>Contact</h2>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AiOutlineMail className="icon" /> michol.g555@gmail.com
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AiOutlinePhone className="icon" /> 570 315 979
          </motion.p>
        </div>
      </motion.section>
      <footer>
        <p>&copy; 2023 John Doe</p>
      </footer>
    </div>
  );
};

export default AboutMePage;
