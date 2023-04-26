import React from 'react'
import { useAtom } from 'jotai'

import stateAtom from '../store';
import { getContrastingColor } from '../config/helpers';

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const [state] = useAtom(stateAtom);

  const generateStyle = (type) => {
    if(type === 'filled') {
      return {
        backgroundColor: state.color,
        color: getContrastingColor(state.color)
      }
    } else if(type === "outline") {
      return {
        borderWidth: '1px',
        borderColor: state.color,
        color: state.color
      }
    }
  }

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton