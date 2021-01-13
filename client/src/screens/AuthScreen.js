import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as authStore from "../redux/actions/auth";
import gqlClient from "../gqlClient";
import Button from "../components/input/Button";
import config from "../config";

const AuthScreen = ({ className }) => {
  const [loggingIn, setLoggingIn] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Try to login automatically.
    // If a graphQL query works, it means we're already authenticated.
    // We call this a 'persistent logon'.
    gqlClient
      .query({
        query: gql`
          query GetMe {
            me {
              id
              authProvider
              email
              name
              created
            }
          }
        `,
      })
      .then((res) => {
        console.log(
          `found persistent logon (${res.data.me.id}). fetching login data...`
        );
        fetchLoginData(res.data.me);
      })
      .catch((err) => {});
  }, []);

  async function fetchLoginData(user) {
    try {
      const res = await gqlClient.query({
        query: gql`
          query {
            labels {
              id
              name
            }
          }
        `,
      });

      dispatch(authStore.login(user, res.data.labels));

      console.log("logged in with user id", user.id);
    } catch (err) {
      console.error(err);
      // TODO: show error
    }

    setLoggingIn(false);
  }

  function authenticate(authProvider) {
    // TODO: replace localhost url
    window.open(`${config.serverUrl}/auth/${authProvider}`);

    setLoggingIn(true);
  }

  function onMessage(ev) {
    if (ev.data && ev.data.id && ev.data.authProvider) {
      const user = ev.data;

      localStorage.setItem("authToken", user.accessToken);

      console.log(
        `authenticated successfully with provider '${user.authProvider}'`
      );
      window.onmessage = null;

      fetchLoginData(user);
    }
  }

  React.useEffect(() => {
    window.addEventListener("message", onMessage);

    return () => window.removeEventListener("message", onMessage);
  }, []);

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
