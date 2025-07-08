export function getLoggedInUser() {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem('drvia_user') || 'null');
  } catch {
    return null;
  }
}

export function logoutUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('drvia_user');
  }
} 