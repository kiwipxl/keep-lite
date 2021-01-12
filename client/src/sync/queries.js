import { gql } from "@apollo/client";
import { ContentState, convertFromRaw } from "draft-js";
import store from "../redux/store";
import gqlClient from "../gqlClient";
import { createNote } from "../redux/actions/notes";
import { onGqlError } from "./util";

async function addNotesToStore(notes) {
  const storedNotes = store.getState().notes;

  for (const note of notes) {
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

      const labels = note.labels.map((label) => label.id);

      const action = createNote(
        note.id,
        contentStateTitle,
        contentStateBody,
        labels
      );
      action.sync = false;
      store.dispatch(action);
    } catch (err) {
      console.error("error parsing server note data:", err);
      return;
    }
  }
}

export async function getNotes(limit) {
  try {
    const res = await gqlClient.query({
      query: gql`
        query($limit: Int) {
          notes: getNotes(limit: $limit) {
            id
            title
            body
            labels {
              id
            }
            created
            edited
          }
        }
      `,
      variables: {
        limit: limit,
      },
    });

    addNotesToStore(res.data.notes);
  } catch (err) {
    onGqlError(err);
  }
}

export async function getNotesByLabel(labelId, limit) {
  try {
    const res = await gqlClient.query({
      query: gql`
        query($labelId: ID!, $limit: Int) {
          notes: getNotesByLabel(labelId: $labelId, limit: $limit) {
            id
            title
            body
            labels {
              id
            }
            created
            edited
          }
        }
      `,
      variables: {
        labelId: labelId,
        limit: limit,
      },
    });

    addNotesToStore(res.data.notes);
  } catch (err) {
    onGqlError(err);
  }
}
