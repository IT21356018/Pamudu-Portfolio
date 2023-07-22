import React, { useState } from 'react';
import Title from '../layouts/Title';
import { projectOne, projectTwo, projectThree, projectOneImages, projectTwoImages, com } from "../../assets/index";
import ProjectsCard from './ProjectsCard';
import Slider from './Slider';

const Projects = () => {
  const [showSlider, setShowSlider] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleProjectCardClick = (projectIndex) => {
    setShowSlider(true);
    setSelectedProject(projectIndex);

    if (projectIndex === 0) {
      setSelectedImages(projectOneImages);
    } else if (projectIndex === 1) {
      setSelectedImages([projectTwo]);
    } else if (projectIndex === 2) {
      setSelectedImages([projectThree]);
    }
  };

  const handleSliderClose = () => {
    setShowSlider(false);
    setSelectedProject(null);
  };

  const projects = [
    {
      title: "Online Clothing Management System",
      des: "The Online Clothing Management System is a dynamic and user-friendly web application developed by me. It enables seamless management of an online clothing store, allowing users to effortlessly add, edit, and delete clothing products. With robust inventory tracking and order processing features, the system ensures smooth operations and optimal customer satisfaction. Implemented with modern technologies and featuring secure user authentication, this website offers an efficient and reliable solution for clothing store management.",
      src: projectOneImages,
      githubUrl: "https://github.com/IT21235092/ClothingShopManagementSystem.git",
    },
    {
      title: "JOBLINK-Mobile Application",
      des: "JOBLINK is a powerful and user-friendly Android app developed using Kotlin, designed to revolutionize job searching. With an intuitive interface and advanced features, users can effortlessly discover exciting career opportunities, receive real-time job alerts, and apply directly from the app. Personalized profiles and a built-in resume builder showcase candidates effectively to potential employers, making JOBLINK the ultimate tool for aspiring professionals.",
      src: projectTwoImages,
      githubUrl: "https://github.com/IT21235092/MAD-JobLink-Android-Project.git",
    },
    {
      title: "Online Gaming System – Web Application",
      des: "Coming Soon. I will update the details later",
      src: com,
      githubUrl: "",
    },
  ];

  return (
    <section id="projects" className="w-full py-20 border-b-[1px] border-b-black">
      <div className="flex justify-center items-center text-center">
        <Title title="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK" des="My Projects" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14">
        {projects.map((project, index) => (
          <ProjectsCard
            key={index}
            title={project.title}
            des={project.des}
            src={project.src}
            githubUrl={project.githubUrl} // Pass the GitHub URL as a prop
            onClick={() => handleProjectCardClick(index)}
          />
        ))}
      </div>

      {/* Slider */}
      {showSlider && selectedProject !== null && (
        <Slider
          images={selectedImages}
          onClose={handleSliderClose}
        />
      )}
    </section>
  );
};

export default Projects;
