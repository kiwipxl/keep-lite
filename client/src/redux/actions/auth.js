export const AUTH_LOGIN = "AUTH_LOGIN";

export const login = (user, labels) => ({
  type: AUTH_LOGIN,
  payload: {
    user: user,
    labels: labels,
  },
});
