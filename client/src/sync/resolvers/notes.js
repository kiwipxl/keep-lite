import { gql } from "@apollo/client";
import gqlClient from "../../gqlClient";
import {
  CREATE_NOTE,
  SET_NOTE_TITLE,
  SET_NOTE_BODY,
  ADD_NOTE_LABEL,
  REMOVE_NOTE_LABEL,
} from "../../redux/actions/notes";
import { convertToRaw } from "draft-js";

export default async (action) => {
  switch (action.type) {
    case CREATE_NOTE: {
      const res = await gqlClient.mutate({
        mutation: gql`
          mutation($id: ID!, $title: String, $body: String) {
            note: createNote(id: $id, title: $title, body: $body) {
              id
              title
              body
            }
          }
        `,
        variables: {
          id: action.payload.id,
          title: action.payload.title.getPlainText(),
          body: JSON.stringify(convertToRaw(action.payload.body)),
        },
      });
      return res;
    }

    case SET_NOTE_TITLE: {
      const res = await gqlClient.mutate({
        mutation: gql`
          mutation($id: ID!, $title: String) {
            note: setNoteTitle(id: $id, title: $title) {
              id
            }
          }
        `,
        variables: {
          id: action.payload.id,
          title: action.payload.title.getPlainText(),
        },
      });

      if (!res.data.note) {
        throw new Error("server rejected action");
      }
      return res;
    }

    case SET_NOTE_BODY: {
      const res = await gqlClient.mutate({
        mutation: gql`
          mutation($id: ID!, $body: String) {
            note: setNoteBody(id: $id, body: $body) {
              id
            }
          }
        `,
        variables: {
          id: action.payload.id,
          body: JSON.stringify(convertToRaw(action.payload.body)),
        },
      });

      if (!res.data.note) {
        throw new Error("server rejected action");
      }
      return res;
    }

    case ADD_NOTE_LABEL: {
      const res = await gqlClient.mutate({
        mutation: gql`
          mutation($id: ID!, $labelId: ID!) {
            success: addNoteLabel(id: $id, labelId: $labelId)
          }
        `,
        variables: {
          id: action.payload.id,
          labelId: action.payload.labelId,
        },
      });

      if (!res.data.success) {
        throw new Error("server rejected action");
      }
      return res;
    }

    case REMOVE_NOTE_LABEL: {
      const res = await gqlClient.mutate({
        mutation: gql`
          mutation($id: ID!, $labelId: ID!) {
            success: removeNoteLabel(id: $id, labelId: $labelId)
          }
        `,
        variables: {
          id: action.payload.id,
          labelId: action.payload.labelId,
        },
      });

      if (!res.data.success) {
        throw new Error("server rejected action");
      }
      return res;
    }
  }
};
