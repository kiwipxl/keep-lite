import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as auth from "../redux/actions/auth";
import gqlClient from "../gqlClient";
import Button from "../components/input/Button";

async function login() {
  const res = await gqlClient.query({
    query: gql`
      query login {
        labels {
          id
          name
        }
      }
    `,
  });

  console.log(res);
}

const AuthScreen = ({ className }) => {
  // const { data, loading, error } = useQuery(
  //   gql`
  //     query GetMainNotes {
  //       getNote(id: 1) {
  //         id
  //         labels {
  //           id
  //           name
  //         }
  //       }
  //     }
  //   `
  // );

  // console.log(data, loading, error);

  const routerHistory = useHistory();
  const dispatch = useDispatch();

  function login(authProvider) {
    // TODO: replace localhost url
    window.open(`http://localhost:4000/auth/${authProvider}`);

    window.onmessage = (ev) => {
      if (ev.data && ev.data.id) {
        dispatch(auth.login(ev.data));
        window.onmessage = null;
      }
    };
  }

  return (
    <div className={className}>
      <Button onClick={() => login("google")}>Sign in with Google</Button>
    </div>
  );
};

export default styled(AuthScreen)``;
