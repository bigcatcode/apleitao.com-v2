// ProductSection.js
import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductSlider from './ProductSlider';

import BASE_URL from './config';

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
            `${BASE_URL}/wp-json/wp/v2/produtos?_embed&per_page=100&page=${currentPage}`
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

export default ProductSection;
