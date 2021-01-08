/*
A session contains currently authenticated user's for this server.
It holds the access token (secret) used for that client to verify themselves
without having to go through the whole reauthentication process again.

{
  user_id: {
    token: String, 

    // TODO: add expiry
  }
}
*/

let sessions = {};

module.exports = {
  addSession: (userId, token) => {
    sessions[userId] = {
      token: token,
    };
  },

  getSessionUser: (token) => {
    for (const userId of Object.keys(sessions)) {
      if (sessions[userId].token === token) {
        return userId;
      }
    }

    return null;
  },
};
