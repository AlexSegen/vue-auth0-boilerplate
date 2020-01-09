import auth0 from "auth0-js";

const STORAGE = {
  ACCESS_TOKEN: "vauth_access_token",
  ID_TOKEN: "vauth_id_token",
  PROFILE: "vauth_user_profile",
  EXPIRES_AT: "vauth_expiration"
}

const webAuth = new auth0.WebAuth({
  domain: process.env.VUE_APP_AUTH_DOMAIN,
  clientID: process.env.VUE_APP_AUTH_CLIENT_ID,
  redirectUri: process.env.VUE_APP_AUTH_REDIRECT_URI,
  audience: process.env.VUE_APP_AUTH_AUDIENCE,
  responseType: process.env.VUE_APP_AUTH_RESPONSE_TYPE,
  scope: process.env.VUE_APP_AUTH_SCOPE
});

const login = () => {
  webAuth.authorize();
};

const logout = () => {
  localStorage.removeItem(STORAGE.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE.ID_TOKEN);
  localStorage.removeItem(STORAGE.EXPIRES_AT);
  localStorage.removeItem(STORAGE.PROFILE);
};

const handleAuth = cb => {
  webAuth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken) {
      localStorage.setItem(STORAGE.ACCESS_TOKEN, authResult.accessToken);
      localStorage.setItem(STORAGE.ID_TOKEN, authResult.idToken);
      localStorage.setItem(
        STORAGE.EXPIRES_AT,
        new Date().getTime() + authResult.expiresIn * 1000
      );
      localStorage.setItem(
        STORAGE.PROFILE,
        JSON.stringify(authResult.idTokenPayload)
      );
      cb();
    } else {
      console.log("Error: ", err);
    }
  });
};

const isLoggedIn = () => {
  const access_token = localStorage.getItem(STORAGE.ACCESS_TOKEN);
  const expiresAt = JSON.parse(localStorage.getItem(STORAGE.EXPIRES_AT));
  return access_token && new Date().getTime() < expiresAt;
};

const getProfile = () => {
  return JSON.parse(localStorage.getItem(STORAGE.PROFILE));
};

const getToken  = () => {
  const access_token = localStorage.getItem(STORAGE.ACCESS_TOKEN);
  return  access_token ? access_token : null
}

export { login, getProfile, getToken, logout, handleAuth, isLoggedIn };
