import React, { useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { FaGlobe } from 'react-icons/fa';
import Slider from './Slider'; // Import the Slider component

const ProjectsCard = ({ title, des, src, githubUrl, projectUrl }) => {
  const [showSlider, setShowSlider] = useState(false); // State to control the visibility of the slider

  const handleCardClick = () => {
    setShowSlider(true); // Show the slider when the card is clicked
  };

  const handleGithubIconClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent card element
    window.open(githubUrl, '_blank'); // Open the GitHub URL in a new tab
  };

  const handleGlobeIconClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent card element
    window.open(projectUrl, '_blank'); // Open the Project URL in a new tab
  };

  const handleSliderClose = () => {
    setShowSlider(false); // Close the slider when the close button is clicked
  };

  return (
    <>
      <div
        className="w-full p-4 xl:px-12 h-auto xl:py-10 rounded-lg shadow-shadowOne flex flex-col bg-gradient-to-r from-bodyColor to-[#202327] group hover:bg-gradient-to-b hover:from-gray-900 hover:gray-900 transition-colors duration-1000"
        onClick={handleCardClick}
      >
        <div className="w-full h-[80%] overflow-hidden rounded-lg">
          <img
            className="w-full h-60 object-cover group-hover:scale-110 duration-300 cursor-pointer"
            src={Array.isArray(src) ? src[0] : src} // Check if src is an array and display the first image in the array
            alt="src"
          />
        </div>
        <div className="w-full mt-5 flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base uppercase text-purple-500 font-normal">
                {title}
              </h3>
              <div className="flex gap-2">
                {/* GitHub Icon */}
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleGithubIconClick}
                  className="text-lg w-10 h-10 rounded-full bg-black inline-flex justify-center items-center text-gray-400 hover:text-designColor duration-300 cursor-pointer"
                >
                  <BsGithub />
                </a>
                {/* Globe Icon */}
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleGlobeIconClick}
                  className="text-lg w-10 h-10 rounded-full bg-black inline-flex justify-center items-center text-gray-400 hover:text-designColor duration-300 cursor-pointer"
                >
                  <FaGlobe />
                </a>
              </div>
            </div>
            <p className="text-sm tracking-wide mt-3 hover:text-gray-100 duration-300">
              {des}
            </p>
          </div>
        </div>
      </div>

      {/* Slider */}
      {showSlider && (
        <Slider
          images={Array.isArray(src) ? src : [src]} // Pass the array of images or convert the single image to an array
          onClose={handleSliderClose}
        />
      )}
    </>
  );
};

export default ProjectsCard;
