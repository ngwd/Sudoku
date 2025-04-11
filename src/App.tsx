import './index.css'; // Or your Tailwind CSS file
import React, { useState } from 'react';
import NumberTile from './component/NumberTile'; 
import SudokuCanvas from './component/SudokuCanvas';
import Toggle from './component/Toggle'; 

function App() {
  const [pencilMode, setPencilMode] = useState(false);
  return (
    <div>
      <div className="bg-blue-500 text-white p-4">If Tailwind works, it shows blue</div>
      <Toggle onToggle={()=>setPencilMode(!pencilMode)}/>

      <h2>Grid Mode:</h2>
      <NumberTile mode='g' />
      <NumberTile numbers={[1, 2, 6, 9]} pencilMode={pencilMode}/>

      <h2>Tile Mode:</h2>
      <NumberTile mode='t' />

      <h2>Canvas:</h2>
      <SudokuCanvas pencilMode={pencilMode}/>
    </div>
  );
}
export default App;