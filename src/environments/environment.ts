export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000', // Pointing to the JSON server
  // Keeping the credentials for fallback authentication
  credentials: {
    admin: { username: 'admin', password: 'admin123' },
    user: { username: 'user', password: 'user123' },
  },
};
