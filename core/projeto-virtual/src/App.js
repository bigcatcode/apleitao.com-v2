import React, { useEffect, useState, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; 
// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { ClipLoader } from "react-spinners";

function MarcaFilter() {
  const [terms, setTerms] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState([]);
  const BASE_URL = 'http://localhost:10044';

  // Fetch terms from the WordPress REST API
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(`${BASE_URL}/wp-json/wp/v2/marca`);
        const data = await response.json();

        // Sort the terms by description (assuming description is a string)
        const sortedData = data.sort((a, b) => {
          if (a.description < b.description) return -1;
          if (a.description > b.description) return 1;
          return 0;
        });

        setTerms(sortedData);
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    fetchTerms();
  }, []);

  // Handle checkbox state change
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedMarca((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((marca) => marca !== value)
        : [...prevSelected, value]
    );

  };

  useEffect(() => {
    console.log(selectedMarca);
}, [selectedMarca]);


  return (
    <div className="filters-wrap p-[28px] border border-[#707070] mb-[20px]">
      
      <div className="apl-logo mb-4">
        <img
          src={
            window.reactAppConfig?.assetsUrl
              ? `${window.reactAppConfig.assetsUrl}/APLeitao.svg`
              : require('./assets/APLeitao.svg').default
          }
          alt="APLeitao"
          className="w-[238px] h-auto"
        />
      </div>

      <form>
        <ul className="space-y-2">
          {terms.map((term) => (
            <li key={term.id}>
              <label className="inline-flex items-center mt-[10px] mb-[10px] cursor-pointer">
                <input
                  type="checkbox"
                  value={term.id}
                  onChange={handleCheckboxChange}
                  className="custom-checkbox w-[30px] h-[30px] mr-[20px]"
                />
                {term.name === 'Silestone' || term.name === 'Dekton' ? (
                  <img
                    src={
                      window.reactAppConfig?.assetsUrl
                        ? `${window.reactAppConfig.assetsUrl}/${term.name}.svg`
                        : require(`./assets/${term.name}.svg`)
                    }
                    alt={term.name}
                    className="filterlogo"
                  />
                ) : (
                  <span className="term-name font-poppins text-[#0F4D6C]">{term.name}</span>
                )}
              </label>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

// Cor Filter Component
function CorFilter() {
  const [corTerms, setCorTerms] = useState([]);
  const [selectedCor, setSelectedCor] = useState([]);
  const BASE_URL = 'http://localhost:10044';

  // Fetch terms from the WordPress REST API for 'cor' taxonomy
  useEffect(() => {
    const fetchCorTerms = async () => {
      try {
        const response = await fetch(`${BASE_URL}/wp-json/wp/v2/cor`);
        const data = await response.json();
        setCorTerms(data);
      } catch (error) {
        console.error('Error fetching cor terms:', error);
      }
    };

    fetchCorTerms();
  }, []);

  // Handle checkbox state change for cor
  const handleCorCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedCor((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((cor) => cor !== value)
        : [...prevSelected, value]
    );
  };

  // Log selectedCor
  useEffect(() => {
    console.log('Selected Cor:', selectedCor);
  }, [selectedCor]);

  return (
    <div className="filters-wrap p-[28px] pr-[5px]  border border-[#707070] mb-[20px]">
    <form>
      <ul className="grid grid-cols-2 gap-4">
        {corTerms.map((term) => (
          <li key={term.id} className="flex items-center space-x-2">
            <label className="inline-flex items-center mt-[10px] mb-[10px] cursor-pointer">
              <input
                type="checkbox"
                value={term.id}
                onChange={handleCorCheckboxChange}
                className="custom-checkbox w-[30px] h-[30px] mr-[7px]"
              />
                <div className="mr-[10px]">
                  {term.cor_image_url ? (
                    <img
                      src={term.cor_image_url}
                      alt={term.name}
                      className="w-[20px] h-[20px] rounded-full"
                    />
                  ) : (
                    <div className="w-[20px] h-[20px] rounded-full border border-[#707070] bg-transparent"></div>
                  )}
                </div>
                <span className="term-name font-poppins text-[#0F4D6C]">{term.name}</span>

            </label>
          </li>
        ))}
      </ul>
    </form>
  </div>
  );
}

function AcabamentoFilter() {
  const [terms, setTerms] = useState([]);
  const [selectedAcabamento, setSelectedAcabamento] = useState([]);
  const BASE_URL = 'http://localhost:10044';

  // Fetch terms from the WordPress REST API
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(`${BASE_URL}/wp-json/wp/v2/acabamento`);
        const data = await response.json();

        // Sort the terms by description (assuming description is a string)
        const sortedData = data.sort((a, b) => {
          if (a.description < b.description) return -1;
          if (a.description > b.description) return 1;
          return 0;
        });

        setTerms(sortedData);
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    fetchTerms();
  }, []);

  // Handle checkbox state change
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedAcabamento((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((acabamento) => acabamento !== value)
        : [...prevSelected, value]
    );
  };

  useEffect(() => {
    console.log(selectedAcabamento);
  }, [selectedAcabamento]);

  return (
    <div className="filters-wrap p-[28px] border border-[#707070] mb-[20px]">
      <form>
        <ul className="space-y-2">
          {terms.map((term) => (
            <li key={term.id}>
              <label className="inline-flex items-center mt-[10px] mb-[10px] cursor-pointer">
                <input
                  type="checkbox"
                  value={term.id}
                  onChange={handleCheckboxChange}
                  className="custom-checkbox w-[30px] h-[30px] mr-[20px]"
                />
                <span className="term-name font-poppins text-[#0F4D6C]">{term.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}


const CozinhaIcon = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="81" height="74" viewBox="0 0 81 74" fill="none">
    <path d="M15.4788 56.6289H13.9182C13.6111 56.6289 13.3623 56.8777 13.3623 57.1848V58.7454C13.3623 59.0525 13.6111 59.3012 13.9182 59.3012H15.4788C15.7856 59.3012 16.0347 59.0525 16.0347 58.7454V57.1848C16.0347 56.8777 15.7856 56.6289 15.4788 56.6289Z" fill={fill}></path>
    <path d="M15.4788 44.6035H13.9182C13.6111 44.6035 13.3623 44.8523 13.3623 45.1594V53.4013C13.3623 53.7081 13.6111 53.9572 13.9182 53.9572H15.4788C15.7856 53.9572 16.0347 53.7081 16.0347 53.4013V45.1594C16.0347 44.8523 15.7856 44.6035 15.4788 44.6035Z" fill={fill}></path>
    <path d="M35.2981 25.897H36.8587C37.1658 25.897 37.4145 25.6482 37.4145 25.3411V23.7805C37.4145 23.4734 37.1658 23.2246 36.8587 23.2246H35.2981C34.9912 23.2246 34.7422 23.4734 34.7422 23.7805V25.3411C34.7422 25.6482 34.9912 25.897 35.2981 25.897Z" fill={fill}></path>
    <path d="M29.9529 25.897H31.5135C31.8206 25.897 32.0693 25.6482 32.0693 25.3411V23.7805C32.0693 23.4734 31.8206 23.2246 31.5135 23.2246H29.9529C29.646 23.2246 29.397 23.4734 29.397 23.7805V25.3411C29.397 25.6482 29.646 25.897 29.9529 25.897Z" fill={fill}></path>
    <path d="M68.7033 5.85278H70.2639C70.5711 5.85278 70.8198 5.60375 70.8198 5.29691V1.06368C70.8198 0.756842 70.5711 0.507812 70.2639 0.507812H68.7033C68.3965 0.507812 68.1475 0.756842 68.1475 1.06368V5.29691C68.1475 5.60375 68.3965 5.85278 68.7033 5.85278Z" fill={fill}></path>
    <path d="M68.7033 16.5422H70.2639C70.5711 16.5422 70.8198 16.2935 70.8198 15.9864V11.7531C70.8198 11.4463 70.5711 11.1973 70.2639 11.1973H68.7033C68.3965 11.1973 68.1475 11.4463 68.1475 11.7531V15.9864C68.1475 16.2935 68.3965 16.5422 68.7033 16.5422Z" fill={fill}></path>
    <path d="M72.7126 9.8618H75.6093C75.9164 9.8618 76.1651 9.61277 76.1651 9.30593V7.74532C76.1651 7.43821 75.9164 7.18945 75.6093 7.18945H72.7126C72.4057 7.18945 72.1567 7.43821 72.1567 7.74532V9.30593C72.1567 9.61277 72.4057 9.8618 72.7126 9.8618Z" fill={fill}></path>
    <path d="M63.3586 9.8618H66.2555C66.5627 9.8618 66.8114 9.61277 66.8114 9.30593V7.74532C66.8114 7.43821 66.5627 7.18945 66.2555 7.18945H63.3586C63.0518 7.18945 62.8027 7.43821 62.8027 7.74532V9.30593C62.8027 9.61277 63.0518 9.8618 63.3586 9.8618Z" fill={fill}></path>
    <path d="M79.6181 57.9654H60.1303V41.9305H65.4753C66.9514 41.9305 68.148 40.734 68.148 39.2582V36.5858C68.148 35.1097 66.9514 33.9132 65.4753 33.9132H60.1303V31.2408C62.4077 31.2408 64.2477 29.3323 64.1343 27.0304C64.0303 24.9206 62.2438 23.2947 60.144 23.2296C58.6678 19.9945 55.4402 17.8785 51.8234 17.8785H41.4233V15.2062C41.4233 12.9955 39.6251 11.1973 37.4146 11.1973H30.7333C28.5229 11.1973 26.7247 12.9955 26.7247 15.2062V17.8785H16.3101C12.6986 17.8785 9.469 19.9931 7.99177 23.2249C5.72659 23.2391 3.90083 25.1407 4.01367 27.434C4.1179 29.5482 5.9117 31.1766 8.01734 31.2353V33.9132H2.67263C1.19651 33.9132 0 35.1097 0 36.5858V39.2582C0 40.734 1.19651 41.9305 2.67263 41.9305H8.01734V65.9827C8.01734 70.4038 11.6138 74.0001 16.035 74.0001H43.0754H69.1683C70.6964 74.0001 72.0705 73.1507 72.7542 71.7843L74.5472 68.1984L76.4316 66.7837C78.7751 65.0289 80.174 62.2312 80.174 59.3014V58.5213C80.174 58.2142 79.9249 57.9654 79.6181 57.9654ZM64.9195 36.5858C65.2266 36.5858 65.4753 36.8345 65.4753 37.1417V38.7023C65.4753 39.0094 65.2266 39.2582 64.9195 39.2582H60.1303V36.5858H64.9195ZM6.6877 27.0996C6.75468 26.405 7.37837 25.8959 8.07626 25.8959H26.1688C26.4759 25.8959 26.7247 25.6471 26.7247 25.34V23.7794C26.7247 23.4723 26.4759 23.2235 26.1688 23.2235H11.0677C12.2642 21.5751 14.1945 20.5509 16.3101 20.5509H35.5224C35.8296 20.5509 36.0783 20.3021 36.0783 19.995V18.4344C36.0783 18.1273 35.8296 17.8785 35.5224 17.8785H29.3973V15.2062C29.3973 14.4688 29.9962 13.8699 30.7333 13.8699H37.4146C38.152 13.8699 38.7507 14.4688 38.7507 15.2062V20.5509H51.8234C53.9404 20.5509 55.8704 21.5751 57.0672 23.2235H47.3242C47.017 23.2235 46.7683 23.4723 46.7683 23.7794V25.34C46.7683 25.6471 47.017 25.8959 47.3242 25.8959H60.1303C60.9116 25.8959 61.5373 26.5679 61.4603 27.3647C61.3933 28.059 60.7696 28.5682 60.072 28.5682H8.01734C7.23634 28.5682 6.61071 27.8962 6.6877 27.0996ZM3.2285 39.2582C2.92139 39.2582 2.67263 39.0094 2.67263 38.7023V37.1417C2.67263 36.8345 2.92139 36.5858 3.2285 36.5858H8.01734V39.2582H3.2285ZM10.69 65.9827V31.2408H57.458V57.9654H32.6255C32.3187 57.9654 32.0696 58.2142 32.0696 58.5213V59.3014C32.0696 62.2312 33.4685 65.0289 35.8109 66.7837L37.6965 68.1984L39.261 71.3277H16.035C13.0872 71.3277 10.69 68.9305 10.69 65.9827ZM77.1681 61.3754C76.7448 62.665 75.9335 63.8179 74.8279 64.6464L72.5432 66.3607C72.4743 66.4124 72.4185 66.4797 72.3798 66.5567L70.3637 70.589C70.1366 71.0445 69.6786 71.3277 69.1683 71.3277H43.0754C42.5651 71.3277 42.107 71.0445 41.88 70.589L39.8638 66.5567C39.8252 66.4797 39.7693 66.4124 39.7001 66.3607L37.4146 64.6464C36.3098 63.8179 35.4988 62.665 35.0755 61.3754C34.9566 61.0127 35.2206 60.6377 35.6025 60.6377H76.6411C77.023 60.6377 77.2871 61.0127 77.1681 61.3754Z" fill={fill}></path>
    <path d="M68.928 63.3105H67.3674C67.0603 63.3105 66.8115 63.5596 66.8115 63.8664V65.427C66.8115 65.7341 67.0603 65.9829 67.3674 65.9829H68.928C69.2351 65.9829 69.4839 65.7341 69.4839 65.427V63.8664C69.4839 63.5596 69.2351 63.3105 68.928 63.3105Z" fill={fill}></path>
    <path d="M63.5833 63.3105H51.3327C51.0259 63.3105 50.7769 63.5596 50.7769 63.8664V65.427C50.7769 65.7341 51.0259 65.9829 51.3327 65.9829H63.5833C63.8904 65.9829 64.1392 65.7341 64.1392 65.427V63.8664C64.1392 63.5596 63.8904 63.3105 63.5833 63.3105Z" fill={fill} ></path>
  </svg>
);



function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let allProducts = [];
        let currentPage = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(
            `http://localhost:10044/wp-json/wp/v2/produtos?_embed&per_page=100&page=${currentPage}`
          );
          const data = await response.json();
          allProducts = [...allProducts, ...data];

          if (data.length < 100) {
            hasMore = false;
          } else {
            currentPage += 1;
          }
        }

        setProducts(allProducts); // Set products in the parent component
        setLoading(false); // Once data is fetched, set loading to false
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts(); // Call on mount
  }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center">
  //       <ClipLoader color="#0F4D6C" size={50} />
  //     </div>
  //   ); // Display spinner while fetching
  // }

  return (
    <div>
      <div className="product-top px-5">

        <h3 className="flex justify-center text-[30px] text-[#0F4D6C] uppercase mt-10 mb-5">
          BANCADA & PAREDE
        </h3>

        {/* Loader visible during fetch */}
        {loading && (
          <div className="flex justify-center items-center">
            <ClipLoader color="#0F4D6C" size={50} />
          </div>
        )}

        {/* Product Slider visible after products are loaded */}
        {!loading && (
          <div className="product-slider">
            <ProductSlider products={products} />
          </div>
        )}

      </div>

      <div className="product-bottom px-5">

        <h3 className="flex justify-center text-[30px] text-[#0F4D6C] uppercase mt-10 mb-5">
          CHÃO
        </h3>

        {/* Loader visible during fetch */}
        {loading && (
          <div className="flex justify-center items-center">
            <ClipLoader color="#0F4D6C" size={50} />
          </div>
        )}

        {/* Product Slider visible after products are loaded */}
        {!loading && (
          <div className="product-slider">
            <ProductSlider products={products} />
          </div>
        )}
        
      </div>
    </div>
  );
}

function ProductSlider({ products }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance) {
      // This will make sure Swiper is initialized after the external navigation is available
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="relative flex justify-center">
      <div className="w-full max-w-[1000px]">
        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={4}
          onInit={(swiper) => setSwiperInstance(swiper)} // Save swiper instance after initialization
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
        >
          {products.map((product) => {
            const imageUrl = product._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            const title = product.title?.rendered;

            return (
              <SwiperSlide key={product.id}>
                <div className=" h-[100px] flex flex-col justify-between items-center">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-[56px] object-cover"
                  />
                  <p className="text-center text-[18px] text-[#0F4D6C] uppercase">{title}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* External Navigation Buttons */}
        <div className="absolute top-[-60px] w-full flex justify-between px-4 max-w-[1000px]">
          <div
            ref={prevRef}
            className="swiper-button-prev !text-[#0F4D6C] !static"
          />
          <div
            ref={nextRef}
            className="swiper-button-next !text-[#0F4D6C] !static"
          />
        </div>
      </div>
    </div>
  );
}

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

        {/* Static Left Sidebar */}
        <div className="w-[136px] bg-[#0F4D6C] flex flex-col items-center py-8 gap-6">
              <button
                onClick={() => handleButtonClick('Sala')}
                className={`mainbutton w-[136px] h-[118px] bg-[#F79548] flex items-center justify-center hover:opacity-90 p-[20px] ${activeButton === 'Sala' ? 'bg-[#FF5722]' : ''}`}
              >
              <img
                src={
                  window.reactAppConfig?.assetsUrl
                    ? `${window.reactAppConfig.assetsUrl}/Sala.svg`
                    : require(`./assets/Sala.svg`).default
                }
                alt="Sala"
                className="buttonlogo"
              />
            </button>
            <button
              onClick={() => handleButtonClick('Cozinha')}
              className={`mainbutton w-[136px] h-[118px] bg-[#F79548] flex items-center justify-center hover:opacity-90 p-[20px] ${activeButton === 'Cozinha' ? 'bg-[#FF5722]' : ''}`}
            >
              {/* <CozinhaIcon fill="#fff" /> */}
              <img
                  src={
                    window.reactAppConfig?.assetsUrl
                      ? `${window.reactAppConfig.assetsUrl}/Cozinha.svg`
                      : require(`./assets/Cozinha.svg`).default
                  }
                  alt="Cozinha"
                  className="buttonlogo"
                />
            </button>
            <button
              onClick={() => handleButtonClick('WC')}
              className={`mainbutton w-[136px] h-[118px] bg-[#F79548] flex items-center justify-center hover:opacity-90 p-[20px] ${activeButton === 'WC' ? 'bg-[#FF5722]' : ''}`}
            >
              <img
                  src={
                    window.reactAppConfig?.assetsUrl
                      ? `${window.reactAppConfig.assetsUrl}/WC.svg`
                      : require(`./assets/WC.svg`).default
                  }
                  alt="WC"
                  className="buttonlogo"
                />
            </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-8">
          <div className="grid grid-cols-4 py-8 gap-8">
            {/* Filters */}
            <aside className="filters col-span-1">
              <div className="filter-label font-poppins px-[28px]">Marca</div>
              <MarcaFilter />
              <div className="filter-label font-poppins px-[28px]">Cor</div>
              <CorFilter />
              <div className="filter-label font-poppins px-[28px]">Acabamento</div>
              <AcabamentoFilter />
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
