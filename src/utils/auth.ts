// feedback-frontend/src/utils/auth.ts
export const logoutAdmin = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken'); // Remove JWT token
    window.location.href = '/login-feedback'; // Redirect to login page
  }
};