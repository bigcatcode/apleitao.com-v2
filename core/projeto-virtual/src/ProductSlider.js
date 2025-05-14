import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';

function ProductSlider({ products, type, onSlideChange }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeId, setActiveId] = useState(null); // Track the active slide

  const handleSlideClick = (product, type) => {
    if (onSlideChange) {
      onSlideChange(product, type); // Pass the clicked product data to the handler
    }
  };
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="relative flex justify-center">
      <div className="w-full max-w-[1000px]">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={4}
          onInit={(swiper) => setSwiperInstance(swiper)}
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

            const dataAttributes = Object.entries(product).reduce((acc, [key, value]) => {
              const isTaxonomy = ['marca', 'cor', 'acabamento', 'estilo', 'serie'].includes(key);
              const isTaxonomyName = key.endsWith('_names') &&
                ['marca_names', 'cor_names', 'acabamento_names', 'estilo_names', 'serie_names'].includes(key);

              if (isTaxonomy && Array.isArray(value)) {
                acc[`data-${key}`] = value.join(',');
              }

              if (isTaxonomyName && Array.isArray(value)) {
                acc[`data-${key}`] = value.join(', ');
              }

              return acc;
            }, {});

            const finalDataAttributes = {
                ...dataAttributes,
                'data-type': type, // 'type' here is the "Parede" or whatever value you pass to the ProductSlider
            };

            const isActive = product.id === activeId;

            const onSlideClick = (product, type) => {
                setActiveId((prevId) => {
                  const isDeactivating = prevId === product.id;
              
                  // Only update the image if it's being activated
                  if (!isDeactivating) {
                    handleSlideClick(product, type);
                  } else {
                    // Clear the active image for this type
                    handleSlideClick(null, type);
                  }
              
                  return isDeactivating ? null : product.id;
                });
              };

            return (
              <SwiperSlide
                key={product.id}
                {...finalDataAttributes}
                onClick={() => onSlideClick(product, type)}
                className={`cursor-pointer`}
              >
                <div className="flex flex-col justify-between items-center">
                  <img
                    src={imageUrl}
                    alt={title}
                    className={`w-full h-[39px] 540:h-[56px] object-cover border-2 ${isActive ? 'border-[#F79549]' : 'border-transparent'}`}
                  />
                  <p className="text-center text-[12px] 540:text-[18px] text-[#0F4D6C] uppercase">{title}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="absolute top-[-72px] w-full flex justify-between px-0 540:px-4 max-w-[1000px] flex">

            <div ref={prevRef} className="swiper-button-prev_ !static cursor-pointer">
                <LeftArrow className="h-[60px]" />
            </div>
            <div ref={nextRef} className="swiper-button-next_ !static cursor-pointer">
                <RightArrow className="h-[60px]" />
            </div>

        </div>
      </div>
    </div>
  );
}

export default ProductSlider;
