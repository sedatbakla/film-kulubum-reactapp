import React from 'react';

const WatchlistPanel = ({ watchlist, dispatch }) => {
  return (
    <div className="watchlist-panel">
      <h3>Gösterime Girecekler</h3>
      {watchlist.length === 0 ? (
        <p>Listeniz boş. Gösterim için dizi ekleyin.</p>
      ) : (
        <ul className="watchlist-items">
          {watchlist.map((item) => (
            <li key={item.show.id}>
              <span>{item.show.name}</span>
              <button
                onClick={() =>
                  dispatch({ type: 'REMOVE_WATCHLIST', payload: { id: item.show.id } })
                }
                className="btn-remove"
              >
                Kaldır
              </button>
            </li>
          ))}
        </ul>
      )}
      {watchlist.length > 0 && (
        <button
          onClick={() => dispatch({ type: 'CLEAR_WATCHLIST' })}
          className="btn-clear-list"
        >
          Tüm Listeyi Temizle
        </button>
      )}
    </div>
  );
};

export default WatchlistPanel;