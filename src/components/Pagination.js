import React from 'react';

const Pagination = ({ currentPage, totalPages, dispatch }) => {
  const setPage = (page) => {
    // Sayfa sınırlarının dışına çıkmayı engelle
    if (page < 0 || page >= totalPages) return;
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  if (totalPages <= 1) return null; // Tek sayfaysa pagination gösterme

  return (
    <div className="pagination">
      <button onClick={() => setPage(0)} disabled={currentPage === 0}>
        İlk
      </button>
      <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 0}>
        Geri
      </button>
      
      <span className="page-info">
        Sayfa {currentPage + 1} / {totalPages}
      </span>
      
      <button onClick={() => setPage(currentPage + 1)} disabled={currentPage >= totalPages - 1}>
        İleri
      </button>
      <button onClick={() => setPage(totalPages - 1)} disabled={currentPage >= totalPages - 1}>
        Son
      </button>
    </div>
  );
};

export default Pagination;