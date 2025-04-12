import React from 'react';

function Sidebar({ activeButton, onButtonClick }) {
  const buttons = ['Sala', 'Cozinha', 'WC'];

  return (
    <div className="w-[136px] bg-[#0F4D6C] flex flex-col items-center py-8 gap-6">
      {buttons.map((button) => (
        <button
          key={button}
          onClick={() => onButtonClick(button)}
          className={`mainbutton w-[136px] h-[118px] bg-[#F79548] flex items-center justify-center hover:opacity-90 p-[20px] ${
            activeButton === button ? 'bg-[#FF5722]' : ''
          }`}
        >
          <img
            src={
              window.reactAppConfig?.assetsUrl
                ? `${window.reactAppConfig.assetsUrl}/${button}.svg`
                : require(`./assets/${button}.svg`)
            }
            alt={button}
            className="buttonlogo"
          />
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
