import React, { useState } from 'react';

type ToggleProps = {
  initial?: boolean;
  onToggle?: (value: boolean) => void;
};

const Toggle: React.FC<ToggleProps> = ({ 
  initial = false, 
  onToggle 
}) => {
  const [isOn, setIsOn] = useState(initial);

  const handleClick = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    if (onToggle) onToggle(newValue);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
        isOn ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          isOn ? 'translate-x-8' : ''
        }`}
      >
        <svg viewBox="0 0 30 31" className="w-4 h-4" >
          <path 
            fill={isOn?'#325aaf':'#6D7584'}
            d="M25.43 4.76a5.42 5.42 0 01.19 7.52l-.18.2-13.5 13.48a.91.91 0 01-1.21.08l-.1-.08-5.07-5.08-.59 4.34 3.25-.44c.44-.05.84.2 1 .58l.03.11.02.11c.06.47-.24.91-.7 1.03l-.1.02-4.45.6a.94.94 0 01-.79-.27.92.92 0 01-.26-.65v-.13l1-7.4a.92.92 0 01.19-.44l.08-.09L17.71 4.76a5.45 5.45 0 017.72 0zm.35 20.08a1 1 0 110 2h-8.7a1 1 0 010-2h8.7zM21.4 10.18L9.43 22.13 11.3 24l11.95-11.95-1.86-1.86zm-3.23-3.23L6.2 18.91l1.92 1.91L20.07 8.86l-1.9-1.9zm3.42-1.93c-.69 0-1.35.2-1.92.56l-.15.1 5.01 5 .1-.14c.33-.5.51-1.09.55-1.7l.01-.22a3.58 3.58 0 00-3.6-3.6z"
          />
        </svg>
      </div>
    </button>
  );
};

export default Toggle;