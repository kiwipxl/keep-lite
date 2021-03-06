import { gql } from "@apollo/client";
import gqlClient from "../../gqlClient";
import {
  CREATE_LABEL,
  DELETE_LABEL,
  RENAME_LABEL,
} from "../../redux/actions/labels";

const resolver = async (action) => {
  switch (action.type) {
    case CREATE_LABEL: {
      const res = await gqlClient.mutate({
        mutation: gql`
          mutation($id: ID!, $name: String!) {
            label: createLabel(id: $id, name: $name) {
              id
            }
          }
        `,
        variables: { id: action.payload.id, name: action.payload.name },
      });
      return res;
    }

    case DELETE_LABEL: {
      const res = await gqlClient.mutate({
        mutation: gql`
          mutation($id: ID!) {
            success: deleteLabel(id: $id)
          }
        `,
        variables: { id: action.payload.id },
      });

      if (!res.data.success) {
        throw new Error("server rejected action");
      }
      return res;
    }

    case RENAME_LABEL: {
      const res = await gqlClient.mutate({
        mutation: gql`
          mutation($id: ID!, $name: String!) {
            success: renameLabel(id: $id, name: $name)
          }
        `,
        variables: { id: action.payload.id, name: action.payload.name },
      });

      if (!res.data.success) {
        throw new Error("server rejected action");
      }
      return res;
    }

    default:
      break;
  }
};

export default resolver;
