import { gql } from "@apollo/client";
import sync from "./sync";
import gqlClient from "../gqlClient";
import {
  CREATE_LABEL,
  DELETE_LABEL,
  RENAME_LABEL,
} from "../redux/actions/labels";

export const onReduxAction = (action) => {
  switch (action.type) {
    case CREATE_LABEL:
    case DELETE_LABEL:
    case RENAME_LABEL:
      sync.push(action);
      break;
  }
};

export const onSyncAction = async (action) => {
  switch (action.type) {
    case CREATE_LABEL:
      return await gqlClient.mutate({
        mutation: gql`
          mutation CreateLabel($id: ID!, $name: String!) {
            createLabel(id: $id, name: $name) {
              id
            }
          }
        `,
        variables: { id: action.payload.id, name: action.payload.name },
      });

    case DELETE_LABEL:
      return await gqlClient.mutate({
        mutation: gql`
          mutation DeleteLabel($id: ID!) {
            deleteLabel(id: $id)
          }
        `,
        variables: { id: action.payload.id },
      });

    case RENAME_LABEL:
      return await gqlClient.mutate({
        mutation: gql`
          mutation RenameLabel($id: ID!, $name: String!) {
            renameLabel(id: $id, name: $name)
          }
        `,
        variables: { id: action.payload.id, name: action.payload.name },
      });
  }
};
