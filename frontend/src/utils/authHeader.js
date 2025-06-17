export default function authHeader() {
    const token = sessionStorage.getItem("jwt");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

