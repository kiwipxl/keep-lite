const { getSessionUser } = require("./sessions");
const auth_google = require("./google");
const { getUser } = require("../data/user");
const { genResponseHTML } = require("./util");

module.exports = {
  init,
  getUserFromReq,
  authenticate,
};

async function getUserFromReq(req) {
  // Two ways to verify:
  // 1. OAuth2 authorisation header. Useful when using the server as an API.
  // 2. Cookie. This is the standard way to login with our client app. When we authorise, the
  // server sends us an 'auth' cookie that contains the token.

  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.substring(7);

    if (getSessionUser(token)) {
      return await getUser(getSessionUser(token));
    }
  }

  const authCookie = req.cookies.auth;
  if (authCookie) {
    if (getSessionUser(token)) {
      return await getUser(getSessionUser(token));
    }
  }

  return null;
}

async function authenticate(req, res, next) {
  try {
    const user = await getUserFromReq(res);
    if (user) {
      next(null, user);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
}

function init(app) {
  auth_google.init(app);

  app.get("/auth/error", (req, res, next) => {
    res.send(
      genResponseHTML(
        JSON.stringify({ error: "Authentication error occurred" })
      )
    );
  });

  app.get("/me", authenticate, (req, res, next) => {
    res.send(req.user);
  });
}
