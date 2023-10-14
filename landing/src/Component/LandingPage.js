import React, { useState, useEffect } from 'react';
import '../Component/LandingPage.css'
import axios from 'axios'; // Assuming you're using axios for API requests

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/chartered-accountants?name=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchData();
    } else {
      setSearchResults([]); // Clear results when the search query is empty
    }
  }, [searchQuery]);

  return (
    <div className='containor'>
      <input
        type="text"
        placeholder="Search Chartered Accountants..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {searchResults.map((accountant) => (
            <li key={accountant.id}>{accountant.name}</li>
            // You can display more details here based on your Figma design
          ))}
        </ul>
      )}
      {searchResults.length === 0 && !isLoading && (
        <p>No matching Chartered Accountants found.</p>
      )}
    </div>
  );
};

export default SearchResults;
