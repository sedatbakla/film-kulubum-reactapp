import React from 'react';
import { Link } from 'react-router-dom'; // Detay sayfası için

const TVCard = ({ item, dispatch }) => {
  const { show } = item;
  
  // API'den gelen HTML tag'lerini temizle
  const summary = show.summary
    ? show.summary.replace(/<[^>]+>/g, '').substring(0, 100) + '...'
    : 'Bu dizi için özet bulunmamaktadır.';
  
  const poster = show.image?.medium || 'https://via.placeholder.com/210x295.png?text=Poster+Yok';

  const handleAdd = () => {
    dispatch({ type: 'ADD_WATCHLIST', payload: item });
  };

  return (
    <div className="tv-card">
      <img src={poster} alt={show.name} />
      <div className="tv-card-content">
        <h3>{show.name}</h3>
        <p><strong>Tür:</strong> {show.genres.join(', ') || 'Bilinmiyor'}</p>
        <p><strong>Dil:</strong> {show.language || 'Bilinmiyor'}</p>
        <p><strong>Puan:</strong> {show.rating?.average || 'N/A'}</p>
        <p className="summary">{summary}</p>
        <div className="card-buttons">
          <Link to={`/show/${show.id}`} className="btn-detail">
            Detay
          </Link>
          <button onClick={handleAdd} className="btn-add-list">
            Kısa Listeye Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;