import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';

const expiresIn = (token) => Math.round(jwtDecode(token).exp - Date.now() / 1000);

let refreshPromise = null;

export default function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    return refreshPromise;
  }
  const expires = expiresIn(token);
  const fresh = expires > 600;

  // Continue if the token is fresh
  if (fresh) {
    return Promise.resolve(true);
  }

  // If we are already refreshing the token for other actions, append this
  // request to the chain
  if (refreshPromise) {
    return refreshPromise;
  }

  // delete axios.defaults.headers.common['Authorization'];

  refreshPromise = axios({
    method: 'POST',
    url: '/api2/api-token-refresh/',
    data: {
      token,
    },
  })
  .then((response) => {
    const newToken = response.data.token;
    try {
      jwtDecode(newToken);
      // Set token to axios headers.
      axios.defaults.headers.common['Authorization'] = `JWT ${newToken}`;
      // Set token to localStorage.
      localStorage.setItem('token', newToken);
      // Clear our promise chain
      refreshPromise = null;
    }
    catch(e) {
      refreshPromise = null;
    }
  })
  .catch((error) => {
    // Signature has expired.
    browserHistory.push('/user/logout');

  });

  return refreshPromise;
}
