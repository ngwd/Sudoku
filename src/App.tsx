import './index.css'; // Or your Tailwind CSS file
import React, { useState } from 'react';
import NumberTile from './component/NumberTile'; 

function App() {
  const [singleNumber, setSingleNumber] = useState(5);

  return (
    <div>
      <div className="bg-blue-500 text-white p-4">If Tailwind works, it shows blue</div>
      <h2>Grid Mode:</h2>
      <NumberTile numbers={[1, 2, 6, 9]} />

      <h2>Tile Mode:</h2>
      <NumberTile numbers={[]} numberTile={4} mode='t' />
    </div>
  );
}

export default App;