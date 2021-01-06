import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { login } from "../redux/actions/auth";
import gqlClient from "../gqlClient";

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

  return <div className={className}></div>;
};

export default styled(AuthScreen)``;
