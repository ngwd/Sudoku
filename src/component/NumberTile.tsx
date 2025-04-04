import React from 'react';

interface NumberTileProps {
  numbers: number[]; // For grid mode
  onChange?: (number: number) => void; // Callback for single mode changes
};

const NumberTile: React.FC<NumberTileProps> = ({
  numbers,
}) => {
  let style:string  = "";
  let numbersForGrid: (number | null)[] = [...Array(9)];
  if (numbers.length > 1) {
    style = "w-[60px] h-[60px] border items-center justify-center p-1 grid grid-cols-3 grid-rows-3 gap-1";
    numbers.map(i => numbersForGrid[i-1]  = i);
    console.table(numbersForGrid)
    return (
      <div className={style}>
        {numbersForGrid.map((num, index) => (
          <div key={index}> {num !== undefined ? num : ''}
          </div>
        ))}
      </div>
    );
  }
  else {
    style = "w-[60px] h-[60px] border p-1 bg-white flex items-center justify-center text-5xl";
    return (
      <div className={style}>{numbers[0]}</div>
    );
  } 
  /*
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value >= 1 && value <= 9) {
        setNumber(value);
        if (onChange) {
          onChange(value);
        }
      }
    };

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