import React from 'react'
import { FaFacebookF, FaGithub, FaLinkedinIn, FaReact } from "react-icons/fa";
import { SiTailwindcss, SiFigma, SiNextdotjs, SiJava, SiPython, SiAndroidstudio, SiKotlin } from "react-icons/si";
const Media = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 lgl:gap-0 justify-between ">
        <div>
          <h2 className="text-base uppercase font-titleFont mb-4">
            Find me in
          </h2>
          <div className="flex gap-4 ">
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
        <div>
          <h2 className="text-base uppercase font-titleFont mb-4">
            BEST SKILL ON
          </h2>
          <div className="flex gap-4">
           <a href='https://react.dev/'> <span className="bannerIcon hover:text-purple-500">
              <FaReact />
            </span></a>
          <a href='https://www.java.com/en/'> <span className="bannerIcon hover:text-purple-500">
              <SiJava />
            </span></a> 
            <a href='https://www.python.org/'> <span className="bannerIcon hover:text-purple-500">
              <SiPython />
            </span></a> 
            <a href='https://developer.android.com/studio'> <span className="bannerIcon hover:text-purple-500">
              <SiAndroidstudio />
            </span></a>
            <a href='https://kotlinlang.org/'> <span className="bannerIcon hover:text-purple-500">
              <SiKotlin />
            </span></a>
           <a href='https://tailwindui.com/'> <span className="bannerIcon hover:text-purple-500">
              <SiTailwindcss />
            </span></a>
           <a href='https://www.figma.com/'> <span className="bannerIcon hover:text-purple-500">
              <SiFigma />
            </span></a>
          </div>
        </div>
      </div>
  )
}

export default Media