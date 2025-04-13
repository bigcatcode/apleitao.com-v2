import React, {  useState, useEffect } from 'react';

import { MarcaFilter, CorFilter, AcabamentoFilter, EstiloFilter } from './filters';
import Sidebar from './Sidebar';
import ProductSection from './ProductSection';

function App() {

    // Track active button and image source
    const [activeButton, setActiveButton] = useState('Sala'); // Default active button
    const [activeSlide, setActiveSlide] = useState({ slideData: null, stype: null }); // Track active slide with type

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
    
    const handleSlideChange = (slideData, stype) => {
      setActiveSlide((prev) => ({
        ...prev,
        [stype]: slideData
      }));
    };


    // useEffect(() => {
    //   console.log(activeSlide); 
    // }, [activeSlide]);

    // Generate image based on active button
    const getImageSrc = () => {
      return window.reactAppConfig?.assetsUrl
        ? `${window.reactAppConfig.assetsUrl}/ProjetoVirtual/${activeButton}/${activeButton}_BASE.webp`
        : `./assets/Projeto Virtual/Projecto virtual - ${activeButton}/${activeButton}_BASE.webp`;
    };

    const removeAccents = (input) => {
      // If the input is an array, process each element in the array
      if (Array.isArray(input)) {
        return input.map(str => removeAccents(str)); // Recursively apply to each element in the array
      }
    
      // Ensure str is a string
      if (typeof input !== 'string') {
        console.warn('The input is not a string:', input);
        return input; // Return the input as-is if it's not a string
      }
    
      const accents = [
        { base: 'a', letters: /[áàãâä]/g },
        { base: 'e', letters: /[éèêë]/g },
        { base: 'i', letters: /[íìîï]/g },
        { base: 'o', letters: /[óòõôö]/g },
        { base: 'u', letters: /[úùûü]/g },
        { base: 'c', letters: /[ç]/g },
        { base: 'n', letters: /[ñ]/g },
        { base: 'A', letters: /[ÁÀÃÂÄ]/g },
        { base: 'E', letters: /[ÉÈÊË]/g },
        { base: 'I', letters: /[ÍÌÎÏ]/g },
        { base: 'O', letters: /[ÓÒÕÔÖ]/g },
        { base: 'U', letters: /[ÚÙÛÜ]/g },
        { base: 'C', letters: /[Ç]/g },
        { base: 'N', letters: /[Ñ]/g },
        { base: 'a', letters: /[å]/g },  // Added Scandinavian 'å' for completeness
        // Add any other characters you may encounter in your text
      ];
    
      accents.forEach((accent) => {
        input = input.replace(accent.letters, accent.base);
      });
    
      return input;
    };

  // Generate image for active slide
  const getSlideImageSrc = (attrType, activeSlide, activeButton) => {
    const slide = activeSlide[attrType];
    if (!slide) return null;

    if (!slide || !slide.title || !slide.title.rendered ) {
      return ''; // Return an empty string or a fallback image path if slideData is not available
    }

    const { title, marca_names } = slide; // Destructure data from activeSlide
    const titleWithoutSpaces = removeAccents(title.rendered).replace(/\s+/g, ''); // Remove spaces from the title
    const marcaClean = removeAccents(marca_names);
    
   
    const pre_name = activeButton === 'Cozinha' && attrType === 'Parede' ? 'Balcao' : attrType;


    return `/assets/Projeto Virtual/Projecto virtual - ${activeButton}/${marcaClean}-montagens-${activeButton.toUpperCase()}/${titleWithoutSpaces}/${pre_name}_${activeButton}_${titleWithoutSpaces}.webp`;

  };

// Utility function to check if an image exists
const checkImageExists = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);  // Image loaded successfully
    img.onerror = () => resolve(false);  // Error loading image
    img.src = src;
  });
}

  const ImageComponent = ({ attrType, activeSlide, activeButton }) => {
    const [imageExists, setImageExists] = useState(false);
  
    useEffect(() => {
      const imageSrc = getSlideImageSrc(attrType, activeSlide, activeButton);
      console.log(imageSrc);
      if (imageSrc) {
        checkImageExists(imageSrc).then((exists) => setImageExists(exists));
      }
    }, [attrType, activeSlide, activeButton]);
  
    const imageSrc = getSlideImageSrc(attrType, activeSlide, activeButton);
  
    if (imageExists) {
      return (
        <img
          src={imageSrc}
          alt={`${attrType} - ${activeButton}`}
          className={`${attrType}-image w-[1000px] h-[563px] object-contain absolute z-10`}
        />
      );
    }
  
    return null; // Return nothing if the image doesn't exist
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
              
              <div className="virtual-image relative flex justify-center py-10 px-5">
                <img
                    src={getImageSrc()}
                    alt="base-image"
                    className="base-image w-[1000px] h-[563px] object-contain z-1"
                  />

                  <ImageComponent
                    attrType="Parede"
                    activeSlide={activeSlide}
                    activeButton={activeButton}
                  />
                  <ImageComponent
                    attrType="Chao"
                    activeSlide={activeSlide}
                    activeButton={activeButton}
                  />

              </div>

              <ProductSection filters={filters} onSlideChange={handleSlideChange} />

            </main>
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;
