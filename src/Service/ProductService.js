/*import axios from 'axios';

const API_URL= 'https://localhost:5001';

// Configure axios instance it is api
const api= axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

//Auth token integration
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // If 401 and not a login request
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/auth/refresh', { refreshToken });
        
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
        
        processQueue(null, response.data.accessToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

const ProductService={
    getAll: async () => {
        try{
              const response= await api.get('/products');
              return response.data;
        }catch(error){
            console.error(error);
            throw error;
        }
    },
    getById: async (id) => {
        try{
               const response= await api.get(`/products/${id}`);
               return response.data;
        }catch(error){
                console.error(error);
                throw error;
        }
    },

    create : async (product) => {
        try{
            const response= await api.post('/products', product);
            return response.data;
        }catch(error){
            console.error(error);
            throw error;
        }
    },


    update : async (id, product) => {
        try{
            const response= await api.put(`/products/${id}`, product);
            return response.data;
        }catch(error){
            console.error(error);
            throw error;
        }
    },

    delete: async (id) => {
        try{
            const response= await api.delete(`/products/${id}`);
            return response.data;
         }catch(error){
            console.error(error);
            throw error;
        }
    }
};

export default ProductService;
*/