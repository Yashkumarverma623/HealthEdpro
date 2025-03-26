import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

// Create an axios instance with global configuration
const api = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': import.meta.env.VITE_FRONTEND_URL
  }
});

// Add request interceptor for logging and error handling
api.interceptors.request.use(
  (config) => {
    console.log('Request URL:', config.url);
    console.log('Request Method:', config.method);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response Error:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error Data:', error.response.data);
      console.error('Error Status:', error.response.status);
      console.error('Error Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error Message:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Wrapper functions with improved error handling
export async function getPosts() {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Get Posts Error:', error);
    throw error;
  }
}

export async function getPost(id) {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Get Post ${id} Error:`, error);
    throw error;
  }
}

// Similar modifications for other methods...
export async function createPost(post) {
  try {
    const response = await api.post('/posts', post);
    return response.data;
  } catch (error) {
    console.error('Create Post Error:', error);
    throw error;
  }
}

// ... (continue similar pattern for other methods)

export async function verifyUser(user) {
  try {
    const response = await api.post('/users/login', user);
    if (response.data.success) {
      return response.data.token;
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Verify User Error:', error);
    throw error;
  }
}

export default api;
