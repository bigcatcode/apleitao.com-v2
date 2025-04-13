import React from 'react';
import BASE_URL from './config';

function Sidebar({ activeButton, onButtonClick }) {
    const buttons = [
        { name: 'Sala', icon: `${BASE_URL}/wp-content/uploads/2025/01/icon2.svg` },
        { name: 'Cozinha', icon: `${BASE_URL}/wp-content/uploads/2025/01/icon.svg` },
        { name: 'WC', icon: `${BASE_URL}/wp-content/uploads/2025/01/icon3.svg` },
      ];

  return (
    <div className="w-full 1330:w-[136px] h-[118px] 1330:h-auto bg-[#0F4D6C] flex flex-row 1330:flex-col items-center justify-center 1330:justify-start 1330:py-8 gap-6">
      {buttons.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => onButtonClick(name)}
          className={`mainbutton w-[136px] h-[118px] flex items-center justify-center p-[20px] bg-[#F79548]`}
        >
          <img
            src={icon}
            alt={name}
            className="buttonlogo"
            style={{ filter: activeButton === name ? 'brightness(0) invert(1)' : 'none' }}
          />
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
