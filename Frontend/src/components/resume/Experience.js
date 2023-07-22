// Projects.js
import React, { useState } from 'react';
import Title from '../layouts/Title';
import { ppro,pbegin,web, Java, ID } from "../../assets/index";
import ProjectsCard from './ProjectsCard';
import Slider from '../projects/Slider';

const Projects = () => {
  const [showSlider, setShowSlider] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleProjectCardClick = (projectIndex) => {
    setShowSlider(true);
    setSelectedProject(projectIndex);

    if (projectIndex === 0) {
      setSelectedImages(ppro);
    } else if (projectIndex === 1) {
      setSelectedImages([pbegin]);
    } else if (projectIndex === 2) {
      setSelectedImages([web]);
    }
  };

  const handleSliderClose = () => {
    setShowSlider(false);
    setSelectedProject(null);
  };

  const projects = [
    {
      title: "Certificate of Python for Beginners by University of Moratuwa ",
      des: "The Certificate of Python for Beginners offered by the University of Moratuwa is a comprehensive introductory course designed for individuals who have little or no prior experience with programming and want to learn Python, one of the most popular and versatile programming languages in the world.",
      src: pbegin,
    },
    {
      title: "Certificate of Python Programming by University of Moratuwa",
      des: "The Certificate of Python Programming offered by the University of Moratuwa is an in-depth and comprehensive program designed for individuals seeking to master the Python programming language. This certificate course is ideal for both beginners who want to learn programming from scratch and experienced programmers who wish to enhance their skills and proficiency in Python.",
      src: ppro,
    },
    {
      title: "Certificate of Web Development by University of Moratuwa",
      des: "The Certificate of Web Development offered by the University of Moratuwa is a comprehensive program designed to equip individuals with the essential skills and knowledge required to excel in the field of web development. Whether you are a beginner looking to start a career in web development or an experienced developer seeking to expand your skillset, this certificate course provides a solid foundation and practical experience in web development technologies and methodologies.",
      src: web,
    },
    {
      title: "Certificate of Java Programming by Great Learning",
      des: "The Certificate of Java Programming offered by Great Learning is a comprehensive program designed to provide participants with a strong foundation in Java programming and equip them with the essential skills required to become proficient Java developers. Whether you are a beginner stepping into the world of programming or an experienced programmer looking to enhance your Java skills, this certificate course is tailored to meet the needs of learners at all levels.",
      src: Java,
    },
    {
      title: "Certificate of Design Thinking by Great Learning",
      des: "The Certificate of Design Thinking offered by Great Learning is an immersive and transformative program that empowers participants to harness the principles and methodologies of Design Thinking to solve complex problems and drive innovation across various domains. This certificate course is ideal for individuals from diverse backgrounds, including business professionals, product managers, designers, engineers, and entrepreneurs, seeking to cultivate a creative and user-centric mindset.",
      src: ID,
    },
  ];

  return (
    <section id="projects" className="w-full py-20 border-b-[1px] border-b-black">
      <div className="flex justify-center items-center text-center">
        <Title title="" des="My Certificates" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14">
        {projects.map((project, index) => (
          <ProjectsCard
            key={index}
            title={project.title}
            des={project.des}
            src={project.src}
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
