// İstenen tüm eylemleri içeren state ve reducer

export const initialState = {
  isLoading: true,
  isError: false,
  data: [], // API'den gelen tüm sonuçlar
  watchlist: [],
  query: 'friends', // 1. Akış: Varsayılan sorgu
  filters: {
    genre: '',
    language: '',
    minRating: 0,
  },
  currentPage: 0,
  pageSize: 6, // 5. Akış: Her sayfada 6 dizi
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
        currentPage: 0, // Yeni veride sayfayı sıfırla
      };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_FILTERS':
      // payload örn: { genre: 'Drama' }
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 0, // Filtre değişince sayfayı sıfırla
      };
    case 'ADD_WATCHLIST':
      // Eğer listede zaten yoksa ekle
      if (state.watchlist.find((item) => item.show.id === action.payload.show.id)) {
        return state;
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case 'REMOVE_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (item) => item.show.id !== action.payload.id
        ),
      };
    case 'CLEAR_WATCHLIST':
      return { ...state, watchlist: [] };
    
    // İstekte belirtilen diğer eylemler
    case 'SET_WATCHLIST':
      return { ...state, watchlist: action.payload };
    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload, currentPage: 0 };
    
    // Pagination için eklediğimiz eylem
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};