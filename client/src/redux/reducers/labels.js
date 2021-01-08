import { gql } from "@apollo/client";
import { CREATE_LABEL, DELETE_LABEL, RENAME_LABEL } from "../actions/labels";
import { AUTH_LOGIN } from "../actions/auth";
import gqlClient from "../../gqlClient";

const initialState = {};

function sync(mutation, variables) {
  gqlClient
    .mutate({
      mutation: mutation,
      variables: variables,
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LABEL:
      sync(
        gql`
          mutation CreateLabel($id: ID!, $name: String!) {
            createLabel(id: $id, name: $name) {
              id
            }
          }
        `,
        { id: action.payload.id, name: action.payload.name }
      );

      return {
        ...state,
        [action.payload.id]: { name: action.payload.name },
      };

    case DELETE_LABEL:
      sync(
        gql`
          mutation DeleteLabel($id: ID!) {
            deleteLabel(id: $id)
          }
        `,
        { id: action.payload.id }
      );

      // Remove label from state via computed object properties
      let { [action.payload.id]: _, ...newState } = state;
      return newState;

    case RENAME_LABEL:
      sync(
        gql`
          mutation RenameLabel($id: ID!, $name: String!) {
            renameLabel(id: $id, name: $name)
          }
        `,
        { id: action.payload.id, name: action.payload.name }
      );

      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          name: action.payload.name,
        },
      };

    case AUTH_LOGIN: {
      let res = { ...state };

      for (const label of action.payload.labels) {
        res[label.id] = label;
      }

      return res;
    }

    default:
      return state;
  }
};
