import { gql } from "@apollo/client";
import store from "./store";
import gqlClient from "../gqlClient";
import { addNote } from "./actions/notes";
import { ContentState } from "draft-js";

function onError(err) {
  let errors = [];

  if (err.graphQLErrors && err.graphQLErrors.length > 0) {
    errors.push(...err.graphQLErrors);
  }

  if (
    err.networkError &&
    err.networkError.result &&
    err.networkError.result.errors.length > 0
  ) {
    errors.push(...err.networkError.result.errors);
  }

  console.error(err.message, errors);
}

export function sync(mutation, variables) {
  gqlClient
    .mutate({
      mutation: mutation,
      variables: variables,
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

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
      store.dispatch(
        addNote(
          false,
          note.id,
          ContentState.createFromText(note.title),
          ContentState.createFromText(note.body),
          note.labels
        )
      );
    }

    return res.data.notes;
  } catch (err) {
    onError(err);
  }

  return [];
}
