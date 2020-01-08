import auth0 from "auth0-js";

const webAuth = new auth0.WebAuth({
  domain: "vue-oauth.auth0.com",
  clientID: "C5kyY6v6R5533zsASYoVnUDkGvS3wOpv",
  redirectUri: "http://localhost:8080/callback",
  audience: "",
  responseType: "token id_token",
  scope: "openid profile"
});

let tokens = {};
let userProfile = {};

const login = () => {
  webAuth.authorize();
};

const logout = () => {
    tokens = {};
}

const handleAuth = cb => {
    webAuth.parseHash((err, authResult) => {
        if(authResult && authResult.accessToken) {
            tokens.accessToken = authResult.accessToken;
            tokens.idToken = authResult.idToken;
            tokens.expiry = (new Date()).getTime() + authResult.expiresIn * 1000;
            userProfile = authResult.idTokenPayload;
            cb();
        } else {
            console.log('Error: ', error);
        }
    });
};

const isLoggedIn = () => {
    return tokens.accessToken && (new Date()).getTime() < tokens.expiry;
};

const getProfile = () => {
    return userProfile
}

export { login, getProfile, logout, handleAuth, isLoggedIn };
