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

    const storedNotes = store.getState().notes;

    for (const note of res.data.notes) {
      if (storedNotes[note.id]) {
        continue;
      }

      try {
        const contentStateTitle = note.title
          ? ContentState.createFromText(note.title)
          : null;

        const contentStateBody = note.body
          ? convertFromRaw(JSON.parse(note.body))
          : null;

        const action = createNote(
          note.id,
          contentStateTitle,
          contentStateBody,
          note.labels
        );
        action.sync = false;
        store.dispatch(action);
      } catch (err) {
        console.error("error parsing server note data:", err);
        return;
      }
    }
  } catch (err) {
    onGqlError(err);
  }
}
