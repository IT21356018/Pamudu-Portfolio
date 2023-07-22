import React from 'react'
import { motion } from 'framer-motion';
import ResumeCard from './ResumeCard';

const Education = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="w-full flex flex-col lgl:flex-row gap-10 lgl:gap-20"
    >
      {/* part one */}
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold">Education Quality</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="BSc in Information Technology - Software Engineering (SLIIT)"
            subTitle="SLIIT (2021 - present)"
            result="Ongoing"
            des="The training provided by universities in order to prepare people to work in various sectors of the economy or areas of culture."
          />
          <ResumeCard
            title="G.C.E Ordinary Level"
            subTitle="G/Dharmasoka Collage (2016)"
            result="Completed"
            des="Index No-609322956    "
            des1="1A’s 2B’s 1C’s"
          />
          <ResumeCard
            title="G.C.E Advance Level"
            subTitle="G/Dharmasoka Collage (2020)"
            result="Completed"
            des="Index No-1976704 "
            des1="Physics-C, Chemistry-C, Combined Mathematics-S, General English-B"
          />
        </div>
      </div>
      {/* part Two */}
    </motion.div>
  );
}

export default Education