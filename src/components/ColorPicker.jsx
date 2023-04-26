import React from 'react'
import { SketchPicker } from 'react-color';
import { useAtom } from 'jotai'

import stateAtom from '../store';

const ColorPicker = () => {
  const [state, setState] = useAtom(stateAtom);

  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker 
        color={state.color}
        disableAlpha
        onChange={(color) => setState((prev) => ({ ...prev, color: color.hex }))}  
      />  
    </div>
  )
}

export default ColorPicker