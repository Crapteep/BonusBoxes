import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdKeyboardArrowRight } from 'react-icons/md';


const ProjectCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className={`project-card ${isFlipped ? 'flipped' : ''}`}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <motion.div
        className="card"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-front">
          <div className="card-body">
            <h3 className="card-title">Project 1</h3>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="card-footer">
            <MdKeyboardArrowRight className="arrow-icon" />
          </div>
        </div>
        <div className="card-back">
          <div className="card-body">
            <h3 className="card-title">Project 1</h3>
            <p className="card-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="card-links">
              <a href="https://github.com/project1" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              {/* Dodaj inne linki dla projektu */}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};



export default ProjectCard;