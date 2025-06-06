import React, {  useState, useEffect, useRef } from 'react';

import { MarcaFilter, CorFilter, AcabamentoFilter, EstiloFilter } from './filters';
import Sidebar from './Sidebar';
import ProductSection from './ProductSection';
import { getReplacements } from './getReplacements';
import { getReplacements_S } from './getReplacements_S';

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
    [stype]: slideData,
    type: stype // ✅ store the active type
  }));
};


    // useEffect(() => {
    //   console.log(activeSlide); 
    // }, [activeSlide]);

    // Generate image based on active button
    const getImageSrc = () => {
      return window.reactAppConfig?.assetsUrl
        ? `${window.reactAppConfig.assetsUrl}/assets/Projeto Virtual/Projecto virtual - ${activeButton}/${activeButton}_BASE.webp`
        : `/assets/Projeto Virtual/Projecto virtual - ${activeButton}/${activeButton}_BASE.webp`;
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

   // if (!slide || activeSlide.stype !== attrType) return null;
   //console.log(activeSlide);
   //console.log(attrType);

    if (!slide || !slide.title || !slide.title.rendered ) {
      return ''; // Return an empty string or a fallback image path if slideData is not available
    }

    const { title, marca_names } = slide; // Destructure data from activeSlide
    const titleWithoutSpaces = removeAccents(title.rendered).replace(/\s+/g, ''); // Remove spaces from the title
    const marcaClean = removeAccents(marca_names[0] || '');
    
   
    const pre_name = activeButton === 'Cozinha' && attrType === 'Parede' ? 'Balcao' : attrType;
    let separat = activeButton === 'Sala'  ? '-' : '_';

    let finalTitle = titleWithoutSpaces;
 
    if (marcaClean === 'Dekton') {
      separat = '_';
      const replacements = getReplacements();
    
      if (replacements[titleWithoutSpaces]) {
        finalTitle = replacements[titleWithoutSpaces];
      }
    }

    if (marcaClean === 'Silestone') {
      separat = '_';
      const replacements_s = getReplacements_S();

      const cleanTitle = titleWithoutSpaces
      .replace(/['’]/g, '')    
      .replace(/\s+/g, '');    

    
      if (replacements_s[cleanTitle]) {
        finalTitle = replacements_s[cleanTitle];
      }
    }

    const basePath = window.reactAppConfig?.assetsUrl ?? '';
    return `${basePath}/assets/Projeto Virtual/Projecto virtual - ${activeButton}/${marcaClean}-montagens-${activeButton.toUpperCase()}/${finalTitle}/${pre_name}_${activeButton}${separat}${finalTitle}.webp`;

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
  const [isVisible, setIsVisible] = useState(false);
  const imageSrc = getSlideImageSrc(attrType, activeSlide, activeButton);

  useEffect(() => {
    if (imageSrc) {
      setIsVisible(false); // Reset opacity
      checkImageExists(imageSrc).then((exists) => {
        setImageExists(exists);
        if (exists) {
          // Fade in after a short delay
          setTimeout(() => setIsVisible(true), 50);
        }
      });
      //console.log(imageSrc);
    } else {
      setImageExists(false);
      setIsVisible(false);
    }
  }, [imageSrc]);

  if (!imageExists) return null;

  return (
    <img
      src={imageSrc}
      alt={`${attrType} - ${activeButton}`}
      className={`
        ${attrType}-image w-[1000px] h-auto object-contain absolute z-10
        transition-opacity duration-500 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    />
  );
};


const contentRef = useRef(null);
const lastScrollY = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const el = contentRef.current;
    if (!el) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current) {
      // Скроллим вниз → top-[40px]
      el.classList.remove('top-[120px]');
      el.classList.add('top-[40px]');
    } else {
      // Скроллим вверх → top-[120px]
      el.classList.remove('top-[40px]');
      el.classList.add('top-[120px]');
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

const [showFilters, setShowFilters] = useState(true);

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 960) {
      setShowFilters(false); 
    } else {
      setShowFilters(true); 
    }
  };

  handleResize(); 

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


const toggleFilters = () => {
  if (window.innerWidth < 960) {
    setShowFilters((prev) => !prev);
  }
};

  return (
    
    <div className="w-full flex justify-center">
      <div className="flex flex-row w-full max-w-[1640px]">

        {/* Sidebar extracted to component */}
        <Sidebar activeButton={activeButton} onButtonClick={handleButtonClick} onToggleFilters={toggleFilters} />


        {/* Main Content */}
        <div className="flex-1 ml-0 540:ml-8">
          <div className="grid grid-cols-1 px-0 540:px-5 960:px-0 960:grid-cols-4 py-0 540:py-8 gap-0 960:gap-8">
            
            {/* Filters */}

            <aside
              className={`
                filters col-span-1 grid grid-cols-1 gap-0 540:grid-cols-2 540:gap-8 960:grid-cols-1 960:gap-0
                transition-all duration-300
                ${showFilters ? 'block' : 'hidden'}
              `}
            >
              
              <MarcaFilter onChange={updateFilter} />
              <CorFilter onChange={updateFilter} />
              <AcabamentoFilter onChange={updateFilter} />
              <EstiloFilter onChange={updateFilter} />

            </aside>

            {/* Main */}

            <main
              ref={contentRef}
              className="content-wrap col-span-3 border-l-0 960:border-l-2 border-[#0F4D6C] px-5 [position:sticky] transition-all duration-500 top-[120px] h-fit self-start"
            >
            
              
              <div className="virtual-image relative flex justify-center pt-10 pb-0 540:pb-10">
                <img
                    src={getImageSrc()}
                    alt="base-image"
                    className="base-image w-[1000px] h-auto object-contain z-1"
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
