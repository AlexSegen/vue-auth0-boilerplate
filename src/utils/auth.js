import auth0 from "auth0-js";

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
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
  localStorage.removeItem("user_profile");
};

const handleAuth = cb => {
  webAuth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken) {
      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("id_token", authResult.idToken);
      localStorage.setItem(
        "expires_at",
        new Date().getTime() + authResult.expiresIn * 1000
      );
      localStorage.setItem(
        "user_profile",
        JSON.stringify(authResult.idTokenPayload)
      );
      cb();
    } else {
      console.log("Error: ", err);
    }
  });
};

const isLoggedIn = () => {
  const access_token = localStorage.getItem("access_token");
  const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
  return access_token && new Date().getTime() < expiresAt;
};

const getProfile = () => {
  return JSON.parse(localStorage.getItem("user_profile"));
};

export { login, getProfile, logout, handleAuth, isLoggedIn };
