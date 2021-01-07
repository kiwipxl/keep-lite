export const AUTH_LOGIN = "AUTH_LOGIN";

export const login = (user) => ({
  type: AUTH_LOGIN,
  payload: {
    user: user,
  },
});
