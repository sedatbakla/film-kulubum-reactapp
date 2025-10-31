import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://api.tvmaze.com/shows/';

const ShowDetail = () => {
  const { id } = useParams(); // URL'den :id parametresini alır
  
  // Bu sayfanın kendi lokal state'i
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Veri çekme fonksiyonu
  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    
    // 6. Akış: İki ayrı API çağrısı
    const showPromise = axios.get(`${API_BASE_URL}${id}`);
    const episodesPromise = axios.get(`${API_BASE_URL}${id}/episodes`);

    try {
      // Promise.all ile iki isteği aynı anda yap
      const [showResult, episodesResult] = await Promise.all([
        showPromise,
        episodesPromise,
      ]);
      
      setShow(showResult.data);
      setEpisodes(episodesResult.data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  // useEffect: Bileşen yüklendiğinde veya 'id' değiştiğinde veri çeker
  useEffect(() => {
    fetchData();
  }, [id]);

  // 7. Koşullu Render (Detay sayfası için)
  if (isLoading) return <div className="spinner">Detaylar yükleniyor...</div>;
  if (isError) return (
    <div className="error-panel">
      <p>Hata oluştu.</p>
      <button onClick={fetchData}>Tekrar Dene</button>
      <br />
      <Link to="/">Ana Sayfaya Dön</Link>
    </div>
  );
  if (!show) return <div className="empty-state">Dizi bulunamadı.</div>;

  return (
    <div className="show-detail">
      <Link to="/" className="btn-back">
        &larr; Geri Dön
      </Link>
      <h1>{show.name}</h1>
      <div className="detail-content">
        <img src={show.image?.original} alt={show.name} />
        <div className="detail-info">
          <p><strong>Puan:</strong> {show.rating?.average || 'N/A'}</p>
          <p><strong>Türler:</strong> {show.genres.join(', ')}</p>
          <p><strong>Dil:</strong> {show.language}</p>
          <p><strong>Durum:</strong> {show.status}</p>
          {/* API'den gelen HTML'i güvenli bir şekilde render etme */}
          <div dangerouslySetInnerHTML={{ __html: show.summary }} />
        </div>
      </div>

      <h3>Bölümler</h3>
      <ul className="episode-list">
        {episodes.map((ep) => (
          <li key={ep.id}>
            <strong>S{ep.season}B{ep.number}:</strong> {ep.name} (Puan: {ep.rating?.average || 'N/A'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowDetail;