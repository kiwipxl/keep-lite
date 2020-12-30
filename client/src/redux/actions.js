export const ADD_NOTE = "ADD_NOTE";
export const SET_NOTE_TITLE = "SET_NOTE_TITLE";
export const SET_NOTE_BODY = "SET_NOTE_BODY";

export const ADD_LABEL = "ADD_LABEL";
export const RENAME_LABEL = "RENAME_LABEL";

export const addNote = (title, body) => ({
  type: ADD_NOTE,
  payload: {
    id: 1,
    content: {
      title: title,
      body: body,
    },
  },
});
