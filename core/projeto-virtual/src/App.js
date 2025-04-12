import React, { useEffect, useState, useRef } from 'react';

import { MarcaFilter, CorFilter, AcabamentoFilter, EstiloFilter } from './filters';
import Sidebar from './Sidebar';
import ProductSection from './ProductSection';

function App() {

    // Track active button and image source
    const [activeButton, setActiveButton] = useState('Sala'); // Default active button

    // Function to handle button click and change image
    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
    };
  
    // Generate image based on active button
    const getImageSrc = () => {
      return window.reactAppConfig?.assetsUrl
        ? `${window.reactAppConfig.assetsUrl}/ProjetoVirtual/${activeButton}/${activeButton}_BASE.webp`
        : require(`./assets/ProjetoVirtual/${activeButton}/${activeButton}_BASE.webp`);
    };

  return (
    
    <div className="w-full flex justify-center">
      <div className="flex w-full max-w-[1640px]">

        {/* Sidebar extracted to component */}
        <Sidebar activeButton={activeButton} onButtonClick={handleButtonClick} />


        {/* Main Content */}
        <div className="flex-1 ml-8">
          <div className="grid grid-cols-4 py-8 gap-8">
            {/* Filters */}
            <aside className="filters col-span-1">
              
              <MarcaFilter />
              
              <CorFilter />
              
              <AcabamentoFilter />

              <EstiloFilter />

            </aside>

            {/* Main */}
            <main className="content-wrap col-span-3">
              
              <div className="virtual-image flex justify-center py-10 px-5">
                <img
                    src={getImageSrc()}
                    alt="baseimage"
                    className="baseimage w-[1000px] h-[563px] object-contain"
                  />                  
              </div>

              <ProductSection />

            </main>
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;
