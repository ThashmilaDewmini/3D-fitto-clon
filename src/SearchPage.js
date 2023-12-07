import React, { useState } from 'react';
import Navbar from './Navbar';
import AllProducts from './AllProducts';

const ParentComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <AllProducts searchQuery={searchQuery} />
    </div>
  );
};

export default ParentComponent;
