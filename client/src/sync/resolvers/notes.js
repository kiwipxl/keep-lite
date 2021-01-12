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
    case CREATE_NOTE:
      return await gqlClient.mutate({
        mutation: gql`
          mutation CreateNote($id: ID!, $title: String, $body: String) {
            createNote(id: $id, title: $title, body: $body) {
              id
              title
              body
            }
          }
        `,
        variables: {
          id: action.payload.id,
          title: action.payload.title,
          body: JSON.stringify(convertToRaw(action.payload.body)),
        },
      });

    case SET_NOTE_TITLE:
    case SET_NOTE_BODY:
    case ADD_NOTE_LABEL:
    case REMOVE_NOTE_LABEL:
      break;
  }
};
