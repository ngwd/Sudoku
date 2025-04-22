import React, { useState, useEffect } from 'react';

interface NumberTileProps {
  numbers?: (number|null)[]; // For grid mode
  numberTile?: (number|null);   // For tile mode
  pencilMode?: boolean;
  tabIndex?:number;
  selected?:boolean;
  highlighted?:boolean;
  onClick?: ()=>void;
};

const NumberTile: React.FC<NumberTileProps> = ({
  numbers = undefined,
  numberTile = null,
  pencilMode = false,
  tabIndex = 0,
  selected = false,
  highlighted = false,
  onClick = ()=>{},
}) => {
  const [numberForTile, setNumberForTile] = useState<number | null>(null);
  const [numbersForGrid, setNumbersForGrid] = useState<(number|null) [] | undefined>(undefined);
  const [mode, setMode] = useState<'t'|'g'>('t');

  useEffect(()=> {
    if (selected) {
      setMode(pencilMode ? 'g' : 't'); 
    }
  }, [pencilMode]);

  const borderColor = selected ? 'border-black' : 'border-gray-300';
  const bgColor = highlighted ? (selected? 'bg-blue-300' : 'bg-blue-100') : 'bg-white';
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    if (pencilMode && mode === 't' || 
        !pencilMode && mode === 'g') {
      if (selected) {
        let arr: (number|null)[] = Array(9).fill(null);
        setNumbersForGrid(arr);
        setNumberForTile(null);
      }
      setMode(pencilMode ? 'g': 't');
    }
    if (/^[1-9]$/.test(key)) {
      const num = parseInt(key);
      if (mode === 'g') {
        setNumbersForGrid((prevNums: (number|null)[]|undefined) => {
          if (!prevNums) return prevNums;
          let currNums = [...prevNums];
          currNums[num-1] = currNums[num-1]===null? num: null;
          return currNums;
        })
      } else {
        setNumberForTile(num);
      }
    }
  };

  return (
    <div
      tabIndex={tabIndex}  // make it focusable, so onKeyDown can be triggered
      className={`w-[60px] h-[60px] text-center justify-center ${mode==='g' ? 'p-1' : ''} ${bgColor} border ${borderColor} 
              ${mode === 'g' ? 'grid grid-cols-3 grid-rows-3 gap-1' : 'flex items-center justify-center'}
              ${mode === 'g' ? 'text-sm' : 'text-3xl'}
              `}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {mode === 'g' ? 
        numbersForGrid?.map((num, index) => (
          <div key={index} className="flex items-center justify-center"> 
            <span>{num !== null ? +num : ''}</span>
          </div>
        ))
        : <span>{numberForTile}</span>
      }
    </div>
  );
};

export default NumberTile;
