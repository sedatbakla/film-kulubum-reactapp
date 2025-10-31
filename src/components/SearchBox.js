import React, { useState } from 'react';

const SearchBox = ({ onSearch, initialQuery }) => {
  const [term, setTerm] = useState(initialQuery);

  // Kontrollü bileşen (controlled component)
  const handleChange = (e) => {
    setTerm(e.target.value);
    // Anlık arama için:
    onSearch(e.target.value);
  };

  return (
    <form className="search-box" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={term}
        onChange={handleChange}
        placeholder="Bir dizi arayın (örn: 'breaking bad')"
      />
    </form>
  );
};

export default SearchBox;