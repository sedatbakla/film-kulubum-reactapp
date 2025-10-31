import React from 'react';

const Filters = ({ onFilterChange }) => {
  // Not: Normalde bu veriler API'den dinamik çekilebilir.
  const genres = ['Drama', 'Comedy', 'Action', 'Thriller', 'Science-Fiction', 'Romance'];
  const languages = ['English', 'Turkish', 'Japanese', 'Spanish'];
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="filters">
      <select onChange={(e) => onFilterChange('genre', e.target.value)}>
        <option value="">Tüm Türler</option>
        {genres.map((g) => (<option key={g} value={g}>{g}</option>))}
      </select>
      <select onChange={(e) => onFilterChange('language', e.target.value)}>
        <option value="">Tüm Diller</option>
        {languages.map((l) => (<option key={l} value={l}>{l}</option>))}
      </select>
      <select onChange={(e) => onFilterChange('minRating', Number(e.target.value))}>
        <option value="0">Min. Puan</option>
        {ratings.map((r) => (<option key={r} value={r}>{r}+</option>))}
      </select>
    </div>
  );
};

export default Filters;