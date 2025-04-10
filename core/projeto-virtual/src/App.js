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

  return (
    <div className="filters-wrap">
      <h2 className="text-xl font-bold mb-4">Marca</h2>
      <form>
        <ul className="space-y-2">
          {terms.map((term) => (
            <li key={term.id}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={term.id}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {term.name}
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
        <aside className="filters-wrap col-span-1 bg-gray-100 p-4">
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
