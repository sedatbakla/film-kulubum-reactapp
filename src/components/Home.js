
import React, { useReducer, useEffect, useMemo } from 'react';
import axios from 'axios';
import { appReducer, initialState } from '../state/reducer';

import SearchBox from './SearchBox';
import Filters from './Filters';
import TVList from './TVList';
import WatchlistPanel from './WatchlistPanel';
import Pagination from './Pagination';

const API_SEARCH_URL = 'https://api.tvmaze.com/search/shows?q=';

const Home = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const {
    isLoading,
    isError,
    data,
    watchlist,
    query,
    filters,
    currentPage,
    pageSize,
  } = state;

  useEffect(() => {
    if (!query) return;

    const source = axios.CancelToken.source();
    
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios.get(`${API_SEARCH_URL}${query}`, {
          cancelToken: source.token,
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        if (!axios.isCancel(error)) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
    
    const timerId = setTimeout(fetchData, 500);

    return () => {
      clearTimeout(timerId);
      source.cancel('Component unmounted or query changed');
    };
  }, [query]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const { show } = item;
      const rating = show.rating?.average || 0;

      const genreMatch = filters.genre
        ? show.genres.includes(filters.genre)
        : true;
      const langMatch = filters.language
        ? show.language === filters.language
        : true;
      const ratingMatch = filters.minRating
        ? rating >= filters.minRating
        : true;

      return genreMatch && langMatch && ratingMatch;
    });
  }, [data, filters]);

  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSearch = (searchQuery) => {
    dispatch({ type: 'SET_QUERY', payload: searchQuery });
  };

  const handleFilterChange = (filterName, value) => {
    dispatch({ type: 'SET_FILTERS', payload: { [filterName]: value } });
  };

  const handleRetry = () => {
    dispatch({ type: 'SET_QUERY', payload: query });
  };

  return (
    <div className="home-layout">
      <header className="home-header">
        <h1>SDÜ Film Kulübü - Dizi Arama</h1>
        <SearchBox onSearch={handleSearch} initialQuery={query} />
        <Filters onFilterChange={handleFilterChange} />
      </header>
      <main className="home-main">
        <div className="main-content">
          
          {isLoading && <div className="spinner">Yükleniyor...</div>}
          
          {isError && (
            <div className="error-panel">
              <p>Veri çekilirken bir hata oluştu.</p>
              <button onClick={handleRetry}>Tekrar Dene</button>
            </div>
          )}
          
          {!isLoading && !isError && filteredData.length === 0 && (
            <div className="empty-state">
              Arama kriterlerine uygun sonuç bulunamadı.
            </div>
          )}

          {!isLoading && !isError && filteredData.length > 0 && (
            <>
              <TVList shows={paginatedData} dispatch={dispatch} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                dispatch={dispatch}
              />
            </>
          )}
        </div>
        <aside className="sidebar">
          <WatchlistPanel watchlist={watchlist} dispatch={dispatch} />
        </aside>
      </main>
    </div>
  );
};

export default Home;
