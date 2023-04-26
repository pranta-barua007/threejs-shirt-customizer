import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";

import stateAtom from "../store";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";

import {
  AIPicker,
  ColorPicker,
  FilePicker,
  Tab,
} from "../components";

const Customizer = () => {
  const [_state, setState] = useAtom(stateAtom);

  const [file, setFile] = useState("");

  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  console.log(import.meta.env.MODE); // 123

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");
    // '/.netlify/functions/generate-ai-photo'
    const URL = import.meta.env.DEV ? "/" : import.meta.env.VITE_API_URL;

    try {
      //call backend api for generating image
      setGeneratingImg(true);

      const response = await fetch(`${URL}.netlify/functions/generate-ai-photo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (err) {
      alert(err);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleDecals = (type, result) => {
    console.log({ type, result });
    const decalType = DecalTypes[type];
    console.log({ decalType });
    //state[decalType.stateProperty] = result;
    setState((prev) => ({
      ...prev,
      [decalType.stateProperty]: result,
    }));

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        setState((prev) => ({
          ...prev,
          isLogoTexture: !activeFilterTab[tabName],
        }));
        break;
      case "stylishShirt":
        setState((prev) => ({
          ...prev,
          isFullTexture: !activeFilterTab[tabName],
        }));
        break;
      case "downloadShirt":
        downloadCanvasToImage();
        break;
      default:
        setState((prev) => ({
          ...prev,
          isLogoTexture: true,
          isFullTexture: false,
        }));
        break;
    }

    setActiveFilterTab((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        key="custom"
        className="absolute top-0 left-0 z-10"
      >
        <div className="flex items-center min-h-screen">
          <div className="editortabs-container tabs">
            {EditorTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => setActiveEditorTab(tab.name)}
              />
            ))}
            {generateTabContent()}
          </div>
        </div>
      </motion.div>
      <motion.div className="filtertabs-container">
        {FilterTabs.map((tab) => (
          <Tab
            key={tab.name}
            tab={tab}
            isFilterTab
            isActiveTab={activeFilterTab[tab.name]}
            handleClick={() => handleActiveFilterTab(tab.name)}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default Customizer;
