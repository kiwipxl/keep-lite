import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as authStore from "../redux/actions/auth";
import { getAuthorisedUser, getLoginData } from "../sync/queries";
import Button from "../components/input/Button";
import config from "../config";

const AuthScreen = ({ className }) => {
  const [loggingIn, setLoggingIn] = React.useState(false);
  const dispatch = useDispatch();

  const login = async (user) => {
    const loginData = await getLoginData();
    dispatch(authStore.login(user, loginData.labels));

    setLoggingIn(false);
  };

  const authenticate = (authProvider) => {
    window.open(`${config.serverUrl}/auth/${authProvider}`);

    setLoggingIn(true);
  };

  const tryPersistentLogin = async () => {
    // Try to login automatically.
    // If a graphQL query works, it means we're already authenticated.
    // We call this a 'persistent logon'.

    const user = await getAuthorisedUser();
    if (user) {
      console.log(`found persistent logon (${user.id}). logging in...`);
      await login(user);
    }
  };

  React.useEffect(() => tryPersistentLogin(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const onMessage = (ev) => {
    if (ev.data && ev.data.id && ev.data.authProvider) {
      const user = ev.data;

      localStorage.setItem("authToken", user.accessToken);

      console.log(
        `authenticated successfully with provider '${user.authProvider}'`
      );
      window.onmessage = null;

      login(user);
    }
  };

  React.useEffect(() => {
    window.addEventListener("message", onMessage);

    return () => window.removeEventListener("message", onMessage);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={className}>
      {!loggingIn && (
        <Button onClick={() => authenticate("google")}>
          Sign in with Google
        </Button>
      )}
    </div>
  );
};

export default styled(AuthScreen)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
