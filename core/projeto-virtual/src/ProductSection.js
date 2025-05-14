// ProductSection.js
import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductSlider from './ProductSlider';

import BASE_URL from './config';

import SliderSkeleton from './SliderSkeleton';

function ProductSection({ filters, onSlideChange }) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);


    useEffect(() => {
    const fetchProducts = async () => {
        try {
        let products = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const res = await fetch(`${BASE_URL}/wp-json/wp/v2/produtos?_embed&per_page=100&page=${page}`);
            const data = await res.json();
            products = [...products, ...data];
            hasMore = data.length === 100;
            page++;
        }

        setAllProducts(products);
        setLoading(false);
        } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
        }
    };

    fetchProducts();
    }, []);

  const filterProducts = (products) => {
    return products.filter((product) => {
      return Object.entries(filters).every(([taxonomy, selectedIds]) => {
        if (selectedIds.length === 0) return true;
        const productTermIds = product[taxonomy] || [];
        return selectedIds.some((id) => productTermIds.includes(id));
      });
    });
  };

  const filteredProducts = filterProducts(allProducts);

  return (
    <div>
      <div className="product-top">
        <h3 className="flex justify-center text-[30px] text-[#0F4D6C] uppercase mt-10 mb-10 540:mb-5">
            <span className="block 960:hidden">PAREDE</span>
            <span className="hidden 960:block">BANCADA & PAREDE</span>
        </h3>
        {loading ? (
                    <SliderSkeleton />
                ) : filteredProducts.length === 0 ? (
                    <div className="relative">
                        <SliderSkeleton />
                        <p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-[#0F4D6C] mt-4 text-lg">
                            Nenhum produto encontrado.
                        </p>

                    </div>
                ) : (
                    <div className="product-slider">
                    <ProductSlider products={filteredProducts} type="Parede" onSlideChange={onSlideChange} />
                    </div>
        )}
      </div>

      <div className="product-bottom">
        <h3 className="flex justify-center text-[30px] text-[#0F4D6C] uppercase mt-10 mb-10 540:mb-5">
          CHÃO
        </h3>
        {loading ? (
                    <SliderSkeleton />
                ) : filteredProducts.length === 0 ? (
                    <div className="relative">
                        <SliderSkeleton />
                        <p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-[#0F4D6C] mt-4 text-lg">
                            Nenhum produto encontrado.
                        </p>

                    </div>
                ) : (
                    <div className="product-slider">
                    <ProductSlider products={filteredProducts} type="Chao" onSlideChange={onSlideChange} />
                    </div>
        )}
      </div>
    </div>
  );
}

export default ProductSection;
