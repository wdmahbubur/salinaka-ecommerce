

export const signIn = (email, password) => ({
  type: "SIGNIN",
  payload: {
    email,
    password
  }
});

export const signInWithGoogle = () => ({
  type: "SIGNIN_WITH_GOOGLE"
});

export const signInWithFacebook = () => ({
  type: "SIGNIN_WITH_FACEBOOK"
});

export const signInWithGithub = () => ({
  type: "SIGNIN_WITH_GITHUB"
});

export const signUp = (user) => ({
  type: "SIGNUP",
  payload: user
});

export const signInSuccess = (auth) => ({
  type: "SIGNIN_SUCCESS",
  payload: auth
});

export const setAuthPersistence = () => ({
  type: "SET_AUTH_PERSISTENCE"
});

export const signOut = () => ({
  type: "SIGNOUT"
});

export const signOutSuccess = () => ({
  type: "SIGNOUT_SUCCESS"
});

export const onAuthStateChanged = () => ({
  type: "ON_AUTHSTATE_CHANGED"
});

export const onAuthStateSuccess = (user) => ({
  type: "ON_AUTHSTATE_SUCCESS",
  payload: user
});

export const onAuthStateFail = (error) => ({
  type: "ON_AUTHSTATE_FAIL",
  payload: error
});

export const resetPassword = (email) => ({
  type: "RESET_PASSWORD",
  payload: email
});

