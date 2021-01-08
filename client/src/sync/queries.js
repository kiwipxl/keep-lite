import { gql } from "@apollo/client";
import { ContentState, convertFromRaw } from "draft-js";
import store from "../redux/store";
import gqlClient from "../gqlClient";
import { addNote } from "../redux/actions/notes";
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
      const contentStateTitle = note.title
        ? ContentState.createFromText(note.title)
        : null;

      const contentStateBody = note.body
        ? convertFromRaw(JSON.parse(note.body))
        : null;

      store.dispatch(
        addNote(
          false,
          note.id,
          contentStateTitle,
          contentStateBody,
          note.labels
        )
      );
    }

    return res.data.notes;
  } catch (err) {
    onGqlError(err);
  }

  return [];
}
