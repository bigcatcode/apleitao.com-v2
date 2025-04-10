import React, { useEffect, useState } from 'react';

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
    <div className="filters-wrap p-[28px] border border-[#707070]">
      
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

function App() {
  return (
    <div className="max-w-[1640px] mx-auto px-4 py-8">
      <div className="grid grid-cols-4 gap-8">
        {/* Sidebar: 1/4 */}
        <aside className="filters col-span-1">
          <div className="filter-label font-poppins px-[28px]">Marca</div>
          <MarcaFilter />
        </aside>

        {/* Main Content: 3/4 */}
        <main className="content-wrap col-span-3 bg-white p-6">
          <h1 className="text-3xl font-bold mb-4">Hello from React inside WordPress!</h1>
          <p className="text-gray-700">This is your main content area. You can render posts, widgets, or anything else here.</p>
        </main>
      </div>
    </div>
  );
}

export default App;
