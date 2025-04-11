import React, { useState, useEffect } from 'react';

interface NumberTileProps {
  numbers?: (number|null)[]; // For grid mode
  numberTile?: (number|null);   // For tile mode
  mode?: 'g' | 't';
  pencilMode?: boolean;
  tabIndex?:number;
  selected?:boolean;
  onClick?: ()=>void;
};

const NumberTile: React.FC<NumberTileProps> = ({
  numbers = undefined,
  numberTile = null,
  mode = 'g',
  pencilMode = false,
  tabIndex = 0,
  selected = false,
  onClick = ()=>{},
}) => {
  const [numberForTile, setNumberForTile] = useState<number | null>(null);
  const [numbersForGrid, setNumbersForGrid] = useState<(number|null) [] | undefined>(undefined);

  useEffect(()=> {
    let arr: (number|null)[] = Array(9).fill(null);
    if (numbers !== undefined) {
      numbers.map(i => arr[i-1] = i);
    }
    setNumbersForGrid(arr);
  }, []);

  useEffect(()=>{
    console.log("pencil mode is ", pencilMode);
  }, [pencilMode]);

  const borderColor = selected? 'border-black' : 'border-gray-300';
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (mode === 't') return; 
    const key = e.key;
    if (/^[1-9]$/.test(key)) {
      const num = parseInt(key);
      console.log("handlekeydown ", num);
      setNumbersForGrid((prevNums: (number|null)[]|undefined) => {
        if (!prevNums) return prevNums;
        let currNums = [...prevNums];
        currNums[num-1] = currNums[num-1]===null? num: null;
        return currNums;
      })
    }
  };

  return (
    <div
      tabIndex={tabIndex}  // make it focusable, so onKeyDown can be triggered
      className={`w-[60px] h-[60px] text-center justify-center ${mode==='g'?'p-1':''} bg-white border ${borderColor} ${
        mode === 'g' ? 'grid grid-cols-3 grid-rows-3 gap-1' : ''
      }`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {mode === 'g' ? 
        numbersForGrid?.map((num, index) => (
          <div key={index} className="flex items-center justify-center"> {num !== null? num : ''}
          </div>
        ))
        : (
          <input
            type="text"
            value={numberForTile === null ? '' : numberForTile}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                setNumberForTile(null);
                return;
              }
              // Only take the last character
              const lastChar = value.slice(-1);
              if (/^[1-9]$/.test(lastChar)) {
                setNumberForTile(parseInt(lastChar));
              }
            }}
            className="w-full h-full text-center text-5xl caret-transparent"
          />
        )}
    </div>
  );
};

export default NumberTile;
