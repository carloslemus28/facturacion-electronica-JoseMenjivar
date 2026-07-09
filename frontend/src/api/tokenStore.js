const STORAGE_KEY = 'fe_access_token';

let accessToken = null;

try {
  accessToken = window.sessionStorage.getItem(STORAGE_KEY);
} catch (error) {
  accessToken = null;
}

export const tokenStore = {
  getAccessToken() {
    return accessToken;
  },

  setAccessToken(token) {
    accessToken = token;

    try {
      if (token) {
        window.sessionStorage.setItem(STORAGE_KEY, token);
      } else {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      // Si el navegador bloquea sessionStorage, seguimos usando memoria.
    }
  },

  clearAccessToken() {
    accessToken = null;

    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      // Si el navegador bloquea sessionStorage, no interrumpir el cierre de sesión.
    }
  }
};
