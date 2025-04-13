import React, {  useState } from 'react';

import { MarcaFilter, CorFilter, AcabamentoFilter, EstiloFilter } from './filters';
import Sidebar from './Sidebar';
import ProductSection from './ProductSection';

function App() {

    // Track active button and image source
    const [activeButton, setActiveButton] = useState('Sala'); // Default active button

    const [filters, setFilters] = useState({
      marca: [],
      cor: [],
      acabamento: [],
      estilo: [],
    });

    const updateFilter = (taxonomy, selectedIds) => {
      setFilters((prev) => ({ ...prev, [taxonomy]: selectedIds }));
    };

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
      <div className="flex flex-col 1330:flex-row w-full max-w-[1640px]">

        {/* Sidebar extracted to component */}
        <Sidebar activeButton={activeButton} onButtonClick={handleButtonClick} />


        {/* Main Content */}
        <div className="w-full 1330:flex-1 1330:ml-8">
          <div className="grid grid-cols-4 py-8 gap-8">
            {/* Filters */}
            <aside className="filters col-span-1">
              
              <MarcaFilter onChange={updateFilter} />
              <CorFilter onChange={updateFilter} />
              <AcabamentoFilter onChange={updateFilter} />
              <EstiloFilter onChange={updateFilter} />

            </aside>

            {/* Main */}
            <main className="content-wrap col-span-3 border-l-2 border-[#0F4D6C]">
              
              <div className="virtual-image flex justify-center py-10 px-5">
                <img
                    src={getImageSrc()}
                    alt="baseimage"
                    className="baseimage w-[1000px] h-[563px] object-contain"
                  />                  
              </div>

              <ProductSection filters={filters} />

            </main>
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;
