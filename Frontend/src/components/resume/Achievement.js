import React from "react";
import { motion } from "framer-motion";
import ResumeCard from "./ResumeCard";

const Achievement = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="py-12 font-titleFont flex gap-20"
    >
      <div>
        <div className="py-12 font-titleFont flex flex-col gap-4">
          <h2 className="text-4xl font-bold">Awards</h2>
        </div>
        <div className="mt-14 w-[1050px] h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="AG 10th Annual all island 
            Swimming Championship 2012-
            3rd 
            Place of 100M Free style 
            under 13"
            subTitle=""
            result="Success"
            des=""
          />
          <ResumeCard
            title="SAG 12th Annual all island 
            Swimming Championship 2014-
            3
            rd Place of 100M Free style 
            under 15"
            subTitle=""
            result="Success"
            des=""
          />
          <ResumeCard
            title="Best Batsmen Annual New 
            Year Cricket tournament 2018. 
            Ambalangoda U.C. Cricket 
            Academy."
            subTitle=""
            result="Success"
            des=""
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Achievement;
