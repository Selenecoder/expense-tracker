// src/api/ApiService.js

export const fetchWithAuth = async (url, options = {}) => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(url, {
      ...options,
      credentials: 'include', // Add this line
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
  
    return res.json();
  };
  
  // Update to use the correct endpoint
  export const fetchUserDetails = () => {
    return fetchWithAuth("http://localhost:8080/api/auth/user");
  };
