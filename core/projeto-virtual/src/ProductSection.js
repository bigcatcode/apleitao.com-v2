// ProductSection.js
import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ClipLoader from 'react-spinners/ClipLoader';
import 'swiper/css';
import 'swiper/css/navigation';

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

        setProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="product-top px-5">
        <h3 className="flex justify-center text-[30px] text-[#0F4D6C] uppercase mt-10 mb-5">
          BANCADA & PAREDE
        </h3>
        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#0F4D6C" size={50} />
          </div>
        ) : (
          <div className="product-slider">
            <ProductSlider products={products} />
          </div>
        )}
      </div>

      <div className="product-bottom px-5">
        <h3 className="flex justify-center text-[30px] text-[#0F4D6C] uppercase mt-10 mb-5">
          CHÃO
        </h3>
        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#0F4D6C" size={50} />
          </div>
        ) : (
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

            return (
              <SwiperSlide key={product.id}>
                <div className="h-[100px] flex flex-col justify-between items-center">
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

        <div className="absolute top-[-60px] w-full flex justify-between px-4 max-w-[1000px]">
          <div ref={prevRef} className="swiper-button-prev !text-[#0F4D6C] !static" />
          <div ref={nextRef} className="swiper-button-next !text-[#0F4D6C] !static" />
        </div>
      </div>
    </div>
  );
}

export default ProductSection;
