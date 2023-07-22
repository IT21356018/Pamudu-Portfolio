// Slider.js
import React, { useState } from 'react';

const Slider = ({ images, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50"> {/* Set the z-index to 50 for the maximum value */}
      <div className="relative">
        <button
          className="absolute top-2 left-2 text-white text-xl"
          onClick={handlePrevious}
        >
          &#8249;
        </button>
        <button
          className="absolute top-2 right-2 text-white text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex justify-center">
          <img
            src={images[currentImageIndex]}
            alt={`Slider Image ${currentImageIndex + 1}`}
            className="w-200 h-96 object-cover mx-4 mt-20" // Increased the size to w-200 and h-96, added mt-20 for margin-top
          />
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handlePrevious}
            className="text-white text-lg p-2 bg-transparent border border-white rounded-full mx-2 hover:bg-white hover:text-black"
          >
            &#8249; Previous
          </button>
          <span className="text-white mx-2">
            {currentImageIndex + 1} / {images.length}
          </span>
          <button
            onClick={handleNext}
            className="text-white text-lg p-2 bg-transparent border border-white rounded-full mx-2 hover:bg-white hover:text-black"
          >
            Next &#8250;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
