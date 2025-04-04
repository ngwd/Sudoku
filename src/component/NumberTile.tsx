import React, { useEffect, useRef, useState } from 'react';

interface NumberTileProps {
  numbers: number[]; // For grid mode
  numberTile: number|null;   // For tile mode
  mode: 'g'|'t';   // 'g' or 't'
  onChange?: (number: number) => void; // Callback for single mode changes
  isSelected?: boolean;
  onSelected?:() => void;
};

const NumberTile: React.FC<NumberTileProps> = ({
  numbers,
  numberTile = null,
  mode = 'g',
  onChange,
  isSelected = false,
  onSelected,
}) => {
  let style:string  = "";
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(()=> {
    if (isSelected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelected]);
  const [numbersForGrid, setNumbersForGrid] = useState<(number | null)[]>(Array(9).fill(null));
  const [numberForTile, setNumberForTile] = useState< number | null>();
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 9) {
      if (mode === 'g') {
        console.log(mode, value);
        setNumbersForGrid( (prevNums:(number|null)[])  => {
          let currNums = [...prevNums];
          currNums[value-1] = currNums[value-1]!==undefined ? value : null;
          return currNums;
        })
      } else {
        console.log(mode, value);
        setNumberForTile(value);
      } 
      if (onChange) {
        onChange(value);
      }
    }
  };
  if (numbers.length > 1) {
    style = "w-[60px] h-[60px] border items-center justify-center p-1 grid grid-cols-3 grid-rows-3 gap-1";
    numbers.map(i => numbersForGrid[i-1]  = i);
    return (
      <div className={style}>
        {numbersForGrid.map((num, index) => (
          <div key={index}> {num !== null? num : ''}
          </div>
        ))}
      </div>
    );
  }
  else {
    return (
      <input
        ref={inputRef}
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
        className={`w-[60px] h-[60px] text-center p-2 border border-gray-300 flex items-center justify-center text-5xl hide-number-arrows caret-transparent ${
          isSelected ? 'bg-gray-200' : 'bg-white'
        }`}
        onClick={onSelected}
      />
    );
  } 
    /*
    return (
      <input
        type="number"
        value={number}
        onChange={handleNumberChange}
        min={1}
        max={9}
        style={{ padding: '8px', border: '1px solid #ccc' }}
      />
    );
    */
};
export default NumberTile;