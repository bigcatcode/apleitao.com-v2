import React, { useState, useEffect } from 'react';
import BASE_URL from './config';

function TaxonomyFilter({ taxonomy, layout = 'one-column' }) {
  const [terms, setTerms] = useState([]);
  const [selectedTerms, setSelectedTerms] = useState([]);

  // Fetch terms from the WordPress REST API
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(`${BASE_URL}/wp-json/wp/v2/${taxonomy}`);
        const data = await response.json();

        // Sort the terms by description (assuming description is a string)
        const sortedData = data.sort((a, b) => {
          if (a.description < b.description) return -1;
          if (a.description > b.description) return 1;
          return 0;
        });

        setTerms(sortedData);
      } catch (error) {
        console.error(`Error fetching ${taxonomy} terms:`, error);
      }
    };

    fetchTerms();
  }, [taxonomy]);

  // Handle checkbox state change
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedTerms((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((term) => term !== value)
        : [...prevSelected, value]
    );
  };

  return (
    <div className="filters-wrap p-[28px] border border-[#707070] mb-[20px]">
    
        {taxonomy === 'marca' && (
            <div className="apl-logo mb-4">
                <img
                src={`${BASE_URL}/wp-content/uploads/2024/12/logo.png`}
                alt="APLeitao"
                className="w-[238px] h-auto"
                />
            </div>
        )}

      <form>
        <ul className={layout === 'two-column' ? 'grid grid-cols-2 gap-4' : 'space-y-2'}>
          {terms.map((term) => (
            <li key={term.id} className={layout === 'two-column' ? 'flex items-center space-x-2' : ''}>
              <label className="inline-flex items-center mt-[10px] mb-[10px] cursor-pointer">
                <input
                  type="checkbox"
                  value={term.id}
                  onChange={handleCheckboxChange}
                  className="custom-checkbox w-[30px] h-[30px] mr-[7px]"
                />

                {taxonomy === 'cor' && (
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
                )}

                {taxonomy === 'marca' && (term.name === 'Silestone' || term.name === 'Dekton') ? (
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

export default TaxonomyFilter;
