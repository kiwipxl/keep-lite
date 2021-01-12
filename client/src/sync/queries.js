import { gql } from "@apollo/client";
import { ContentState, convertFromRaw } from "draft-js";
import store from "../redux/store";
import gqlClient from "../gqlClient";
import { createNote } from "../redux/actions/notes";
import { onGqlError } from "./util";

export async function getNotes() {
  try {
    const res = await gqlClient.query({
      query: gql`
        query GetNotes($limit: Int) {
          notes: getNotes(limit: $limit) {
            id
            title
            body
            labels {
              id
              name
            }
            created
            edited
          }
        }
      `,
      variables: {
        limit: 10,
      },
    });

    for (const note of res.data.notes) {
      try {
        const contentStateBody = note.body
          ? convertFromRaw(JSON.parse(note.body))
          : null;

        const action = createNote(
          note.id,
          note.title,
          contentStateBody,
          note.labels
        );
        action.sync = false;
        store.dispatch(action);
      } catch (err) {
        console.error("error parsing server note data:", err);
      }
    }

    return res.data.notes;
  } catch (err) {
    onGqlError(err);
  }

  return [];
}
