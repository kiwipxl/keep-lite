import React from "react";
import styled from "styled-components";
import { gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as authStore from "../redux/actions/auth";
import gqlClient from "../gqlClient";
import Button from "../components/input/Button";

const AuthScreen = ({ className }) => {
  const [loggingIn, setLoggingIn] = React.useState(false);
  const dispatch = useDispatch();

  async function fetchLoginData(user) {
    try {
      const res = await gqlClient.query({
        query: gql`
          query FetchInitialData {
            labels {
              id
              name
            }
          }
        `,
      });

      dispatch(authStore.login(user, res.data.labels));
    } catch (err) {
      console.error(err);
      // TODO: show error
    }

    setLoggingIn(false);
  }

  function authenticate(authProvider) {
    // TODO: replace localhost url
    window.open(`http://localhost:4000/auth/${authProvider}`);

    setLoggingIn(true);
  }

  function onMessage(ev) {
    if (ev.data && ev.data.id) {
      const user = ev.data;

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
