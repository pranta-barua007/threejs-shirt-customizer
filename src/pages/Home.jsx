import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom } from 'jotai'
import { CustomButton } from "../components";
import stateAtom from "../store";

import {
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const Home = () => {
  const [state, setState] = useAtom(stateAtom);
  return (
    <AnimatePresence>
      {state.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./threejs.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>
          <motion.div className="home-content" {...headTextAnimation}>
            <h1 className="head-text">
              LET'S <br className="xl:block hidden" /> DO IT.
            </h1>
          </motion.div>
          <motion.div {...headContentAnimation} className="flex flex-col gap-5">
            <p className="max-w-md font-normal text-gray-600 text-base">
              Create your unique and exclusive shirt with our brand-new 3D
              customization tool. <strong>Unleash your imagination</strong> and
              define your own style.
            </p>
            <CustomButton
              type="filled"
              title="Customize It"
              handleClick={() => setState((prev) => ({ ...prev, intro: false }))}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
