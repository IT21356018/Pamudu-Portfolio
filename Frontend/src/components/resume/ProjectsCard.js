// ProjectsCard.js
import React, { useState } from 'react';
import { BsGithub } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import Slider from './Slider'; // Import the Slider component

const ProjectsCard = ({ title, des, src }) => {
  const [showSlider, setShowSlider] = useState(false); // State to control the visibility of the slider

  const handleCardClick = () => {
    setShowSlider(true); // Show the slider when the card is clicked
  };

  const handleSliderClose = () => {
    setShowSlider(false); // Close the slider when the close button is clicked
  };

  return (
    <>
      <div className="w-full p-4 xl:px-12 h-auto xl:py-10 rounded-lg shadow-shadowOne flex flex-col bg-gradient-to-r from-bodyColor to-[#202327] group hover:bg-gradient-to-b hover:from-gray-900 hover:gray-900 transition-colors duration-1000" onClick={handleCardClick}>
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
}

export default ProjectsCard;
