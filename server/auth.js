const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const credentials = require("./google-credentials.json");
const { createUser, getUser } = require("./user");

module.exports = {
  use,
  getUserFromReq,
};

const userAccessTokens = {};

passport.use(
  new GoogleStrategy(
    {
      clientID: credentials.clientID,
      clientSecret: credentials.clientSecret,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await getUser(profile.id);

      if (!user) {
        user = await createUser(
          profile.id,
          "google",
          profile.emails[0].value,
          profile.displayName
        );
      }

      user.accessToken = accessToken;

      // If token already exists for this particular user, delete it.
      // This is to prevent stale tokens being kept around when a new
      // access token is generated.
      Object.keys(userAccessTokens).forEach((token) => {
        if (userAccessTokens[token] === user.id) {
          delete userAccessTokens[token];
        }
      });

      userAccessTokens[accessToken] = user.id;

      done(null, user);
    }
  )
);

// On successful or failed authentication, we want to send our client to this
// HTML page that posts them a message with data (user on success, error message otherwise).
function genCallbackHTML(message) {
  return `
    <html>
    <head>
    <script>
    window.opener.postMessage(${message}, '*');
    console.log('posted message to parent window');
    window.close();
    </script>
    </head>

    <body>
    ${message}
    </body>
    </html>
    `;
}

async function getUserFromReq(req) {
  // Two ways to verify:
  // 1. OAuth2 authorisation header. Useful when using the server as an API.
  // 2. Cookie. This is the standard way to login with our client app. When we authorise, the
  // server sends us an 'auth' cookie that contains the token.

  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.substring(7);

    if (token in userAccessTokens) {
      return await getUser(userAccessTokens[token]);
    }
  }

  const authCookie = req.cookies.auth;
  if (authCookie) {
    if (token in userAccessTokens) {
      return await getUser(userAccessTokens[token]);
    }
  }

  return null;
}

async function authenticateUser(req, res, next) {
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

function use(app) {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/error",
      session: false,
    }),
    (req, res) => {
      res.cookie("auth", req.user.accessToken);
      res.send(genCallbackHTML(JSON.stringify(req.user)));
    }
  );

  app.get("/", (req, res, next) => {
    res.send("hello world!");
  });

  app.get("/auth/error", (req, res, next) => {
    res.send(
      genCallbackHTML(
        JSON.stringify({ error: "Authentication error occurred" })
      )
    );
  });

  app.get("/me", authenticateUser, (req, res, next) => {
    res.send(req.user);
  });
}
