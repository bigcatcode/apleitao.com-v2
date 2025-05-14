import React from 'react';
import BASE_URL from './config';

function Sidebar({ activeButton, onButtonClick, onToggleFilters }) {
    const buttons = [
        { name: 'Sala', icon: `${BASE_URL}/wp-content/uploads/2025/01/icon2.svg` },
        { name: 'Cozinha', icon: `${BASE_URL}/wp-content/uploads/2025/01/icon.svg` },
        { name: 'WC', icon: `${BASE_URL}/wp-content/uploads/2025/01/icon3.svg` },
      ];

  return (
    <div className="w-[60px] 1060:w-[136px] h-auto bg-[#0F4D6C] flex flex-col items-center justify-start gap-[10px] 1060:gap-6">

      <button
        onClick={onToggleFilters}
        className={`mainbutton triggerbutton w-[60px] 1060:w-[136px] h-[54px] 1060:h-[118px] flex 960:hidden items-center justify-center p-[5px] 1060:p-[20px]`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          className="w-full h-full triggerfilters"
          aria-hidden="true"
        >
          <g fill="#fff">
          
            <path d="M73.3,154.1h237.1c.8,0,1.6,0,2.4-.2,7.7,21.7,31.5,33.1,53.2,25.4,11.9-4.2,21.2-13.6,25.4-25.4.8.1,1.6.2,2.4.2h32.8c7.8,0,14.1-6.3,14.1-14.1s-6.3-14.1-14.1-14.1h-32.8c-.8,0-1.6,0-2.4.2-7.7-21.7-31.5-33.1-53.2-25.4-11.9,4.2-21.2,13.5-25.4,25.4-.8-.1-1.6-.2-2.4-.2H73.3c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1M352.2,126.5c7.5,0,13.5,6.1,13.5,13.5s-6.1,13.5-13.5,13.5-13.5-6.1-13.5-13.5,6.1-13.5,13.5-13.5h0" />
            <path d="M426.7,235.9h-238.4c-.8,0-1.6,0-2.4.2-7.7-21.7-31.5-33.1-53.2-25.4-11.9,4.2-21.2,13.6-25.4,25.4-.8-.1-1.6-.2-2.4-.2h-31.5c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h31.5c.8,0,1.6,0,2.4-.2,7.7,21.7,31.5,33.1,53.2,25.4,11.9-4.2,21.2-13.5,25.4-25.4.8.1,1.6.2,2.4.2h238.4c7.8-.2,13.9-6.7,13.7-14.5-.2-7.5-6.2-13.5-13.7-13.7M146.6,263.5c-7.5,0-13.5-6.1-13.5-13.5,0-7.5,6.1-13.5,13.5-13.5s13.5,6.1,13.5,13.5c0,7.5-6.1,13.5-13.5,13.5h0" />
            <path d="M426.7,345.9h-32.8c-.8,0-1.6,0-2.4.2-7.7-21.7-31.5-33.1-53.2-25.4-11.9,4.2-21.2,13.6-25.4,25.4-.8-.1-1.6-.2-2.4-.2H73.3c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h237.1c.8,0,1.6,0,2.4-.2,7.7,21.7,31.5,33.1,53.2,25.4,11.9-4.2,21.2-13.6,25.4-25.4.8.1,1.6.2,2.4.2h32.8c7.8,0,14.1-6.3,14.1-14.1s-6.3-14.1-14.1-14.1h0M352.2,373.5c-7.5,0-13.5-6.1-13.5-13.5s6.1-13.5,13.5-13.5,13.5,6.1,13.5,13.5-6.1,13.5-13.5,13.5h0" />
          </g>
        </svg>
      </button>

      {buttons.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => onButtonClick(name)}
          className={`mainbutton w-[60px] 1060:w-[136px] h-[54px] 1060:h-[118px] flex items-center justify-center p-[10px] 1060:p-[20px] bg-[#F79548]`}
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
