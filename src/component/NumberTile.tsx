import React, { useEffect, useRef, useState } from 'react';

interface NumberTileProps {
  numbers?: (number|null)[]; // For grid mode
  numberTile?: (number|null);   // For tile mode
  mode?: 'g'|'t';   // 'g' or 't'
  isSelected?: boolean;
  onSelected?:() => void;
};

const NumberTile: React.FC<NumberTileProps> = ({
  numbers = undefined,
  numberTile = null,
  mode = 'g',
  isSelected = false,
  onSelected,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [numbersForGrid, setNumbersForGrid] = useState<(number|null) [] | undefined>(undefined);
  const [numberForTile, setNumberForTile] = useState<number | null>(null);
  useEffect(()=> {
    if (isSelected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelected]);
  useEffect(()=> {
    if (numbers !== undefined) {
      let arr: (number|null)[] = Array(9).fill(null)
      numbers.map(i => arr[i-1] = i);
      setNumbersForGrid(arr);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    if (/^[1-9]$/.test(key)) {
      const num = parseInt(key);
      setNumbersForGrid((prevNums: (number|null)[]|undefined) => {
        let currNums = null;
        if (prevNums === undefined) {
          return;
        }
        currNums = [...prevNums];
        if (currNums[num-1] === num) {
          currNums[num-1] = null;
        }
        else {
          currNums[num-1] = null;
        }
        currNums[num-1] = currNums[num-1]!==null? num: null;
        return currNums;
      })
    }
  };
  if (mode === 'g') {
    return (
      <div 
        tabIndex={0}
        className="w-[60px] h-[60px] border items-center justify-center p-1 grid grid-cols-3 grid-rows-3 gap-1"
        onKeyDown={handleKeyDown}
      >
        {numbersForGrid?.map((num, index) => (
          <div key={index}> {num !== null? num : ''}
          </div>
        ))}
      </div>
    );
  }
  else {
    return (
      <input
        tabIndex={0}
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
        className={`w-[60px] h-[60px] text-center p-2 border border-gray-300 flex items-center justify-center text-5xl caret-transparent ${
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