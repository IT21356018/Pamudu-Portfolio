import React from 'react'
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { contactImg } from "../../assets/index";

const ContactLeft = () => {
  return (
    <div className="w-full lgl:w-[35%] h-full bg-gradient-to-r from-[#1e2024] to-[#23272b] p-4 lgl:p-8 rounded-lg shadow-shadowOne flex flex-col gap-8 justify-center">
      <img
        className="w-full h-64 object-cover rounded-lg mb-2"
        src={contactImg}
        alt="contactImg"
      />
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold text-white">Pamudu Chamikara</h3>
        <p className="text-lg font-normal text-gray-400">
          MERN Stack Developer
        </p>
        <p className="text-base text-gray-400 tracking-wide">
        Experienced full-stack developer passionate about crafting high-quality web applications. Proficient in front-end and back-end technologies, with a focus on user experience and performance optimization. Strong collaboration skills and adaptable to agile environments. Always learning and staying up-to-date with the latest technologies.
        </p>
        <p className="text-base text-gray-400 flex items-center gap-2">
          Phone: <span className="text-lightText">+94 719513764</span>
        </p>
        <p className="text-base text-gray-400 flex items-center gap-2">
          Email: <span className="text-lightText">kpamudu@gmail.com</span>
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-base uppercase font-titleFont mb-4">Find me in</h2>
        <div className="flex gap-4">
        <a href='https://web.facebook.com/pamuduchamikara'>  <span className="bannerIcon hover:text-purple-500">
              <FaFacebookF />
            </span></a>
          <a href='https://github.com/IT21356018'> <span className="bannerIcon hover:text-purple-500">
              <FaGithub />
            </span></a>
            <a href='https://www.linkedin.com/in/pamudu-chamikara-142593216/S'>  <span className="bannerIcon hover:text-purple-500">
              <FaLinkedinIn />
            </span></a>
        </div>
      </div>
    </div>
  );
}

export default ContactLeft