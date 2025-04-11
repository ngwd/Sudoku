import React, {useEffect, useState} from "react";
import NumberTile from './NumberTile';
interface SudokuCanvasProps {
  pencilMode?: boolean;
};

const SudokuCanvas : React.FC<SudokuCanvasProps> = ({
  pencilMode = false,
}) => {
  const [sudokuArray, setSudokuArray] = useState<(number|null) [][] | undefined>(undefined);
  const [selectedIndex, setSelectedIndex] = useState<number|undefined> (undefined);

  useEffect(()=> {
    let arr:(number|null)[][] = [...Array(9)].map(_ => Array(9).fill(1)); 
    setSudokuArray(arr);
  }, []);

  return (
    <div className="w-[550px] h-[550px] grid grid-cols-9 grid-rows-9 gap-1 bg-white border" >
      {sudokuArray?.map((row, rowIndex) => 
        row.map((value, colIndex) => {
          let index = rowIndex*9+colIndex;
          return <NumberTile numberTile={value} 
            tabIndex={index} 
            selected={selectedIndex === index} 
            onClick={()=>setSelectedIndex(index)} />;
          }))
      }
    </div>
  );
};

export default SudokuCanvas;