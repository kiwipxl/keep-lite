const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const credentials = require("./google-credentials.json");
const { createUser, getUser } = require("../data/user");
const { addSession } = require("./sessions");
const { genResponseHTML } = require("./util");

passport.use(
  new GoogleStrategy(
    {
      clientID: credentials.client_id,
      clientSecret: credentials.client_secret,
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

      addSession(user.id, accessToken);

      done(null, user);
    }
  )
);

module.exports.init = (app) => {
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
      res.send(genResponseHTML(JSON.stringify(req.user)));
    }
  );
};
